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
            var requestOptions = app.httpRequestOptions.buildGetRequestOptToCallThisUrl(app.httpRequestOptions.urlHeader + '/provisionalPlans');
            var promise = $http(requestOptions);
            promise.success(function (data) {
                if (!data) {
                    throw new Error('data');
                }
                var factory = app.model.factory;
                var provisionalPlans = factory.runFactory(data, 'ProvisionalPlan');
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
                var requestOptions = app.httpRequestOptions.buildGetRequestOptToCallThisUrl(app.httpRequestOptions.urlHeader + '/provisionalPlans/' + id);
                var promise = $http(requestOptions);
                promise.success(function (data) {
                    var factory = app.model.factory;
                    var provisionalPlans = factory.runFactory(data, 'ProvisionalPlan');
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
                var requestOptions = app.httpRequestOptions.buildPostRequestOptToCallThisUrl(app.httpRequestOptions.urlHeader + '/provisionalPlans/' + movementToAdd.provisionalPlanId, movementToAdd);
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
                var requestOptions = app.httpRequestOptions.buildPostRequestOptToCallThisUrl(app.httpRequestOptions.urlHeader + '/provisionalPlans/', bodyReq);
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
            var requestOptions = app.httpRequestOptions.buildDeleteRequestOptToCallThisUrl(app.httpRequestOptions.urlHeader + '/provisionalPlans/' + provisionalPlan.id);
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
                var requestOptions = app.httpRequestOptions.buildPutRequestOptToCallThisUrl(app.httpRequestOptions.urlHeader + '/provisionalPlans', bodyReq);
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