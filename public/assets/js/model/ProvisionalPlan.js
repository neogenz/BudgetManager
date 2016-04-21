(function init(exports, factory) {
    'use strict';

    neogenz.utilities.extendsChildFromParent(ProvisionalPlan, app.beans.AbstractBean);

    function ProvisionalPlan(json) {
        app.beans.AbstractBean.call(this, json);
        this.id = null;
        this.name = null;
        this.baseAmount = null;
        this.movements = null;
        this.userId = null;
        this._schema = {
            id: new app.beans.AbstractSchema({
                type: app.beans.type.STRING,
                defaultValue: '0',
                persistingName: '_id'
            }),
            name: new app.beans.AbstractSchema({type: app.beans.type.STRING, defaultValue: 'Économies'}),
            baseAmount: new app.beans.AbstractSchema({type: app.beans.type.NUMBER, defaultValue: 0}),
            valid: new app.beans.AbstractSchema({type: app.beans.type.BOOLEAN, defaultValue: true}),
            movements: new app.beans.AbstractSchema({
                type: app.beans.type.ARRAY_OBJECT,
                persistingName: 'Movements',
                defaultValue: [],
                contentObject: new app.beans.AbstractSchema({
                    type: app.beans.type.OBJECT,
                    beanName: 'Movement',
                    constructor: app.beans.Movement
                })
            })
        };

        //this.init(json);
    }


    exports.ProvisionalPlan = ProvisionalPlan;
    factory.registerBean('ProvisionalPlan', app.beans.ProvisionalPlan);
})(app.beans, app.beans.factory);
