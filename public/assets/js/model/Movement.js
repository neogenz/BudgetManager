(function init(exports, factory) {
    'use strict';

    neogenz.utilities.extendsChildFromParent(Movement, neogenz.beans.AbstractBean);

    function Movement(json) {
        neogenz.beans.AbstractBean.call(this, json);
        this.id = null;
        this.name = null;
        this.type = null;
        this.repeat = null;
        this.comment = null;
        this.active = null;
        this.provisionalPlan = null;
        this._schema = {
            id: new neogenz.beans.AbstractSchema({
                type: neogenz.beans.type.STRING,
                nullable: true,
                persistingName: '_id'
            }),
            name: new neogenz.beans.AbstractSchema({type: neogenz.beans.type.STRING}),
            amount: new neogenz.beans.AbstractSchema({
                type: neogenz.beans.type.NUMBER,
                nullable: false,
                defaultValue: 0
            }),
            type: new neogenz.beans.AbstractSchema({
                type: neogenz.beans.type.STRING,
                nullable: false,
                defaultValue: 'down'
            }),
            repeat: new neogenz.beans.AbstractSchema({
                type: neogenz.beans.type.NUMBER,
                nullable: false,
                defaultValue: 1
            }),
            comment: new neogenz.beans.AbstractSchema({
                type: neogenz.beans.type.STRING,
                mandatory: false,
                nullable: true
            }),
            active: new neogenz.beans.AbstractSchema({
                type: neogenz.beans.type.BOOLEAN,
                nullable: false,
                persist: true
            }),
            provisionalPlanId: new neogenz.beans.AbstractSchema({
                type: neogenz.beans.type.NUMBER,
                mandatory: false,
                nullable: true,
                persistingName: 'ProvisionalPlanId'
            }),
            provisionalPlan: new neogenz.beans.AbstractSchema({
                type: neogenz.beans.type.OBJECT,
                mandatory: false,
                constructor: neogenz.beans.ProvisionalPlan,
                beanName: 'ProvisionalPlan'
            })
        };
        //this.init(json);
    }

    exports.Movement = Movement;
    factory.registerBean('Movement', exports.Movement);

})(budgetManager.beans, neogenz.beans.factory);
