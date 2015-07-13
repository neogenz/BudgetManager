appBudgetManager.factory('scopeOperations', function () {

    return {
        addElementToScope: addElementToScope,
        removeElementOfScope: removeElementOfScope
    };

    function addElementToScope(scope, elementToAdd, indexWhereElementShouldInput) {
        scope.splice(indexWhereElementShouldInput, 0, elementToAdd);
    }

    function removeElementOfScope(scope, indexOfElementToRemove) {
        scope.splice(indexOfElementToRemove, 1);
    }
});