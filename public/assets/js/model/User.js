'use strict';

//app.helpers.defineNamespace(app, 'bean.User');

(function init() {

    var User = function (json) {
        debugger;
        app.beans.AbstractBean.call(this, json);
    };

    User.prototype = Object.create(app.beans.AbstractBean.prototype, {
        constructor: app.beans.AbstractBean,
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
                email: new app.beans.AbstractSchema({type: app.beans.type.STRING, defaultValue: ''}),
                password: new app.beans.AbstractSchema({type: app.beans.type.STRING, defaultValue: ''}),
                firstName: new app.beans.AbstractSchema({type: app.beans.type.STRING, defaultValue: ''}),
                lastName: new app.beans.AbstractSchema({type: app.beans.type.STRING, defaultValue: ''}),
                username: new app.beans.AbstractSchema({
                    type: app.beans.type.STRING,
                    defaultValue: '',
                    mandatory: false
                }),
                updatedAt: new app.beans.AbstractSchema({
                    type: app.beans.type.STRING,
                    defaultValue: '',
                    mandatory: false
                }),
                createdAt: new app.beans.AbstractSchema({
                    type: app.beans.type.STRING,
                    defaultValue: new Date(),
                    mandatory: false
                }),
                provisionalPlans: new app.beans.AbstractSchema({
                    type: app.beans.type.ARRAY_OBJECT,
                    mandatory: false,
                    contentObject: new app.beans.AbstractSchema({
                        type: app.beans.type.OBJECT,
                        beanName: 'ProvisionalPlan',
                        constructor: app.beans.ProvisionalPlan
                    })
                })
            }
        }
    });

    app.beans.User = User;
})();
