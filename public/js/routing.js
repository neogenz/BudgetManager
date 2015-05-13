'use strict'

//var checkIfUserAuthenticated = function ($rootScope, $q, $http, $state) {
//    var defer = $q.defer();
//    $http.get('/userAuthentified').success(function (data, status, header, config) {
//        // Authenticated
//        $rootScope.user = data;
//        defer.resolve(true);
//    }).error(function (data, status, headers, config) {
//        console.error('Failed to load resource from server. HTTP status code : ' + status);
//        $state.go('login');
//        return;
//    });
//    return defer.promise;
//};

appBudgetManager.config(function ($stateProvider, $urlRouterProvider) {

        // Système de routage
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home',
                controller: 'homeCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/partials/login',
                controller: 'loginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/partials/signup',
                controller: 'signupCtrl'
            })
            .state('provisionalPlans', {
                url: '/provisionalPlans',
                templateUrl: 'views/provisionalPlans',
                controller: 'provisionalPlanCtrl'//,
                //resolve: {
                //    userAuthenticated: checkIfUserAuthenticated
                //}
            })
            .state('provisionalPlanDetails', {
                url: 'provisionalPlans/{id}',
                templateUrl: 'views/partials/detailsProvisionalPlan',
                controller: 'detailsProvisionalPlanCtrl',
                resolve: {
                    provisionalPlan: function ($stateParams, provisionalPlanWebApi) {
                        return provisionalPlanWebApi.findProvisionalPlanById($stateParams.id);
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }
);