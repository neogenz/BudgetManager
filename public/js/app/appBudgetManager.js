'use strict';

/**
 * Déclaration de l'application appBudgetManager
 */
var appBudgetManager = angular.module('appBudgetManager', [
    //Dépendances du module
    'ui.router', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngStorage', 'toastr'
]);

appBudgetManager.run(function ($localStorage, $state, $rootScope) {
    $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
        $rootScope.$previousState = from;
        debugger;
    });
    //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //    debugger;
    //$state.go(toState.name);
    //if (toState.name == 'home') {
    //    if (!_.isUndefined($localStorage.token) && !_.isNull($localStorage.token) && !_.isEmpty($localStorage.token)) {
    //        event.preventDefault();
    //        $state.go('provisionalPlans');
    //    }
    //}else if(toState.name == 'home' && toState.fromState == 'provisionalPlanDetailsStats'){
    //    event.preventDefault();
    //    $state.go('provisionalPlans');
    //}
    //$rootScope.previousState = fromState.name;
    //$rootScope.currentState = toState.name;
    //console.log('Previous state:'+$rootScope.previousState);
    //console.log('Current state:'+$rootScope.currentState);
    //});

});

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