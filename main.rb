require 'cli'
require 'rest-client'
require 'pp'
require_relative 'scenario_wiremock_template'

settings = CLI.new do
  option :port, description: 'Port at which the wiremock server resides', default: 8082
  argument :path, description: 'Path of the JSON file containing scenarios'
end.parse!

scenarios_from_file(settings.path).each do |scenario|
  url = "localhost:#{settings.port}/__admin/mappings"

  response =
    begin
      RestClient.post(
        url,
        scenario,
        :'Content-Type' => 'application/json'
      )
    rescue RestClient::ExceptionWithResponse => e
      e.response
    end

  request = response.request
  puts "#{request.method} #{request.url}"
  pp request.headers
  puts scenario
  puts '-' * 10
  puts response.code.to_s
  pp response.headers
  puts response.body
  puts '-' * 80
end
