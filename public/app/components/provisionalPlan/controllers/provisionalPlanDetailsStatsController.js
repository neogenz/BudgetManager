/**
 * @desc Controllers of BudgetManager
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .controller('provisionalPlanDetailsStatsController', ProvisionalPlanDetailsStatsController);

    ProvisionalPlanDetailsStatsController.$inject = ['$scope', 'provisionalPlan', 'provisionalPlanCalculus'];

    /**
     * @desc Controllers of ProvisionalPlans
     * @namespace ProvisionalPlanDetailsStatsController
     * @memberOf Controllers
     */
    function ProvisionalPlanDetailsStatsController($scope, provisionalPlan, provisionalPlanCalculus) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.ProvisionalPlanDetailsStatsController
         */
        function defineScope() {
            $scope.provisionalPlan = provisionalPlan;
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.ProvisionalPlanDetailsStatsController
         */
        function defineListeners() {
            $scope.getTotalMovementsOf = _getTotalMovementsOf;
            $scope.getTotalMovementWithoutDownOf = _getTotalMovementWithoutDownOf;
            $scope.getTotalMovementWithoutUpOf = _getTotalMovementWithoutUpOf;
        }


        /**
         * @desc Get the sum of all movements of a provisional plan
         * @function _getTotalMovementsOf
         * @param {Object} provisionalPlan Provisional plan to need get the sum of all movements
         * @returns {Number} The sum of all movements
         * @memberOf Controllers.ProvisionalPlanDetailsStatsController
         */
        function _getTotalMovementsOf() {
            return provisionalPlanCalculus.getTotalMovementsOf(provisionalPlan);
        }


        /**
         * @desc Get the sum of not down movements of a provisional plan
         * @function _getTotalMovementsOf
         * @param {Object} provisionalPlan Provisional plan to need get the sum of all movements
         * @returns {Number} The sum of all movements
         * @memberOf Controllers.ProvisionalPlanDetailsStatsController
         */
        function _getTotalMovementWithoutDownOf() {
            return provisionalPlanCalculus.getTotalMovementWithoutDownOf(provisionalPlan);
        }


        /**
         * @desc Get the sum of not up movements of a provisional plan
         * @function _getTotalMovementsOf
         * @param {Object} provisionalPlan Provisional plan to need get the sum of all movements
         * @returns {Number} The sum of all movements
         * @memberOf Controllers.ProvisionalPlanDetailsStatsController
         */
        function _getTotalMovementWithoutUpOf() {
            return provisionalPlanCalculus.getTotalMovementWithoutUpOf(provisionalPlan);
        }
    }
})();