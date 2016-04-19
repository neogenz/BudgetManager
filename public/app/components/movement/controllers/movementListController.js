
/**
 * @desc Controllers of BudgetManager
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .controller('movementListController', MovementController);

    MovementController.$inject = ['$scope', '$modal', 'movementWebApi', 'provisionalPlanWebApi'];

    /**
     * @desc Controllers of Movements
     * @namespace MovementController
     * @memberOf Controllers
     */
    function MovementController($scope, $modal, movementWebApi, provisionalPlanWebApi) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.MovementController
         */
        function defineScope() {
            $scope.movementToSee = null;

            $scope.movementToWork = null;

            $scope.confirmationMessage = 'Êtes vous sur de vouloir supprimer ce mouvement ?';
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.MovementController
         */
        function defineListeners() {
            $scope.inverseActiveStateClickListener = _inverseActiveState;
            $scope.openMovementDetailsModalClickListener = _openMovementDetailsModal;
            $scope.deleteClickListener = _openModalToConfirmDelete;
            $scope.modalToAddOrEditClickListener = _openModalToAddOrEdit;
        }


        /**
         * @desc Inverse active state of movement and call WS to save the change
         * @function _inverseActiveState
         * @param {Object} movement Movement to update this state
         * @param {Object} provisionalPlan Provisional plan parent of the movement to update
         * @param {function} successCallback Callback for the success of webserivce call
         * @memberOf Controllers.MovementController
         */
        function _inverseActiveState(provisionalPlan, movement, successCallback) {
            movement.active = !movement.active;
            movementWebApi.update({provisionalPlanId: provisionalPlan.id, movement: movement}).then(function () {
                successCallback(provisionalPlan.id);
            }, function () {

            });
        }


        /**
         * @desc Open a modal to display details informations about a movement
         * @function _openMovementDetailsModal
         * @param {Object} movementToSee Movement to display their details informations in modal
         * @memberOf Controllers.MovementController
         */
        function _openMovementDetailsModal(movementToSee) {
            var movementModalDetailsOpts = {
                templateUrl: 'app/components/movement/views/movementDetailsView.html', // Url du template HTML
                controller: 'movementDetailsController',
                resolve: {
                    movement: function () {
                        return $scope.movementToSee;
                    }
                }
            };
            if (_.isNull(movementToSee)) {
                console.error('The movement to see is null.');
            } else {
                $scope.movementToSee = movementToSee;
            }
            var modalInstance = $modal.open(movementModalDetailsOpts);
            modalInstance.result.then(function () {
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }


        /**
         * @desc Open a modal to confirm action of deleting then call de delete webservice if user confirm action
         * @function _openModalToConfirmDelete
         * @param {Object} provisionalPlan Provisional plan parent of the movement to delete
         * @param {Object} movement Movement to delete
         * @param {function} successCallback Callback for the success of delete webservice call
         * @memberOf Controllers.MovementController
         */
        function _openModalToConfirmDelete(provisionalPlan, movement, successCallback) {
            var confirmActionModalOpts = {
                templateUrl: 'app/shared/confirmAction/actionConfirmView.html', // Url du template HTML
                controller: 'actionConfirmController',
                resolve: {
                    confirmationMessage: function () {
                        return $scope.confirmationMessage;
                    }
                }
            };
            if (_.isUndefined(movement) || _.isNull(movement)) {
                throw new Error('The parameter movement is undefined or null.');
            }
            $scope.confirmationMessage = 'Êtes vous sur de vouloir supprimer ce mouvement ?';
            var modalInstance = $modal.open(confirmActionModalOpts);
            modalInstance.result.then(function () {
                _delete({provisionalPlanId: provisionalPlan.id, movement: movement}, successCallback);
            }, function () {
                console.log('Suppression annulé.');
            });
        }


        /**
         * @desc Call the delete webservice
         * @function _delete
         * @param {object} param Object with provisionalPlanId and movement to remove
         * @param {function} successCallback Callback for the success of delete webservice call
         * @memberOf Controllers.MovementController
         */
        function _delete(param, successCallback) {
            movementWebApi.remove(param).then(function () {
                successCallback(param.provisionalPlanId);
            }, function () {

            });
        }


        /**
         * @desc Open a modal to add or edit movement depending this id value (null = add else edit)
         * @function _openModalToAddOrEdit
         * @param {Object} provisionalPlan Provisional plan to work
         * @param {Object} movementToWork Movement to add or edit
         * @param {function} successCallback Callback of save webservice call
         * @memberOf Controllers.MovementController
         */
        function _openModalToAddOrEdit(provisionalPlan, movementToWork, successCallback) {
            //var provisionalPlan = provisionalPlan;
            function openModal(successCallback) {
                var movementModalAddOrEditOpts = {
                    templateUrl: 'app/components/movement/views/movementFormView.html', // Url du template HTML
                    controller: 'movementAddController',
                    resolve: {
                        provisionalPlanTitle: function () {
                            return provisionalPlan.name;
                        },
                        movementToWork: function () {
                            return $scope.movementToWork;
                        }
                    }
                };
                var modalInstance = $modal.open(movementModalAddOrEditOpts);
                modalInstance.result.then(function (movement) {
                    $scope.movementToWork = movement;
                    if (neogenz.utilities.isUndefinedOrNull($scope.movementToWork.id)) {
                        provisionalPlanWebApi.addMovement($scope.movementToWork)
                            .then(function () {
                                successCallback(provisionalPlan.id);
                            }, function (reason) {
                                throw new Error(reason);
                            });
                    }
                    else {
                        movementWebApi.update({
                            provisionalPlanId: provisionalPlan.id,
                            movement: $scope.movementToWork
                        }).then(function () {
                            successCallback(provisionalPlan.id);
                        }, function (reason) {
                            throw new Error(reason);
                        });
                    }
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            }

            //$scope.provisionalPlan = provisionalPlan;
            if (_.isUndefined(movementToWork)) {
                throw new Error('Parameter  movementToWork is undefined.');
            }
            if (_.isNull(movementToWork)) {
                //Build new movement by default
                $scope.movementToWork = app.beans.factory.getBean('Movement', null); //app.data.autocomplete.Movement();
                $scope.movementToWork.active = true;
                $scope.movementToWork.name = 'Mouvement d\'argent';
                //$scope.movementToWork.name = 'Mouvement d\'argent';
                if (_.isUndefined(provisionalPlan)) {
                    throw new Error('Can\'t assign an provisionalPlan.id value to movement to add because ' +
                        'the parameter provisionalPlan is null');
                }
                //Assign to this movement the provisionalPlanId to add
                $scope.movementToWork.provisionalPlanId = provisionalPlan.id;
            } else {
                $scope.movementToWork = movementToWork;
            }
            openModal(successCallback);
        }
    }
})();