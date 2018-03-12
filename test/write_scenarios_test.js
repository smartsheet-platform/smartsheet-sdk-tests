var should = require('should');

var scenarioWriter = require('../lib/write_scenarios.js');

describe('Write Scenarios Test', () => {
    beforeEach(() => {
        scenarioWriter.private.file.write = () => {};
    });

    describe('Invalid mode inputs', () => {
        it('Rejects invalid modes', () => {
            givenTargetFileMissing();

            let scenario = getValidInputScenario();
            (() => scenarioWriter.writeScenarios('Not a mode', scenario, 'target')).should.throw();
        });
    });

    describe('Overwrite mode', () => {
        it('Rejects duplicate input scenarios', () => {
            givenTargetFileMissing();
            
            let scenarios = getTwoScenariosWithSameName();
            (() => scenarioWriter.writeScenarios(
                scenarioWriter.MODE_OVERWRITE,
                scenario,
                'target')
            ).should.throw();
        });

        it('Writes the file if it is missing', () => {
            givenTargetFileMissing();

            let scenarios = getValidInputScenario();
            expectScenariosToBeWritten(scenarios, 'target');
            scenarioWriter.writeScenarios(scenarioWriter.MODE_OVERWRITE, scenarios, 'target');
        });

        it('Replaces the file if it exists', () => {
            let [scenarioA, scenarioB] = getTwoDifferentScenarios();

            givenTargetFileContainsScenarios([scenarioA]);
            expectScenariosToBeWritten([scenarioB], 'target');
            scenarioWriter.writeScenarios(scenarioWriter.MODE_OVERWRITE, [scenarioB], 'target');
        });

        it('Replaces the file even if it contains any of the input scenarios', () => {
            let [scenarioA, scenarioB] = getTwoScenariosWithSameName();

            givenTargetFileContainsScenarios([scenarioA]);
            expectScenariosToBeWritten([scenarioB], 'target');
            scenarioWriter.writeScenarios(scenarioWriter.MODE_OVERWRITE, [scenarioB], 'target');
        });
    });

    describe('Append mode', () => {
        it('Rejects duplicate input scenarios', () => {
            givenTargetFileMissing();
            
            let scenarios = getTwoScenariosWithSameName();
            (() => scenarioWriter.writeScenarios(
                scenarioWriter.MODE_APPEND,
                scenario,
                'target')
            ).should.throw();
        });

        it('Writes the file if it is missing', () => {
            givenTargetFileMissing();

            let scenarios = getValidInputScenario();
            expectScenariosToBeWritten(scenarios, 'target');
            scenarioWriter.writeScenarios(scenarioWriter.MODE_APPEND, scenarios, 'target');
        });

        it('Appends scenarios to the file if it exists', () => {
            let [scenarioA, scenarioB] = getTwoDifferentScenarios();

            givenTargetFileContainsScenarios([scenarioA]);
            expectScenariosToBeWritten([scenarioA, scenarioB], 'target');
            scenarioWriter.writeScenarios(scenarioWriter.MODE_APPEND, [scenarioB], 'target');
        });

        it('Rejects scenarios if they match any scenarios in the existing file', () => {
            let [scenarioA, scenarioB] = getTwoScenariosWithSameName();

            givenTargetFileContainsScenarios([scenarioA]);
            (() => scenarioWriter.writeScenarios(
                scenarioWriter.MODE_APPEND,
                [scenarioB],
                'target')
            ).should.throw();
        });
    });

    describe('Update mode', () => {
        it('Rejects duplicate input scenarios', () => {
            givenTargetFileMissing();
            
            let scenarios = getTwoScenariosWithSameName();
            (() => scenarioWriter.writeScenarios(
                scenarioWriter.MODE_UPDATE,
                scenario,
                'target')
            ).should.throw();
        });

        it('Writes the file if it is missing', () => {
            givenTargetFileMissing();

            let scenarios = getValidInputScenario();
            expectScenariosToBeWritten(scenarios, 'target');
            scenarioWriter.writeScenarios(scenarioWriter.MODE_UPDATE, scenarios, 'target');
        });

        it('Appends new scenarios to existing files', () => {
            let [scenarioA, scenarioB] = getTwoDifferentScenarios();

            givenTargetFileContainsScenarios([scenarioA]);
            expectScenariosToBeWritten([scenarioA, scenarioB], 'target');
            scenarioWriter.writeScenarios(scenarioWriter.MODE_UPDATE, [scenarioB], 'target');
        });

        it('Updates existing scenarios in existing files', () => {
            let [scenarioA, scenarioB] = getTwoScenariosWithSameName();

            givenTargetFileContainsScenarios([scenarioA]);
            expectScenariosToBeWritten([scenarioB], 'target');
            scenarioWriter.writeScenarios(scenarioWriter.MODE_UPDATE, [scenarioB], 'target');
        });
    });

    function getValidInputScenario() {
        return [{ scenario: 'x' }];
    }

    function getTwoDifferentScenarios() {
        return [{
            scenario: 'x',
            value: 1
        }, {
            scenario: 'y',
            value: 2
        }];
    }

    function getTwoScenariosWithSameName() {
        return [{
            scenario: 'x',
            value: 1
        }, {
            scenario: 'x',
            value: 2
        }];
    }

    function givenTargetFileMissing() {
        scenarioWriter.private.file.notPresent = () => true;
        scenarioWriter.private.file.toJson = () => { throw new Error('No target file'); }
    }

    function givenTargetFileContainsScenarios(scenarios) {
        scenarioWriter.private.file.notPresent = () => false;
        scenarioWriter.private.file.toJson = () => scenarios;
    }

    function expectScenariosToBeWritten(scenarios, file) {
        scenarioWriter.private.write = (inScenarios, inFile) => {
            inScenarios.should.equal(scenarios);
            inFile.should.equal(file);
        };
    }
});
