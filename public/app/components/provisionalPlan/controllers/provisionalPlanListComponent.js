(function init() {
  'use strict';

  var provisionalPlanListComponent = {
    bindings: {
      provisionalPlans: '='
    },
    templateUrl: 'app/components/provisionalPlan/views/provisionalPlanListComponentView.html',
    controller: ProvisionalPlanListController,
    controllerAs: 'provisionalPlanListCtrl'
  };

  angular
    .module('appBudgetManager')
    .component('provisionalPlanListCmp', provisionalPlanListComponent);

  ProvisionalPlanListController.$inject = [
    'provisionalPlanWebApi',
    '$modal'
  ];

  /**
   * @desc Controllers of ProvisionalPlanDetails component
   */
  function ProvisionalPlanListController(provisionalPlanWebApi, $modal) {
    var self = this;

    (function init() {
      defineScope();
      defineListeners();
    })();


    /**
     * @desc Defines all self variables
     * @function defineScope
     */
    function defineScope() {
      self.multiplicityTitle = '';
      self.pluralTitle = '';
      _refreshTitles();
    }


    /**
     * @desc Attach view listeners to this controller
     * @function defineListeners
     */
    function defineListeners() {
      self.openModalToAddProvisionalPlanClickListener = _openModalToAddProvisionalPlanClickListener;
      self.refreshTitles = _refreshTitles;
    }


    function _refreshTitles() {
      var _provisionalPlansLength = self.provisionalPlans.length;
      if (_provisionalPlansLength === 0) {
        self.multiplicityTitle = 'Aucun';
        self.pluralTitle = 'plan prévisionnel';
      } else if (_provisionalPlansLength === 1) {
        self.multiplicityTitle = 'Dernier';
        self.pluralTitle = 'plan prévisionnel';
      } else {
        self.multiplicityTitle = _provisionalPlansLength + ' dernier';
        self.pluralTitle = 'plans prévisionnels';
      }

    }


    /**
     * @desc Open a modal to add provisionalPlan
     * @function _openModalToAddProvisionalPlanClickListener
     */
    function _openModalToAddProvisionalPlanClickListener() {
      var provisionalPlanByDefault = null;
      //Build new provisionalPlan by default
      provisionalPlanByDefault = neogenz.beans.factory.getBean('ProvisionalPlan', null);

      function openModal() {
        //@todo Make an utilities method to build modal with component and get just $modal instance
        var _provisionalPlanModalAddOpts = {
          template: '<provisional-plan-form-cmp provisional-plan="provisionalPlanByDefault" modal-instance="modalInstance"></provisional-plan-form-cmp>',
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
              _refreshTitles();
            }
          }, function (reason) {
            throw new Error(reason);
          });
      }

      openModal();
    }
  }
}());
