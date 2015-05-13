module.exports = function (provider) {

    var models = require("../models");

    //@todo Créer les mouvements avec le model et le body en bouclant sur les attributs du model et en cherchant la clé
    //@todo correspondante dans le body-request

    var createMovement = function (req, res) {
        var newMovement = {
            name: req.body.name,
            amount: req.body.amount,
            type: req.body.type,
            repeat: req.body.repeat,
            comment: req.body.comment,
            active: req.body.active
        };
        models.Movement.create(newMovement).success(function () {
            res.sendStatus(200);
        });
    };

    var getAllMovements = function (req, res) {
        models.Movement.findAll().success(function (movements) {
            res.send(movements);
        });
    };

    var getMovementById = function (req, res) {
        var id = req.params.id;
        models.Movement.findOne(id).success(function (movement) {
            res.send(movement);
        });
    };

    var updateMovement = function (req, res) {
        var id = req.params.id;
        models.Movement.findOne(id).success(function (movement) {
            movement.amount = req.body.amount;
            movement.name = req.body.name;
            movement.type = req.body.type;
            movement.repeat = req.body.repeat;
            movement.comment = req.body.comment;
            movement.active = req.body.active;
            movement.save().success(function () {
                res.sendStatus(200);
            });
        });
    };

    var removeMovement = function (req, res) {
        var id = req.params.id;
        models.Movement.findOne(id).success(function (movement) {
            movement.destroy().success(function () {
                res.sendStatus(200);
            });
        });
    };

    provider.get("/movements", getAllMovements);
    provider.get("/movements/:id", getMovementById);
    provider.post("/movements", createMovement);
    provider.put("/movements/:id", updateMovement);
    provider.delete("/movements/:id", removeMovement);
}