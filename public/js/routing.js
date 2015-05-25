'use strict';

var isAuthenticated = function ($rootScope, $q, $http, $state) {
    var defer = $q.defer();
    $http.get('/isAuthenticated').success(function (data) {
        // Authenticated
        if (data.success !== undefined) {
            if (data.success === false) {
                console.log(data.message);
                $state.go('login');
            }
        } else {
            $rootScope.user = data;
            defer.resolve(true);
        }

    }).error(function () {
        $state.go('login');
    });
    return defer.promise;
};

appBudgetManager.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        // Système de routage
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home'
            })
            .state('login', {
                url: '/login',
                controller: 'login.ctrl',
                templateUrl: 'views/login'
            })
            .state('signup', {
                url: '/signup',
                controller: 'signup.ctrl',
                templateUrl: 'views/signup'
            })
            .state('provisionalPlans', {
                url: '/provisionalPlans',
                templateUrl: 'views/provisionalPlan.list',
                controller: 'provisionalPlan.ctrl',
                resolve: {
                    user: isAuthenticated
                }
            })
            .state('provisionalPlanDetails', {
                url: 'provisionalPlans/:id',
                templateUrl: 'views/partials/provisionalPlan.details',
                controller: 'provisionalPlan.details.ctrl',
                resolve: {
                    provisionalPlan: function ($stateParams, provisionalPlanWebApi) {
                        return provisionalPlanWebApi.findProvisionalPlanById($stateParams.id);
                    },
                    user: isAuthenticated
                }
            });

        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push(function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers["Authorization"] = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    console.log('Http request intercepted in error');
                    if (response.status === 401 || response.status === 403) {
                        //@todo redirect to login page
                    }
                    return $q.reject(response);
                }
            };
        });
    }
);