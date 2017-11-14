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
    cleanResponseHeaders(scenario.response.headers);
}

function cleanRequest(request) {
    request.urlPath = cleanUrlPath(request.urlPath);
    cleanRequestHeaders(request.headers);
}

function cleanRequestHeaders(headers) {
    _.each(headers, function(value, key) {
        if (requestHeadersBlacklist.includes(key)) {
            delete headers[key];
        }
    });
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

function cleanResponseHeaders(headers) {
    _.each(headers, function(value, key) {
        if (!responseHeadersWhitelist.includes(key)) {
            delete headers[key];
        }
    });
}
