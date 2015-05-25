appBudgetManager.controller('login.ctrl', function ($rootScope, $scope, $state, authenticateWebApi) {
        $scope.signin = function () {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            authenticateWebApi.signin(formData).then(function () {
                $state.go('provisionalPlans');
            }, function (err) {
                //@todo manage error
                $rootScope.error = 'Une erreur est survenue : ' + err;
                $state.go('login');
                //@todo possibly an event on flashErrorMessage
            })
        };
    }
);