var should = require('should');

var arrayOperations = require('../lib/array_operations');


describe("Array Operations Test", function () {
    describe("#getDuplicateElements", function () {
        it("should return an empty list when there aren't duplicates", function () {
            var elementsArr = givenUniqueArray();
            var key = givenKey();

            var duplicates = arrayOperations.getDuplicateElements(elementsArr, key);

            duplicates.should.be.empty();
        });

        it("should return a list with duplicates when there are duplicates", function () {
            var elementsArr = givenNonUniqueArray();
            var key = givenKey();

            var duplicates = arrayOperations.getDuplicateElements(elementsArr, key);

            duplicates.should.not.be.empty();
        });

        it("should return one instance of each duplicate", function () {
            var elementsArr = givenAnArrayWithTwoDuplicates();
            var key = givenKey();

            var duplicates = arrayOperations.getDuplicateElements(elementsArr, key);

            duplicates.length.should.equal(2, "should return one duplicate per duplicate pair");
        });

        it("should return one instance of each duplicate, with duplicate triplets", function () {
            var elementsArr = givenAnArrayWithDuplicateTriplets();
            var key = givenKey();

            var duplicates = arrayOperations.getDuplicateElements(elementsArr, key);

            duplicates.length.should.equal(1, "should return one duplicate per duplicate triplet");
        });

        it("should return an empty list when given an empty list", function () {
            var elementsArr = [];
            var key = givenKey();

            var duplicates = arrayOperations.getDuplicateElements(elementsArr, key);

            duplicates.should.be.empty();
        });

        function givenKey() {
            return (e1, e2) => e1.x === e2.x;
        }

        function givenNonUniqueArray() {
            return givenAnArrayWithTwoDuplicates();
        }

        function givenAnArrayWithTwoDuplicates() {
            var arr = givenUniqueArray();

            return arr.concat([arr[0], arr[1]]);
        }

        function givenAnArrayWithDuplicateTriplets() {
            var arr = givenUniqueArray();

            return arr.concat([arr[0], arr[0]]);
        }

        function givenUniqueArray() {
            return [
                {x: "12", y: 12},
                {x: "13", y: 13},
                {x: "14", y: 14},
                {x: "15", y: 15},
                {x: "16", y: 16}
            ];
        }
    });
});
