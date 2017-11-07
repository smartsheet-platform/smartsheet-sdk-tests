var _ = require('underscore');

exports.buildScenariosDocs = buildScenariosDocs;
exports.buildScenarioDoc = buildScenarioDoc;
exports.buildTableOfContents = buildTableOfContents;

function buildTableOfContents(scenarios) {
    var tableOfContents = scenarios.map((s) => "* " + buildLink(s.scenario));

    return tableOfContents.join("\n")
}

function buildScenariosDocs(scenarios) {
    var scenariosDocs = [];
    
    _.each(scenarios, function (scenario) {
        scenariosDocs.push(buildScenarioDoc(scenario));
    });

    return scenariosDocs.join("\n\n");
}

function buildScenarioDoc(scenario) {
    var doc = [];

    addTitle(doc, scenario);
    addDescription(doc, scenario);
    addRequest(doc, scenario);
    addResponse(doc, scenario);

    return doc.join("\n\n");
}

function addTitle(doc, scenario) {
    addHeader(doc, 2, scenario.scenario);
}

function addDescription(doc, scenario) {
    doc.push(scenario.description);
}

function addRequest(doc, scenario) {
    addHeader(doc, 3, "Expected Request");
    addRequestMethod(doc, scenario);
    
    if (scenario.request.hasOwnProperty('headers')) {
        addHeaders(doc, scenario);
    }

    if (scenario.request.hasOwnProperty('queryParameters')) {
        addQueryParameters(doc, scenario);
    }

    if (scenario.request.hasOwnProperty('body')) {
        addRequestBody(doc, scenario);
    }
}

function addRequestMethod(doc, scenario) {
    addHeader(doc, 4, scenario.request.method + " - " + scenario.request.urlPath);
}

function addHeaders(doc, scenario) {
    addHeader(doc, 4, "Headers");
    addKeyValueList(doc, scenario.request.headers);
}

function addQueryParameters(doc, scenario) {
    addHeader(doc, 4, "Query Parameters");
    addKeyValueList(doc, scenario.request.queryParameters);
}

function addRequestBody(doc, scenario) {
    addHeader(doc, 4, "Body");
    addJson(doc, scenario.request.body);
}

function addResponse(doc, scenario) {
    addHeader(doc, 3, "Response");
    addResponseStatus(doc, scenario);
    addResponseBody(doc, scenario);
}

function addResponseStatus(doc, scenario) {
    addHeader(doc, 4, "Status - " + scenario.response.status + " " + scenario.response.statusMessage);
}

function addResponseBody(doc, scenario) {
    addJson(doc, scenario.response.jsonBody);
}

function addJson(doc, obj) {
    doc.push(buildJson(obj));
}

function buildLink(header) {
    var linkToHeader = header.replace(/\s+/g, "-").toLowerCase();
    return "[" + header + "](#" + linkToHeader + ")";
}

function buildJson(obj) {
    return "```json\n" +
        JSON.stringify(obj, null, '  ') +
        "\n```";
}

function addKeyValueList(doc, obj) {
    var keyValueList = []

    _.each(obj, function(value, key) {
        keyValueList.push("* " + key + ": " + value);
    });

    doc.push(keyValueList.join("\n"));
}

function addHeader(doc, size, text) {
    doc.push(buildHeader(size, text));
}

function buildHeader(size, text) {
    return "#".repeat(size) + " " + text;
}
