appBudgetManager.controller('logout.ctrl', function ($rootScope, $scope, $location, $state, $localStorage, authenticateWebApi) {
        $scope.logout = function () {
            authenticateWebApi.logout().then(function () {
                $rootScope.user = null;
                $state.go('home');
            });
        };
    }
);