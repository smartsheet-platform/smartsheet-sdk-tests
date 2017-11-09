var _ = require('underscore');

exports.buildScenariosWithDefaults = buildScenariosWithDefaults;
exports.buildScenarioWithDefaults = buildScenarioWithDefaults;

function buildScenariosWithDefaults(scenarios, defaults) {
    var scenariosWithDefaults = [];
    
    _.each(scenarios, function (scenario) {
        scenariosWithDefaults.push(buildScenarioWithDefaults(scenario, defaults));
    });

    return scenariosWithDefaults;
}

function buildScenarioWithDefaults(scenario, defaults) {
    return _buildScenarioWithDefaults(scenario, defaults);
}

function _buildScenarioWithDefaults(scenario, defaults) {
    if (isPrimative(defaults)) {
        return scenario;
    }

    _.each(defaults, function (value, key) {
        if (scenario.hasOwnProperty(key)) {
            _buildScenarioWithDefaults(scenario[key], defaults[key]);
        }
    });

    return _.defaults(scenario, defaults);
}

function isPrimative(value) {
    return !_.isObject(value) || _.isArray(value);
}
