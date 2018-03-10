const fs = require('fs');
const _ = require('underscore');
const arrayOps = require('./array_operations')

const MODE_OVERWRITE = 'overwrite';
const MODE_APPEND = 'append';
const MODE_UPDATE = 'update';

const MODES = [MODE_OVERWRITE, MODE_APPEND, MODE_UPDATE];

const modeSelector = {};
modeSelector[MODE_OVERWRITE] = overwrite;
modeSelector[MODE_APPEND] = append;
modeSelector[MODE_UPDATE] = update;

function writeScenarios(mode, newScenarios, targetFile) {
    let write = modeSelector[mode];
    write(newScenarios, targetFile);
}

function overwrite(newScenarios, targetFile) {
    verifyNoDuplicateScenarios(
        newScenarios,
        'The collection file has duplicate scenarios',
        'Remove duplicates from the collection and resubmit.');

    writeToFile(newScenarios, targetFile);
}

function append(newScenarios, targetFile) {
    if (!fs.existsSync(targetFile)) {
        //No file to append to; just 'overwrite'
        overwrite(newScenarios, targetFile);
        return;
    }

    let currentScenarios = jsonFromFile(targetFile);
    let allScenarios = currentScenarios.concat(newScenarios);

    verifyNoDuplicateScenarios(
        allScenarios,
        'Appending this collection to the existing scenarios will create duplicate scenario names',
        'To resolve, either:' +
            '\n\ta. Edit either the existing or new scenario file to remove duplicates' +
            '\n\tb. Use update mode to automatically replace conflicting scenarios with new ones' +
            '\n\tc. Use overwrite mode to fully replace the old scenario file with the new one');

    writeToFile(allScenarios, targetFile);
}

function update(newScenarios, targetFile) {
    if (!fs.existsSync(targetFile)) {
        //No file to update; just 'overwrite'
        overwrite(newScenarios, targetFile);
        return;
    }

    verifyNoDuplicateScenarios(
        newScenarios,
        'The collection file has duplicate scenarios',
        'Remove duplicates from the collection and resubmit.');

    let currentScenarios = jsonFromFile(targetFile);
    let currentScenariosByName = _.indexBy(currentScenarios, 'scenario');
    let newScenariosByName = _.indexBy(newScenarios, 'scenario');
    let updatedScenariosByName = Object.assign(currentScenariosByName, newScenariosByName);
    let updatedScenarios = _.values(updatedScenariosByName);

    writeToFile(updatedScenarios, targetFile);
}

function verifyNoDuplicateScenarios(scenarios, cause, recommendation) {
    let scenarioNames = _.pluck(scenarios, 'scenario');
    let duplicateScenarioNames = arrayOps.getDuplicateElements(scenarioNames, (x, y) => x === y);

    if (duplicateScenarioNames.length === 0) return;
    
    let duplicateNamesString = JSON.stringify(duplicateScenarioNames);

    console.error(`${cause}:\n\t${duplicateNamesString}\n${recommendation}`);
    
    process.exit(1);
}

const jsonFromFile = (file) => JSON.parse(fs.readFileSync(file));

function writeToFile(scenarios, targetFile) {
    let output = JSON.stringify(scenarios, null, '  ');
    fs.writeFileSync(targetFile, output);
}

exports.writeScenarios = writeScenarios;
exports.MODES = MODES;
exports.MODE_OVERWRITE = MODE_OVERWRITE;
exports.MODE_APPEND = MODE_APPEND;
exports.MODE_UPDATE = MODE_UPDATE;