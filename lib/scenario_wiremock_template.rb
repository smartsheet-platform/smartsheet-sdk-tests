require 'json'

class ScenarioTemplate
  def initialize(scenario)
    @scenario = scenario
    @scenario_name = scenario['scenario']
    @templated = false
  end

  def as_wiremock_stub
    build_template
    [scenario_name, as_json]
  end

  private

  attr_reader :scenario, :scenario_name
  attr_accessor :templated

  def request
    scenario['request']
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
    scenario.delete 'description'
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

def json_from_file(path)
  JSON.parse File.read(path)
end

def scenarios_from_file(path)
  json_from_file(path)
    .collect { |scenario| ScenarioTemplate.new(scenario).as_wiremock_stub }
    .to_h
end