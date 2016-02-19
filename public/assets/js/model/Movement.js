'use strict';

//app.helpers.defineNamespace(app, 'bean.Movement');

(function init() {

    //function _Movement(param) {
    //    this.id = app.helpers.verifParam(param, 'id');
    //    this.name = app.helpers.verifParam(param, 'name');
    //    this.amount = app.helpers.verifParam(param, 'amount');
    //    this.type = app.helpers.verifParam(param, 'type');
    //    this.repeat = app.helpers.verifParam(param, 'repeat');
    //    this.comment = app.helpers.verifParam(param, 'comment');
    //    this.active = app.helpers.verifParam(param, 'active');
    //    this.provisionalPlanId = app.helpers.verifParam(param, 'ProvisionalPlanId');
    //}
    //
    //function create(schema, p_object, json) {
    //    var obj = Object.create(p_object.prototype, {constructor: p_object.constructor});
    //    debugger;
    //    for (var key in schema) {
    //        if (schema[key].type === 'function') {
    //            obj[key] = schema[key].func;
    //        }else{
    //            obj[key] = _.isUndefined(schema[key].defaultValue) ? null : schema[key].defaultValue;
    //        }
    //        if (!_.isUndefined(json)) {
    //            if (schema[key].type !== 'function') {
    //                if (schema[key].mandatory && _.isUndefined(json[key])) {
    //                    throw new Error('The member ' + key + ' is undefined in json and id mandatory on object.');
    //                } else if (!schema[key].mandatory && _.isUndefined(json[key])) {
    //                    obj[key] = null;
    //                } else {
    //                    if (_.isUndefined(obj[key])) {
    //                        app.helpers.log.logWarning('The property ' + key + ' was added from json to object.');
    //                    }
    //                    obj[key] = json[key];
    //                }
    //            }
    //        }
    //    }
    //    return obj;
    //}
    //
    //
    //function Movement() {
    //
    //}
    //
    //
    //var _MovementSchema = {
    //    id: {
    //        type: 'int',
    //        mandatory: true,
    //        persist: true
    //    },
    //    name: {
    //        type: 'string',
    //        mandatory: true,
    //        persist: true
    //    },
    //    amount: {
    //        type: 'int',
    //        mandatory: true,
    //        persist: true,
    //        defaultValue: 0
    //    },
    //    type: {
    //        type: 'string',
    //        mandatory: true,
    //        persist: true,
    //        defaultValue: 'down'
    //    },
    //    repeat: {
    //        type: 'int',
    //        mandatory: true,
    //        persist: true,
    //        defaultValue: 1
    //    },
    //    comment: {
    //        type: 'string',
    //        mandatory: false,
    //        persist: true
    //    },
    //    active: {
    //        type: 'bool',
    //        mandatory: true,
    //        persist: true
    //    },
    //    provisionalPlanId: {
    //        type: 'int',
    //        mandatory: true,
    //        persist: true
    //    },
    //    provisionalPlan: {
    //        type: 'provisionalPlan',
    //        mandatory: true,
    //        persist: true
    //    },
    //    getType: {
    //        func: function () {
    //            return this.type;
    //        },
    //        type: 'function'
    //    }
    //};

//--------------------------
    /* Implements Module class */
//--------------------------
    var Movement = function (json) {
        app.beans.AbstractBean.call(this, json);
        //if(!app.helpers.isUndefinedOrNull(this.provisionalPlan)){
        //    this.provisionalPlanId = this.provisionalPlan.id;
        //}
    };

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
