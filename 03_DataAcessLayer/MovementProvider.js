'use strict';
(function init() {
    //Models
    var ProvisionalPlan = require('../04_Models/ProvisionalPlan');
    var User = require('../04_Models/User');
    var Movement = require('../04_Models/Movement');
    //Providers
    var userProvider = require('../03_DataAcessLayer/UserProvider');
    var provisionalPlanProvider = require('../03_DataAcessLayer/ProvisionalPlanProvider');

    /**
     * @desc Define constructor of class
     * @function MovementProvider
     */
    var MovementProvider = function () {
    };


    /**
     * @function create
     * @desc Return new ProvisionalPlan from json
     * @params {Object} json Json used to instantiate a new object
     */
    MovementProvider.prototype.create = function (json) {
        var movementData = {
            name: json['name'],
            amount: json['amount'],
            type: json['type'],
            repeat: json['repeat'],
            comment: json['comment'],
            active: ['active']
        };
        return new Movement(movementData);
    };


    /**
     * @function createAndAddToUserThenSave
     * @desc Create a new ProvisionalPlan from json and save it in base. Then call the callback.
     * @params {number} userId User id to find for work
     * @params {number} provisionalPlanId provisionalPlan id to add movement
     * @params {Object} movementData Object used to create movement
     * @params {function} callback Function called after saving
     */
    MovementProvider.prototype.createThenSave = function (userId, provisionalPlanId, movementData, callback) {
        userProvider.findById(userId, function (err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                var err = new Error('User not found (id : ' + userId + ')');
                return callback(err);
            }
            else {
                var newMovement = MovementProvider.prototype.create(movementData);
                var provisionalPlan = user.provisionalPlans.id(provisionalPlanId);
                provisionalPlan.movements.push(newMovement);
                user.save(function (err, saved) {
                    callback(err, newMovement);
                });
            }
        });
    };


    /**
     * @function findAllByProvisionalPlanAndUserId
     * @desc Find all movements from parameters
     * @params {number} provisionalPlanId provisionalPlan id to add movement
     * @params {number} userId User id to find for work
     * @params {function} callback Function called after finding
     */
    MovementProvider.prototype.findAllByProvisionalPlanAndUserId = function (provisionalPlanId, userId, callback) {
        var provisionalPlanProvider = require('../03_DataAcessLayer/ProvisionalPlanProvider');
        provisionalPlanProvider.findOneByIdAndUserId(provisionalPlanId, userId, function (err, finded) {
            if (err) {
                return callback(err);
            }
            callback(err, finded.movements);
        });
    };


    /**
     * @function findOneByProvisionalPlanAndUserId
     * @desc Find one movements from parameters
     * @params {number} id Id of movement to find
     * @params {number} provisionalPlanId provisionalPlan id to add movement
     * @params {number} userId User id to find for work
     * @params {function} callback Function called after finding
     */
    MovementProvider.prototype.findOneByProvisionalPlanAndUserId = function (id, provisionalPlanId, userId, callback) {
        var provisionalPlanProvider = require('../03_DataAcessLayer/ProvisionalPlanProvider');
        provisionalPlanProvider.findOneByIdAndUserId(provisionalPlanId, userId, function (err, finded) {
            if (err) {
                return callback(err);
            }
            var movement = finded.movements.id(id);
            callback(err, movement);
        });
    };


    /**
     * @function updateByProvisionalPlanAndUserId
     * @desc Update an movement from parameters
     * @params {number} userId User id to find for work
     * @params {number} provisionalPlanId provisionalPlan id to add movement
     * @params {Object} newMovementData Object used to create movement
     * @params {function} callback Function called after saving
     */
    MovementProvider.prototype.updateByProvisionalPlanAndUserId = function (provisionalPlanId, userId, newMovementData, callback) {
        User.findById(userId, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                var err = new Error('User (id ' + userId + ') not found');
                return callback(err);
            }
            var movementToUpdate = user.provisionalPlans.id(provisionalPlanId).movements.id(newMovementData.id);
            movementToUpdate.name = newMovementData.name;
            movementToUpdate.amount = newMovementData.amount;
            movementToUpdate.type = newMovementData.type;
            movementToUpdate.repeat = newMovementData.repeat;
            movementToUpdate.comment = newMovementData.comment;
            movementToUpdate.active = newMovementData.active;
            user.save(function (err, saved) {
                return callback(err, movementToUpdate);
            });
        });
    };


    /**
     * @function deleteByProvisionalPlanAndUserId
     * @desc Delete an movement
     * @params {number} userId User id to find for work
     * @params {number} provisionalPlanId provisionalPlan id to add movement
     * @params {Object} newMovementData Object used to create movement
     * @params {function} callback Function called after saving
     */
    MovementProvider.prototype.deleteByProvisionalPlanAndUserId = function (id, provisionalPlanId, userId, callback) {
        User.findById(userId, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                var err = new Error('User not found (id : ' + userId + ')');
                return callback(err);
            }
            var movementRemoved = user.provisionalPlans.id(provisionalPlanId).movements.id(id);
            movementRemoved.remove();
            user.save(function (err, saved) {
                return callback(err, movementRemoved);
            });
        });
    };

    module.exports = new MovementProvider();
})();