'use strict';

/**
 * Déclaration de l'application appBudgetManager
 */
var appBudgetManager = angular.module('appBudgetManager', [
    //Dépendances du module
    'ui.router', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngStorage', 'toastr'
]);

//appBudgetManager.run(function ($localStorage, $state) {
//
//});

appBudgetManager.config(function ($httpProvider) {
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if (!myLib.technical.isUndefinedOrNull($localStorage.token)) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401) {
                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);
});