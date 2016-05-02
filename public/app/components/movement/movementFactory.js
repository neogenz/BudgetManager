(function () {
    'use strict';
    angular
        .module('appBudgetManager')
        .factory('movementWebApi', MovementWebAPI);
    
    MovementWebAPI.$inject = ['$http', '$q'];

    function MovementWebAPI($http, $q) {

        return {
            update: _update,
            remove: _remove,
            getMovementsCollectionWithoutOne: _getMovementsCollectionWithoutOne
        };


        /**
         * @name _update
         * Call the WS to update movement
         * @param {object} param Object with provisionalPlanId and movement to update
         * @returns {d.promise|*|promise}
         */
        function _update(param) {
            var def = $q.defer();
            var requestOptions = neogenz.httpUtilities.buildPutRequestOptToCallThisUrl(
                '/me/provisionalPlans/' + param.provisionalPlanId + '/movements',
                param.movement
            );
            var promise = $http(requestOptions);
            promise.success(function () {
                def.resolve();
            }).error(function () {
                def.reject();
            });
            return def.promise;
        }


        /**
         * @name _remove
         * Call the WS to remove movement
         * @param {object} param Object with provisionalPlanId and movement to remove
         * @returns {d.promise|*|promise}
         */
        function _remove(param) {
            var def = $q.defer();
            var requestOptions = neogenz.httpUtilities.buildDeleteRequestOptToCallThisUrl(
                '/me/provisionalPlans/' + param.provisionalPlanId + '/movements/' + param.movement.id
            );
            var promise = $http(requestOptions);
            promise.success(function () {
                def.resolve();
            }).error(function () {
                def.reject();
            });
            return def.promise;
        }

        /**
         * @name _getMovementsCollectionWithoutOne
         * Get an movement's collection without one specified by ID.
         * @param {object} param Object with movements collection and
         *                 movement id to remove.
         * @returns {array<Movement>}
         */
        function _getMovementsCollectionWithoutOne(movements, movementId) {
            return _.reject(movements, function (movement) {
                return movement.id === movementId;
            });
        }
    }
})();
