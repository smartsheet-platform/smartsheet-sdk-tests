var fs = require('fs');
var _ = require('underscore');
var colors = require('colors/safe');

var scenarioMappings = require('./lib/scenario_mappings');

var argv = require('yargs')
    .alias('s', 'scenarios')
    .describe('s', 'Path of JSON scenarios file')
    .alias('o', 'output_dir')
    .describe('o', 'Directory to wiremock mapping files')
    .demandOption(['scenarios', 'output_dir'])
    .argv;

var scenarios = JSON.parse(fs.readFileSync(argv.scenarios));

var wiremockStubs = scenarioMappings.buildStubsFromScenarios(scenarios);

_.each(wiremockStubs, function(stub) {
    fs.writeFile(argv.output_dir + stub.name + '.json', JSON.stringify(stub.mapping, null, 2), printResult(stub.name));
});

function printResult(name) {
    return function(error, result) {
        if (error) {
            var cross = colors.red("✗");
            console.log(cross + " " + name);
        }
        else {
            var check = colors.green("✓");
            console.log(check + " " + name);
        }
    };
}
