'use strict';

myLib.technical.defineNamespace(app, 'bean.Movement');

(function init() {

    //function _Movement(param) {
    //    this.id = myLib.technical.verifParam(param, 'id');
    //    this.name = myLib.technical.verifParam(param, 'name');
    //    this.amount = myLib.technical.verifParam(param, 'amount');
    //    this.type = myLib.technical.verifParam(param, 'type');
    //    this.repeat = myLib.technical.verifParam(param, 'repeat');
    //    this.comment = myLib.technical.verifParam(param, 'comment');
    //    this.active = myLib.technical.verifParam(param, 'active');
    //    this.provisionalPlanId = myLib.technical.verifParam(param, 'ProvisionalPlanId');
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
    //                        myLib.technical.log.logWarning('The property ' + key + ' was added from json to object.');
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
        app.bean.AbstractBean.call(this, json);
        //if(!myLib.technical.isUndefinedOrNull(this.provisionalPlan)){
        //    this.provisionalPlanId = this.provisionalPlan.id;
        //}
    };

    Movement.prototype = Object.create(app.bean.AbstractBean.prototype, {
        constructor: app.bean.AbstractBean,
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
                id: new app.bean.core.AbstractSchema({type: app.bean.core.type.NUMBER, nullable: true}),
                name: new app.bean.core.AbstractSchema({type: app.bean.core.type.STRING}),
                amount: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.NUMBER,
                    nullable: false,
                    defaultValue: 0
                }),
                type: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.STRING,
                    nullable: false,
                    defaultValue: 'down'
                }),
                repeat: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.NUMBER,
                    nullable: false,
                    defaultValue: 1
                }),
                comment: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.STRING,
                    mandatory: false,
                    nullable: true
                }),
                active: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.BOOLEAN,
                    nullable: false,
                    persist: true
                }),
                provisionalPlanId: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.NUMBER,
                    mandatory: false,
                    nullable: true,
                    persistingName: 'ProvisionalPlanId'
                }),
                provisionalPlan: new app.bean.core.AbstractSchema({
                    type: app.bean.core.type.OBJECT,
                    mandatory: false,
                    constructor: app.bean.ProvisionalPlan,
                    beanName: 'ProvisionalPlan'
                })
            }
        }
    });

    app.bean.Movement = Movement;
    //var beanFactory = new AbstractBeanFactory();
    //var beanEtude = beanFactory.createBean('Etude', {name: 'beanEtude', id:45, creator: 'maxime'});

})();
