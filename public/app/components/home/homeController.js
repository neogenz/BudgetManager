/**
 * @desc Controllers of BudgetManager
 * @namespace Controllers
 */
(function () {
  'use strict';

  angular
    .module('appBudgetManager')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$localStorage', '$state'];

  /**
   * @desc Controllers of ProvisionalPlans
   * @namespace HomeController
   * @memberOf Controllers
   */
  function HomeController($localStorage, $state) {
    (function init() {
      _redirectToProvisionalPlanListIfUserAuthenthicated();
      defineScope();
      defineListeners();
    })();

    /**
     * @desc Defines all $scope variables
     * @function defineScope
     * @memberOf Controllers.ProvisionalPlanAddController
     */
    function defineScope() {
    }

    /**
     * @desc Attach view listeners to this controller
     * @function defineListeners
     * @memberOf Controllers.ProvisionalPlanAddController
     */
    function defineListeners() {
    }

    function _redirectToProvisionalPlanListIfUserAuthenthicated() {
      if (!_.isUndefined($localStorage.token) && !_.isNull($localStorage.token) && !_.isEmpty($localStorage.token)) {
        debugger;
        $state.go('provisionalPlans');
      }
    }
  }
})();
