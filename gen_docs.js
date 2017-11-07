var fs = require('fs');
var _ = require('underscore');

var scenarioDocs = require('./lib/scenario_docs');

var argv = require('yargs')
    .alias('s', 'scenarios')
    .describe('s', 'Path of JSON scenarios file')
    .alias('o', 'output')
    .describe('o', 'Path to output docs file. Outputs to STDOUT if not specified')
    .demandOption(['scenarios'])
    .argv;

var scenarios = JSON.parse(fs.readFileSync(argv.scenarios));

var tableOfContents = scenarioDocs.buildTableOfContents(scenarios);
var docs = scenarioDocs.buildScenariosDocs(scenarios);

var fullDoc = tableOfContents + "\n\n" + docs;

if (_.isUndefined(argv.output)) {
    console.log(fullDoc);
}
else {
    fs.writeFileSync(argv.output, fullDoc);
}

