"use strict";

//{
//    "name":"test",
//    "baseAmount":"200",
//    "valid":"true"
//}

module.exports = function (sequelize, DataTypes) {
    var ProvisionalPlan = sequelize.define("ProvisionalPlan", {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            valid: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            baseAmount:{
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            classMethods: {
                associate: function (models) {
                    ProvisionalPlan.hasMany(models.Movement)
                }
            }
        }
    );
    return ProvisionalPlan;
};