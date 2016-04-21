(function init(exports, factory) {
    'use strict';

    neogenz.utilities.extendsChildFromParent(Movement, app.beans.AbstractBean);

    function Movement(json) {
        app.beans.AbstractBean.call(this, json);
        this.id = null;
        this.name = null;
        this.type = null;
        this.repeat = null;
        this.comment = null;
        this.active = null;
        this.provisionalPlan = null;
        this._schema = {
            id: new app.beans.AbstractSchema({
                type: app.beans.type.STRING,
                nullable: true,
                persistingName: '_id'
            }),
            name: new app.beans.AbstractSchema({type: app.beans.type.STRING}),
            amount: new app.beans.AbstractSchema({
                type: app.beans.type.NUMBER,
                nullable: false,
                defaultValue: 0
            }),
            type: new app.beans.AbstractSchema({
                type: app.beans.type.STRING,
                nullable: false,
                defaultValue: 'down'
            }),
            repeat: new app.beans.AbstractSchema({
                type: app.beans.type.NUMBER,
                nullable: false,
                defaultValue: 1
            }),
            comment: new app.beans.AbstractSchema({
                type: app.beans.type.STRING,
                mandatory: false,
                nullable: true
            }),
            active: new app.beans.AbstractSchema({
                type: app.beans.type.BOOLEAN,
                nullable: false,
                persist: true
            }),
            provisionalPlanId: new app.beans.AbstractSchema({
                type: app.beans.type.NUMBER,
                mandatory: false,
                nullable: true,
                persistingName: 'ProvisionalPlanId'
            }),
            provisionalPlan: new app.beans.AbstractSchema({
                type: app.beans.type.OBJECT,
                mandatory: false,
                constructor: app.beans.ProvisionalPlan,
                beanName: 'ProvisionalPlan'
            })
        };
        //this.init(json);
    }

    exports.Movement = Movement;
    factory.registerBean('Movement', app.beans.Movement);

})(app.beans, app.beans.factory);
