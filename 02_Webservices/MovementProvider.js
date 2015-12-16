'use strict';

function init(provider) {

    //var jwt = require('jsonwebtoken');
    //var tokenUtils = require("../services/token")(jwt);
    var authenticationHelpers = require('../01_Commons/AuthenticationHelpers');

    var movementProvider = require('../03_DataAcessLayer/MovementProvider');

    var _findAll = function (req, res) {
        var provisionalPlanId = req.params.id,
            userId = req.user._id;
        movementProvider.findAllByProvisionalPlanAndUserId(provisionalPlanId, userId, function (err, movements) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                var httpErrorResponse = {
                    message: err.toString()
                };
                res.send(httpErrorResponse);
            } else {
                res.send(movements);
            }
        });
    };

    var _findOneById = function (req, res) {
        var provisionalPlanId = req.params.id,
            userId = req.user._id,
            id = req.params.idMovement;
        movementProvider.findOneByProvisionalPlanAndUserId(id, provisionalPlanId, userId, function (err, movement) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                var httpErrorResponse = {
                    message: err.toString()
                };
                res.send(httpErrorResponse);
            } else {
                res.send(movement);
            }
        });
    };

    var _update = function (req, res) {
        var provisionalPlanId = req.params.id,
            userId = req.user._id,
            movementData = req.body;
        movementProvider.updateByProvisionalPlanAndUserId(provisionalPlanId, userId, movementData, function (err, updated) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                var httpErrorResponse = {
                    message: err.toString()
                };
                res.send(httpErrorResponse);
            } else {
                res.sendStatus(200);
            }
        });
    };

    var _delete = function (req, res) {
        var provisionalPlanId = req.params.id,
            userId = req.user._id,
            id = req.params.idMovement;
        movementProvider.deleteByProvisionalPlanAndUserId(id, provisionalPlanId, userId, function (err, deleted) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                var httpErrorResponse = {
                    message: err.toString()
                };
                res.send(httpErrorResponse);
            } else {
                res.sendStatus(200);
            }
        });
    };

    provider.get("/me/provisionalPlans/:id/movements", authenticationHelpers.ensureAuthorized, _findAll);
    provider.get("/me/provisionalPlans/:id/movements/:idMovement", authenticationHelpers.ensureAuthorized, _findOneById);
    provider.put("/me/provisionalPlans/:id/movements", authenticationHelpers.ensureAuthorized, _update);
    provider.delete("/me/provisionalPlans/:id/movements/:idMovement", authenticationHelpers.ensureAuthorized, _delete);


};

module.exports = init;