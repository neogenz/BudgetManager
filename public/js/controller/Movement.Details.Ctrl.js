appBudgetManager.controller('movement.details.ctrl',
    function ($scope, $modalInstance, movement) {

        $scope.movement = movement;

        $scope.ok = function () {
            $modalInstance.close();
        };
    }
);