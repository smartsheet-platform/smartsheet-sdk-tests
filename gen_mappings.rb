require 'cli'
require_relative 'lib/scenario_wiremock_template'
require_relative 'colorize'

def json_from_file(path)
  JSON.parse File.read(path)
end

CHECK = '✓'.green

settings = CLI.new do
  argument :scenario_path, description: 'Path of the JSON file containing scenarios'
  argument :output_path, description: 'Path to store the wiremock mapping files'
end.parse!

summary = []

scenarios = json_from_file(settings.scenario_path)

wiremock_stubs = ScenarioTemplates
  .new(scenarios)
  .as_wiremock_stubs
  .to_h

wiremock_stubs.each_pair do |name, scenario|
  File.open(settings.output_path + name + '.json', 'w') do |f|
    f.write(scenario)
    summary.push "#{CHECK}  #{name}"
  end
end

puts 'Summary:'
puts summary.join("\n")
