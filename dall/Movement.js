module.exports = function (provider, models, jwt) {

    var tokenUtils = require("../utils/token")(jwt);

    var create = function (req, res) {
        var newMovement = {
            name: req.body.name,
            amount: req.body.amount,
            type: req.body.type,
            repeat: req.body.repeat,
            comment: req.body.comment,
            active: req.body.active
        };
        models.Movement.create(newMovement).then(function () {
            res.sendStatus(200);
        });
    };

    var findAll = function (req, res) {
        models.Movement.findAll().then(function (movements) {
            res.send(movements);
        });
    };

    var findById = function (req, res) {
        var id = req.params.id;
        models.Movement.findOne(id).then(function (movement) {
            res.send(movement);
        });
    };

    var update = function (req, res) {
        var id = req.params.id;
        models.Movement.findById(id).then(function (movement) {
            movement.amount = req.body.amount;
            movement.name = req.body.name;
            movement.type = req.body.type;
            movement.repeat = req.body.repeat;
            movement.comment = req.body.comment;
            movement.active = req.body.active;
            movement.save().then(function () {
                res.sendStatus(200);
            });
        });
    };

    var remove = function (req, res) {
        var id = req.params.id;
        models.Movement.findById(id).then(function (movement) {
            movement.destroy().then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.status(500).send('Error on destroy : ' + err);
            });
        }, function (err) {
            res.status(500).send('Error on findById : ' + err);
        });
    };

    provider.get("/movements", tokenUtils.ensureAuthorized, findAll);
    provider.get("/movements/:id", tokenUtils.ensureAuthorized, findById);
    provider.post("/movements", tokenUtils.ensureAuthorized, create);
    provider.put("/movements/:id", tokenUtils.ensureAuthorized, update);
    provider.delete("/movements/:id", tokenUtils.ensureAuthorized, remove);
};