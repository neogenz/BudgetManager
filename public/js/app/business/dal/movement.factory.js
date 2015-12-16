appBudgetManager.factory('movementWebApi',
    function ($http, $q) {
        return {
            update: update,
            remove: remove
        };
        function update(movement) {
            var def = $q.defer();
            var requestOptions = myLib.technical.buildPutRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/provisionalPlan/' + movement.provisionalPlanId + '/movements/' + movement.id, movement);
            var promise = $http(requestOptions);
            promise.success(function () {
                def.resolve();
            }).error(function () {
                def.reject();
            });
            return def.promise;
        }

        function remove(movement) {
            var def = $q.defer();
            var requestOptions = myLib.technical.buildDeleteRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/provisionalPlan/' + movement.provisionalPlanId + '/movements/' + movement.id, movement);
            var promise = $http(requestOptions);
            promise.success(function () {
                def.resolve();
            }).error(function () {
                def.reject();
            });
            return def.promise;
        }
    }
);