var _ = require('underscore');

exports.cleanPostmanScenarios = cleanPostmanScenarios;
exports.cleanPostmanScenario = cleanPostmanScenario;

let requestHeadersBlacklist = ["Authorization", "Api-Scenario"];
let responseHeadersWhitelist = ["Content-Type"];

function cleanPostmanScenarios(scenarios) {
    scenarios.map(s => cleanPostmanScenario(s));
}

function cleanPostmanScenario(scenario) {
    cleanRequest(scenario.request);
    cleanResponseHeaders(scenario.response);
    warnAboutUncleanedIssues(scenario);
}

function cleanRequest(request) {
    request.urlPath = cleanUrlPath(request.urlPath);
    cleanRequestHeaders(request);
}

function cleanRequestHeaders(request) {
    _.each(request.headers, function(value, key) {
        if (requestHeadersBlacklist.includes(key)) {
            delete request.headers[key];
        }
    });

    if (_.isEmpty(request.headers)) {
        delete request.headers;
    }
}

function cleanUrlPath(urlPath) {
    var cleanedUrlPath = urlPath;

    cleanedUrlPath = removeLeadingVars(cleanedUrlPath);
    cleanedUrlPath = removeVersionPrefix(cleanedUrlPath);

    return cleanedUrlPath
}

function removeLeadingVars(urlPath) {
    return urlPath.replace(/^{{[^{}]+}}/, "");
}

function removeVersionPrefix(urlPath) {
    var version = "2.0";
    var versionIndex = urlPath.indexOf(version);

    if (versionIndex == -1) {
        return urlPath;
    }

    return urlPath.slice(versionIndex + version.length);
}

function cleanResponseHeaders(response) {
    _.each(response.headers, function(value, key) {
        if (!responseHeadersWhitelist.includes(key)) {
            delete response.headers[key];
        }
    });

    if (_.isEmpty(response.headers)) {
        delete response.headers;
    }
}

function warnAboutUncleanedIssues(scenario) {
    warnAboutRequest(scenario.scenario, scenario.request);
    warnAboutResponse(scenario.scenario, scenario.response);
}

function warnAboutRequest(scenarioName, request) {
    warnAboutPostmanVariables(scenarioName, request.urlPath);
    warnAboutNestedPostmanVariables(scenarioName, request.queryParameters);
    warnAboutNestedPostmanVariables(scenarioName, request.headers);
    warnAboutNestedPostmanVariables(scenarioName, request.body);
}

function warnAboutNestedPostmanVariables(scenarioName, obj) {
    if (_.isString(obj)) {
        warnAboutPostmanVariables(obj);
    }
    else if (_.isArray(obj)) {
        _.each(obj, (e) => warnAboutNestedPostmanVariables(e));
    }
    else if (_.isObject(obj)) {
        _.each(obj, (k, v) => warnAboutNestedPostmanVariables(v));
    }
}

function warnAboutResponse(scenarioName, response) {
    if (_.isEmpty(response)) {
        uncleanWarning(scenarioName, "has no response.");
    }
}

function warnAboutPostmanVariables(scenarioName, str) {
    var postmanVars = str.match(/{{[^{}]+}}/g);
    var postmanParamVars = str.match(/:[^{}\/]+\//g);
    _.each(postmanVars, (v) => uncleanWarning(scenarioName, "uses Postman variable, '" + v + "'"));
    _.each(postmanParamVars, (v) => uncleanWarning(scenarioName, "uses Postman variable, '" + v.slice(0, -1) + "'"));
}

function uncleanWarning(scenarioName, message) {
    console.warn("WARNING: Scenario '" + scenarioName + "': " + message)
}
