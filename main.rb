require 'cli'
require 'rest-client'
require 'pp'
require_relative 'scenario_wiremock_template'
require_relative 'colorize'

CHECK = '✓'.green
CROSS = '✗'.red

settings = CLI.new do
  option :port, description: 'Port at which the wiremock server resides', default: 8082
  switch :debug, description: 'Print failure information'
  argument :path, description: 'Path of the JSON file containing scenarios'
end.parse!

failures = []
summary = []

scenarios_from_file(settings.path).each_pair do |name, scenario|
  url = "localhost:#{settings.port}/__admin/mappings"

  begin
    RestClient.post(
      url,
      scenario,
      :'Content-Type' => 'application/json'
    )
    summary.push "#{CHECK}  #{name}"
  rescue RestClient::ExceptionWithResponse => e
    failures.push(name: name, scenario: scenario, response: e.response)
    summary.push "#{CROSS}  #{name}"
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