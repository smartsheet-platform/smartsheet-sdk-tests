require 'cli'
require 'pp'
require_relative 'scenario_wiremock_template'
require_relative 'colorize'

CHECK = '✓'.green
CROSS = '✗'.red

settings = CLI.new do
  argument :scenario_path, description: 'Path of the JSON file containing scenarios'
  argument :output_path, description: 'Directory mappings will output to'
end.parse!

failures = []
summary = []

scenarios_from_file(settings.scenario_path).each_pair do |name, scenario|
  File.open(settings.output_path + name + '.json', 'w') do |f|
    f.write(scenario)
    summary.push "#{CHECK}  #{name}"
  end
end

if settings.debug
  failures.each do |failure|
    name, scenario, response = failure.values_at(:name, :scenario, :response)
    puts "Request (Scenario: #{name})"
    request = response.request
    puts "#{request.method} #{request.url}"
    pp request.headers
    puts scenario
    puts '-' * 10
    puts 'Response'
    puts response.code.to_s
    pp response.headers
    puts response.body
    puts '-' * 40
  end
end

puts 'Summary:'
puts summary.join("\n")
puts "\n#{failures.size} Failures".red unless failures.empty?