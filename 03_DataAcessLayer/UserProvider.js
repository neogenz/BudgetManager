'use strict';

(function init() {
  var User = require('../04_Models/User');
  var jwt = require('jsonwebtoken');

  function UserProvider() {
  }

  UserProvider.prototype.create = function (json) {
    return new User({
      email: json.email,
      password: json.password,
      lastName: json.lastName,
      firstName: json.firstName,
      username: json.username
    });
  };

  UserProvider.prototype.findById = function (id, callback) {
    User
      .findById(id)
      .exec(function (err, userFinded) {
        callback(err, userFinded/*.toObject()*/);
      });
  };

  UserProvider.prototype.findByEmailAndPassword = function (email, password, callback) {
    User.findOne({email: email}, '-provisionalPlans', function (err, user) {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback({
          statusHttp: 404,
          message: 'User not found.'
        });
      }
      if (!user.validPassword(password)) {
        return callback({
          statusHttp: 404,
          message: 'User not authenticated.'
        });
      }
      return callback(err, user/*user.toObject()*/);
    });
  };

  UserProvider.prototype.signinByEmailAndPassword = function (email, password, callback) {
    this.findByEmailAndPassword(email, password, function (err, userFinded) {
      if (err) {
        return callback(err);
      }
      try {
        var token = jwt.sign(userFinded.toObject(), process.env.JWT_SECRET, {
          expiresIn: "86400000" // expires in 24 hours
        });
        return callback(err, token);
      } catch (err) {
        err.statusHttp = 500;
        return callback(err);
      }
    });
  };

  UserProvider.prototype.signup = function (user, callback) {
    try {
      //@todo à déporter dans une sous fonction 'thisUserIsAlreadyPresent'
      User.findOne({email: user.email}, function (err, userAlreadyExisting) {
        if (userAlreadyExisting) {
          var error = new Error();
          error.message = 'This user is already present';
          error.statusHttp = 500;
          return callback(error);
        }
        user.password = user.generateHash(user.password);
        user.save(function (err, userSaved) {
          if (err) {
            console.log(err);
            return callback(err);
          }

          var token = jwt.sign(userSaved.toObject(), process.env.JWT_SECRET, {
            expiresIn: "86400000" // expires in 24 hours
          });
          return callback(err, token);

        });
      });
    } catch (err) {
      err.statusHttp = 500;
      return callback(err);
    }
  };

  module.exports = new UserProvider();
})
();