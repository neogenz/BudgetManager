/**
 * @desc Controllers of BudgetManagerV2
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .controller('movementAddController', MovementAddController);

    MovementAddController.$inject = ['$scope', '$modalInstance', 'provisionalPlanTitle', 'movementToWork'];

    /**
     * @desc Controllers of Movements
     * @namespace MovementAddController
     * @memberOf Controllers
     */
    function MovementAddController($scope, $modalInstance, provisionalPlanTitle, movementToWork) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.MovementAddController
         */
        function defineScope() {
            $scope.modes = app.uiManager.formMode;
            $scope.mode = (_.isNull(movementToWork.id) ? app.uiManager.formMode.create : app.uiManager.formMode.edit);
            $scope.provisionalPlanTitle = provisionalPlanTitle;
            $scope.movement = _.clone(movementToWork);
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.MovementAddController
         */
        function defineListeners() {
            $scope.ok = _ok;
            $scope.cancel = _cancel;
        }


        /**
         * @desc Close the modal with a promise resolve to success
         * @function _ok
         * @memberOf Controllers.MovementAddController
         */
        function _ok() {
            $modalInstance.close($scope.movement);
        }


        /**
         * @desc Close the modal with a promise resolve to error
         * @function _cancel
         * @memberOf Controllers.MovementAddController
         */
        function _cancel() {
            $modalInstance.dismiss("Ajout du plan prévisionel annulé");
        }
    }
})();