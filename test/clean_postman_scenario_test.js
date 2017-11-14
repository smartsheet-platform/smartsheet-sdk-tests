var should = require('should');

var cleanPostmanScenario = require('../lib/clean_postman_scenario');


describe("Clean Postman Scenario Test", function () {
    describe("#cleanPostmanScenarios", function () {
        it("returns the correct number of scenarios", function() {
            var scenarios = givenScenarios(10);

            cleanPostmanScenario.cleanPostmanScenarios(scenarios);

            scenarios.length.should.equal(10);
        });

        function givenScenarios(numScenarios) {
            var scenarios = [];
            for(var i = 0; i < numScenarios; i++) {
                scenarios.push(givenCleanScenario());
            }

            return scenarios;
        }
    });

    describe("#cleanPostmanScenario", function() {
        it("doesn't modify clean scenarios", function() {
            var scenario = givenCleanScenario();

            cleanPostmanScenario.cleanPostmanScenario(scenario);

            scenario.should.deepEqual(givenCleanScenario());
        });

        describe("URL", function() {
            it("removes base url variables", function() {
                var scenario = givenScenarioWithUrlPath("{{api-url}}/sheets/123/rows/234");

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.request.urlPath.should.equal("/sheets/123/rows/234");
            });

            it("removes base host variables and 2.0 prefix", function() {
                var scenario = givenScenarioWithUrlPath("{{api-url}}/2.0/sheets/123/rows/234");

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.request.urlPath.should.equal("/sheets/123/rows/234");
            });

            it("removes base host variables and 2.0 prefix without slash", function() {
                var scenario = givenScenarioWithUrlPath("{{api-url}}2.0/sheets/123/rows/234");

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.request.urlPath.should.equal("/sheets/123/rows/234");
            });

            it("removes host and 2.0 prefix", function() {
                var scenario = givenScenarioWithUrlPath("http://api.smartsheet.com/2.0/sheets/123/rows/234");

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.request.urlPath.should.equal("/sheets/123/rows/234");
            });

            it("doesn't remove extra 2.0's", function() {
                var scenario = givenScenarioWithUrlPath("2.0/sheets/2.0/rows/234");

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.request.urlPath.should.equal("/sheets/2.0/rows/234");
            });

            it("doesn't modify clean URLs", function() {
                var scenario = givenScenarioWithUrlPath("/sheets/123/rows/234");

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.request.urlPath.should.equal("/sheets/123/rows/234");
            });

            it("doesn't remove non-prefix, variables", function() {
                var scenario = givenScenarioWithUrlPath("/sheets/{{sheet-id}}/rows/:row_id");

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.request.urlPath.should.equal("/sheets/{{sheet-id}}/rows/:row_id");
            });
        });

        describe("Headers", function() {
            it("doesn't change scenarios with no request headers", function() {
                var scenario = givenScenarioWithRequestHeaders(undefined);

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                should.not.exist(scenario.request.headers);
            });

            it("doesn't change scenarios with no response headers", function() {
                var scenario = givenScenarioWithResponseHeaders(undefined);

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                should.not.exist(scenario.response.headers);
            });

            it("removes all non-'Content-Type' response headers", function() {
                var scenario = givenScenarioWithResponseHeaders({"some-header": 123, "something-else": 234});

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.response.headers.should.deepEqual({});
            });

            it("does not remove 'Content-Type' response header", function() {
                var scenario = givenScenarioWithResponseHeaders({"some-header": 123, "something-else": 234, "Content-Type": "application/json"});

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.response.headers.should.deepEqual({"Content-Type": "application/json"});
            });

            it("removes 'Authorization' request header", function() {
                var scenario = givenScenarioWithRequestHeaders({"Authorization": "Bearer 123abc", "Some-Header": "application/json"});

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.request.headers.should.deepEqual({"Some-Header": "application/json"});
            });

            it("removes 'Api-Scenario' request header", function() {
                var scenario = givenScenarioWithRequestHeaders({"Api-Scenario": "123abc", "Some-Header": "application/json"});

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.request.headers.should.deepEqual({"Some-Header": "application/json"});
            });

            it("doesn't remove non-blacklisted request headers", function() {
                var scenario = givenScenarioWithRequestHeaders({"some-header": 123, "something-else": 234, "Content-Type": "application/json"});

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                scenario.request.headers.should.deepEqual({"some-header": 123, "something-else": 234, "Content-Type": "application/json"});
            });
        });
    });

    function givenCleanScenario() {
        return {
            "scenario": "Clean Scenario",
            "description": "Some description. I don't need cleaning.",
            "request": {
                "method": "POST",
                "urlPath": "/sheets/123/rows/234",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": {}
            },
            "response": {
                "headers": {
                    "Content-Type": "application/json"
                },
                "jsonBody": {}
            }
        };
    }

    function givenScenarioWithUrlPath(urlPath) {
        var scenario = givenCleanScenario();
        scenario.request.urlPath = urlPath;

        return scenario;
    }

    function givenScenarioWithRequestHeaders(headers) {
        var scenario = givenCleanScenario();
        scenario.request.headers = headers;

        return scenario;
    }

    function givenScenarioWithResponseHeaders(headers) {
        var scenario = givenCleanScenario();
        scenario.response.headers = headers;

        return scenario;
    }
});
