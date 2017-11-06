var fs = require('fs');
var _ = require('underscore');

var argv = require('yargs')
    .alias('s', 'scenarios')
    .describe('s', 'Directory containing scenarios')
    .alias('o', 'output')
    .describe('o', 'File to output concatenated files')
    .demandOption(['s', 'o'])
    .argv;


var scenarios = loadScenarios(argv.scenarios);
var flat_scenarios = _.flatten(scenarios, true);
fs.writeFileSync(argv.output, JSON.stringify(flat_scenarios));


function loadScenarios(scenarioDirectory) {
    scenarioFilenames = fs.readdirSync(scenarioDirectory);
    scenarioPaths = scenarioFilenames.map(fn => scenarioDirectory + '/' + fn);

    return scenarioPaths.map(path => JSON.parse(fs.readFileSync(path)));
}
