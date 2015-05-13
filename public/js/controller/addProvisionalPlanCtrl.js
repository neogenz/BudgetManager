appBudgetManager.controller('addProvisionalPlanCtrl',
    function ($scope, $modalInstance, provisionalPlan) {

        $scope.provisionalPlan = provisionalPlan;

        $scope.ok = function () {
            $modalInstance.close($scope.provisionalPlan);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("Ajout du plan prévisionel annulé");
        };
    }
);