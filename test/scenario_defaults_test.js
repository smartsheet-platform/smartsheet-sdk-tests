var should = require('should');

var scenarioDefaults = require('../lib/scenario_defaults');


describe("Scenario Defaults Test", function () {
    function givenFullScenario() {
        return {
            "request": {
                "headers": {
                    "Content-Type": "application/json"
                }
            }
        };
    }

    function givenMinimalScenario() {
        return {
            "scenario": "test"
        };
    }

    function givenDefaultsWithNewHeader() {
        return {
            "request": {
                "headers": {
                    "Something-New": "used"
                }
            }
        };
    }

    function givenDefaultsWithContentType() {
        return {
            "request": {
                "headers": {
                    "Content-Type": "some type"
                }
            }
        };
    }

    function givenPrimativeDefaults() {
        return {
            "request": 123
        };
    }
    
    describe("#buildScenariosWithDefaults", function () {
        function givenFullScenarios(numScenarios) {
            var scenarios = [];
            for (var i = 0; i < numScenarios; i++) {
                scenarios.push(givenFullScenario());
            }
            
            return scenarios;
        }
        
        it("returns the same number of scenarios", function() {
            var scenarios = givenFullScenarios(10);
            
            var scenariosWithDefaults = scenarioDefaults.buildScenariosWithDefaults(scenarios, {});
            
            scenariosWithDefaults.length.should.equal(10);
        });

        it("returns scenarios that exist", function() {
            var scenarios = givenFullScenarios(10);
            
            var scenariosWithDefaults = scenarioDefaults.buildScenariosWithDefaults(scenarios, {});
            
            scenariosWithDefaults.should.matchEvery((s) => should.exist(s));
        });
    });
    
    describe("#buildScenarioWithDefaults", function() {
        it("uses defaults when value is not specified", function() {
            var scenario = givenFullScenario();
            var defaults = givenDefaultsWithNewHeader();

            var scenariosWithDefaults = scenarioDefaults.buildScenarioWithDefaults(scenario, defaults);

            should.exist(scenariosWithDefaults.request.headers['Something-New']);
            scenariosWithDefaults.request.headers['Something-New'].should.equal('used');
        });

        it("does not override existing values with defaults", function() {
            var scenario = givenFullScenario();
            var defaults = givenDefaultsWithContentType();

            var scenariosWithDefaults = scenarioDefaults.buildScenarioWithDefaults(scenario, defaults);

            scenariosWithDefaults.request.headers['Content-Type'].should.equal('application/json');
        });

        it("does not override when defaults are primative", function() {
            var scenario = givenFullScenario();
            var defaults = givenPrimativeDefaults();

            var scenariosWithDefaults = scenarioDefaults.buildScenarioWithDefaults(scenario, defaults);

            scenariosWithDefaults.request.should.not.equal(123);
        });

        it("adds headers when needed to specify default", function() {
            var scenario = givenMinimalScenario();
            var defaults = givenDefaultsWithContentType();

            var scenariosWithDefaults = scenarioDefaults.buildScenarioWithDefaults(scenario, defaults);

            should.exist(scenariosWithDefaults.request.headers);
            scenariosWithDefaults.request.headers['Content-Type'].should.equal('some type');
        });

        it("does not make changes when no defaults are provided", function() {
            var scenario = givenFullScenario();
            var defaults = {};

            var scenariosWithDefaults = scenarioDefaults.buildScenarioWithDefaults(scenario, defaults);

            scenariosWithDefaults.should.deepEqual(scenario);
        });
    });
});