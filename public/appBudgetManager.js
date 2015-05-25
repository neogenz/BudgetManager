'use strict';

/**
 * Déclaration de l'application appBudgetManager
 */
var appBudgetManager = angular.module('appBudgetManager', [
    //Dépendances du module
    'ui.router', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngStorage'
]);

//appBudgetManager.run(function ($rootScope, $httpProvider) {
//@todo regarder si un toekn est présent dans le local storage, appelé le WS de refresh de token, puis authentifier l'user
//});

appBudgetManager.config(function ($httpProvider) {
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);
});