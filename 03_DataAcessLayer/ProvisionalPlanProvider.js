'use strict';

(function init() {
    var User = require('../04_Models/User');
    var ProvisionalPlan = require('../04_Models/ProvisionalPlan');

    var userProvider = require('./UserProvider');
    var movementProvider = require('./MovementProvider');

    /**
     * @desc Define constructor of class
     * @function ProvisionalPlanProvider
     */
    var ProvisionalPlanProvider = function () {
    };


    /**
     * @function create
     * @desc Return new ProvisionalPlan from json
     * @params {Object} json Json used to instantiate a new object
     */
    ProvisionalPlanProvider.prototype.create = function (json) {
        var provisionalPlanData = {
            name: json['name'],
            valid: json['valid'],
            baseAmount: json['baseAmount']
        };
        var provisionalPlan = new ProvisionalPlan(provisionalPlanData);
        this.notifyTimestampAtNow(provisionalPlan);
        return provisionalPlan;
    };


    ProvisionalPlanProvider.prototype.notifyTimestampAtNow = function (provisionalPlan) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        provisionalPlan.updatedAt = currentDate;

        // if created_at doesn't exist, add to that field
        if (!provisionalPlan.createdAt)
            provisionalPlan.createdAt = currentDate;
    };


    /**
     * @function createAndSave
     * @desc Create a new ProvisionalPlan from json and save it in base. Then call the callback.
     * @params {Object} json Json used to instantiate a new provisionalPlan object
     * @params {number} userId Id of user to add this provisional plan
     * @params {function} callback Function called after saving
     */
    ProvisionalPlanProvider.prototype.createAndAddToUserThenSave = function (json, userId, callback) {
        User.findById(userId, function (err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                var err = new Error('User not found (id : ' + userId + ')');
                return callback(err);
            }
            var newProvisionalPlan = ProvisionalPlanProvider.prototype.create(json);
            user.provisionalPlans.push(newProvisionalPlan);
            user.save(function (err, saved) {
                return callback(err, saved.provisionalPlans[saved.provisionalPlans.length - 1]);
            });
        });
    };


    /**
     * @function findAllByUserId
     * @desc Find all by the user id.
     * @params {number} userId User id from search objects collection
     * @params {function} callback Function called after finding
     */
    ProvisionalPlanProvider.prototype.findAllByUserId = function (userId, callback) {
        User.findById(userId, function (err, userFinded) {
            if (err) {
                return callback(err);
            } else if (!userFinded) {
                var err = new Error('User (id ' + userId + ') not found');
                return callback(err);
            }
            return callback(err, userFinded.provisionalPlans);
        });
    };


    /**
     * @function findOneByIdAndUserId
     * @desc Find one by provisional plan id and the user id.
     * @params {number} id Provisional plan id to search
     * @params {number} userId User id from search objects collection
     * @params {function} callback Function called after finding
     */
    ProvisionalPlanProvider.prototype.findOneByIdAndUserId = function (id, userId, callback) {
        User.findById(userId, function (err, userFinded) {
            if (err) {
                return callback(err);
            } else if (!userFinded) {
                var err = new Error('User (id ' + userId + ') not found');
                return callback(err);
            }
            var provisionalPlan = userFinded.provisionalPlans.id(id);
            return callback(err, provisionalPlan);
        });
    };


    /**
     * @function updateById
     * @desc Update the provisional plan finded from id
     * @params {number} id Provisional plan id to be updated
     * @params {Object} newObject Object from the provisional plan go be updated
     * @params {function} callback Function called after finding
     */
    ProvisionalPlanProvider.prototype.updateByIdAndUserId = function (id, userId, newObject, callback) {
        User.findById(userId, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                var err = new Error('User not found (id : ' + userId + ')');
                return callback(err);
            }
            var provisionalPlan = user.provisionalPlans.id(id);
            provisionalPlan.baseAmount = newObject.baseAmount;
            provisionalPlan.name = newObject.name;
            provisionalPlan.valid = newObject.valid;
            user.save(function (err, saved) {
                return callback(err, provisionalPlan);
            });
        });
    };


    /**
     * @function deleteByIdAndUserId
     * @desc Delete the provisional plan finded.
     * @params {number} provisionalPlanId Provisional plan id to be deleted
     * @params {number} userId User id of user concerned by provisional plan
     * @params {function} callback Function called after removing
     */
    ProvisionalPlanProvider.prototype.deleteByIdAndUserId = function (provisionalPlanId, userId, callback) {
        User.findById(userId, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                var err = new Error('User not found (id : ' + userId + ')');
                return callback(err);
            }
            var provisionalPlanRemoved = user.provisionalPlans.id(provisionalPlanId);
            provisionalPlanRemoved.remove();
            user.save(function (err, saved) {
                return callback(err, provisionalPlanRemoved);
            });
        });
    };


    /**
     * @function addMovement
     * @desc Add the movement to provisional plan
     * @params {number} userId User id of user concerned by provisional plan
     * @params {number} provisionalPlanId Provisional plan id to add movement
     * @params {object} movementData Object with properties used to initialize movement
     * @params {function} callback Function called after removing
     */
    ProvisionalPlanProvider.prototype.addMovement = function (userId, provisionalPlanId, movementData, callback) {
        movementProvider.createThenSave(userId, provisionalPlanId, movementData, function (err, saved) {
            return callback(err, saved);
        });
    };

    module.exports = new ProvisionalPlanProvider();

})();