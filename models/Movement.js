"use strict";

//{ "id": "1",
//    "name":"test",
//    "amount":"200",
//    "type":"up",
//    "repeat":"1",
//    "comment":"Mouvement montant de test"
//}

module.exports = function (sequelize, DataTypes) {
    var Movement = sequelize.define("Movement", {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM,
                values: ['up', 'down'],
                defaultValue: 'down',
                allowNull: false
            },
            repeat: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                allowNull: false
            },
            comment: {
                type: DataTypes.STRING
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        }, {
            classMethods: {
                associate: function (models) {
                    Movement.belongsTo(models.ProvisionalPlan)
                }
            }
        }
    );
    return Movement;
};