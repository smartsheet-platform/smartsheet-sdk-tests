var _ = require('underscore');

exports.getDuplicateElements = getDuplicateElements;

function getDuplicateElements(arr, key) {
    var duplicateElements = [];
    _.each(arr, (element, index) => {
        if (arrContains(arr.slice(index + 1), element, key) && !arrContains(duplicateElements, element, key)) {
            duplicateElements.push(element);
        }
    });

    return duplicateElements;
}

function arrContains(arr, element, key) {
    return arr.findIndex((e) => key(element, e)) !== -1;
}
