require 'cli'
require 'pp'
require_relative 'lib/scenario_markdown'

settings = CLI.new do
    option :output, description: 'Name of the output markdown file', default: ''
    argument :path, description: 'Path of the JSON file containing scenarios'
end.parse!

scenarios = JSON.parse(File.read(settings.path), symbolize_names: true)
markdown = ScenariosMarkdown.new(scenarios).to_markdown

if settings.output.empty?
    puts markdown
else
    File.open(settings.output, 'w') do |f|
        f.write(markdown)
    end
end
