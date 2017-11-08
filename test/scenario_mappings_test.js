var should = require('should');

var scenarioMappings = require('../lib/scenario_mappings');


describe("Scenario Mappings Test", function () {
    function givenFullScenario() {
        return {
            "scenario": "test",
            "description": "it's a test!",
            "request": {
                "method": "PUT",
                "urlPath": "/test",
                "queryParameters": {
                    "query": "test+sheet",
                    "someParam": "someValue"
                },
                "headers": {
                    "Content-Type": "application/json",
                    "Some-Header": "some value"
                },
                "body": {
                    "someReqBody": 234
                }
            },
            "response": {
                "status": 200,
                "jsonBody": {
                    "nestedValue": 123
                }
            }
        }
    }

    function givenMinimalScenario() {
        return {
            "scenario": "test",
            "description": "it's a test!",
            "request": {
                "method": "PUT",
                "urlPath": "/test"
            },
            "response": {
                "status": 200,
                "jsonBody": {
                    "nestedValue": 123
                }
            }
        }
    }
    
    describe("#buildStubsFromScenarios", function () {
        function givenFullScenarios(numScenarios) {
            var scenarios = [];
            for (var i = 0; i < numScenarios; i++) {
                scenarios.push(givenFullScenario());
            }
            
            return scenarios;
        }
        
        it("returns the correct number of scenarios", function() {
            var scenarios = givenFullScenarios(10);
            
            var stubs = scenarioMappings.buildStubsFromScenarios(scenarios);
            
            stubs.length.should.equal(scenarios.length);
        });
    });
    
    describe("#buildStubFromScenario", function() {
        it("sets the stub name to the scenario name", function() {
            var scenario = givenFullScenario();
            
            var stub = scenarioMappings.buildStubFromScenario(scenario);
            
            stub.name.should.equal("test");
        });
        
        it("sets the mapping", function() {
            var scenario = givenFullScenario();
            
            var stub = scenarioMappings.buildStubFromScenario(scenario);
            
            should.exist(stub.mapping);
        });
    });
    
    describe("#buildMappingFromScenario", function() {
        it("sets the URL condition", function() {
            var scenario = givenMinimalScenario();
            
            var mapping = scenarioMappings.buildMappingFromScenario(scenario);
            
            mapping.request.urlPathPattern.should.equal("/test\\/?");
        });
        
        it("sets the scenario header", function() {
            var scenario = givenMinimalScenario();
            
            var mapping = scenarioMappings.buildMappingFromScenario(scenario);
            
            mapping.request.headers['Api-Scenario'].equalTo.should.equal('test');
        });
        
        it("sets scenario mapping headers", function() {
            var scenario = givenFullScenario();
            
            var mapping = scenarioMappings.buildMappingFromScenario(scenario);
            
            should.exist(mapping.request.headers['Content-Type']);
            should.exist(mapping.request.headers['Some-Header']);
            
            mapping.request.headers['Content-Type'].equalTo.should.equal('application/json');
            mapping.request.headers['Some-Header'].equalTo.should.equal('some value');
        });
        
        it("sets query parameters", function() {
            var scenario = givenFullScenario();
            
            var mapping = scenarioMappings.buildMappingFromScenario(scenario);
            
            should.exist(mapping.request.queryParameters['query']);
            should.exist(mapping.request.queryParameters['someParam']);
            
            mapping.request.queryParameters['query'].equalTo.should.equal('test+sheet');
            mapping.request.queryParameters['someParam'].equalTo.should.equal('someValue');
        });

        it("does not set query parameters when there are none", function() {
            var scenario = givenMinimalScenario();
            
            var mapping = scenarioMappings.buildMappingFromScenario(scenario);
            
            mapping.request.should.not.have.ownProperty('queryParameters');
        });

        it("does not set body when there isn't one", function() {
            var scenario = givenMinimalScenario();
            
            var mapping = scenarioMappings.buildMappingFromScenario(scenario);
            
            mapping.request.should.not.have.ownProperty('bodyPatterns');
        });

        it("sets the response", function() {
            var scenario = givenFullScenario();
            
            var mapping = scenarioMappings.buildMappingFromScenario(scenario);

            should.exist(mapping.response);
            
            mapping.response.status.should.equal(200);
            mapping.response.jsonBody.nestedValue.should.equal(123);
        });

        it("sets the request body", function() {
            var scenario = givenFullScenario();
            
            var mapping = scenarioMappings.buildMappingFromScenario(scenario);

            mapping.request.bodyPatterns.length.should.equal(1);
            
            var mappingBody = mapping.request.bodyPatterns[0];
            JSON.parse(mappingBody.equalToJson).someReqBody.should.equal(234);
            mappingBody.ignoreExtraElements.should.equal(false);
        });

        it("sets the request method", function() {
            var scenario = givenFullScenario();
            
            var mapping = scenarioMappings.buildMappingFromScenario(scenario);

            should.exist(mapping.request.method);
            mapping.request.method.should.equal('PUT');
        });
    });
});