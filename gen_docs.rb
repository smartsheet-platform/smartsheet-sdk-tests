require 'cli'
require 'pp'
require_relative 'lib/scenario_markdown'

settings = CLI.new do
    option :output, description: 'Name of the output markdown file', default: ''
    argument :path, description: 'Path of the JSON file containing scenarios'
end.parse!

markdown = JSON.parse(File.read(settings.path), symbolize_names: true)
    .map {|scenario| ScenarioMarkdown.new(scenario).to_markdown }
    .join("\n\n")


if settings.output.empty?
    puts markdown
else
    File.open(settings.output, 'w') do |f|
        f.write(markdown)
    end
end
