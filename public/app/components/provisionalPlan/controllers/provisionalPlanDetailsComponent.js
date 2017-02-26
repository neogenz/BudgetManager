(function init() {
  'use strict';

  var provisionalPlanDetailsComponent = {
    bindings: {
      provisionalPlan: '='
    },
    templateUrl: 'app/components/provisionalPlan/views/provisionalPlanDetailsComponentView.html',
    controller: ProvisionalPlanDetailsController,
    controllerAs: 'provisionalPlanDetailsCtrl'
  };

  angular
    .module('appBudgetManager')
    .component('provisionalPlanDetailsCmp', provisionalPlanDetailsComponent);

  ProvisionalPlanDetailsController.$inject = [
    'provisionalPlanCalculus',
    '$modal',
    'provisionalPlanWebApi',
    '$state',
    '$scope',
    '$q'
  ];

  /**
   * @desc Controllers of ProvisionalPlanDetails component
   * @namespace ProvisionalPlanDetailsController
   */
  function ProvisionalPlanDetailsController(provisionalPlanCalculus, $modal, provisionalPlanWebApi, $state, $scope, $q) {
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
      _refreshTotalOfMovements();
      self.confirmationMessage = 'Êtes vous sur de vouloir supprimer ce plan prévisionnel ?';
    }


    /**
     * @desc Attach view listeners to this controller
     * @function defineListeners
     */
    function defineListeners() {
      // self.refresh = _refresh;
      self.openProvisionalPlanModalToEditListener = _openProvisionalPlanModalToEditListener;
      self.deleteClickListener = _deleteThisProvisionalPlan;
      self.openModalToAddMovementClickListener = _openModalToAddMovementClickListener;
      self.refreshTotalOfMovements = _refreshTotalOfMovements;
      // self.getTotalMovementsOf = _getTotalMovementsOf;
      // self.getTotalMovementWithoutDownOf = _getTotalMovementWithoutDownOf;
      // self.getTotalMovementWithoutUpOf = _getTotalMovementWithoutUpOf;
    }


    function _refreshTotalOfMovements() {
      self.totalOfMovements =
        provisionalPlanCalculus.getTotalMovementsOf(self.provisionalPlan);
      self.style = self.totalOfMovements > 0 ? {'color': 'green'} : {'color': 'red'};
    }


    /**
     * @desc Open a modal window with provisional plan form to edit
     * @function _openProvisionalPlanModal
     * @param {Object|null} provisionalPlan The provisional plan to edit or null if need to create a new
     */
    function _openProvisionalPlanModalToEditListener() {
      function openModal() {
        //@todo Make an utilities method to build modal with component and get just $modal instance
        var _provisionalPlanModalEditOpts = {
          template: '<provisional-plan-form-cmp provisional-plan="provisionalPlan" modal-instance="modalInstance"></provisional-plan-form-cmp>',
          /*Re-wrap data in $scope to can access to this from HTML attributes of component
           We do this because it's an specially case : we use a modal
           */
          controller: function ($scope, $modalInstance) {
            $scope.modalInstance = $modalInstance;
            $scope.provisionalPlan = jQuery.extend(true, {}, self.provisionalPlan);
          }
        };
        var modalInstance = $modal.open(_provisionalPlanModalEditOpts);

        modalInstance.result.then(function (provisionalPlan) {
          return _update(provisionalPlan);
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        }).then(function () {
          _refreshTotalOfMovements();
        }, function (reason) {
          throw new Error(reason);
        })
      }

      openModal();
    }


    /**
     * @desc Call the update webservice
     * @function _update
     * @param {ProvisionalPlan} provisionalPlan Provisional plan to update.
     */
    function _update(provisionalPlan) {
      return provisionalPlanWebApi.update(provisionalPlan).then(function () {
        _.extend(self.provisionalPlan, provisionalPlan);
      }, function (reason) {
        throw new Error(reason);
      });
    }


    /**
     * @desc Open a modal which ask if are you sure to delete the provisional plan and call deleting method if yes
     * @function _deleteThisProvisionalPlan
     */
    function _deleteThisProvisionalPlan() {
      function buildConfirmActionModalOpts(confirmationMessage) {
        return {
          templateUrl: 'app/shared/confirmAction/actionConfirmView.html', // Url du template HTML
          controller: 'actionConfirmController',
          resolve: {
            confirmationMessage: function () {
              return confirmationMessage;
            }
          }
        };
      }

      var modalInstance = $modal.open(buildConfirmActionModalOpts(self.confirmationMessage));
      modalInstance.result.then(function () {
        _remove();
      }, function () {
        console.log('Suppression annulé.');
      });
    }


    /**
     * @desc Call the webservice to delete provisional plan
     * @function _remove
     */
    function _remove() {
      provisionalPlanWebApi.remove(self.provisionalPlan).then(function () {
          $state.go('provisionalPlans');
        },
        function (reason) {
          console.error(reason);
        }
      );
    }


    /**
     * @desc Open a modal to add or edit movement depending this id value (null = add else edit)
     * @function _openModalToAddClickListener
     */
    function _openModalToAddMovementClickListener() {
      var beanMovementByDefault = null;
      //Build new movement by default
      beanMovementByDefault = neogenz.beans.factory.getBean('Movement', null);
      beanMovementByDefault.active = true;
      beanMovementByDefault.name = 'Mouvement d\'argent';
      //Assign to this movement the provisionalPlanId to add
      beanMovementByDefault.provisionalPlanId = self.provisionalPlan.id;

      function openModal() {
        //@todo Make an utilities method to build modal with component and get just $modal instance
        var _movementModalAddOpts = {
          template: '<movement-form-cmp provisional-plan="provisionalPlan" movement="beanMovementByDefault" modal-instance="modalInstance"></movement-form-cmp>',
          /*Re-wrap data in $scope to can access to this from HTML attributes of component
           We do this because it's an specially case : we use a modal
           */
          controller: function ($scope, $modalInstance) {
            $scope.modalInstance = $modalInstance;
            $scope.beanMovementByDefault = beanMovementByDefault;
            $scope.provisionalPlan = self.provisionalPlan;
          }
        };
        var modalInstance = $modal.open(_movementModalAddOpts);

        modalInstance.result.then(function (movement) {
          return provisionalPlanWebApi.addMovement(movement);
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        }).then(function (movementAdded) {
          if (!neogenz.utilities.isUndefinedOrNull(movementAdded)) {
            self.provisionalPlan.movements.push(movementAdded);
            _refreshTotalOfMovements();
          }
        }, function (reason) {
          throw new Error(reason);
        });
      }

      openModal();
    }
  }
}());
