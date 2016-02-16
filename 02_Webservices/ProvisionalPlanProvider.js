'use strict';

function init(provider) {
    var authenticationHelpers = require('../01_Commons/authenticationHelpers');

    var User = require('../04_Models/User');
    var provisionalPlanProvider = require('../03_DataAcessLayer/ProvisionalPlanProvider');

    var _findAll = function (req, res) {
        var userId = req.user._id;
        provisionalPlanProvider.findAllByUserId(userId, function (err, provisionalPlans) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                var httpErrorResponse = {
                    message: err.toString()
                };
                res.send (httpErrorResponse);
            } else {
                res.send(provisionalPlans);
            }
        });
    };

    var _createAndSave = function (req, res) {
        var userId = req.user._id;
        provisionalPlanProvider.createAndAddToUserThenSave(req.body, userId, function (err, created) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                var httpErrorResponse = {
                    message: err.toString()
                };
                res.send(httpErrorResponse);
            } else if (!created) {
                var err = new Error('Nothing was saved.');
                console.log(err);
                res.statusCode = 500;
                var httpErrorResponse = {
                    message: err.toString()
                };
                res.send(httpErrorResponse);
            } else {
                res.send(created);
            }
        });
    };

    var _findOneById = function (req, res) {
        var provisionalPlanId = req.params.id,
            userId = req.user._id;
        provisionalPlanProvider.findOneByIdAndUserId(provisionalPlanId, userId, function (err, provisionalPlanFinded) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                var httpErrorResponse = {
                    message: err.toString()
                };
                res.send(httpErrorResponse);
            } else {
                res.send(provisionalPlanFinded);
            }
        });
    };

    var _update = function (req, res) {
        var provisionalPlanId = req.body.id,
            userId = req.user._id;
        provisionalPlanProvider.updateByIdAndUserId(provisionalPlanId, userId, req.body, function (err) {
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

    var _addMovement = function (req, res) {
        var provisionalPlanId = req.params.id,
            userId = req.user._id;
        provisionalPlanProvider.addMovement(userId, provisionalPlanId, req.body, function (err, movementAdded) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                var httpErrorResponse = {
                    message: err.toString()
                };
                res.send(httpErrorResponse);
            } else if (!movementAdded) {
                var err = new Error('Nothing was saved.');
                console.log(err);
                res.statusCode = 500;
                var httpErrorResponse = {
                    message: err.toString()
                };
                res.send(httpErrorResponse);
            } else {
                res.send(movementAdded);
            }
        });
    };

    var _delete = function (req, res) {
        var provisionalPlanId = req.params.id,
            userId = req.user._id;
        provisionalPlanProvider.deleteByIdAndUserId(provisionalPlanId, userId, function (err, deleted) {
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

    provider.post("/me/provisionalPlans", authenticationHelpers.ensureAuthorized, _createAndSave);
    provider.post("/me/provisionalPlans/:id", authenticationHelpers.ensureAuthorized, _addMovement);
    provider.get("/me/provisionalPlans", authenticationHelpers.ensureAuthorized, _findAll);
    provider.get("/me/provisionalPlans/:id", authenticationHelpers.ensureAuthorized, _findOneById);
    provider.put("/me/provisionalPlans", authenticationHelpers.ensureAuthorized, _update);
    provider.delete("/me/provisionalPlans/:id", authenticationHelpers.ensureAuthorized, _delete);


};

module.exports = init;