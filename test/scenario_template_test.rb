require_relative 'test_helper'
require 'scenario_wiremock_template'
require 'json'

describe ScenarioTemplate do
  def given_full_scenario
    @scenario = {
      "scenario" => "test",
      "description" => "it's a test!",
      "request" => {
        "method" => "PUT",
        "urlPath" => "/test",
        "headers" => {
          "Content-Type" => "application/json"
        },
        "body" => {
          "someReqBody" => 123
        }
      },
      "response" => {
        "status" => 200,
        "statusMessage" => "OK",
        "headers" => {
          "Content-Type" => "application/json"
        },
        "jsonBody" => {
          "someField" => 234
        }
      }
    }
  end

  it 'removes extra scenario fields' do
    given_full_scenario

    name, json = ScenarioTemplate.new(@scenario).as_wiremock_stub
    JSON.parse(json).wont_be :key?, 'scenario'
    JSON.parse(json).wont_be :key?, 'description'
    JSON.parse(json)['request'].wont_be :key?, 'body'
  end

  it 'sets the scenario header' do
    given_full_scenario

    name, json = ScenarioTemplate.new(@scenario).as_wiremock_stub
    JSON.parse(json)['request']['headers']['Api-Scenario']['equalTo'].must_equal 'test'
  end
end




