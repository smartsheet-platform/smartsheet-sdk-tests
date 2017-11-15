var fs = require('fs');
var _ = require('underscore');

var postmanToScenario = require('./lib/postman_to_scenario');
var scenarioCleaner = require('./lib/clean_postman_scenario');

var argv = require('yargs')
    .alias('c', 'collection')
    .describe('c', 'Path of an exported Postman collection, v2')
    .alias('o', 'output')
    .describe('o', 'Path to output a new scenarios file')
    .demandOption(['collection', 'output'])
    .argv;

var collection = JSON.parse(fs.readFileSync(argv.collection));

console.log('');

var scenarios = postmanToScenario.postmanCollectionToScenarios(collection);
scenarioCleaner.cleanPostmanScenarios(scenarios);

var scenariosJson = JSON.stringify(scenarios, null, '  ');

fs.writeFileSync(argv.output, scenariosJson);

console.log('\nConversion completed successfully. Before using your scenario file, please address any warnings and/or remove any unsanitized data.');
