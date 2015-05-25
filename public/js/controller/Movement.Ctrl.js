appBudgetManager.controller('movement.ctrl', function ($scope, $modal, movementWebApi, provisionalPlanWebApi) {

        $scope.movementToSee = null;

        $scope.movementToWork = null;

        $scope.confirmationMessage = "Êtes vous sur de vouloir supprimer ce mouvement ?";

        $scope.inverseActiveStateClickListener = function (movement, success_callback) {
            inverseActiveState(movement, success_callback);
        };

        function inverseActiveState(movement, success_callback) {
            movement.active = !movement.active;
            movementWebApi.update(movement).then(function () {
                success_callback(movement.provisionalPlanId);
            }, function () {

            });
        }

        var confirmActionModalOpts = {
            templateUrl: 'views/partials/action.confirm', // Url du template HTML
            controller: 'action.confirm.ctrl',
            resolve: {
                confirmationMessage: function () {
                    return $scope.confirmationMessage;
                }
            }
        };

        $scope.deleteClickListener = function (movement, success_callback) {
            if (movement === null) {
                return;
            }
            $scope.confirmationMessage = "Êtes vous sur de vouloir supprimer ce mouvement ?";
            var modalInstance = $modal.open(confirmActionModalOpts);
            modalInstance.result.then(function () {
                $scope.delete(movement, success_callback);
            }, function () {
                console.log("Suppression annulé.");
            });
        };

        //delete is binded to $scope because delete is reserverd word in javascript
        $scope.delete = function (movement, success_callback) {
            movementWebApi.remove(movement).then(function () {
                success_callback(movement.provisionalPlanId);
            }, function () {

            });
        };

        var movementModalAddOrEditOpts = {
            templateUrl: 'views/partials/movement.form', // Url du template HTML
            controller: 'movement.add.ctrl',
            resolve: {
                provisionalPlan: function () {
                    return $scope.provisionalPlan;
                },
                movementToWork: function () {
                    return $scope.movementToWork;
                }
            }
        };

        $scope.modalToAddOrEditClickListener = function (provisionalPlan, movementToWork, success_callback) {
            $scope.provisionalPlan = provisionalPlan;
            if (movementToWork === null) {
                //Build new movement by default
                $scope.movementToWork = app.data.autocomplete.Movement()[0];
                //Assign to this movement the provisionalPlanId to add
                debugger;
                $scope.movementToWork.provisionalPlanId = provisionalPlan.id;
            } else {
                $scope.movementToWork = movementToWork;
            }
            openModal(success_callback);
        };

        function openModal(success_callback) {
            var modalInstance = $modal.open(movementModalAddOrEditOpts);
            modalInstance.result.then(function (movement) {
                $scope.movement = movement;
                if ($scope.movement.id === undefined || $scope.movement.id === null) {
                    provisionalPlanWebApi.addMovementToProvisionalPlan($scope.movementToWork)
                        .then(function () {
                            success_callback($scope.movementToWork.provisionalPlanId);
                        }, function (reason) {
                            throw new Error(reason);
                        });
                }
                else {
                    movementWebApi.update($scope.movementToWork).then(function () {
                        success_callback($scope.movementToWork.provisionalPlanId);
                    }, function (reason) {
                        throw new Error(reason);
                    });
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }

        var movementModalDetailsOpts = {
            templateUrl: 'views/partials/movement.details', // Url du template HTML
            controller: 'movement.details.ctrl',
            resolve: {
                movement: function () {
                    return $scope.movementToSee;
                }
            }
        };

        $scope.openMovementDetailsModal = function (movementToSee) {
            if (movementToSee === null) {
                console.error("The movement to see is null.");
            } else {
                $scope.movementToSee = movementToSee;
            }
            var modalInstance = $modal.open(movementModalDetailsOpts);
            modalInstance.result.then(function () {
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
    }
);