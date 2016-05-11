(function init() {
  'use strict';

  var movementComponent = {
    bindings: {
      provisionalPlan: '<',
      movement: '=',
      onUpdate: '&',
      onRemove: '&'
    },
    templateUrl: 'app/components/movement/views/movementComponentView.html',
    controller: MovementController,
    controllerAs: 'movementCtrl'
  };

  angular
    .module('appBudgetManager')
    .component('movement', movementComponent);

  MovementController.$inject = [
    '$modal',
    'movementWebApi'
  ];

  /**
   * @desc Controllers of Movements
   * @namespace MovementController
   * @memberOf Controllers
   */
  function MovementController($modal, movementWebApi) {

    var self = this;

    (function init() {
      defineScope();
      defineListeners();
    })();


    /**
     * @desc Defines all $scope variables
     * @function defineScope
     * @memberOf Controllers.MovementController
     */
    function defineScope() {
      self.confirmationMessage = 'Êtes vous sur de vouloir supprimer ce mouvement ?';
    }


    /**
     * @desc Attach view listeners to this controller
     * @function defineListeners
     * @memberOf Controllers.MovementController
     */
    function defineListeners() {
      self.inverseActiveStateClickListener = _inverseActiveState;
      self.openMovementDetailsModalClickListener = _openMovementDetailsModal;
      self.deleteClickListener = _openModalToConfirmDelete;
      self.openEditModalClickListener = _openEditModalClickListener;
    }


    /**
     * @desc Inverse active state of movement and call WS to save the change
     * @function _inverseActiveState
     * @memberOf Controllers.MovementController
     */
    function _inverseActiveState() {
      self.movement.active = !self.movement.active;
      movementWebApi.update({
        provisionalPlanId: self.provisionalPlan.id,
        movement: self.movement
      }).then(
        function () {
          self.onUpdate();
        }, function (reason) {
          throw new Error(reason);
        }
      );
    }


    /**
     * @desc Open a modal to display details informations about a movement
     * @function _openMovementDetailsModal
     * @memberOf Controllers.MovementController
     */
    function _openMovementDetailsModal() {
      //@todo Make an utilities method to build modal with component and get just $modal instance
      var _movementModalDetailsOpts = {
        template: '<movement-details-cmp movement="movement" modal-instance="modalInstance"></movement-details-cmp>',
        /*Re-wrap data in $scope to can access to this from HTML attributes of component
         We do this because it's an specially case : we use a modal
         */
        controller: function ($scope, $modalInstance) {
          $scope.modalInstance = $modalInstance;
          $scope.movement = jQuery.extend(true, {}, self.movement);
        }
      };
      var modalInstance = $modal.open(_movementModalDetailsOpts);
      modalInstance.result.then(function () {
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    }


    /**
     * @desc Open a modal to confirm action of deleting then call de delete webservice if user confirm action
     * @function _openModalToConfirmDelete
     * @param {function} successCallback Success callback to refresh an parent list for example, optionally
     * @memberOf Controllers.MovementController
     */
    function _openModalToConfirmDelete() {
      var confirmActionModalOpts = {
        templateUrl: 'app/shared/confirmAction/actionConfirmView.html', // Url du template HTML
        controller: 'actionConfirmController',
        resolve: {
          confirmationMessage: function () {
            return self.confirmationMessage;
          }
        }
      };
      self.confirmationMessage = 'Êtes vous sur de vouloir supprimer ce mouvement ?';
      var modalInstance = $modal.open(confirmActionModalOpts);
      modalInstance.result.then(function () {
        _delete({
          provisionalPlanId: self.provisionalPlan.id,
          movement: self.movement
        }).then(function () {
          self.onRemove();
        });
      }, function () {
        console.log('Suppression annulé.');
      });
    }


    /**
     * @desc Call the delete webservice
     * @function _delete
     * @param {object} param Object with provisionalPlanId and movement to remove
     * @memberOf Controllers.MovementController
     */
    function _delete(param) {
      return movementWebApi.remove(param).then(function () {
        self.provisionalPlan.movements = movementWebApi.getMovementsCollectionWithoutOne(
          self.provisionalPlan.movements,
          self.movement.id
        );
      }, function (reason) {
        throw new Error(reason);
      });
    }


    /**
     * @desc Open a modal to edit movement
     * @function _openEditModalClickListener
     * @memberOf Controllers.MovementController
     */
    function _openEditModalClickListener() {
      function openModal() {
        //@todo Make an utilities method to build modal with component and get just $modal instance
        var _movementModalAddOrEditOpts = {
          template: '<movement-form-cmp provisional-plan="provisionalPlan" movement="beanMovementByDefault" modal-instance="modalInstance"></movement-form-cmp>',
          /*Re-wrap data in $scope to can access to this from HTML attributes of component
           We do this because it's an specially case : we use a modal
           */
          controller: function ($scope, $modalInstance) {
            $scope.modalInstance = $modalInstance;
            $scope.beanMovementByDefault = jQuery.extend(true, {}, self.movement);
            $scope.provisionalPlan = self.provisionalPlan;
          }
        };
        var modalInstance = $modal.open(_movementModalAddOrEditOpts);
        modalInstance.result.then(function (movement) {
          _update({
            provisionalPlanId: self.provisionalPlan.id,
            movement: movement
          }).then(function () {
            self.onUpdate();
          });
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      }

      openModal();
    }


    /**
     * @desc Call the update webservice
     * @function _update
     * @param {object} param Object with provisionalPlanId and movement to
     *                       update.
     * @memberOf Controllers.MovementController
     */
    function _update(param) {
      return movementWebApi.update(param).then(
        function () {
          var movementToUpdate = _.find(self.provisionalPlan.movements, function (currentMovement) {
            return currentMovement.id === param.movement.id;
          });
          _.extend(movementToUpdate, param.movement);
        }, function (reason) {
          throw new Error(reason);
        });
    }
  }

})();
