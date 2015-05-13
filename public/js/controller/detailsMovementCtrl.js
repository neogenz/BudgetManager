appBudgetManager.controller('detailsMovementCtrl',
    function ($scope, $modalInstance, movement) {

        $scope.movement = movement;

        $scope.ok = function () {
            $modalInstance.close();
        };
    }
);