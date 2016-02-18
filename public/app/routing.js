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

appBudgetManager.config(function ($stateProvider, $urlRouterProvider) {

        // Système de routage
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/homeView.html',
                controller: 'home.ctrl'
            })
            .state('login', {
                url: '/login',
                controller: 'login.ctrl',
                templateUrl: 'app/components/authentication/views/signinView.html'
            })
            .state('signup', {
                url: '/signup',
                controller: 'signup.ctrl',
                templateUrl: 'app/components/authentication/views/signupView.html'
            })
            .state('userProfile', {
                url: '/myAccount',
                controller: 'user.profile.ctrl',
                templateUrl: 'app/components/user/views/userProfileView.html',
                resolve: {
                    user: isAuthenticated
                }
            }).state('provisionalPlans', {
            url: '/provisionalPlans',
            templateUrl: 'app/components/provisionalPlan/views/provisionalPlanListView.html',
            controller: 'provisionalPlan.ctrl',
            resolve: {
                provisionalPlans: function ($stateParams, provisionalPlanWebApi) {
                    try {
                        return provisionalPlanWebApi.findAll();
                    } catch (err) {
                        throw new Error(err);
                    }
                },
                user: isAuthenticated
            }
        }).state('provisionalPlanDetails', {
            url: 'provisionalPlans/:id',
            templateUrl: 'app/components/provisionalPlan/views/provisionalPlanDetailsView.html',
            controller: 'provisionalPlan.details.ctrl',
            resolve: {
                provisionalPlan: function ($stateParams, provisionalPlanWebApi) {
                    try {
                        debugger;
                        return provisionalPlanWebApi.findById($stateParams.id);
                    } catch (err) {
                        throw new Error(err);
                    }
                },
                user: isAuthenticated
            }
        }).state('provisionalPlanDetailsStats', {
            url: 'provisionalPlans/:id/stats',
            templateUrl: 'app/components/provisionalPlan/views/provisionalPlanDetailsStatsView.html',
            controller: 'provisionalPlan.details.stats.ctrl',
            resolve: {
                provisionalPlan: function ($stateParams, provisionalPlanWebApi) {
                    try {
                        return provisionalPlanWebApi.findById($stateParams.id);
                    } catch (err) {
                        throw new Error(err);
                    }
                },
                user: isAuthenticated
            }
        });

        $urlRouterProvider.otherwise('/');
    }
);