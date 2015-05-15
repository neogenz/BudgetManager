appBudgetManager.factory('scopeOperations', function () {

    return {
        addElementToScope: addElementToScope,
        removeElementOfScope: removeElementOfScope
    };

    function addElementToScope(scope, elementToAdd) {
        scope.splice(0, 0, elementToAdd);
    };

    function removeElementOfScope(scope, elementToRemove) {
        scope.splice(elementToRemove, 1);
    };
});