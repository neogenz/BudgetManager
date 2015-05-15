appBudgetManager.factory('provisionalPlanWebApi',
    function ($http, $q) {
        //Config
        var config = {
            domain: 'localhost',
            port: '5000',
            protocol: 'http'
        };
        var urlHeader = config.protocol + '://' + config.domain + ':' + config.port;

        //Internal services
        var internalFunctionsService = {
            buildGetPromiseToCallThisUrl: buildGetPromisesToCallThisUrl,
            buildPostPromisesToCallThisUrl: buildPostPromisesToCallThisUrl,
            buildDeletePromiseToCallThisUrl: buildDeletePromiseToCallThisUrl,
            buildPutPromisesToCallThisUrl: buildPutPromisesToCallThisUrl
        };

        return {
            findAllProvisionalPlan: findAllProvisionalPlan,
            findProvisionalPlanById: findProvisionalPlanById,
            addMovementToProvisionalPlan: addMovementToProvisionalPlan,
            addProvisionalPlan: addProvisionalPlan,
            deleteProvisionalPlan: deleteProvisionalPlan,
            updateOrCreateProvisionalPlan: updateOrCreateProvisionalPlan
        };

        //Web API
        function findAllProvisionalPlan() {
            var def = $q.defer();
            var promise = internalFunctionsService.buildGetPromiseToCallThisUrl(urlHeader + '/provisionalPlans');
            promise.success(function (data) {
                def.resolve(data);
            }).error(function () {
                def.reject('Echec de récupération des plans prévisionnels.');
            });
            return def.promise;
        };

        function findProvisionalPlanById(id) {
            var def = $q.defer();
            if (id === null) {
                def.reject('Id is null.');
            }
            else {
                var promise = internalFunctionsService.buildGetPromiseToCallThisUrl(urlHeader + '/provisionalPlans/' + id);
                promise.success(function (data) {
                    def.resolve(data);
                }).error(function () {
                    def.reject('DiscussionThread with id ' + id + ' is null.');
                });
            }
            return def.promise;
        };

        function addMovementToProvisionalPlan(provisionalPlanId, movementToAdd) {
            var def = $q.defer();
            if (provisionalPlanId === null) {
                def.reject('Id is null.');
            }
            else {
                var promise = internalFunctionsService.buildPostPromisesToCallThisUrl(urlHeader + '/provisionalPlans/' + provisionalPlanId, movementToAdd);
                promise.success(function () {
                    def.resolve();
                }).error(function () {
                    def.reject('Add of movement to provisional plan has occured an error.');
                });
            }
            return def.promise;
        };

        function addProvisionalPlan(provisionalPlan) {
            var def = $q.defer();
            var promise;
            if (provisionalPlan !== null) {
                promise = internalFunctionsService.buildPostPromisesToCallThisUrl(urlHeader + '/provisionalPlans', provisionalPlan)
                promise.success(function () {
                    def.resolve();
                }).error(function () {
                    def.reject();
                });
            }
            else {
                def.reject();
                //edit todo
            }
            return def.promise;
        };

        function deleteProvisionalPlan(provisionalPlan) {
            var def = $q.defer();
            var promise;
            if (provisionalPlan.id === undefined || provisionalPlan.id === null || provisionalPlan.id === "") {
                def.reject();
                return def.promise;
            }
            promise = internalFunctionsService.buildDeletePromiseToCallThisUrl(urlHeader + '/provisionalPlans/' + provisionalPlan.id);
            promise.success(function () {
                def.resolve();
            }).error(function (reason) {
                def.reject(reason);
            })
            return def.promise;
        };

        function updateOrCreateProvisionalPlan(provisionalPlan) {
            var def = $q.defer();
            var promise;
            if (provisionalPlan !== null) {
                promise = internalFunctionsService.buildPutPromisesToCallThisUrl(urlHeader + '/provisionalPlans', provisionalPlan)
                promise.success(function () {
                    def.resolve();
                }).error(function () {
                    def.reject();
                });
            }
            return def.promise;
        };

        //Internal functions
        function buildGetPromisesToCallThisUrl(url) {
            var req = {
                method: 'GET',
                url: url
            };
            return $http(req);
        };

        function buildDeletePromiseToCallThisUrl(url) {
            var req = {
                method: 'DELETE',
                url: url
            };
            return $http(req);
        };

        function buildPostPromisesToCallThisUrl(url, bodyRequest) {
            var req = {
                method: 'POST',
                url: url,
                hearders: {
                    'Content-Type': 'application/json'
                },
                data: bodyRequest
            };
            return $http(req);
        };

        function buildPutPromisesToCallThisUrl(url, bodyRequest) {
            var req = {
                method: 'PUT',
                url: url,
                hearders: {
                    'Content-Type': 'application/json'
                },
                data: bodyRequest
            };
            return $http(req);
        };
    }
);