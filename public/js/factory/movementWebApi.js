appBudgetManager.factory('movementWebApi', ['$http', '$q',
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
            findAllMovement: findAllMovement,
            findAllMovementById: findAllMovementById,
            createMovement: createMovement,
            update: update,
            remove: remove
        };

        //Web API
        function findAllMovement() {
            var def = $q.defer();
            var promise = internalFunctionsService.buildGetPromiseToCallThisUrl(urlHeader + '/movements');
            promise.success(function (data) {
                def.resolve(data);
            }).error(function () {
                def.reject('Echec de récupération des mouvements.');
            });
            return def.promise;
        };

        function findAllMovementById(id) {
            var def = $q.defer();
            if (id === null) {
                def.reject('Id is null.');
            }
            else {
                var promise = internalFunctionsService.buildGetPromiseToCallThisUrl(urlHeader + '/movements/' + id);
                promise.success(function (data) {
                    def.resolve(data);
                }).error(function () {
                    def.reject('Movement with id ' + id + ' is null.');
                });
            }
            return def.promise;
        };

        function createMovement(movementToAdd) {
            var def = $q.defer();
            var promise = internalFunctionsService.buildPostPromisesToCallThisUrl(urlHeader + '/movements', movementToAdd);
            promise.success(function () {
                def.resolve();
            }).error(function () {
                def.reject('Creation of movement has occured an error.');
            });
            return def.promise;
        };

        function update(movement) {
            var def = $q.defer();
            var promise = internalFunctionsService.buildPutPromisesToCallThisUrl(urlHeader + '/movements/' + movement.id, movement);
            promise.success(function () {
                def.resolve();
            }).error(function () {
                def.reject();
            });
            return def.promise;
        };

        function remove(movement){
            var def = $q.defer();
            var promise = internalFunctionsService.buildDeletePromiseToCallThisUrl(urlHeader + '/movements/' + movement.id, movement);
            promise.success(function(){
                def.resolve();
            }).error(function(){
               def.reject();
            });
            return def.promise;
        }

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
]);