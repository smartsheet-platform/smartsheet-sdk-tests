var fs = require('fs');
var _ = require('underscore');

var postmanToScenario = require('./lib/postman_to_scenario');

var argv = require('yargs')
    .alias('c', 'collection')
    .describe('c', 'Path of an exported Postman collection, v2')
    .alias('o', 'output')
    .describe('o', 'Path to output a new scenarios file')
    .demandOption(['collection', 'output'])
    .argv;

var collection = JSON.parse(fs.readFileSync(argv.collection));

var scenarios = postmanToScenario.postmanCollectionToScenarios(collection);

var scenariosJson = JSON.stringify(scenarios, null, '  ');

fs.writeFileSync(argv.output, scenariosJson);

console.log('Success.\n');
console.log('Before generating a new package, please clean up the generated scenarios to ensure they do not have Postman variables, extra headers, and/or unsanitized data.');
