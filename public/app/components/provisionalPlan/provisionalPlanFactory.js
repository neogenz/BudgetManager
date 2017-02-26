(function () {
  'use strict';
  angular
    .module('appBudgetManager')
    .factory('provisionalPlanWebApi', ProvisionalPlanWebAPI);

  ProvisionalPlanWebAPI.$inject = ['$http', '$q'];
  function ProvisionalPlanWebAPI($http, $q) {

    return {
      findAll: _findAll,
      findAllNotModel: _findAllNotModel,
      findAllModel: _findAllModel,
      findById: _findById,
      addMovement: _addMovement,
      create: _create,
      remove: _remove,
      update: _update
    };

    //Web API
    function _findAll() {
      //var def = $q.defer();
      var requestOptions = neogenz.httpUtilities.buildGetRequestOptToCallThisUrl(
        '/me/provisionalPlans'
      );
      var promise = $http(requestOptions);
      return promise.then(function (response) {
        var data = response.data;
        if (!data) {
          throw new Error('data');
        }
        var factory = neogenz.beans.factory;
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

    function _findAllNotModel() {
      var requestOptions = neogenz.httpUtilities.buildGetRequestOptToCallThisUrl(
        '/me/provisionalPlans/notModel'
      );
      return $http(requestOptions).then(function (response) {
        var data = response.data;
        if (!data) {
          throw new Error('data');
        }
        var factory = neogenz.beans.factory;
        if (!_.isArray(data)) {
          throw new Error('The result of promise must be an array');
        }
        var provisionalPlans = [];
        for (var i = 0; i < data.length; i++) {
          provisionalPlans.push(factory.getBean('ProvisionalPlan', data[i]));
        }
        return provisionalPlans;
      });
    }

    function _findAllModel(){
      var requestOptions = neogenz.httpUtilities.buildGetRequestOptToCallThisUrl(
        '/me/provisionalPlans/model'
      );
      return $http(requestOptions).then(function (response) {
        var data = response.data;
        if (!data) {
          throw new Error('data');
        }
        var factory = neogenz.beans.factory;
        if (!_.isArray(data)) {
          throw new Error('The result of promise must be an array');
        }
        var provisionalPlans = [];
        for (var i = 0; i < data.length; i++) {
          provisionalPlans.push(factory.getBean('ProvisionalPlan', data[i]));
        }
        return provisionalPlans;
      });
    }

    function _findById(id) {
      var def = $q.defer();
      if (_.isNull(id) || _.isUndefined(id)) {
        def.reject('Id is null or undefined.');
      }
      else {
        var requestOptions = neogenz.httpUtilities.buildGetRequestOptToCallThisUrl(
          '/me/provisionalPlans/' + id
        );
        var promise = $http(requestOptions);
        promise.success(function (data) {
          var factory = neogenz.beans.factory;
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
        var requestOptions = neogenz.httpUtilities.buildPostRequestOptToCallThisUrl(
          '/me/provisionalPlans/' + movementToAdd.provisionalPlanId,
          movementToAdd
        );
        var promise = $http(requestOptions);
        promise.success(function (rawMovementAdded) {
          debugger;
          var beanMovementAdded = neogenz.beans.factory.getBean('Movement', rawMovementAdded);
          def.resolve(beanMovementAdded);
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
      if (!neogenz.utilities.isUndefinedOrNull(bodyReq)) {
        var requestOptions = neogenz.httpUtilities.buildPostRequestOptToCallThisUrl('/me/provisionalPlans/', bodyReq);
        promise = $http(requestOptions);
        promise.success(function (rawCreated) {
          var created = neogenz.beans.factory.getBean('ProvisionalPlan', rawCreated);
          def.resolve(created);
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
      if (neogenz.utilities.isUndefinedOrNull(provisionalPlan.id) || provisionalPlan.id === '') {
        def.reject();
        return def.promise;
      }
      var requestOptions = neogenz.httpUtilities.buildDeleteRequestOptToCallThisUrl('/me/provisionalPlans/' + provisionalPlan.id);
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
      if (!neogenz.utilities.isUndefinedOrNull(provisionalPlan)) {
        var bodyReq = provisionalPlan;
        var requestOptions = neogenz.httpUtilities.buildPutRequestOptToCallThisUrl('/me/provisionalPlans', bodyReq);
        return $http(requestOptions);
      } else {
        def.reject();
        return def.promise;
      }

    }

  }

})();
