(function init() {
  'use strict';

  var provisionalPlanListComponent = {
    bindings: {
      provisionalPlansModels: '='
    },
    templateUrl: 'app/components/provisionalPlanModel/views/provisionalPlanModelListView.html',
    controller: ProvisionalPlanModelListController,
    controllerAs: 'provisionalPlanModelListCtrl'
  };

  angular
    .module('appBudgetManager')
    .component('provisionalPlanModelListCmp', provisionalPlanListComponent);

  ProvisionalPlanModelListController.$inject = [
    'provisionalPlanWebApi',
    '$modal'
  ];

  /**
   * @desc Controllers of ProvisionalPlanDetails component
   */
  function ProvisionalPlanModelListController(provisionalPlanWebApi, $modal) {
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
      self.openModalToAddProvisionalPlanModelModelClickListener = _openModalToAddProvisionalPlanModelModelClickListener;
      self.refreshTitles = _refreshTitles;
    }


    function _refreshTitles() {
      var _provisionalPlansModelsLength = self.provisionalPlansModels.length;
      if (_provisionalPlansModelsLength === 0) {
        self.multiplicityTitle = 'Aucun';
        self.pluralTitle = 'modèle de plan prévisionnel';
      } else if (_provisionalPlansModelsLength === 1) {
        self.multiplicityTitle = 'Dernier';
        self.pluralTitle = 'modèle';
      } else {
        self.multiplicityTitle = _provisionalPlansModelsLength + ' dernier';
        self.pluralTitle = 'modèles de plans prévisionnels';
      }

    }


    /**
     * @desc Open a modal to add provisionalPlan
     * @function _openModalToAddProvisionalPlanModelModelClickListener
     */
    function _openModalToAddProvisionalPlanModelModelClickListener() {
      var provisionalPlanModelByDefault = null;
      //Build new provisionalPlan by default
      provisionalPlanModelByDefault = neogenz.beans.factory.getBean('ProvisionalPlan', {isModel: true});
      function openModal() {
        //@todo Make an utilities method to build modal with component and get just $modal instance
        var _provisionalPlanModelModalAddOpts= {
          template: '<provisional-plan-form-cmp provisional-plan="provisionalPlanModelByDefault" modal-instance="modalInstance" is-for-model="true"></provisional-plan-form-cmp>',
          /*Re-wrap data in $scope to can access to this from HTML attributes of component
           We do this because it's an specially case : we use a modal
           */
          controller: function ($scope, $modalInstance) {
            $scope.modalInstance = $modalInstance;
            debugger;
            $scope.provisionalPlanModelByDefault = provisionalPlanModelByDefault;
          }
        };
        var modalInstance = $modal.open(_provisionalPlanModelModalAddOpts);

        modalInstance.result.then(function (provisionalPlanModel) {
          debugger;
            return provisionalPlanWebApi.create(provisionalPlanModel);
          }, function () {
            console.log('Modal dismissed at: ' + new Date());
          })
          .then(function (provisionalPlanModelAdded) {
            if (!neogenz.utilities.isUndefinedOrNull(provisionalPlanModelAdded)) {
              self.provisionalPlansModels.push(provisionalPlanModelAdded);
            }
          }, function (reason) {
            throw new Error(reason);
          });
      }

      openModal();
    }
  }
}());
