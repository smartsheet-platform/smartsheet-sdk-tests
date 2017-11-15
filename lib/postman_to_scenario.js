var _ = require('underscore');

exports.postmanCollectionToScenarios = postmanCollectionToScenarios;
exports.postmanItemToScenario = postmanItemToScenario;


function postmanCollectionToScenarios(collection) {
    return postmanItemsToScenarios(collection.item);
}

function postmanItemsToScenarios(items) {
    var scenarios = [];
    _.each(items, function(itemOrFolder) {
        scenarios = scenarios.concat(postmanItemOrFolderToScenarios(itemOrFolder));
    });

    return scenarios;
}

function postmanItemOrFolderToScenarios(itemOrFolder) {
    if (isFolder(itemOrFolder)) {
        return postmanItemsToScenarios(itemOrFolder.item);
    }

    return [postmanItemToScenario(itemOrFolder)];
}

function isFolder(itemOrFolder) {return itemOrFolder.hasOwnProperty('item');}

function postmanItemToScenario(item) {
    var scenario = {};

    scenario.scenario = item.name;
    scenario.description = item.request.description;
    scenario.request = postmanRequestToScenarioRequest(item.request);
    scenario.response = postmanResponsesToScenarioResponse(item.response);

    return scenario;
}

function postmanRequestToScenarioRequest(postmanRequest) {
    if (_.isString(postmanRequest)) {
        return postmanRequestStrToScenarioRequest(postmanRequest);
    }

    return postmanRequestObjToScenarioRequest(postmanRequest);
}

function postmanRequestStrToScenarioRequest(postmanRequestStr) {
    var scenarioRequest = {};

    scenarioRequest.method = "GET";
    scenarioRequest.urlPath = postmanRequestStr;

    return scenarioRequest;
}

function postmanRequestObjToScenarioRequest(postmanRequest) {
    var scenarioRequest = {};

    scenarioRequest.method = postmanRequest.method;
    scenarioRequest.urlPath = postmanUrlToUrlPath(postmanRequest.url);

    if (!_.isEmpty(postmanRequest.header)) {
        scenarioRequest.headers = keyValueListToObj(postmanRequest.header);
    }

    if (!_.isEmpty(postmanRequest.url.query)) {
        scenarioRequest.queryParameters = keyValueListToObj(postmanRequest.url.query);
    }

    if (!_.isEmpty(postmanRequest.body)) {
        scenarioRequest.body = postmanBodyToBody(postmanRequest.body);
    }

    return scenarioRequest;
}

function postmanUrlToUrlPath(url) {
    var rawUrl;
    if (_.isString(url)) {
        rawUrl = url;
    }

    if (url.hasOwnProperty('raw')) {
        rawUrl = url.raw;
    }

    return removeQueryParamsFromUrl(rawUrl);
}

function removeQueryParamsFromUrl(url) {
    var queryParamIndex = url.indexOf("?");

    if (queryParamIndex == -1) {
        return url;
    }

    return url.slice(0, queryParamIndex);
}

function postmanBodyToBody(postmanBody) {
    if (postmanBody.mode !== "raw") {
        console.log("WARNING: request bodies must be specified as raw JSON. Ignoring.");
        return undefined;
    }

    return JSON.parse(postmanBody.raw);
}

function postmanResponsesToScenarioResponse(responses) {
    if (_.isEmpty(responses)) {
        return {};
    }

    if (responses.length > 1) {
        console.log("WARNING: multiple responses. Using first.");
    }

    return postmanResponseToScenarioResponse(responses[0]);
}

function postmanResponseToScenarioResponse(postmanResponse) {
    var scenarioResponse = {};

    scenarioResponse.statusMessage = postmanResponse.status;
    scenarioResponse.status = postmanResponse.code;
    scenarioResponse.jsonBody = JSON.parse(postmanResponse.body);

    if (!_.isEmpty(postmanResponse.header)) {
        scenarioResponse.headers = keyValueListToObj(postmanResponse.header);
    }

    return scenarioResponse;
}

function keyValueListToObj(keyValueList) {
    return keyValueList.reduce(function (obj, keyValuePair) {
        obj[keyValuePair.key] = keyValuePair.value;

        return obj;
    }, {});
}
