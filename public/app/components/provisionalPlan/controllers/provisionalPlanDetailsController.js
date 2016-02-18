/**
 * @desc Controllers of BudgetManagerV2
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .controller('provisionalPlan.details.ctrl', ProvisionalPlanDetailsController);

    ProvisionalPlanDetailsController.$inject = ['$scope', '$modal', 'provisionalPlanWebApi', 'provisionalPlanCalculus', 'provisionalPlan', '$state'];

    /**
     * @desc Controllers of ProvisionalPlans
     * @namespace ProvisionalPlansDetailsController
     * @memberOf Controllers
     */
    function ProvisionalPlanDetailsController($scope, $modal, provisionalPlanWebApi, provisionalPlanCalculus, provisionalPlan, $state) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.ProvisionalPlanDetailsController
         */
        function defineScope() {
            $scope.provisionalPlan = provisionalPlan;
            $scope.confirmationMessage = "Êtes vous sur de vouloir supprimer ce plan prévisionnel ?";
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.ProvisionalPlanDetailsController
         */
        function defineListeners() {
            $scope.refresh = _refresh;
            $scope.openProvisionalPlanModal = _openProvisionalPlanModal;
            $scope.deleteClickListener = _deleteThisProvisionalPlan;
            $scope.getTotalMovementsOf = _getTotalMovementsOf;
            $scope.getTotalMovementWithoutDownOf = _getTotalMovementWithoutDownOf;
            $scope.getTotalMovementWithoutUpOf = _getTotalMovementWithoutUpOf;
        }


        /**
         * @desc Open a modal window with provisional plan form to create new or edit
         * @function _openProvisionalPlanModal
         * @param {Object|null} provisionalPlan The provisional plan to edit or null if need to create a new
         * @memberOf Controllers.ProvisionalPlanDetailsController
         */
        function _openProvisionalPlanModal(provisionalPlanToEdit) {
            if (_.isUndefined(provisionalPlanToEdit) || _.isNull(provisionalPlanToEdit)) {
                throw new Error('The parameter provisionalPlanToEdit is undefined or null.');
            }
            var provisionalPlan = provisionalPlanToEdit;

            function buildProvisionalPlanEditModalOpts(provisionalPlan) {
                return {
                    templateUrl: 'app/components/provisionalPlan/views/provisionalPlanFormView.html', // Url du template HTML
                    controller: 'provisionalPlan.add.ctrl',
                    resolve: {
                        provisionalPlan: function () {
                            return _.clone(provisionalPlan);
                        }
                    }
                };
            }

            //if (_.isUndefined(provisionalPlanToEdit) || _.isNull(provisionalPlanToEdit)) {
            //    provisionalPlan = app.data.autocomplete.ProvisionalPlan()[0];
            //}
            //else {
            //    $scope.provisionalPlan = provisionalPlan;
            //}
            var modalInstance = $modal.open(buildProvisionalPlanEditModalOpts(provisionalPlan));
            modalInstance.result.then(function (provisionalPlan) {
                //if (provisionalPlan.id === null) {
                //    provisionalPlanWebApi.create(provisionalPlan).then(function () {
                //        _refresh(null);
                //    }, function () {
                //
                //    });
                //} else {
                provisionalPlanWebApi.update(provisionalPlan).then(function () {
                    _refresh(provisionalPlan.id);
                }, function () {

                });

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }


        /**
         * @desc Open a modal which ask if are you sure to delete the provisional plan and call deleting method if yes
         * @function _deleteThisProvisionalPlan
         * @param {Object} provisionalPlan Provisional plan to delete
         * @memberOf Controllers.ProvisionalPlanDetailsController
         */
        function _deleteThisProvisionalPlan(provisionalPlan) {
            if (_.isUndefined(provisionalPlan) || _.isNull(provisionalPlan)) {
                console.error('_deleteThisProvisionalPlan() - The provisionalPlan parameter is null or undefined.');
                return;
            }
            function buildConfirmActionModalOpts(confirmationMessage) {
                return {
                    templateUrl: 'app/shared/confirmAction/actionConfirmView.html', // Url du template HTML
                    controller: 'action.confirm.ctrl',
                    resolve: {
                        confirmationMessage: function () {
                            return confirmationMessage;
                        }
                    }
                };
            }

            var modalInstance = $modal.open(buildConfirmActionModalOpts("Êtes vous sur de vouloir supprimer ce plan prévisionnel ?"));
            modalInstance.result.then(function () {
                _remove(provisionalPlan);
            }, function () {
                console.log("Suppression annulé.");
            });
        }


        /**
         * @desc Get the sum of all movements of a provisional plan
         * @function _getTotalMovementsOf
         * @param {Object} provisionalPlan Provisional plan to need get the sum of all movements
         * @returns {Number} The sum of all movements
         * @memberOf Controllers.ProvisionalPlanDetailsController
         */
        function _getTotalMovementsOf(provisionalPlan) {
            return provisionalPlanCalculus.getTotalMovementsOf(provisionalPlan);
        }


        /**
         * @desc Get the sum of all not down movements of a provisional plan
         * @function _getTotalMovementWithoutDownOf
         * @param {Object} provisionalPlan Provisional plan to need get the sum of all not down movements
         * @returns {Number} The sum of all movements without down
         * @memberOf Controllers.ProvisionalPlanDetailsController
         */
        function _getTotalMovementWithoutDownOf(provisionalPlan) {
            return provisionalPlanCalculus.getTotalMovementWithoutDownOf(provisionalPlan);
        }


        /**
         * @desc Get the sum of all not up movements of a provisional plan
         * @function _getTotalMovementWithoutUpOf
         * @param {Object} provisionalPlan Provisional plan to need get the sum of all not up movements
         * @returns {Number} The sum of all movements without up
         * @memberOf Controllers.ProvisionalPlanDetailsController
         */
        function _getTotalMovementWithoutUpOf(provisionalPlan) {
            return provisionalPlanCalculus.getTotalMovementWithoutUpOf(provisionalPlan);
        }


        /**
         * @desc Refresh the provisional plan with webservice call
         * @function _refresh
         * @param {Number} id Id of provisional plan to refresh
         * @memberOf Controllers.ProvisionalPlanDetailsController
         */
        function _refresh(id) {
            provisionalPlanWebApi.findById(id)
                .then(function (data) {
                        $scope.provisionalPlan = data;
                    }
                );
        }


        /**
         * @desc Call the webservice to delete provisional plan
         * @function _remove
         * @param {Object} provisionalPlan Provisional plan to be deleted
         * @memberOf Controllers.ProvisionalPlanDetailsController
         */
        function _remove(provisionalPlan) {
            provisionalPlanWebApi.remove(provisionalPlan).then(function () {
                    $state.go('provisionalPlans');
                },
                function (reason) {
                    console.log(reason);
                }
            );
        }
    };
})();