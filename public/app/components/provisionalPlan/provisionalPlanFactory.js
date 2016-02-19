appBudgetManager.factory('provisionalPlanWebApi',
    function ($http, $q) {

        return {
            findAll: _findAll,
            findById: _findById,
            addMovement: _addMovement,
            create: _create,
            remove: _remove,
            update: _update
        };

        //Web API
        function _findAll() {
            //var def = $q.defer();
            var requestOptions = app.helpers.buildGetRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans');
            var promise = $http(requestOptions);
            return promise.then(function (response) {
                debugger;
                var data = response.data;
                if (!data) {
                    throw new Error('data');
                }
                var factory = app.beans.factory;
                if (!_.isArray(data)) {
                    throw new Error('The result of promise must be an array');
                }
                var provisionalPlans = [];
                for (var i = 0; i < data.length; i++) {
                    provisionalPlans.push(factory.getBean('ProvisionalPlan', data[i]));
                }
                return provisionalPlans;
                //def.resolve(provisionalPlans);
            });
            //return def.promise;
        }

        function _findById(id) {
            var def = $q.defer();
            if (_.isNull(id) || _.isUndefined(id)) {
                def.reject('Id is null or undefined.');
            }
            else {
                var requestOptions = app.helpers.buildGetRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans/' + id);
                var promise = $http(requestOptions);
                promise.success(function (data) {
                    var factory = app.beans.factory;
                    var provisionalPlans = factory.getBean('ProvisionalPlan', data);
                    def.resolve(provisionalPlans);
                }).error(function () {
                    def.reject('DiscussionThread with id ' + id + ' is null.');
                });
            }
            return def.promise;
        }

        function _addMovement(movementToAdd) {
            var def = $q.defer();
            if (movementToAdd.provisionalPlanId === null) {
                def.reject('Id of provisional plan to add is null.');
            }
            else {
                var requestOptions = app.helpers.buildPostRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans/' + movementToAdd.provisionalPlanId, movementToAdd);
                var promise = $http(requestOptions);
                promise.success(function () {
                    def.resolve();
                }).error(function () {
                    def.reject('Add of movement to provisional plan has occured an error.');
                });
            }
            return def.promise;
        }

        function _create(provisionalPlan) {
            var def = $q.defer();
            var bodyReq = provisionalPlan;
            var promise;
            if (!app.helpers.isUndefinedOrNull(bodyReq)) {
                var requestOptions = app.helpers.buildPostRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans/', bodyReq);
                promise = $http(requestOptions);
                promise.success(function () {
                    def.resolve();
                }).error(function () {
                    def.reject();
                });
            }
            else {
                def.reject('bodyReq is null or undefined.');
            }
            return def.promise;
        }

        function _remove(provisionalPlan) {
            var def = $q.defer();
            var promise;
            if (app.helpers.isUndefinedOrNull(provisionalPlan.id) || provisionalPlan.id === '') {
                def.reject();
                return def.promise;
            }
            var requestOptions = app.helpers.buildDeleteRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans/' + provisionalPlan.id);
            promise = $http(requestOptions);
            promise.success(function () {
                def.resolve();
            }).error(function (reason) {
                def.reject(reason);
            });
            return def.promise;
        }

        function _update(provisionalPlan) {
            var def = $q.defer();
            delete provisionalPlan.movements;
            if (!app.helpers.isUndefinedOrNull(provisionalPlan)) {
                var bodyReq = provisionalPlan;
                var requestOptions = app.helpers.buildPutRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans', bodyReq);
                return $http(requestOptions);
            } else {
                def.reject();
                return def.promise;
            }

        }

    }
);