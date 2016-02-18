'use strict';

//app.helpers.defineNamespace(app, 'bean.ProvisionalPlan');

(function init() {

    var ProvisionalPlan = function (json) {
        app.beans.AbstractBean.call(this, json);
    };


    //@todo Place an guid in Id of provisionalPlan
    ProvisionalPlan.prototype = Object.create(app.beans.AbstractBean.prototype, {
        constructor: app.beans.AbstractBean,
        id: {value: null, writable: true},
        name: {value: null, writable: true},
        baseAmount: {value: null, writable: true},
        valid: {value: null, writable: true},
        movements: {value: null, writable: true},
        userId: {value: null, writable: true},
        _schema: {
            value: {
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
                    mandatory: false,
                    persistingName: 'Movements',
                    contentObject: new app.beans.AbstractSchema({
                        type: app.beans.type.OBJECT,
                        beanName: 'Movement',
                        constructor: app.beans.Movement
                    })
                })
            }
        }
    });

    app.beans.ProvisionalPlan = ProvisionalPlan;
})();
