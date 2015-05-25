appBudgetManager.controller('provisionalPlan.ctrl', function ($rootScope, $scope, $modal, provisionalPlanWebApi, provisionalPlanCalculus, scopeOperations) {

        $scope.provisionalPlan = null;

        $scope.confirmationMessage = "Êtes vous sur de vouloir supprimer ce plan prévisionnel ?";

        var provisionalPlanModalOpts = {
            templateUrl: 'views/partials/provisionalPlan.form', // Url du template HTML
            controller: 'provisionalPlan.add.ctrl',
            resolve: {
                provisionalPlan: function () {
                    return $scope.provisionalPlan;
                }
            }
        };

        var confirmActionModalOpts = {
            templateUrl: 'views/partials/action.confirm', // Url du template HTML
            controller: 'action.confirm.ctrl',
            resolve: {
                confirmationMessage: function () {
                    return $scope.confirmationMessage;
                }
            }
        };

        var refreshOne = function (id) {
            provisionalPlanWebApi.findProvisionalPlanById(id)
                .then(function (data) {
                    var nbProvisionalPlans = $scope.provisionalPlans.length;
                    for (var i = 0; i < nbProvisionalPlans; i++) {
                        var currentElement = $scope.provisionalPlans[i];
                        if (currentElement.id === data.id) {
                            scopeOperations.removeElementOfScope($scope.provisionalPlans, i);
                            scopeOperations.addElementToScope($scope.provisionalPlans, data, i);
                        }
                    }
                });
        };

        var refresh = function (provisionalPlanId) {
            if (provisionalPlanId === undefined || provisionalPlanId === null) {
                provisionalPlanWebApi.findAllProvisionalPlan()
                    .then(function (data) {
                        $scope.provisionalPlans = data;
                    });
            }
            else {
                refreshOne(provisionalPlanId);
            }

        };
        refresh();

        $scope.refresh = function (provisionalPlanId) {
            refresh(provisionalPlanId);
        };

        $scope.openProvisionalPlanModal = function (provisionalPlan) {
            if (provisionalPlan === null) {
                $scope.provisionalPlan = app.data.autocomplete.ProvisionalPlan()[0];
            } else {
                $scope.provisionalPlan = provisionalPlan;
            }
            var modalInstance = $modal.open(provisionalPlanModalOpts);
            modalInstance.result.then(function (provisionalPlan) {
                if (provisionalPlan.id === null) {
                    provisionalPlanWebApi.createProvisionalPlan(provisionalPlan).then(function () {
                        refresh();
                    }, function () {

                    });
                } else {
                    //$scope.provisionalPlan = provisionalPlan;
                    provisionalPlanWebApi.updateProvisionalPlan(provisionalPlan).then(function () {
                        refresh(provisionalPlan.id);
                    }, function () {

                    });
                }

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        $scope.deleteClickListener = function (provisionalPlan) {
            if (provisionalPlan === null) {
                return;
            }
            $scope.confirmationMessage = "Êtes vous sur de vouloir supprimer ce plan prévisionnel ?";
            var modalInstance = $modal.open(confirmActionModalOpts);
            modalInstance.result.then(function () {
                $scope.delete(provisionalPlan);
            }, function () {
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