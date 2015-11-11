'use strict';

myLib.technical.defineNamespace(app, 'bean.factory');

(function init() {
    app.bean.factory = new AbstractBeanFactory();
    app.bean.AbstractBean = AbstractBean;

    function AbstractBeanFactory() {
    }

    AbstractBeanFactory.prototype.createBean = function (beanName, json) {
        if (beanName === 'Movement') {
            return new app.bean.Movement(json);
        } else if (beanName === 'ProvisionalPlan') {
            return new app.bean.ProvisionalPlan(json);
        }
    };

    function AbstractBean(json) {
        if (json !== null) {
            this.initWith(json);
        }
    }

    AbstractBean.prototype.checkField = function (json) {
        app.bean.core.AbstractSchema.prototype.checkIntegrity(this._schema, json);
        //var realKey = null;
        //for (var key in this._schema) {
        //
        //    if (!_.isUndefined(json[key])) {
        //        realKey = key;
        //    } else if (!_.isUndefined(this._schema[key].persistingName) && !_.isUndefined(json[this._schema[key].persistingName])) {
        //        realKey = this._schema[key].persistingName;
        //    } else {
        //        continue;
        //    }
        //
        //    if (this._schema[key].mandatory && json[realKey] === undefined) {
        //        throw new Error('The property property ' + key + ' can\'t be undefined.');
        //    }
        //    if (!this._schema[key].nullable && json[realKey] === null) {
        //        if(this._schema[key].mandatory){
        //            throw new Error('The property ' + key + ' can\'t be null.');
        //        }else{
        //            console.warn('The property ' + key + ' can\'t be null.');
        //            this[key] = null;
        //            continue;
        //        }
        //    }
        //    if (this._schema[key].nullable && json[realKey] === null) {
        //        continue;
        //    }
        //
        //    if (this._schema[key].type === 'string' && !_.isString(json[realKey])) {
        //        if(this._schema[key].mandatory){
        //            throw new Error('The property ' + key + ' must be a string');
        //        }else{
        //            console.warn('The property ' + key + ' must be a string');
        //        }
        //    } else if (this._schema[key].type === 'bool' && !_.isBoolean(json[realKey])) {
        //        if(this._schema[key].mandatory){
        //            throw new Error('The property ' + key + ' must be a boolean');
        //        }else{
        //            console.warn('The property ' + key + ' must be a boolean');
        //        }
        //    } else if (this._schema[key].type === 'int' && !_.isNumber(json[realKey])) {
        //        if(this._schema[key].mandatory){
        //            throw new Error('The property ' + key + ' must be an int');
        //        }else{
        //            console.warn('The property ' + key + ' must be an int');
        //        }
        //    } else if (this._schema[key].type === 'object' && !_.isObject(json[realKey])) {
        //        if(this._schema[key].mandatory){
        //            throw new Error('The property ' + key + ' must be an object');
        //        }else{
        //            console.warn('The property ' + key + ' must be an object');
        //        }
        //    } else if (this._schema[key].type === 'array' && !_.isArray(json[realKey])) {
        //        if(this._schema[key].mandatory){
        //            throw new Error('The property ' + key + ' must be an array');
        //        }else{
        //            console.warn('The property ' + key + ' must be an array');
        //        }
        //    } else if (this._schema[key].type === 'arrayObject' && !_.isArray(json[realKey])) {
        //        if(this._schema[key].mandatory){
        //            throw new Error('The property ' + key + ' must be an array');
        //        }else{
        //            console.warn('The property ' + key + ' must be an array');
        //        }
        //    }
        //
        //    if (this._schema[key].type === 'arrayObject') {
        //        for (var i = 0; i < json[realKey].length; i++) {
        //            if (!_.isObject(json[realKey][i])) {
        //                if(this._schema[key].contentObject.mandatory){
        //                    throw new Error('The property ' + key + '[' + i + '] must be an object');
        //                }else{
        //                    console.warn('The property ' + key + '[' + i + '] must be an object');
        //                }
        //
        //            }
        //        }
        //    }
        //}
    };

    AbstractBean.prototype.initWith = function (json) {
        this.checkField(json);
        var realKey = null;
        for (var key in this._schema) {
            if (!_.isUndefined(json[key])) {
                realKey = key;
            } else if (!_.isUndefined(this._schema[key].persistingName) && !_.isUndefined(json[this._schema[key].persistingName])) {
                realKey = this._schema[key].persistingName;
            } else {
                realKey = null;
            }

            if (!_.isUndefined(json[realKey]) && !_.isObject(json[realKey])) {
                this[key] = json[realKey];
            } else if (!_.isUndefined(json[realKey]) && _.isObject(json[realKey])) {
                if (this._schema[key].type === app.bean.core.type.ARRAY_OBJECT) {
                    this[key] = [];
                    for (var i = 0; i < json[realKey].length; i++) {
                        this[key].push(app.bean.factory.createBean(this._schema[key].contentObject.beanName, json[realKey][i]));
                    }
                } else {
                    this[key] = app.bean.factory.createBean(this._schema[key].beanName, json[realKey]);
                }
            }
        }
        //for (var key in json) {
        //    if ((this._schema[key] !== undefined || (this._schema[key].persistingName !== undefined && this._schema[key] !== undefined))
        //        && !_.isObject(json[key])) {
        //        this[key] = json[key];
        //    } else if (this._schema[key] !== undefined && _.isObject(json[key])) {
        //        this[key] = app.bean.factory.createBean(this._schema[key].beanName, json[key]);
        //    }
        //}
    };
//function _getConstructor(modelToFactored) {
//    if (_.isUndefined(modelToFactored) || _.isNull(modelToFactored)) {
//        throw new Error('Factory doesn\'t find constructor of : ' + name);
//    } else {
//        return modelToFactored;
//    }
//}
//
//function Factory() {
//    var self = this;
//    self.constructor = null;
//
//    return {
//        runFactory: _runFactory
//    };
//
//    function _runFactory(collection, name) {
//        var v_result = null;
//        if (myLib.technical.isUndefinedOrNull(name)) {
//            throw new Error('Name of collections to factored is not defined.');
//        }
//        if (myLib.technical.isUndefined(collection)) {
//            throw new Error('Object to serialize is not defined');
//        }
//        if (_.isNull(collection)) {
//            v_result = null;
//        }
//
//        self.constructor = _getConstructor(app.bean[name]);
//
//        if (_.isArray(collection)) {
//            v_result = [];
//            if (!_.isEmpty(collection)) {
//                var i = collection.length;
//                while (i--) {
//                    self.constructor = _getConstructor(app.bean[name]);
//                    if (myLib.technical.isUndefined(collection[i])) {
//                        throw new Error('Element ' + i + ' of collections to factored is not defined.');
//                    }
//                    if (_.isNull(collection[i])) {
//                        v_result.push(null);
//                    } else {
//                        try {
//                            v_result.push(new self.constructor(collection[i]))
//                        }
//                        catch (e) {
//                            throw new Error(e);
//                        }
//                    }
//                }
//            }
//        } else {
//            var singleObject = collection;
//            try {
//                v_result = new self.constructor(singleObject);
//            }
//            catch (e) {
//                throw new Error('Fail to construct new self.constructor(singleObject)');
//            }
//        }
//        return v_result;
//    }
//}

})
();