appBudgetManager.factory('movementWebApi',
    function ($http, $q) {
        return {
            update: update,
            remove: remove
        };
        function update(movement) {
            var def = $q.defer();
            var requestOptions = app.httpRequestOptions.buildPutRequestOptToCallThisUrl(app.httpRequestOptions.urlHeader + '/movements/' + movement.id, movement);
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
            var requestOptions = app.httpRequestOptions.buildDeleteRequestOptToCallThisUrl(app.httpRequestOptions.urlHeader + '/movements/' + movement.id, movement);
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