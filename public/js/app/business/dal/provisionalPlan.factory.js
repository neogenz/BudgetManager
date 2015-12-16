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
            var def = $q.defer();
            var requestOptions = myLib.technical.buildGetRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans');
            var promise = $http(requestOptions);
            promise.success(function (data) {
                if (!data) {
                    throw new Error('data');
                }
                var factory = app.bean.factory;
                if (!_.isArray(data)) {
                    throw new Error('The result of promise must be an array');
                }
                var provisionalPlans = [];
                for (var i = 0; i < data.length; i++) {
                    provisionalPlans.push(factory.createBean('ProvisionalPlan', data[i]));
                }

                def.resolve(provisionalPlans);
            }).error(function () {
                def.reject('Echec de récupération des plans prévisionnels.');
            });
            return def.promise;
        }

        function _findById(id) {
            var def = $q.defer();
            if (_.isNull(id) || _.isUndefined(id)) {
                def.reject('Id is null or undefined.');
            }
            else {
                var requestOptions = myLib.technical.buildGetRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans/' + id);
                var promise = $http(requestOptions);
                promise.success(function (data) {
                    var factory = app.bean.factory;
                    var provisionalPlans = factory.createBean('ProvisionalPlan', data);
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
                var requestOptions = myLib.technical.buildPostRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans/' + movementToAdd.provisionalPlanId, movementToAdd);
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
            if (provisionalPlan !== null) {
                var requestOptions = myLib.technical.buildPostRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans/', bodyReq);
                promise = $http(requestOptions);
                promise.success(function () {
                    def.resolve();
                }).error(function () {
                    def.reject();
                });
            }
            else {
                def.reject();
            }
            return def.promise;
        }

        function _remove(provisionalPlan) {
            var def = $q.defer();
            var promise;
            if (provisionalPlan.id === undefined || provisionalPlan.id === null || provisionalPlan.id === "") {
                def.reject();
                return def.promise;
            }
            var requestOptions = myLib.technical.buildDeleteRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans/' + provisionalPlan.id);
            promise = $http(requestOptions);
            promise.success(function () {
                def.resolve();
            }).error(function (reason) {
                def.reject(reason);
            })
            return def.promise;
        }

        function _update(provisionalPlan) {
            var def = $q.defer();
            var promise;
            delete provisionalPlan.movements;
            if (provisionalPlan !== null) {
                var bodyReq = provisionalPlan;
                var requestOptions = myLib.technical.buildPutRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/me/provisionalPlans', bodyReq);
                promise = $http(requestOptions);
                promise.success(function () {
                    def.resolve();
                }).error(function () {
                    def.reject();
                });
            }
            return def.promise;
        }

    }
);