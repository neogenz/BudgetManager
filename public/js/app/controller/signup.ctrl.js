/**
 * @desc Controllers of BudgetManagerV2
 * @namespace Controllers
 */
(function () {
    angular
        .module('appBudgetManager')
        .controller('signup.ctrl', SignupController);

    SignupController.$inject = ['$rootScope', '$scope', '$state', 'authenticateWebApi'];

    /**
     * @desc Controllers of ProvisionalPlans
     * @namespace SignupController
     * @memberOf Controllers
     */
    function SignupController($rootScope, $scope, $state, authenticateWebApi) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.LoginController
         */
        function defineScope() {
            $scope.signupForm = {
                email: '',
                password: ''
            };
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.LoginController
         */
        function defineListeners() {
            $scope.signup = _signup;
        }


        /**
         * @desc Get the information of form and call webservice to try signup user and redirect them to provisional plans list page
         * @function _signup
         * @memberOf Controllers.LoginController
         */
        function _signup() {
            authenticateWebApi.signup($scope.signupForm).then(function () {
                $state.go('provisionalPlans');
            }, function () {
                $rootScope.error = 'Failed to signup';
            })
        }
    }
})();