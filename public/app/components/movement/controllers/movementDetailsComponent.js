(function init() {
  'use strict';

  var movementDetailsComponent = {
    bindings: {
      movement: '<',
      modalInstance: '<'
    },
    templateUrl: 'app/components/movement/views/movementDetailsComponentView.html',
    controller: MovementDetailsController,
    controllerAs: 'movementDetailsCtrl'
  };

  angular
    .module('appBudgetManager')
    .component('movementDetailsCmp', movementDetailsComponent);

  MovementDetailsController.$inject = [];

  /**
   * @desc Controllers of Movements
   */
  function MovementDetailsController() {
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
      self.arrowClass = (self.movement.type === 'up') ? 'fa-arrow-up color-green' : 'fa-arrow-down color-red';
    }


    /**
     * @desc Attach view listeners to this controller
     * @function defineListeners
     */
    function defineListeners() {
      self.ok = _ok;
    }


    /**
     * @desc Close the modal with a promise resolve to success
     * @function _ok
     */
    function _ok() {
      self.modalInstance.close();
    }
  }

})();
