require 'json'

class ScenarioMarkdown
    def initialize(scenario)
        @scenario = scenario
    end

    def to_markdown
        markdown = []

        markdown << '# ' + title_md
        markdown << description_md
        markdown << "## Expected Request"
        markdown << '### ' + request_method_md
        markdown << '### Headers' if @scenario[:request].key?(:headers)
        markdown << request_headers_md if @scenario[:request].key?(:headers)
        markdown << '### Body' if @scenario[:request].key?(:body)
        markdown << request_body_md if @scenario[:request].key?(:body)
        markdown << "## Response"
        markdown << '### ' + response_status_md
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