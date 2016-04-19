/**
 * @desc Controllers of BudgetManager
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .controller('SigninController', LoginController);

    LoginController.$inject = ['$rootScope', '$scope', '$state', 'authenticateWebApi'];

    /**
     * @desc Controllers of ProvisionalPlans
     * @namespace LoginController
     * @memberOf Controllers
     */
    function LoginController($rootScope, $scope, $state, authenticateWebApi) {
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
            $scope.loginForm = {
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
            $scope.signin = _signin;
        }


        /**
         * @desc Get the information of form and call webservice to try sign user
         * @function _signin
         * @memberOf Controllers.LoginController
         */
        function _signin() {
            $scope.loginForm.email = $scope.loginForm.email.toLowerCase();
            authenticateWebApi.signin($scope.loginForm).then(function () {
                $state.go('provisionalPlans');
            }, function (err) {
                $rootScope.error = 'Une erreur est survenue : ' + err;
                $state.go('login');
                //@todo manage error
                //@todo possibly an event on flashErrorMessage
            });
        }
    }
})();