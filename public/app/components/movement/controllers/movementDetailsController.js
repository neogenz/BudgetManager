/**
 * @desc Controllers of BudgetManager
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .controller('movementDetailsController', MovementDetailsController);

    MovementDetailsController.$inject = ['$scope', '$modalInstance', 'movement'];

    /**
     * @desc Controllers of Movements
     * @namespace MovementDetailsController
     * @memberOf Controllers
     */
    function MovementDetailsController($scope, $modalInstance, movement) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.MovementDetailsController
         */
        function defineScope() {
            $scope.movement = movement;
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.MovementDetailsController
         */
        function defineListeners() {
            $scope.ok = _ok;
        }


        /**
         * @desc Close the modal with a promise resolve to success
         * @function _ok
         * @memberOf Controllers.MovementDetailsController
         */
        function _ok() {
            $modalInstance.close();
        }
    }
})();