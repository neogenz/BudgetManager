'use strict';

var User = require('../04_Models/User'),
  ProvisionalPlan = require('../04_Models/ProvisionalPlan'),
  userProvider = require('./UserProvider'),
  movementProvider = require('./MovementProvider'),
  _ = require('underscore');

/**
 * @desc Define constructor of class
 * @function ProvisionalPlanProvider
 */
var ProvisionalPlanProvider = function () {
};

ProvisionalPlanProvider.prototype.create = _create;
ProvisionalPlanProvider.prototype.notifyTimestampAtNow = _notifyTimestampAtNow;
ProvisionalPlanProvider.prototype.createAndAddToUserThenSave = _createAndAddToUserThenSave;
ProvisionalPlanProvider.prototype.findAllByUserId = _findAllByUserId;
ProvisionalPlanProvider.prototype.findAllNotModelByUserId = _findAllNotModelByUserId;
ProvisionalPlanProvider.prototype.findAllModelByUserId = _findAllModelByUserId;
ProvisionalPlanProvider.prototype.findOneByIdAndUserId = _findOneByIdAndUserId;
ProvisionalPlanProvider.prototype.updateByIdAndUserId = _updateByIdAndUserId;
ProvisionalPlanProvider.prototype.deleteByIdAndUserId = _deleteByIdAndUserId;
ProvisionalPlanProvider.prototype.addMovement = _addMovement;


/**
 * @function _create
 * @desc Return new ProvisionalPlan from json
 * @params {Object} json Json used to instantiate a new object
 */
function _create(json) {
  var provisionalPlanData = {
    name: json['name'],
    valid: json['valid'],
    baseAmount: json['baseAmount'],
    isModel: json['isModel']
  };
  var provisionalPlan = new ProvisionalPlan(provisionalPlanData);
  this.notifyTimestampAtNow(provisionalPlan);
  return provisionalPlan;
};


function _notifyTimestampAtNow(provisionalPlan) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  provisionalPlan.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!provisionalPlan.createdAt)
    provisionalPlan.createdAt = currentDate;
};


/**
 * @function _createAndAddToUserThenSave
 * @desc Create a new ProvisionalPlan from json and save it in base. Then call the callback.
 * @params {Object} json Json used to instantiate a new provisionalPlan object
 * @params {number} userId Id of user to add this provisional plan
 * @params {function} callback Function called after saving
 */
function _createAndAddToUserThenSave(json, userId, callback) {
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
 * @function _findAllByUserId
 * @desc Find all by the user id.
 * @params {number} userId User id from search objects collection
 * @params {function} callback Function called after finding
 */
function _findAllByUserId(userId, callback) {
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
 * @function _findAllNotModelByUserId
 * @desc Find all not model by the user id.
 * @params {number} userId User id from search objects collection
 * @params {function} callback Function called after finding
 */
function _findAllNotModelByUserId(userId) {
  var provisionalPlansNotModel = [];
  return User.findById(userId).then(function (user) {
    if (!user) {
      throw new Error('User (id ' + userId + ') not found');
    }
    provisionalPlansNotModel = _.where(user.provisionalPlans, {isModel: false});
    return provisionalPlansNotModel;
  }, function (err) {
    throw err;
  });
}


/**
 * @function _findAllModelByUserId
 * @desc Find all model by the user id.
 * @params {number} userId User id from search objects collection
 * @params {function} callback Function called after finding
 */
function _findAllModelByUserId(userId) {
  var provisionalPlansModel = [];
  return User.findById(userId).then(function (user) {
    if (!user) {
      throw new Error('User (id ' + userId + ') not found');
    }
    provisionalPlansModel = _.where(user.provisionalPlans, {isModel: true});
    return provisionalPlansModel;
  }, function (err) {
    throw err;
  });
}


/**
 * @function _findOneByIdAndUserId
 * @desc Find one by provisional plan id and the user id.
 * @params {number} id Provisional plan id to search
 * @params {number} userId User id from search objects collection
 * @params {function} callback Function called after finding
 */
function _findOneByIdAndUserId(id, userId, callback) {
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
 * @function _updateByIdAndUserId
 * @desc Update the provisional plan finded from id
 * @params {number} id Provisional plan id to be updated
 * @params {Object} newObject Object from the provisional plan go be updated
 * @params {function} callback Function called after finding
 */
function _updateByIdAndUserId(id, userId, newObject, callback) {
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
 * @function _deleteByIdAndUserId
 * @desc Delete the provisional plan finded.
 * @params {number} provisionalPlanId Provisional plan id to be deleted
 * @params {number} userId User id of user concerned by provisional plan
 * @params {function} callback Function called after removing
 */
function _deleteByIdAndUserId(provisionalPlanId, userId, callback) {
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
 * @function _addMovement
 * @desc Add the movement to provisional plan
 * @params {number} userId User id of user concerned by provisional plan
 * @params {number} provisionalPlanId Provisional plan id to add movement
 * @params {object} movementData Object with properties used to initialize movement
 * @params {function} callback Function called after removing
 */
function _addMovement(userId, provisionalPlanId, movementData, callback) {
  movementProvider.createThenSave(userId, provisionalPlanId, movementData, function (err, saved) {
    return callback(err, saved);
  });
};

module.exports = new ProvisionalPlanProvider();