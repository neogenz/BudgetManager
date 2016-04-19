(function init() {
    'use strict';

    angular
        .module('appBudgetManager')
        .factory('authenticateWebApi', AuthenticateWebApi);

    AuthenticateWebApi.$inject = ['$http', '$localStorage', '$q'];

    function AuthenticateWebApi($http, $localStorage, $q) {
        return {
            signup: _signup,
            signin: _signin,
            logout: _logout,
            getUserFromToken: _getUserFromToken,
            getUserFromLocalStorageToken: _getUserFromLocalStorageToken,
            checkIfThisPasswordIsGood: _checkIfThisPasswordIsGood,
            changePassword: _changePassword
        };


        /**
         * @name _urlBase64Decode
         */
        function _urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }


        /**
         * @name _getUserFromLocalStorageToken
         */
        function _getUserFromLocalStorageToken() {
            var token = $localStorage.token;
            var user = {};
            if (!neogenz.utilities.isUndefinedOrNull(token)) {
                var encoded = token.split('.')[1];
                user = JSON.parse(_urlBase64Decode(encoded));
            } else {
                neogenz.logger.logInfo(
                    'authenticateFactory.js',
                    '_getUserFromLocalStorageToken()',
                    'The token in local storage is null or undefined.'
                );
            }
            return user;
        }


        /**
         * @name _getUserFromToken
         */
        function _getUserFromToken(token) {
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(_urlBase64Decode(encoded));
            }
            return user;
        }

        //getUserFromToken();

        //Web API
        /**
         * @name _signup
         * Signup the user in database.
         * @param {User} beanUser User to signup
         * @returns {d.promise|*|promise}
         */
        function _signup(beanUser) {
            var def = $q.defer();
            var requestOptions = neogenz.httpUtilities.buildPostRequestOptToCallThisUrl(
                '/signup',
                beanUser);
            var promise = $http(requestOptions);
            promise.then(function (response) {
                $localStorage.token = response.data.token;
                def.resolve(response);
            }, function (response) {
                def.reject(response.message);
            });
            return def.promise;
        }


        /**
         * @name _signin
         */
        function _signin(formData) {
            var def = $q.defer();
            var requestOptions = neogenz.httpUtilities.buildPostRequestOptToCallThisUrl(
                '/signin',
                formData);
            var promise = $http(requestOptions);
            promise.then(function (response) {
                $localStorage.token = response.data.token;
                def.resolve(response);
            }, function () {
                var message = 'Adresse mail ou mot de passe invalide';
                def.reject(message);
            });
            return def.promise;
        }


        /**
         * @name _logout
         */
        function _logout() {
            var def = $q.defer();
            try {
                delete $localStorage.token;
                def.resolve();
            }
            catch (e) {
                def.reject('An error has occured on logout.');
            }
            return def.promise;
        }


        /**
         * @name _checkIfThisPasswordIsGood
         */
        function _checkIfThisPasswordIsGood(password) {
            var def = null,
                requestOptions = null,
                promise = null;
            def = $q.defer();
            requestOptions = neogenz.httpUtilities.buildGetRequestOptToCallThisUrl(
                '/checkPassword/' + password);
            promise = $http(requestOptions);
            promise.then(function () {
                def.resolve();
            }, function (err) {
                def.reject(err.data.message);
            });

            return def.promise;
        }

        /**
         * @name _changePassword
         */
        function _changePassword(formData) {
            var def = null,
                requestOptions = null,
                promise = null;
            def = $q.defer();
            def = $q.defer();
            requestOptions = neogenz.httpUtilities.buildPostRequestOptToCallThisUrl(
                '/changePassword',
                formData);
            promise = $http(requestOptions);
            promise.then(function (response) {
                $localStorage.token = response.data.token;
                def.resolve(response);
            }, function (err) {
                def.reject(err.message);
            });
            return def.promise;
        }
    }
})();