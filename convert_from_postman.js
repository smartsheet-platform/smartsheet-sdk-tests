var fs = require('fs');
var _ = require('underscore');

var postmanToScenario = require('./lib/postman_to_scenario');
var scenarioCleaner = require('./lib/clean_postman_scenario');
var scenarioWriter = require('./lib/write_scenarios')

var argv = require('yargs')
    .alias('c', 'collection')
    .describe('c', 'Path of an exported Postman collection, v2')
    .alias('o', 'output')
    .describe('o', 'Path of the output scenarios file')
    .alias('m', 'mode')
    .describe('m', 'Write mode: overwrite the scenarios file, append to it (failing if any scenarios already exist),' +
                   ' or create + update existing scenarios in the file')
    .choices('m', scenarioWriter.MODES)
    .default('m', scenarioWriter.MODE_APPEND)
    .demandOption(['collection', 'output'])
    .argv;

var collection = JSON.parse(fs.readFileSync(argv.collection));

console.log('');

var scenarios = postmanToScenario.postmanCollectionToScenarios(collection);
scenarioCleaner.cleanPostmanScenarios(scenarios);

scenarioWriter.writeScenarios(argv.mode, scenarios, argv.output);

console.log('\nConversion completed successfully. Before using your scenario file, please address any warnings and/or remove any unsanitized data.');
