appBudgetManager.controller('provisionalPlanCtrl', function ($scope, $modal, provisionalPlanWebApi, provisionalPlanCalculus) {

        $scope.provisionalPlan = null;

        $scope.confirmationMessage = "Êtes vous sur de vouloir supprimer ce plan prévisionnel ?";

        var provisionalPlanModalOpts = {
            templateUrl: 'views/partials/formProvisionalPlan', // Url du template HTML
            controller: 'addProvisionalPlanCtrl',
            resolve: {
                provisionalPlan: function () {
                    return $scope.provisionalPlan;
                }
            }
        };

        var confirmActionModalOpts = {
            templateUrl: 'views/partials/confirmAction', // Url du template HTML
            controller: 'confirmActionCtrl',
            resolve: {
                confirmationMessage: function () {
                    return $scope.confirmationMessage;
                }
            }
        };

        var refresh = function () {
            provisionalPlanWebApi.findAllProvisionalPlan()
                .then(function (data) {
                    $scope.provisionalPlans = data;
                });
        };
        refresh();

        $scope.refresh = function () {
            refresh();
        };

        $scope.openProvisionalPlanModal = function (provisionalPlan) {
            if (provisionalPlan === null) {
                $scope.provisionalPlan = new ProvisionalPlan();
            } else {
                $scope.provisionalPlan = provisionalPlan;
            }
            var modalInstance = $modal.open(provisionalPlanModalOpts);
            modalInstance.result.then(function (provisionalPlan) {
                $scope.provisionalPlan = provisionalPlan;
                provisionalPlanWebApi.updateOrCreateProvisionalPlan(provisionalPlan).then(function () {
                    refresh();
                }, function () {

                });
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        $scope.deleteClickListener = function (provisionalPlan) {
            if(provisionalPlan === null){
                return;
            }
            $scope.confirmationMessage = "Êtes vous sur de vouloir supprimer ce plan prévisionnel ?";
            var modalInstance = $modal.open(confirmActionModalOpts);
            modalInstance.result.then(function(){
                $scope.delete(provisionalPlan);
            }, function(){
               console.log("Suppression annulé.");
            });
        };

        $scope.delete = function (provisionalPlan) {
            provisionalPlanWebApi.deleteProvisionalPlan(provisionalPlan).then(function () {
                    refresh();
                },
                function (reason) {
                    console.log(reason);
                }
            );
        };

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