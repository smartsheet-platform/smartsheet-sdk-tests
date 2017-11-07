var fs = require('fs');
var _ = require('underscore');

var scenarioDefaults = require('./lib/scenario_defaults');

var argv = require('yargs')
    .alias('s', 'scenarios')
    .describe('s', 'Path of JSON scenarios file')
    .alias('d', 'defaults')
    .describe('d', 'Path of JSON defaults file')
    .alias('o', 'output')
    .describe('o', 'Path to output a new scenarios file with defaults. Outputs to STDOUT if not specified')
    .demandOption(['scenarios', 'defaults'])
    .argv;

var scenarios = JSON.parse(fs.readFileSync(argv.scenarios));
var defaults = JSON.parse(fs.readFileSync(argv.defaults));

var scenariosWithDefaults = scenarioDefaults.buildScenariosWithDefaults(scenarios, defaults);
var scenarioJson = JSON.stringify(scenariosWithDefaults, null, '  ');

if (_.isUndefined(argv.output)) {
    console.log(scenarioJson);
}
else {
    fs.writeFileSync(argv.output, scenarioJson);
}
