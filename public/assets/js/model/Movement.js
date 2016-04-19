(function init() {
    'use strict';

    function Movement(json) {
        app.beans.AbstractBean.call(this, json);
        //if(!neogenz.utilities.isUndefinedOrNull(this.provisionalPlan)){
        //    this.provisionalPlanId = this.provisionalPlan.id;
        //}
    }
    
    Movement.prototype = Object.create(app.beans.AbstractBean.prototype, {
        constructor: app.beans.AbstractBean,
        id: {value: null, writable: true},
        name: {value: null, writable: true},
        type: {value: null, writable: true},
        repeat: {value: null, writable: true},
        comment: {value: null, writable: true},
        active: {value: null, writable: true},
        provisionalPlanId: {value: null, writable: true},
        provisionalPlan: {value: null, writable: true},
        _schema: {
            value: {
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
            }
        }
    });
    app.beans.Movement = Movement;
    //var beanFactory = new AbstractBeanFactory();
    //var beanEtude = beanFactory.getBean('Etude', {name: 'beanEtude', id:45, creator: 'maxime'});

})();
