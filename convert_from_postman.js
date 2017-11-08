var fs = require('fs');
var _ = require('underscore');

var postmanToScenario = require('./lib/postman_to_scenario');

var argv = require('yargs')
    .alias('c', 'collection')
    .describe('c', 'Path of an exported Postman collection, v2')
    .alias('o', 'output')
    .describe('o', 'Path to output a new scenarios file. Outputs to STDOUT if not specified')
    .demandOption(['collection'])
    .argv;

var collection = JSON.parse(fs.readFileSync(argv.collection));

var scenarios = postmanToScenario.postmanCollectionToScenarios(collection);

var scenariosJson = JSON.stringify(scenarios, null, '  ');

if (_.isUndefined(argv.output)) {
    console.log(scenariosJson);
}
else {
    fs.writeFileSync(argv.output, scenariosJson);
}
