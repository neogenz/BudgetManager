/**
 * @desc Controllers of BudgetManager
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$rootScope', '$scope', '$state', 'authenticateWebApi', 'toastr'];

    /**
     * @desc Controllers of ProvisionalPlans
     * @namespace SignupController
     * @memberOf Controllers
     */
    function SignupController($rootScope, $scope, $state, authenticateWebApi, toastr) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.SignupController
         */
        function defineScope() {
            $scope.userInput = {
                email: '',
                password: '',
                passwordConfirm: '',
                lastName: '',
                firstName: '',
                username: ''
            };
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.SignupController
         */
        function defineListeners() {
            $scope.signup = _signup;
        }


        /**
         * @desc Get the information of form and call webservice to try signup user
         * and redirect them to provisional plans list page
         * @function _signup
         * @param {bool} formIsValid Passed from view, is a valid form angular boolean
         * @memberOf Controllers.SignupController
         */
        function _signup(formIsValid) {
            if (_passwordAndConfirmationIsEqual() && formIsValid) {
                var user = new neogenz.beans.factory.getBean('User', null);
                user.email = $scope.userInput.email.toLowerCase();
                user.password = $scope.userInput.password;
                user.firstName = $scope.userInput.firstName;
                user.lastName = $scope.userInput.lastName;
                user.username = user.email;

                authenticateWebApi.signup(user).then(function () {
                    toastr.success(app.uiManager.messages.signup.success);
                    $state.go('provisionalPlans');
                }, function () {
                    $rootScope.error = 'Failed to signup';
                });
            } else if (!_passwordAndConfirmationIsEqual()) {
                $scope.signupForm.passwordConfirm.$invalid = true;
            }
        }


        /**
         * @desc Verify the password equality
         * @function _verifPassword
         * @memberOf Controllers.SignupController
         */
        function _passwordAndConfirmationIsEqual() {
            return ($scope.userInput.password === $scope.userInput.passwordConfirm);
        }
    }
})();