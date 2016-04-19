/**
 * @desc Controllers of BudgetManager
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .controller('actionConfirmController', ActionConfirmController);

    ActionConfirmController.$inject = ['$scope', '$modalInstance', 'confirmationMessage'];

    /**
     * @desc Controllers of ProvisionalPlans
     * @namespace ActionConfirmController
     * @memberOf Controllers
     */
    function ActionConfirmController($scope, $modalInstance, confirmationMessage) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.ActionConfirmController
         */
        function defineScope() {
            $scope.confirmationMessage = confirmationMessage;
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.ActionConfirmController
         */
        function defineListeners() {
            $scope.ok = _ok;
            $scope.cancel = _cancel;
        }


        /**
         * @desc Close the modal with a promise resolve to success
         * @function _ok
         * @memberOf Controllers.ActionConfirmController
         */
        function _ok() {
            $modalInstance.close();
        }


        /**
         * @desc Close the modal with a promise resolve to error
         * @function _cancel
         * @memberOf Controllers.ActionConfirmController
         */
        function _cancel() {
            $modalInstance.dismiss();
        }
    }
})();