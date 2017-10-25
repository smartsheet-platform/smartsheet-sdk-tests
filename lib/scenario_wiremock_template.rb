require 'json'

class ScenarioTemplates
  def initialize(scenarios, defaults)
    @scenarios = scenarios
    @defaults = defaults
  end

  def as_wiremock_stubs
    scenarios.map {|s| ScenarioTemplate.new(s, defaults).as_wiremock_stub}
  end

  private

  attr_reader :scenarios, :defaults
end

class ScenarioTemplate
  def initialize(scenario, defaults)
    @scenario = scenario
    @defaults = defaults
    @scenario_name = scenario['scenario']
    @templated = false
  end

  def as_wiremock_stub
    apply_defaults
    build_template
    [scenario_name, as_json]
  end

  private

  attr_reader :scenario_name, :defaults
  attr_accessor :templated, :scenario

  def request
    scenario['request']
  end

  def apply_defaults
    @scenario = apply_default_value(@scenario, defaults)
  end

  def apply_default_value(scenario_value, default_value)
    if default_value.is_a?(Hash)
      scenario_value = {} unless scenario_value.is_a?(Hash)
      default_value.each do |k, v|
        if !scenario_value.key?(k) || scenario_value[k].is_a?(Hash)
          scenario_value[k] = apply_default_value(scenario_value[k], v)
        end
      end

      scenario_value
    else
      default_value
    end
  end

  def build_template
    return if templated

    build_params_conditions
    move_scenario_to_headers
    build_headers_conditions
    move_body_to_pattern

    self.templated = true
  end

  def build_params_conditions
    return unless request.key? 'queryParameters'
    request['queryParameters'] = hash_to_conditions request['queryParameters']
  end

  def move_scenario_to_headers
    assign_scenario_header scenario_name

    scenario.delete 'scenario'
  end

  def assign_scenario_header(scenario_name)
    headers = request.fetch('headers', {})
    headers['Api-Scenario'] = scenario_name
    request['headers'] = headers
  end

  def build_headers_conditions
    return unless request.key? 'headers'
    request['headers'] = hash_to_conditions request['headers']
  end

  def move_body_to_pattern
    return unless request.key? 'body'

    assign_scenario_body_pattern request['body']

    request.delete 'body'
  end

  def assign_scenario_body_pattern(body)
    request['bodyPatterns'] = [{
      equalToJson: JSON.fast_generate(body),
      ignoreArrayOrder: true,
      ignoreExtraElements: false
    }]
  end

  def as_json
    JSON.fast_generate scenario
  end

  def hash_to_conditions(h)
    h.collect do |(k, v)|
      new_v = { equalTo: v }
      [k, new_v]
    end.to_h
  end
end
