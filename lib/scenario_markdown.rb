require 'json'

class ScenariosMarkdown
    def initialize(scenarios)
        @scenarios = scenarios
    end

    def to_markdown
        markdown = []

        markdown << table_of_contents
        markdown << @scenarios
            .map {|s| ScenarioMarkdown.new(s).to_markdown}
            .join("\n\n")

        markdown.join("\n\n")
    end

    private

    def table_of_contents
        @scenarios.map do |s|
            scenario_link = "##{s[:scenario].gsub(/\s+/, '-').downcase}"
            
            "* [#{s[:scenario]}](#{scenario_link})"
        end.join("\n")
    end
end

class ScenarioMarkdown
    def initialize(scenario)
        @scenario = scenario
    end

    def to_markdown
        markdown = []

        markdown << '## ' + title_md
        markdown << description_md
        markdown << "### Expected Request"
        markdown << '#### ' + request_method_md

        if @scenario[:request].key?(:headers)
            markdown << '#### Headers' 
            markdown << request_headers_md
        end
        
        if @scenario[:request].key?(:body)
            markdown << '#### Body' 
            markdown << request_body_md
        end

        markdown << "### Response"
        markdown << '#### ' + response_status_md
        markdown << response_body_md

        markdown.join("\n\n")
    end

    private

    def title_md
        "#{@scenario[:scenario]}"
    end

    def description_md
        "#{@scenario[:description]}"
    end
    
    def request_method_md
        "#{@scenario[:request][:method]} - #{@scenario[:request][:urlPath]}"
    end

    def request_headers_md
        @scenario[:request][:headers].map {|k, v| "* #{k}: #{v}"}.join("\n")
    end

    def request_body_md
        '```json' + "\n" +
            "#{JSON.pretty_generate(@scenario[:request][:body])}\n" +
            '```'
    end

    def response_status_md
        "Status - #{@scenario[:response][:status]} #{@scenario[:response][:statusMessage]}"
    end

    def response_body_md
        '```json' + "\n" +
            "#{JSON.pretty_generate(@scenario[:response][:jsonBody])}\n" +
            '```'
    end
end