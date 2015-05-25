module.exports = function (provider, models, jwt) {

    var tokenUtils = require("../utils/token")(jwt);

    var createProvisionalPlan = function (req, res) {
        var userId = req.user.id;
        var newProvisionalPlan = {
            name: req.body.name,
            valid: ((req.body.valid === undefined || req.body.valid === null) ? true : req.body.valid),
            baseAmount: req.body.baseAmount,
            UserId: userId
        };
        models.ProvisionalPlan.create(newProvisionalPlan).then(function () {
            res.sendStatus(200);
        });
    };

    var getAllProvisionalPlans = function (req, res) {
        var userId = req.user.id;
        models.ProvisionalPlan.findAll({
            where: {
                UserId: userId
            }
        }, {include: [models.Movement]}).then(function (provisionalPlans) {
            res.send(provisionalPlans);
        });
    };

    var getProvisionalPlanById = function (req, res) {
        var userId = req.user.id;
        models.ProvisionalPlan.findOne({
            where: {
                id: req.params.id,
                userId: userId
            }
        }, {include: [models.Movement]}).then(function (provisionalPlan) {
            res.send(provisionalPlan);
        });
    };

    var removeProvisionalPlan = function (req, res) {
        var userId = req.user.id;
        models.ProvisionalPlan.findOne({
            where: {
                id: req.params.id,
                userId: userId
            }
        }).then(function (provisionalPlan) {
            provisionalPlan.destroy().then(function () {
                res.sendStatus(200);
            });
        });
    };

    var addOrCreateMovement = function (req, res) {
        var movementId = req.body.id;
        var movementToAdd = req.body;
        delete movementToAdd.id;
        var userId = req.user.id;
        models.ProvisionalPlan.findOne({
            where: {
                id: req.params.id,
                userId: userId
            }
        }).then(function (provisionalPlan) {
                models.Movement.findOrCreate({
                    where: {
                        id: movementId
                    }, defaults: movementToAdd
                }).spread(function (movement) {
                        provisionalPlan.addMovement(movement.get().id).then(function () {
                            res.sendStatus(200);
                        })
                    }
                );
            }
        );
    };

    var updateProvisionalPlan = function (req, res) {
        var userId = req.user.id;
        var newProvisionalPlan = {
            name: req.body.name,
            valid: ((req.body.valid === undefined || req.body.valid === null) ? true : req.body.valid),
            baseAmount: req.body.baseAmount
        };
        models.ProvisionalPlan.findOne({
            where: {
                id: req.body.id,
                userId: userId
            }
        }).then(function (provisionalPlanFinded) {
            provisionalPlanFinded.name = newProvisionalPlan.name;
            provisionalPlanFinded.valid = newProvisionalPlan.valid;
            provisionalPlanFinded.baseAmount = newProvisionalPlan.baseAmount;
            provisionalPlanFinded.save().then(function () {
                res.sendStatus(200);
            }, function () {

            });
        }, function () {

        });
    };

    provider.post("/provisionalPlans", tokenUtils.ensureAuthorized, createProvisionalPlan);
    provider.post("/provisionalPlans/:id", tokenUtils.ensureAuthorized, addOrCreateMovement);
    provider.get("/provisionalPlans", tokenUtils.ensureAuthorized, getAllProvisionalPlans);
    provider.get("/provisionalPlans/:id", tokenUtils.ensureAuthorized, getProvisionalPlanById);
    provider.put("/provisionalPlans", tokenUtils.ensureAuthorized, updateProvisionalPlan);
    provider.delete("/provisionalPlans/:id", tokenUtils.ensureAuthorized, removeProvisionalPlan);
};