'use strict';

myLib.technical.defineNamespace(app, 'bean.ProvisionalPlan');

(function init() {

    var ProvisionalPlan = function (json) {
        debugger;
        app.bean.AbstractBean.call(this, json);
    };

    ProvisionalPlan.prototype = Object.create(app.bean.AbstractBean.prototype, {
        constructor: app.bean.AbstractBean,
        id: {value: null, writable: true},
        name: {value: null, writable: true},
        baseAmount: {value: null, writable: true},
        valid: {value: null, writable: true},
        movements: {value: null, writable: true},
        userId: {value: null, writable: true},
        _schema: {
            value: {
                id: new app.bean.core.AbstractSchema({type: app.bean.core.type.NUMBER}),
                name: new app.bean.core.AbstractSchema({type: app.bean.core.type.STRING}),
                baseAmount: new app.bean.core.AbstractSchema({type: app.bean.core.type.NUMBER, defaultValue: 0}),
                valid: new app.bean.core.AbstractSchema({type: app.bean.core.type.BOOLEAN, defaultValue: true}),
                movements: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.ARRAY_OBJECT,
                    mandatory: false,
                    persistingName: 'Movements',
                    contentObject: new app.bean.core.AbstractSchema({
                        type: app.bean.core.type.OBJECT,
                        beanName: 'Movement',
                        constructor: app.bean.Movement
                    })
                }),
                userId: new app.bean.core.AbstractSchema({type: app.bean.core.type.NUMBER, persistingName: 'UserId'})
            }
        }
    });

    app.bean.ProvisionalPlan = ProvisionalPlan;
})();
