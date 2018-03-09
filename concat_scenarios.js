var fs = require('fs');
var _ = require('underscore');
var arrayOperations = require('./lib/array_operations');

var argv = require('yargs')
    .alias('s', 'scenarios')
    .describe('s', 'Directory containing scenarios')
    .alias('o', 'output')
    .describe('o', 'File to output concatenated files')
    .demandOption(['s', 'o'])
    .argv;


var scenarios = loadScenarios(argv.scenarios);
var flat_scenarios = _.flatten(scenarios, true);
assertNoDuplicates(flat_scenarios);
fs.writeFileSync(argv.output, JSON.stringify(flat_scenarios, null, 2));


function loadScenarios(scenarioDirectory) {
    scenarioFilenames = fs.readdirSync(scenarioDirectory);
    scenarioPaths = scenarioFilenames.map(fn => scenarioDirectory + '/' + fn);

    return scenarioPaths.map(path => JSON.parse(fs.readFileSync(path)));
}

function assertNoDuplicates(scenarios) {
    var duplicates = arrayOperations.getDuplicateElements(scenarios, (s1, s2) => s1.scenario === s2.scenario);

    _.each(duplicates, (d) => console.log(`ERROR: Duplicate scenario: ${d.scenario}`));

    if (duplicates.length > 0) {
        console.log("Scenarios were not concatenated. Please fix scenarios and try again.");
        process.exit(1);
    }
}
