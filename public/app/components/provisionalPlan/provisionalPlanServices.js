(function () {
    'use strict';

    angular
        .module('appBudgetManager')
        .service('provisionalPlanCalculus', ProvisionalPlanCalculus);
    
    function ProvisionalPlanCalculus() {
        this.getTotalMovementsOf = function (provisionalPlan) {
            var total = provisionalPlan.baseAmount;
            if (provisionalPlan.movements === undefined) {
                return 0;
            }
            for (var i = 0; i < provisionalPlan.movements.length; i++) {
                var currentMovement = provisionalPlan.movements[i];
                if (currentMovement.active) {
                    if (currentMovement.type === 'up') {
                        for (var j = 0; j < currentMovement.repeat; j++) {
                            total += currentMovement.amount;
                        }
                    }
                    else {
                        for (var y = 0; y < currentMovement.repeat; y++) {
                            total -= currentMovement.amount;
                        }
                    }
                }
            }
            return total;
        };

        this.getTotalMovementWithoutDownOf = function (provisionalPlan) {
            var total = provisionalPlan.baseAmount;
            if (provisionalPlan.movements === undefined) {
                return provisionalPlan.baseAmount;
            }
            for (var i = 0; i < provisionalPlan.movements.length; i++) {
                var currentMovement = provisionalPlan.movements[i];
                if (currentMovement.active) {
                    if (currentMovement.type === 'up') {
                        for (var j = 0; j < currentMovement.repeat; j++) {
                            total += currentMovement.amount;
                        }
                    }
                }
            }
            return total;
        };

        this.getTotalMovementWithoutUpOf = function (provisionalPlan) {
            if (provisionalPlan.movements === undefined) {
                return provisionalPlan.baseAmount;
            }
            var total = provisionalPlan.baseAmount;
            for (var i = 0; i < provisionalPlan.movements.length; i++) {
                var currentMovement = provisionalPlan.movements[i];
                if (currentMovement.active) {
                    if (currentMovement.type === 'down') {
                        for (var j = 0; j < currentMovement.repeat; j++) {
                            total -= currentMovement.amount;
                        }
                    }
                }
            }
            return total;
        };
    }
})();
