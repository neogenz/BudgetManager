appBudgetManager.service('provisionalPlanCalculus', function () {
    return {
        getTotalMovementsOf: getTotalMovementsOf,
        getTotalMovementWithoutDownOf: getTotalMovementWithoutDownOf,
        getTotalMovementWithoutUpOf: getTotalMovementWithoutUpOf
    };

    function getTotalMovementsOf(provisionalPlan) {
        var total = provisionalPlan.baseAmount;
        for (var i = 0; i < provisionalPlan.Movements.length; i++) {
            var currentMovement = provisionalPlan.Movements[i];
            if (currentMovement.active) {
                if (currentMovement.type === "up") {
                    for (var j = 0; j < currentMovement.repeat; j++) {
                        total += currentMovement.amount;
                    }
                }
                else {
                    for (var j = 0; j < currentMovement.repeat; j++) {
                        total -= currentMovement.amount;
                    }
                }
            }
        }
        return total;
    };

    function getTotalMovementWithoutDownOf(provisionalPlan) {
        var total = provisionalPlan.baseAmount;
        for (var i = 0; i < provisionalPlan.Movements.length; i++) {
            var currentMovement = provisionalPlan.Movements[i];
            if (currentMovement.active) {
                if (currentMovement.type === "up") {
                    for (var j = 0; j < currentMovement.repeat; j++) {
                        total += currentMovement.amount;
                    }
                }
            }
        }
        return total;
    };

    function getTotalMovementWithoutUpOf(provisionalPlan) {
        var total = provisionalPlan.baseAmount;
        for (var i = 0; i < provisionalPlan.Movements.length; i++) {
            var currentMovement = provisionalPlan.Movements[i];
            if (currentMovement.active) {
                if (currentMovement.type === "down") {
                    for (var j = 0; j < currentMovement.repeat; j++) {
                        total -= currentMovement.amount;
                    }
                }
            }
        }
        return total;
    };
});