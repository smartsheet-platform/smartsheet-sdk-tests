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

                should.not.exist(scenario.response.headers);
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

            it("removes request headers obj if none exist after filter", function() {
                var scenario = givenScenarioWithRequestHeaders({"Api-Scenario": "123abc"});

                cleanPostmanScenario.cleanPostmanScenario(scenario);

                should.not.exist(scenario.request.headers);
            });
        });
    });

    describe("#warnAboutUncleanedIssues", function() {
        it("doesn't warn about clean scenarios", function() {
            var scenario = givenCleanScenario();

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            warnings.should.be.equal("");
        });

        it("warns about {{vars}} in url", function() {
            var scenario = givenScenarioWithUrlPath("/sheets/{{sheetId}}/rows/234");

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            assertContainsSubstring(warnings, "{{sheetId}}");
        });

        it("warns about {{vars}} at end of url", function() {
            var scenario = givenScenarioWithUrlPath("/sheets/{{sheetId}}");

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            assertContainsSubstring(warnings, "{{sheetId}}");
        });

        it("warns about multiple {{vars}} in url", function() {
            var scenario = givenScenarioWithUrlPath("/sheets/{{sheetId}}/rows/{{rowId}}/");

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            assertContainsSubstring(warnings, "{{sheetId}}");
            assertContainsSubstring(warnings, "{{rowId}}");
            assertNotContainsSubstring(warnings, "{{sheetId}}/");
        });

        it("warns about :vars in url", function() {
            var scenario = givenScenarioWithUrlPath("/sheets/:sheetId/rows/234");

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            assertContainsSubstring(warnings, ":sheetId");
        });

        it("warns about :vars at end of url", function() {
            var scenario = givenScenarioWithUrlPath("/sheets/:sheetId");

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            assertContainsSubstring(warnings, ":sheetId");
        });

        it("warns about multiple :vars in url", function() {
            var scenario = givenScenarioWithUrlPath("/sheets/:sheetId/rows/:rowId/");

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            assertContainsSubstring(warnings, ":sheetId");
            assertContainsSubstring(warnings, ":rowId");
            assertNotContainsSubstring(warnings, ":sheetId/");
        });

        it("warns about vars in request headers", function() {
            var scenario = givenScenarioWithRequestHeaders({
                "key": "value with {{var}}"
            });

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            assertContainsSubstring(warnings, "{{var}}");
        });

        it("warns about vars in request query params", function() {
            var scenario = givenScenarioWithRequestQueryParameters({
                "key": "value with {{var}}"
            });

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            assertContainsSubstring(warnings, "{{var}}");
        });

        it("warns about vars in request body", function() {
            var scenario = givenScenarioWithRequestBody({
                "field": {
                    "nestedField": "value with {{var}}"
                }
            });

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            assertContainsSubstring(warnings, "{{var}}");
        });

        it("warns about missing request body, when expected", function() {
            var scenario = givenScenarioWithRequestBody(undefined);

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            warnings.should.not.equal("");
        });

        it("doesn't warn about missing request body, when not expected", function() {
            var scenario = givenGetScenario();

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            warnings.should.equal("");
        });

        it("warns about missing response", function() {
            var scenario = givenScenarioWithResponse({});

            var warnings = captureStderr(() => cleanPostmanScenario.warnAboutUncleanedIssues(scenario));

            warnings.should.not.equal("");
        });

        function captureStderr(func) {
            var stderrOutput = ""

            var stderrWrite = process.stderr.write;
            process.stderr.write = (string, encoding, fd) => {stderrOutput += string;}

            func();

            process.stderr.write = stderrWrite;

            return stderrOutput;
        }
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

    function givenGetScenario() {
        var scenario = givenCleanScenario();
        scenario.request.method = "GET";
        delete scenario.request.body;

        return scenario;
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

    function givenScenarioWithRequestQueryParameters(params) {
        var scenario = givenCleanScenario();
        scenario.request.queryParameters = params;

        return scenario;
    }

    function givenScenarioWithRequestBody(body) {
        var scenario = givenCleanScenario();
        scenario.request.body = body;

        return scenario;
    }

    function givenScenarioWithResponseHeaders(headers) {
        var scenario = givenCleanScenario();
        scenario.response.headers = headers;

        return scenario;
    }

    function givenScenarioWithResponse(response) {
        var scenario = givenCleanScenario();
        scenario.response = response;

        return scenario;
    }

    function assertContainsSubstring(str, substr) {
        str.indexOf(substr).should.not.equal(-1, "expected '" + str + "' to contain '" + substr + "'");
    }

    function assertNotContainsSubstring(str, substr) {
        str.indexOf(substr).should.equal(-1, "expected '" + str + "' to not contain '" + substr + "'");
    }
});
