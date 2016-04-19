'use strict';

/**
 * Déclaration de l'application appBudgetManager
 */
angular
    .module('appBudgetManager',
        [
            'ui.router',
            'ui.bootstrap',
            'angular-loading-bar',
            'ngAnimate',
            'ngStorage',
            'toastr'
        ]
    );

angular
    .module('appBudgetManager')
    .run(function ($localStorage, $state, $rootScope) {
    });

angular
    .module('appBudgetManager')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if (!neogenz.utilities.isUndefinedOrNull($localStorage.token)) {
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