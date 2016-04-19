/**
 * @desc Controllers of BudgetManager
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .controller('userProfileChangePasswordController', UserProfileChangePasswordController);

    UserProfileChangePasswordController.$inject = [
        '$rootScope', '$scope', 'authenticateWebApi', 'toastr', '$modalInstance'
    ];

    /**
     * @desc Controllers of ProvisionalPlans
     * @namespace UserProfileChangePasswordController
     * @memberOf Controllers
     */
    function UserProfileChangePasswordController($rootScope, $scope, authenticateWebApi, toastr, $modalInstance) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.UserProfileChangePasswordController
         */
        function defineScope() {
            $scope.userInput = {
                changePassword: {
                    holdPassword: '',
                    newPassword: '',
                    passwordConfirm: ''
                }
            };
        }


        /**
         * @desc Attach view listeners to this controller
         * @function defineListeners
         * @memberOf Controllers.UserProfileChangePasswordController
         */
        function defineListeners() {
            $scope.ok = _ok;
            $scope.cancel = _cancel;
        }


        /**
         * @desc Close the modal with promise.resolve state
         * @function _ok
         * @param {bool} formIsValid Passed from view, is a valid form angular boolean
         * @memberOf Controllers.UserProfileChangePasswordController
         */
        function _ok(formIsValid) {
            if (formIsValid) {
                if (_passwordAndConfirmationIsEqual()) {
                    var promise = authenticateWebApi.checkIfThisPasswordIsGood($scope.userInput.holdPassword)
                        .then(function () {
                            promise = authenticateWebApi.changePassword({
                                holdPassword: $scope.userInput.holdPassword,
                                newPassword: $scope.userInput.newPassword
                            });
                            promise.then(function () {
                                $modalInstance.close();
                            }, function (message) {
                                $modalInstance.dismiss({canceled: false, message: message});
                            });
                        }, function (message) {
                            $modalInstance.dismiss({canceled: false, message: message});
                        });
                } else {
                    toastr.warning('Les mots de passe ne correspondent pas.');
                }
            }
        }


        /**
         * @desc Close the modal with promise.reject state
         * @function _cancel
         * @memberOf Controllers.UserProfileChangePasswordController
         */
        function _cancel() {
            $modalInstance.dismiss({canceled: true, message: ''});
        }


        /**
         * @desc Verify the password equality
         * @function _verifPassword
         * @memberOf Controllers.UserProfileChangePasswordController
         */
        function _passwordAndConfirmationIsEqual() {
            return ($scope.userInput.newPassword === $scope.userInput.passwordConfirm);
        }
    }
})();