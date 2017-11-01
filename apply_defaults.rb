require 'cli'
require 'json'
require_relative 'lib/scenario_defaults'

def json_from_file(path)
  JSON.parse File.read(path)
end

settings = CLI.new do
  argument :stub_defaults, description: 'Path of the JSON file containing scenarios'
  argument :scenarios, description: 'Path of the JSON file containing scenarios'
  option :output, description: 'Path to output a new scenarios file with defaults. Optional, otherwise outputs to STDOUT', default: ''
end.parse!

stub_defaults = json_from_file(settings.stub_defaults)
scenarios = json_from_file(settings.scenarios)

scenarios_with_defaults = ScenariosWithDefaults.new(scenarios, stub_defaults).with_defaults
scenarios_json = JSON.pretty_generate(scenarios_with_defaults)

if settings.output.empty?
    puts scenarios_json
else
    File.open(settings.output, 'w') do |f|
        f.write(scenarios_json)
    end
end
