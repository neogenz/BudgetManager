appBudgetManager.controller('addMovementCtrl',
    function ($scope, $modalInstance, provisionalPlan, movementToWork) {

        $scope.provisionalPlan = provisionalPlan;

        $scope.movement = movementToWork;

        $scope.ok = function () {
            $modalInstance.close($scope.movement);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("Ajout du mouvement annulé");
        };
    }
);




