(function init() {
  'use strict';

  angular
    .module('appBudgetManager')
    .controller('MenuController', MenuController);

  MenuController.$inject = [
    'provisionalPlanWebApi',
    '$modal'
  ];

  function MenuController(provisionalPlanWebApi, $modal) {
    var self = this;

    defineScope();
    defineListener();

    function defineScope() {
      self.test = ' test';
    }

    function defineListener() {
      self.openModalToAddProvisionalPlanModelClickListener = _openModalToAddProvisionalPlanModelClickListener;
    }


    /**
     * @desc Open a modal to add provisionalPlan
     * @function _openModalToAddProvisionalPlanModelClickListener
     */
    function _openModalToAddProvisionalPlanModelClickListener() {
      var provisionalPlanByDefault = null;
      //Build new provisionalPlan by default
      provisionalPlanByDefault = neogenz.beans.factory.getBean('ProvisionalPlan', {isModel: true});
      function openModal() {
        //@todo Make an utilities method to build modal with component and get just $modal instance
        var _provisionalPlanModalAddOpts = {
          template: '<provisional-plan-form-cmp provisional-plan="provisionalPlanByDefault" modal-instance="modalInstance" is-for-model="true"></provisional-plan-form-cmp>',
          /*Re-wrap data in $scope to can access to this from HTML attributes of component
           We do this because it's an specially case : we use a modal
           */
          controller: function ($scope, $modalInstance) {
            $scope.modalInstance = $modalInstance;
            $scope.provisionalPlanByDefault = provisionalPlanByDefault;
          }
        };
        var modalInstance = $modal.open(_provisionalPlanModalAddOpts);

        modalInstance.result.then(function (provisionalPlan) {
            return provisionalPlanWebApi.create(provisionalPlan);
          }, function () {
            console.log('Modal dismissed at: ' + new Date());
          })
          .then(function (provisionalPlanAdded) {
            if (!neogenz.utilities.isUndefinedOrNull(provisionalPlanAdded)) {
              self.provisionalPlans.push(provisionalPlanAdded);
            }
          }, function (reason) {
            throw new Error(reason);
          });
      }

      openModal();
    }

  }

})();