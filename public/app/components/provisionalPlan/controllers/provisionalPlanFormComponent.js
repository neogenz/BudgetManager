(function init() {
  'use strict';

  var provisionalPlanFormComponent = {
    bindings: {
      provisionalPlan: '<',
      provisionalPlanModels: '<',
      modalInstance: '<',
      isForModel : '<'
    },
    templateUrl: 'app/components/provisionalPlan/views/provisionalPlanFormComponentView.html',
    controller: ProvisionalPlanFormController,
    controllerAs: 'provisionalPlanFormCtrl'
  };

  angular
    .module('appBudgetManager')
    .component('provisionalPlanFormCmp', provisionalPlanFormComponent);

  ProvisionalPlanFormController.$inject = [];

  /**
   * @desc Controllers of ProvisionalPlanDetails component
   */
  function ProvisionalPlanFormController() {
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
      self.modes = budgetManager.uiManager.formMode;
      self.mode = (_.isNull(self.provisionalPlan.id) ? budgetManager.uiManager.formMode.create : budgetManager.uiManager.formMode.edit);
      self.modeMessage = self.mode == self.modes.create ?
        'Ajouter un plan prévisionnel' : 'Édition d\'un plan prévisionnel';
      self.provisionalPlanForm = {
        byModel: false,
        modelChoosed: null
      };
    }


    /**
     * @desc Attach view listeners to this controller
     * @function defineListeners
     */
    function defineListeners() {
      self.ok = _ok;
      self.cancel = _cancel;
      self.refreshForm = _refreshForm;
    }


    /**
     * @desc Close the modal with a promise resolve to success
     * @function _ok
     */
    function _ok() {
      if(self.provisionalPlanForm.byModel){
        self.provisionalPlanForm.modelChoosed.name = self.provisionalPlan.name;
        self.modalInstance.close(self.provisionalPlanForm.modelChoosed);
      }else{
        self.modalInstance.close(self.provisionalPlan);
      }
    }


    /**
     * @desc Close the modal with a promise resolve to error
     * @function _cancel
     */
    function _cancel() {
      self.modalInstance.dismiss('Ajout du plan prévisionel annulé');
    }


    /**
     * @desc Hide or display a part of form by the "By model" state
     * @function _refreshForm
     */
    function _refreshForm(){

    }

  }
}());
