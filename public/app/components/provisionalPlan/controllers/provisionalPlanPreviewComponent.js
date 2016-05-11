(function init() {
  'use strict';

  var provisionalPlanPreviewComponent = {
    bindings: {
      provisionalPlan: '='
    },
    templateUrl: 'app/components/provisionalPlan/views/provisionalPlanPreviewComponentView.html',
    controller: ProvisionalPlanPreviewController,
    controllerAs: 'provisionalPlanPreviewCtrl'
  };

  angular
    .module('appBudgetManager')
    .component('provisionalPlanPreviewCmp', provisionalPlanPreviewComponent);

  ProvisionalPlanPreviewController.$inject = ['provisionalPlanCalculus'];

  /**
   * @desc Controllers of ProvisionalPlanPreview component
   * @namespace ProvisionalPlanPreviewController
   */
  function ProvisionalPlanPreviewController(provisionalPlanCalculus) {
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
      self.totalOfMovements =
        provisionalPlanCalculus.getTotalMovementsOf(self.provisionalPlan);
      self.style = self.totalOfMovements > 0 ? {'color': 'green'} : {'color': 'red'}
    }


    /**
     * @desc Attach view listeners to this controller
     * @function defineListeners
     */
    function defineListeners() {
    }
  }
}());
