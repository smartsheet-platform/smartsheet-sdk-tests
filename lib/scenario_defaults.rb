class ScenariosWithDefaults
    def initialize(scenarios, defaults)
        @scenarios = scenarios
        @defaults = defaults
    end

    def with_defaults
        scenarios.map {|s| ScenarioWithDefaults.new(s, defaults).with_defaults}
    end

    private

    attr_reader :scenarios, :defaults
end

class ScenarioWithDefaults
    def initialize(scenario, defaults)
        @scenario = scenario
        @defaults = defaults
    end

    def with_defaults
        apply_default_value(scenario, defaults)
    end

    private

    attr_reader :scenario, :defaults

    # def apply_defaults
    #     @scenario = apply_default_value(@scenario, defaults)
    # end
    
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
end