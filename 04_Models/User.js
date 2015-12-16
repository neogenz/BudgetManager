'use strict';

(function init() {
    var bcrypt = require('bcrypt-nodejs');
    var mongoose = require('mongoose');
    // define the schema for our user model
    var Schema = mongoose.Schema;
    var ProvisionalPlan = require('./ProvisionalPlan');
    var UserSchema = new Schema({
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        updatedAt: Date,
        createdAt: Date,
        provisionalPlans: {type: [ProvisionalPlan.schema], default: []}
    });

    // on every save, add the date
    UserSchema.pre('save', function (next) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updatedAt = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.createdAt)
            this.createdAt = currentDate;

        next();
    });

    UserSchema.methods.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    UserSchema.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };


    var User = mongoose.model('User', UserSchema, 'Users');

    module.exports = User;
})();

