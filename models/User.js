var bcrypt = require('bcrypt-nodejs');
//var models = require('../models');

// define the schema for our user model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNul: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNul: false
        },
        name: {
            type: DataTypes.STRING,
            allowNul: true
        },
        username: {
            type: DataTypes.STRING,
            allowNul: true,
            unique: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                //User.hasMany(models.ProvisionalPlan);
            }
        },
        instanceMethods: {
            // methods ======================
            // generating a hash
            generateHash: function (password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },
            // checking if password is valid
            validPassword: function (password) {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });

    return User;
};