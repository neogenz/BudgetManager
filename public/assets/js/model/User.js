(function init(exports, factory) {
    'use strict';

    neogenz.utilities.extendsChildFromParent(User, app.beans.AbstractBean);

    function User(json) {
        app.beans.AbstractBean.call(this, json);
        this.email = null;
        this.password = null;
        this.firstName = null;
        this.lastName = null;
        this.updatedAt = null;
        this.createdAt = null;
        this.username = null;
        this.provisionalPlans = null;
        this._schema = {
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


    exports.User = User;
    factory.registerBean('User', app.beans.User);
})(app.beans, app.beans.factory);
