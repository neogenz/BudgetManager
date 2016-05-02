(function init() {
    'use strict';

    var movementComponent = {
        bindings: {
            provisionalPlan: '=',
            movement: '='
        },
        templateUrl: 'app/components/movement/views/movementComponentView.html',
        controller: MovementController,
        controllerAs: 'movementCtrl'
    };

    angular
        .module('appBudgetManager')
        .component('movement', movementComponent);

    MovementController.$inject = ['$scope', '$modal', 'movementWebApi', 'provisionalPlanWebApi'];

    /**
     * @desc Controllers of Movements
     * @namespace MovementController
     * @memberOf Controllers
     */
    function MovementController($scope, $modal, movementWebApi, provisionalPlanWebApi) {
        var self = this;

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
            self.confirmationMessage = 'Êtes vous sur de vouloir supprimer ce mouvement ?';
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.MovementController
         */
        function defineListeners() {
            self.inverseActiveStateClickListener = _inverseActiveState;
            self.openMovementDetailsModalClickListener = _openMovementDetailsModal;
            self.deleteClickListener = _openModalToConfirmDelete;
            self.openEditModalClickListener = _openEditModalClickListener;
        }


        /**
         * @desc Inverse active state of movement and call WS to save the change
         * @function _inverseActiveState
         * @memberOf Controllers.MovementController
         */
        function _inverseActiveState() {
            self.movement.active = !self.movement.active;
            movementWebApi.update({
                provisionalPlanId: self.provisionalPlan.id,
                movement: self.movement
            }).then(
                function () {
                }, function () {
                }
            );
        }


        /**
         * @desc Open a modal to display details informations about a movement
         * @function _openMovementDetailsModal
         * @memberOf Controllers.MovementController
         */
        function _openMovementDetailsModal() {
            var movementModalDetailsOpts = {
                templateUrl: 'app/components/movement/views/movementDetailsView.html',
                controller: 'movementDetailsController',
                resolve: {
                    movement: function () {
                        return self.movement;
                    }
                }
            };
            var modalInstance = $modal.open(movementModalDetailsOpts);
            modalInstance.result.then(function () {
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }


        /**
         * @desc Open a modal to confirm action of deleting then call de delete webservice if user confirm action
         * @function _openModalToConfirmDelete
         * @memberOf Controllers.MovementController
         */
        function _openModalToConfirmDelete() {
            var confirmActionModalOpts = {
                templateUrl: 'app/shared/confirmAction/actionConfirmView.html', // Url du template HTML
                controller: 'actionConfirmController',
                resolve: {
                    confirmationMessage: function () {
                        return self.confirmationMessage;
                    }
                }
            };
            self.confirmationMessage = 'Êtes vous sur de vouloir supprimer ce mouvement ?';
            var modalInstance = $modal.open(confirmActionModalOpts);
            modalInstance.result.then(function () {
                _delete({
                    provisionalPlanId: self.provisionalPlan.id,
                    movement: self.movement
                });
            }, function () {
                console.log('Suppression annulé.');
            });
        }


        /**
         * @desc Call the delete webservice
         * @function _delete
         * @param {object} param Object with provisionalPlanId and movement to remove
         * @memberOf Controllers.MovementController
         */
        function _delete(param) {
            movementWebApi.remove(param).then(function () {
                // self.provisionalPlan.movements = _.reject(self.provisionalPlan.movements, function (movement) {
                //     return movement.id === self.movement.id;
                // });
                self.provisionalPlan.movements = movementWebApi.getMovementsCollectionWithoutOne(
                    self.provisionalPlan.movements,
                    self.movement.id
                );
            }, function () {

            });
        }


        /**
         * @desc Open a modal to edit movement
         * @function _openEditModalClickListener
         * @memberOf Controllers.MovementController
         */
        function _openEditModalClickListener() {
            function openModal() {
                var movementModalAddOrEditOpts = {
                    templateUrl: 'app/components/movement/views/movementFormView.html', // Url du template HTML
                    controller: 'movementAddController',
                    resolve: {
                        provisionalPlanTitle: function () {
                            return self.provisionalPlan.name;
                        },
                        movementToWork: function () {
                            return self.movement;
                        }
                    }
                };
                var modalInstance = $modal.open(movementModalAddOrEditOpts);
                modalInstance.result.then(function (movement) {
                    _update({
                        provisionalPlanId: self.provisionalPlan.id,
                        movement: movement
                    });
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            }

            openModal();
        }


        /**
         * @desc Call the update webservice
         * @function _update
         * @param {object} param Object with provisionalPlanId and movement to
         *                       update.
         * @memberOf Controllers.MovementController
         */
        function _update(param) {
            movementWebApi.update(param).then(
                function () {
                    var movementToUpdate = _.find(self.provisionalPlan.movements, function (currentMovement) {
                        return currentMovement.id === param.movement.id;
                    });
                    _.extend(movementToUpdate, param.movement);
                }, function (reason) {
                    throw new Error(reason);
                });
        }
    }

})();
