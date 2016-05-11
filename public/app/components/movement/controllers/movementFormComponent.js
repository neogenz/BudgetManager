(function init() {
  'use strict';

  var movementFormComponent = {
    bindings: {
      provisionalPlan: '=',
      movement: '=',
      modalInstance: '='
    },
    templateUrl: 'app/components/movement/views/movementFormComponentView.html',
    controller: MovementFormController,
    controllerAs: 'movementFormCtrl'
  };

  angular
    .module('appBudgetManager')
    .component('movementFormCmp', movementFormComponent);

  MovementFormController.$inject = [];

  /**
   * @desc Controllers of Movements
   * @namespace MovementController
   */
  function MovementFormController() {
    var self = this;

    (function init() {
      defineScope();
      defineListeners();
    })();


    /**
     * @desc Defines all $scope variables
     * @function defineScope
     */
    function defineScope() {
      self.modes = budgetManager.uiManager.formMode;
      self.mode = (_.isNull(self.movement.id) ? budgetManager.uiManager.formMode.create : budgetManager.uiManager.formMode.edit);
      self.provisionalPlanTitle = self.provisionalPlan.name;
      self.modeMessage = self.mode == self.modes.create ? 'Ajouter un mouvement à ' : 'Editer un mouvement de';
    }


    /**
     * @desc Attach view listeners to this controller
     * @function defineListeners
     */
    function defineListeners() {
      self.ok = _ok;
      self.cancel = _cancel;
    }


    /**
     * @desc Close the modal with a promise resolve to success
     * @function _ok
     */
    function _ok() {
      self.modalInstance.close(self.movement);
    }


    /**
     * @desc Close the modal with a promise resolve to error
     * @function _cancel
     */
    function _cancel() {
      self.modalInstance.dismiss('Ajout du plan prévisionel annulé');
    }
  }

})();
