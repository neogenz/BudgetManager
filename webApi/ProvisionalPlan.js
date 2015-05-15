module.exports = function (provider) {

    var models = require("../models");

    var createProvisionalPlan = function (req, res) {
        var newProvisionalPlan = {
            name: req.body.name,
            valid: ((req.body.valid === undefined || req.body.valid === null) ? true : req.body.valid),
            baseAmount: req.body.baseAmount
        };
        console.log(newProvisionalPlan);
        models.ProvisionalPlan.create(newProvisionalPlan).success(function () {
            res.sendStatus(200);
        });
    };

    var getAllProvisionalPlans = function (req, res) {
        models.ProvisionalPlan.findAll({include: [models.Movement]}).success(function (provisionalPlans) {
            res.send(provisionalPlans);
        });
    };

    var getProvisionalPlanById = function (req, res) {
        models.ProvisionalPlan.findOne({
            where: {id: req.params.id},
            include: [models.Movement]
        }).success(function (provisionalPlan) {
            res.send(provisionalPlan);
        });
    };

    var removeProvisionalPlan = function (req, res) {
        var id = req.params.id;
        models.ProvisionalPlan.findOne(id).success(function (provisionalPlan) {
            provisionalPlan.destroy().success(function () {
                res.sendStatus(200);
            });
        });
    };

    var addOrCreateMovement = function (req, res) {
        var movementId = req.body.id;
        var movementToAdd = req.body;
        delete movementToAdd.id;
        var id = req.params.id;
        models.ProvisionalPlan.findOne(id).success(function (provisionalPlan) {
                models.Movement.findOrCreate({where: {id: movementId}, defaults: movementToAdd})
                    .spread(function (movement) {
                        provisionalPlan.addMovement(movement.get().id).success(function () {
                            res.sendStatus(200);
                        })
                    }
                );
            }
        );
    };

    var updateOrCreateProvisionalPlan = function (req, res) {
        var newProvisionalPlan = {
            id: req.body.id,
            name: req.body.name,
            valid: ((req.body.valid === undefined || req.body.valid === null) ? true : req.body.valid),
            baseAmount: req.body.baseAmount
        };
        models.ProvisionalPlan.upsert(newProvisionalPlan).then(function(){
            res.sendStatus(200);
        }, function(){

        });
    };

    provider.post("/provisionalPlans", createProvisionalPlan);
    provider.post("/provisionalPlans/:id", addOrCreateMovement);
    provider.get("/provisionalPlans", getAllProvisionalPlans);
    provider.get("/provisionalPlans/:id", getProvisionalPlanById);
    provider.put("/provisionalPlans", updateOrCreateProvisionalPlan);
    provider.delete("/provisionalPlans/:id", removeProvisionalPlan);
}
