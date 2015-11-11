/**
 * @desc Controllers of BudgetManagerV2
 * @namespace Controllers
 */
(function () {
    angular
        .module('appBudgetManager')
        .controller('user.profile.ctrl', UserProfileController);

    UserProfileController.$inject = ['$rootScope', '$scope', '$state', 'authenticateWebApi', 'toastr', '$modal'];

    /**
     * @desc Controllers of ProvisionalPlans
     * @namespace UserProfileController
     * @memberOf Controllers
     */
    function UserProfileController($rootScope, $scope, $state, authenticateWebApi, toastr, $modal) {
        (function init() {
            defineScope();
            defineListeners();
        })();


        /**
         * @desc Defines all $scope variables
         * @function defineScope
         * @memberOf Controllers.UserProfileController
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
         * @memberOf Controllers.UserProfileController
         */
        function defineListeners() {
            $scope.changePassword = _changePassword;
        }


        /**
         * @desc Open modal view with the form
         * @function _changePassword
         * @param {bool} formIsValid Passed from view, is a valid form angular boolean
         * @memberOf Controllers.UserProfileController
         */
        function _changePassword(formIsValid) {
            var confirmActionModalOpts = {
                templateUrl: 'views/partials/user.profil.changePassword', // Url du template HTML
                controller: 'user.profil.changePassword.ctrl'
                /*resolve: {
                 confirmationMessage: function () {
                 return $scope.confirmationMessage;
                 }
                 }*/
            };
            var modalInstance = $modal.open(confirmActionModalOpts);
            modalInstance.result.then(function () {
                _displaySuccessMessage('Changement de mot de passe effectué avec succès.');
            }, function (result) {
                if (result.canceled) {
                    toastr.warning('Changement de mot de passe annulé.');
                    myLib.technical.log.logDebug('user.profile.ctrl.js', '_changePassword()', 'Changement de mot de passe échoué : ' + result.message);
                } else {
                    toastr.error('Changement de mot de passe échoué.');
                    myLib.technical.log.logError('user.profile.ctrl.js', '_changePassword()', 'Changement de mot de passe échoué : ' + result.message);
                }

            });
        }


        /**
         * @desc Display an toastr.success message passed from parameter.
         *       This function is generally used to callback.
         * @function _displaySuccessMessage
         * @param {string} successMessage Success message to display
         * @memberOf Controllers.UserProfileController
         */
        function _displaySuccessMessage(successMessage) {
            if (myLib.technical.isUndefinedOrNull(successMessage)) {
                throw new Error('successMessage to display in null or undefined.');
            }
            toastr.success(successMessage);
        }
    }
})();