/**
 * @desc Controllers of BudgetManager
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .controller('provisionalPlanListController', ProvisionalPlanController);

    ProvisionalPlanController.$inject = [
        '$scope', '$modal', 'provisionalPlans', 'provisionalPlanCalculus', 'provisionalPlanWebApi'
    ];

    /**
     * @desc Controllers of ProvisionalPlans
     * @namespace ProvisionalPlanController
     * @memberOf Controllers
     */
    function ProvisionalPlanController($scope, $modal, provisionalPlans, provisionalPlanCalculus, provisionalPlanWebApi) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.ProvisionalPlanController
         */
        function defineScope() {
            $scope.provisionalPlans = provisionalPlans;
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.ProvisionalPlanController
         */
        function defineListeners() {
            $scope.openModalToAddProvisionalPlan = _openModalToAddProvisionalPlan;
            $scope.refresh = _refresh;
            $scope.getTotalMovementsOf = _getTotalMovementsOf;
        }


        /**
         * @desc Open a modal window with provisional plan form to create new
         * @function _openModalToAddProvisionalPlan
         * @memberOf Controllers.ProvisionalPlanController
         */
        function _openModalToAddProvisionalPlan() {
            function buildProvisionalPlanModalOpts() {
                return {
                    templateUrl: 'app/components/provisionalPlan/views/provisionalPlanFormView.html',
                    controller: 'provisionalPlanAddController',
                    resolve: {
                        provisionalPlan: function () {
                            return app.beans.factory.getBean('ProvisionalPlan', null);
                        }
                    }
                };
            }

            var modalInstance = $modal.open(buildProvisionalPlanModalOpts());
            modalInstance.result.then(function (provisionalPlan) {
                provisionalPlanWebApi.create(provisionalPlan).then(function () {
                    _refresh(null);
                }, function (err) {
                    throw new Error(err);
                });
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }


        /**
         * @desc Get the sum of all movements of a provisional plan
         * @function _getTotalMovementsOf
         * @param {Object} provisionalPlan Provisional plan to need get the sum of all movements
         * @returns {Number} The sum of all movements
         * @memberOf Controllers.ProvisionalPlanController
         */
        function _getTotalMovementsOf(provisionalPlan) {
            return provisionalPlanCalculus.getTotalMovementsOf(provisionalPlan);
        }


        /**
         * @desc Refresh an provisional plan or all with webservice call
         * @function _refresh
         * @param {Number|null} id Id of provisional plan to refresh or null for refresh all
         * @memberOf Controllers.ProvisionalPlanController
         */
        function _refresh(id) {
            if (!neogenz.utilities.isUndefinedOrNull(id)) {
                _refreshById(id);
            } else {
                _refreshAll();
            }
        }

        /**
         * @desc Refresh the provisional plan with webservice call
         * @function _refreshById
         * @param {Number} id Id of provisional plan to refresh
         * @memberOf Controllers.ProvisionalPlanController
         */
        function _refreshById(id) {
            provisionalPlanWebApi.findById(id)
                .then(function (data) {
                        $scope.provisionalPlan = data;
                    }
                );
        }


        /**
         * @desc Refresh all provisional plans with webservice call
         * @function _refreshById
         * @memberOf Controllers.ProvisionalPlanController
         */
        function _refreshAll() {
            provisionalPlanWebApi.findAll()
                .then(function (data) {
                        $scope.provisionalPlans = data;
                    }
                );
        }
    }
})();