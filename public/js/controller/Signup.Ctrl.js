appBudgetManager.controller('signup.ctrl', function ($rootScope, $scope, $location, $state, $localStorage, authenticateWebApi) {
        $scope.signup = function () {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            authenticateWebApi.signup(formData).then(function () {
                $state.go('provisionalPlans');
            }, function () {
                $rootScope.error = 'Failed to signup';
            })
        };
    }
);