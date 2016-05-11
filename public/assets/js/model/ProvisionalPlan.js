(function init(exports, factory) {
    'use strict';

    // neogenz.utilities.extendsChildFromParent(ProvisionalPlan, neogenz.beans.AbstractBean);

    // function ProvisionalPlan(json) {
    //     neogenz.beans.AbstractBean.call(this, json);
    //     this.id = null;
    //     this.name = null;
    //     this.baseAmount = null;
    //     this.movements = null;
    //     this.userId = null;
    //     this._schema = {
    //         id: new neogenz.beans.AbstractSchema({
    //             type: neogenz.beans.type.STRING,
    //             defaultValue: '0',
    //             persistingName: '_id'
    //         }),
    //         name: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING, defaultValue: 'Économies'}),
    //         baseAmount: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.NUMBER, defaultValue: 0}),
    //         valid: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.BOOLEAN, defaultValue: true}),
    //         movements: new neogenz.beans.AbstractSchema({
    //             type: neogenz.beans.type.ARRAY_OBJECT,
    //             persistingName: 'Movements',
    //             defaultValue: [],
    //             contentObject: new neogenz.beans.AbstractSchema({
    //                 type: neogenz.beans.type.OBJECT,
    //                 beanName: 'Movement',
    //                 constructor: neogenz.beans.Movement
    //             })
    //         })
    //     };
    //
    //     //this.init(json);
    // }


    var ProvisionalPlan = neogenz.beans.AbstractBean.extend({
        initialize: function () {
            neogenz.beans.AbstractBean.prototype.initialize.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.baseAmount = null;
            this.movements = null;
            this.userId = null;
            this._schema = {
                id: new neogenz.beans.AbstractSchema({
                    type: neogenz.beans.type.STRING,
                    persistingName: '_id',
                    nullable: true
                }),
                name: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING, defaultValue: 'Économies'}),
                baseAmount: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.NUMBER, defaultValue: 0}),
                valid: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.BOOLEAN, defaultValue: true}),
                movements: new neogenz.beans.AbstractSchema({
                    type: neogenz.beans.type.ARRAY_OBJECT,
                    persistingName: 'Movements',
                    defaultValue: [],
                    contentObject: new neogenz.beans.AbstractSchema({
                        type: neogenz.beans.type.OBJECT,
                        beanName: 'Movement',
                        constructor: neogenz.beans.Movement
                    })
                })
            };
        }
    });
    
    exports.ProvisionalPlan = ProvisionalPlan;
    factory.registerBean('ProvisionalPlan', exports.ProvisionalPlan);
})(budgetManager.beans, neogenz.beans.factory);
