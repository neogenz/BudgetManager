(function () {
  'use strict';

  var isAuthenticated = function ($rootScope, $q, $http, $state) {
    var defer = $q.defer();
    $http.get('/isAuthenticated').then(
      function (response) {
        // Authenticated
        if (response.status !== undefined && response.status !== 200) {
          console.log(response.data);
          $state.go('login');
        } else {
          $rootScope.user = response.data;
          defer.resolve(true);
        }
      }, function () {
        $state.go('login');
      });
    return defer.promise;
  };

  angular
    .module('appBudgetManager')
    .config(RoutingInitialization);
  RoutingInitialization.$intject = ['$stateProvider', '$urlRouterProvider'];

  function RoutingInitialization($stateProvider, $urlRouterProvider) {
    // Système de routage
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/homeView.html',
        controller: 'HomeController',
        resolve: ['$stateParams', '$state', function ($stateParams, $state) {
          debugger;
        }]
      })
      .state('login', {
        url: '/login',
        controller: 'SigninController',
        templateUrl: 'app/components/authentication/views/signinView.html'
      })
      .state('signup', {
        url: '/signup',
        controller: 'SignupController',
        templateUrl: 'app/components/authentication/views/signupView.html'
      })
      .state('userProfile', {
        url: '/myAccount',
        controller: 'userProfileController',
        templateUrl: 'app/components/user/views/userProfileView.html',
        resolve: {
          user: isAuthenticated
        }
      }).state('provisionalPlans', {
      url: '/provisionalPlans',
      template: '<provisional-plan-list-cmp provisional-plans="provisionalPlans"></provisional-plan-list-cmp>',
      controller: ['$scope', 'provisionalPlans', function ($scope, provisionalPlans) {
        $scope.provisionalPlans = provisionalPlans;
      }],
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
      url: '/provisionalPlans/:id',
      template: '<provisional-plan-details-cmp provisional-plan="provisionalPlan"></provisional-plan-details-cmp>',
      controller: ['$scope', 'provisionalPlan', function ($scope, provisionalPlan) {
        $scope.provisionalPlan = provisionalPlan;
      }],
      //component: 'provisionalPlanDetailsCmp',
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
    }).state('provisionalPlanDetailsStats', {
      url: '/provisionalPlans/:id/stats',
      templateUrl: 'app/components/provisionalPlan/views/provisionalPlanDetailsStatsView.html',
      controller: 'provisionalPlanDetailsStatsController',
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
})();
