'use strict';

myLib.technical.defineNamespace(app, 'bean.User');

(function init() {

    var User = function (json) {
        debugger;
        app.bean.AbstractBean.call(this, json);
    };

    User.prototype = Object.create(app.bean.AbstractBean.prototype, {
        constructor: app.bean.AbstractBean,
        email: {value: null, writable: true},
        password: {value: null, writable: true},
        firstName: {value: null, writable: true},
        lastName: {value: null, writable: true},
        updatedAt: {value: null, writable: true},
        createdAt: {value: null, writable: true},
        username: {value: null, writable: true},
        provisionalPlans: {value: null, writable: true},
        _schema: {
            value: {
                email: new app.bean.core.AbstractSchema({type: app.bean.core.type.STRING, defaultValue: ''}),
                password: new app.bean.core.AbstractSchema({type: app.bean.core.type.STRING, defaultValue: ''}),
                firstName: new app.bean.core.AbstractSchema({type: app.bean.core.type.STRING, defaultValue: ''}),
                lastName: new app.bean.core.AbstractSchema({type: app.bean.core.type.STRING, defaultValue: ''}),
                username: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.STRING,
                    defaultValue: '',
                    mandatory: false
                }),
                updatedAt: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.STRING,
                    defaultValue: '',
                    mandatory: false
                }),
                createdAt: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.STRING,
                    defaultValue: new Date(),
                    mandatory: false
                }),
                provisionalPlans: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.ARRAY_OBJECT,
                    mandatory: false,
                    contentObject: new app.bean.core.AbstractSchema({
                        type: app.bean.core.type.OBJECT,
                        beanName: 'ProvisionalPlan',
                        constructor: app.bean.ProvisionalPlan
                    })
                })
            }
        }
    });

    app.bean.User = User;
})();
