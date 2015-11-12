module.exports = function (provider, models, jwt) {

    var tokenUtils = require("../utils/token")(jwt);

    var create = function (req, res) {
        var userId = req.user.id;
        var newProvisionalPlan = null;
        try {
            newProvisionalPlan = models.ProvisionalPlan.build({
                name: req.body.name,
                valid: ((req.body.valid === undefined || req.body.valid === null) ? true : req.body.valid),
                baseAmount: req.body.baseAmount,
                UserId: userId
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('You have mistake provisionalPlan\'s information in body.')
        }

        newProvisionalPlan.save().then(function () {
            res.sendStatus(200);
        }, function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };

    var findAll = function (req, res) {
        var userId = req.user.id;
        models.ProvisionalPlan.findAll({
            where: {
                UserId: userId
            },
            include: [models.Movement]
        }).then(function (provisionalPlans) {
            res.send(provisionalPlans);
        });
    };

    var findById = function (req, res) {
        var userId = req.user.id;
        models.ProvisionalPlan.findOne({
            where: {
                id: req.params.id,
                userId: userId
            },
            include: [models.Movement]
        }).then(function (provisionalPlan) {
            res.send(provisionalPlan);
        }, function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };

    var remove = function (req, res) {
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

    var addMovement = function (req, res) {
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

    var update = function (req, res) {
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

    provider.post("/provisionalPlans", tokenUtils.ensureAuthorized, create);
    provider.post("/provisionalPlans/:id", tokenUtils.ensureAuthorized, addMovement);
    provider.get("/provisionalPlans", tokenUtils.ensureAuthorized, findAll);
    provider.get("/provisionalPlans/:id", tokenUtils.ensureAuthorized, findById);
    provider.put("/provisionalPlans", tokenUtils.ensureAuthorized, update);
    provider.delete("/provisionalPlans/:id", tokenUtils.ensureAuthorized, remove);
};