(function init(exports, factory) {
    'use strict';

    // neogenz.utilities.extendsChildFromParent(User, neogenz.beans.AbstractBean);
    //
    // function User(json) {
    //     neogenz.beans.AbstractBean.call(this, json);
    //     this.email = null;
    //     this.password = null;
    //     this.firstName = null;
    //     this.lastName = null;
    //     this.updatedAt = null;
    //     this.createdAt = null;
    //     this.username = null;
    //     this.provisionalPlans = null;
    //     this._schema = {
    //         email: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING, defaultValue: ''}),
    //         password: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING, defaultValue: ''}),
    //         firstName: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING, defaultValue: ''}),
    //         lastName: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING, defaultValue: ''}),
    //         username: new neogenz.beans.AbstractSchema({
    //             type: neogenz.beans.type.STRING,
    //             defaultValue: '',
    //             mandatory: false
    //         }),
    //         updatedAt: new neogenz.beans.AbstractSchema({
    //             type: neogenz.beans.type.STRING,
    //             defaultValue: '',
    //             mandatory: false
    //         }),
    //         createdAt: new neogenz.beans.AbstractSchema({
    //             type: neogenz.beans.type.STRING,
    //             defaultValue: new Date(),
    //             mandatory: false
    //         }),
    //         provisionalPlans: new neogenz.beans.AbstractSchema({
    //             type: neogenz.beans.type.ARRAY_OBJECT,
    //             mandatory: false,
    //             contentObject: new neogenz.beans.AbstractSchema({
    //                 type: neogenz.beans.type.OBJECT,
    //                 beanName: 'ProvisionalPlan',
    //                 constructor: neogenz.beans.ProvisionalPlan
    //             })
    //         })
    //     }
    // }


    var User = neogenz.beans.AbstractBean.extend({
        initialize: function () {
            neogenz.beans.AbstractBean.prototype.initialize.apply(this, arguments);
            this.email = null;
            this.password = null;
            this.firstName = null;
            this.lastName = null;
            this.updatedAt = null;
            this.createdAt = null;
            this.username = null;
            this.provisionalPlans = null;
            this._schema = {
                email: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING, defaultValue: ''}),
                password: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING, defaultValue: ''}),
                firstName: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING, defaultValue: ''}),
                lastName: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING, defaultValue: ''}),
                username: new neogenz.beans.AbstractSchema({
                    type: neogenz.beans.type.STRING,
                    defaultValue: '',
                    mandatory: false
                }),
                updatedAt: new neogenz.beans.AbstractSchema({
                    type: neogenz.beans.type.STRING,
                    defaultValue: '',
                    mandatory: false
                }),
                createdAt: new neogenz.beans.AbstractSchema({
                    type: neogenz.beans.type.STRING,
                    defaultValue: new Date(),
                    mandatory: false
                }),
                provisionalPlans: new neogenz.beans.AbstractSchema({
                    type: neogenz.beans.type.ARRAY_OBJECT,
                    mandatory: false,
                    contentObject: new neogenz.beans.AbstractSchema({
                        type: neogenz.beans.type.OBJECT,
                        beanName: 'ProvisionalPlan',
                        constructor: neogenz.beans.ProvisionalPlan
                    })
                })
            }
        }
    });
    
    exports.User = User;
    factory.registerBean('User', exports.User);
})(budgetManager.beans, neogenz.beans.factory);
