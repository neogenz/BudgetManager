appBudgetManager.controller('provisionalPlan.details.ctrl',
    function ($scope, provisionalPlan, provisionalPlanCalculus) {

        $scope.provisionalPlan = provisionalPlan;

        $scope.getTotalMovementsOf = function (provisionalPlan) {
            return provisionalPlanCalculus.getTotalMovementsOf(provisionalPlan);
        };

        $scope.getTotalMovementWithoutDownOf = function (provisionalPlan) {
            return provisionalPlanCalculus.getTotalMovementWithoutDownOf(provisionalPlan);
        };

        $scope.getTotalMovementWithoutUpOf = function (provisionalPlan) {
            return provisionalPlanCalculus.getTotalMovementWithoutUpOf(provisionalPlan);
        };
    }
);