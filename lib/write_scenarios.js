const fs = require('fs');
const _ = require('underscore');
const arrayOps = require('./array_operations')

const MODE_APPEND = 'append';
const MODE_OVERWRITE = 'overwrite';
const MODE_UPDATE = 'update';

const MODES = [MODE_APPEND, MODE_OVERWRITE, MODE_UPDATE];

const modeSelector = {};
modeSelector[MODE_APPEND] = append;
modeSelector[MODE_OVERWRITE] = overwrite;
modeSelector[MODE_UPDATE] = update;

function writeScenarios(mode, newScenarios, targetFile) {
    let write = modeSelector[mode];

    if (!write) {
        throw new Error(`Unknown mode ${mode}; valid modes:\n\t${JSON.stringify(MODES)}\n`);
    }

    write(newScenarios, targetFile);
}

function overwrite(newScenarios, targetFile) {
    verifyNoDuplicateScenarios(
        newScenarios,
        'The collection file has duplicate scenarios',
        'Remove duplicates from the collection and resubmit.');

    file.write(newScenarios, targetFile);
}

function append(newScenarios, targetFile) {
    if (file.notPresent(targetFile)) {
        //No file to append to; just 'overwrite'
        overwrite(newScenarios, targetFile);
        return;
    }

    let currentScenarios = file.toJson(targetFile);
    let allScenarios = currentScenarios.concat(newScenarios);

    verifyNoDuplicateScenarios(
        allScenarios,
        'Appending this collection to the existing scenarios will create duplicate scenario names',
        'To resolve, either:' +
            '\n\ta. Edit either the existing or new scenario file to remove duplicates' +
            '\n\tb. Use update mode to automatically replace conflicting scenarios with new ones' +
            '\n\tc. Use overwrite mode to fully replace the old scenario file with the new one');

    file.write(allScenarios, targetFile);
}

function update(newScenarios, targetFile) {
    if (file.notPresent(targetFile)) {
        //No file to update; just 'overwrite'
        overwrite(newScenarios, targetFile);
        return;
    }

    verifyNoDuplicateScenarios(
        newScenarios,
        'The collection file has duplicate scenarios',
        'Remove duplicates from the collection and resubmit.');

    let currentScenarios = file.toJson(targetFile);
    let currentScenariosByName = _.indexBy(currentScenarios, 'scenario');
    let newScenariosByName = _.indexBy(newScenarios, 'scenario');
    let updatedScenariosByName = Object.assign(currentScenariosByName, newScenariosByName);
    let updatedScenarios = _.values(updatedScenariosByName);

    file.write(updatedScenarios, targetFile);
}

function verifyNoDuplicateScenarios(scenarios, cause, recommendation) {
    let scenarioNames = _.pluck(scenarios, 'scenario');
    let duplicateScenarioNames = arrayOps.getDuplicateElements(scenarioNames, (x, y) => x === y);

    if (duplicateScenarioNames.length === 0) return;
    
    let duplicateNamesString = JSON.stringify(duplicateScenarioNames);

    throw new Error(`${cause}:\n\t${duplicateNamesString}\n${recommendation}\n`);
}

const file = {
    notPresent: f => !fs.existsSync(f),
    toJson: f => JSON.parse(fs.readFileSync(f)),
    write: function(scenarios, f) {
        let output = JSON.stringify(scenarios, null, '  ');
        fs.writeFileSync(f, output);
    }
}

exports.writeScenarios = writeScenarios;
exports.MODES = MODES;
exports.MODE_APPEND = MODE_APPEND;
exports.MODE_OVERWRITE = MODE_OVERWRITE;
exports.MODE_UPDATE = MODE_UPDATE;
exports.private = { file };