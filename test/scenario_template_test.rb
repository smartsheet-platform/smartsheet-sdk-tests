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

  def given_no_defaults
    @defaults = {}
  end

  describe 'Defaults Test' do
    def given_scenario_without_req_headers
      @scenario = {
        "scenario" => "test",
        "request" => {
          "method" => "PUT",
          "urlPath" => "/test",
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
  
    def given_defaults_with_content_type
      @defaults = {
        "request" => {
          "headers" => {
            "Content-Type" => "some type"
          }
        }
      }
    end
  
    def given_defaults_with_new_header
      @defaults = {
        "request" => {
          "headers" => {
            "Something-New" => "used"
          }
        }
      }
    end
  
    def given_defaults_with_different_type
      @defaults = {
        "response" => {
          "jsonBody" => {
            "someField" => {
              "somethingElse" => 345
            }
          }
        }
      }
    end
  
    it 'does not override existing values with defaults' do
      given_full_scenario
      given_defaults_with_content_type
  
      name, json = ScenarioTemplate.new(@scenario, @defaults).as_wiremock_stub
      JSON.parse(json)['request']['headers']['Content-Type']['equalTo'].must_equal 'application/json'
    end
  
    it 'uses defaults when value is not specified' do
      given_full_scenario
      given_defaults_with_new_header
  
      name, json = ScenarioTemplate.new(@scenario, @defaults).as_wiremock_stub
      JSON.parse(json)['request']['headers']['Something-New']['equalTo'].must_equal 'used'
    end
  
    it 'adds headers when needed to specify default' do
      given_scenario_without_req_headers
      given_defaults_with_content_type
  
      name, json = ScenarioTemplate.new(@scenario, @defaults).as_wiremock_stub
      JSON.parse(json)['request']['headers'].must_be_instance_of Hash
      JSON.parse(json)['request']['headers']['Content-Type']['equalTo'].must_equal 'some type'
    end
  
    it 'does not overwrite existing values when types differ' do
      given_full_scenario
      given_defaults_with_content_type
  
      name, json = ScenarioTemplate.new(@scenario, @defaults).as_wiremock_stub
      JSON.parse(json)['response']['jsonBody']['someField'].must_equal(234)
    end
  end

  describe 'Mapping Test' do
    it 'removes extra scenario fields' do
      given_full_scenario
      given_no_defaults

      name, json = ScenarioTemplate.new(@scenario, @defaults).as_wiremock_stub
      JSON.parse(json).wont_be :key?, 'scenario'
      JSON.parse(json).wont_be :key?, 'description'
      JSON.parse(json)['request'].wont_be :key?, 'body'
    end

    it 'sets the scenario header' do
      given_full_scenario
      given_no_defaults

      name, json = ScenarioTemplate.new(@scenario, @defaults).as_wiremock_stub
      JSON.parse(json)['request']['headers']['Api-Scenario']['equalTo'].must_equal 'test'
    end
  end
end




