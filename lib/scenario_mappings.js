var _ = require('underscore');

exports.buildStubsFromScenarios = buildStubsFromScenarios;
exports.buildStubFromScenario = buildStubFromScenario;
exports.buildMappingFromScenario = buildMappingFromScenario;

function buildStubsFromScenarios(scenarios) {
    var stubs = [];
    _.each(scenarios, function (scenario) {
        stubs.push(buildStubFromScenario(scenario));
    });

    return stubs;
}

function buildStubFromScenario(scenario) {
    return {
        "name": scenario.scenario,
        "mapping": buildMappingFromScenario(scenario)
    };
}

function buildMappingFromScenario(scenario) {
    mapping = {};

    setMappingRequest(mapping, scenario);
    setMappingResponse(mapping, scenario);

    return mapping;
}

function setMappingResponse(mapping, scenario) {
    mapping.response = JSON.parse(JSON.stringify(scenario.response));
}

function setMappingRequest(mapping, scenario) {
    mapping.request = {};

    setUrlPathPattern(mapping.request, scenario);
    setMethod(mapping.request, scenario);
    setHeaders(mapping.request, scenario);
    
    if (scenario.request.hasOwnProperty('queryParameters')) {
        setMappingParams(mapping.request, scenario);
    }
    
    if (scenario.request.hasOwnProperty('body')) {
        setBody(mapping.request, scenario);
    }
}

function setUrlPathPattern(mappingRequest, scenario) {
    mappingRequest.urlPathPattern = scenario.request.urlPath + "\\/?";
}

function setMethod(mappingRequest, scenario) {
    mappingRequest.method = scenario.request.method;
}

function setMappingParams(mappingRequest, scenario) {
    mappingRequest.queryParameters = {};

    setEqualToConditions(mappingRequest.queryParameters, scenario.request.queryParameters);
}

function setBody(mappingRequest, scenario) {
    mappingRequest.bodyPatterns = [];

    mappingRequest.bodyPatterns.push({
        "equalToJson": JSON.stringify(scenario.request.body),
        "ignoreExtraElements": false,
        "ignoreArrayOrder": true
    });
}

function setHeaders(mappingRequest, scenario) {
    mappingRequest.headers = {};
    
    setScenarioHeader(mappingRequest.headers, scenario);
    setMappingHeaders(mappingRequest.headers, scenario);
}

function setScenarioHeader(mappingHeaders, scenario) {
    mappingHeaders['Api-Scenario'] = buildEqualToCondition(scenario.scenario);
}

function setMappingHeaders(mappingHeaders, scenario) {
    setEqualToConditions(mappingHeaders, scenario.request.headers);
}

function setEqualToConditions(destination, source) {
    _.each(source, function(value, key) {
        destination[key] = buildEqualToCondition(value);
    });
}

function buildEqualToCondition(value) {
    return {
        "equalTo": value
    };
}