(function init() {
    'use strict';
    app.beans.AbstractBean = AbstractBean;


    /**
     * @class AbstractBean
     * Class inherit of all models class.
     */
    function AbstractBean(json) {
        //this._schema = {};
        if (!neogenz.utilities.isUndefinedOrNull(json)) {
            this.initWith(json);
        } else {
            this.initWithDefaultValue();
        }
    }

    AbstractBean.prototype.checkField = function (json) {
        app.beans.AbstractSchema.prototype.checkIntegrity(this._schema, json);
    };

    AbstractBean.prototype.initWith = function (json) {
        this.checkField(json);
        var jsonKey = null;
        for (var schemaKey in this._schema) {
            jsonKey = this.getValidKeyOfProperty(json, schemaKey);
            if (_.isNull(jsonKey)) {
                continue;
            }
            if (!_.isUndefined(json[jsonKey]) && !_.isObject(json[jsonKey])) {
                this[schemaKey] = json[jsonKey];
            } else if (!_.isUndefined(json[jsonKey]) && _.isObject(json[jsonKey])) {
                if (this._schema[schemaKey].type === app.beans.type.ARRAY_OBJECT) {
                    this[schemaKey] = [];
                    for (var i = 0; i < json[jsonKey].length; i++) {
                        this[schemaKey].push(app.beans.factory.getBean(this._schema[schemaKey].contentObject.beanName, json[jsonKey][i]));
                    }
                } else {
                    this[schemaKey] = app.beans.factory.getBean(this._schema[schemaKey].beanName, json[jsonKey]);
                }
            }
        }
    };

    AbstractBean.prototype.initWithDefaultValue = function () {
        for (var key in this._schema) {
            if (this._schema[key].mandatory) {
                this[key] = this._schema[key].defaultValue;
            }
        }
    }


    /**
     * @name getValidKeyOfProperty
     * Get the valid key on json. The _schema key or the persistingName key
     * specified in _schema. Or null if between is undefined in json.
     * @param {object} objectToTest Object to test the key.
     * @param {string} keyToTest Key to find in object.
     */
    AbstractBean.prototype.getValidKeyOfProperty = function (objectToTest, keyToTest) {
        var _validKey = null;
        if (!_.isUndefined(objectToTest[keyToTest])) {
            _validKey = keyToTest;
        }
        else if (!_.isUndefined(this._schema[keyToTest].persistingName)) {
            if (neogenz.utilities.hasThisProperty(objectToTest, this._schema[keyToTest].persistingName)) {
                _validKey = this._schema[keyToTest].persistingName;
            }
        }
        return _validKey;
    }
})();

//
//
//(function init() {
//    'use strict';
//    app.beans.AbstractBean = AbstractBean;
//
//
//    /**
//     * @class AbstractBean
//     * Class inherit of all models class.
//     */
//    function AbstractBean(json) {
//        //this._schema = {};
//        if (!neogenz.utilities.isUndefinedOrNull(json)) {
//            this.initWith(json);
//        } else {
//            this.initWithDefaultValue();
//        }
//    }
//
//    AbstractBean.prototype.checkField = function (json) {
//        app.beans.AbstractSchema.prototype.checkIntegrity(this._schema, json);
//    };
//
//    AbstractBean.prototype.initWith = function (json) {
//        this.checkField(json);
//        var jsonKey = null;
//        for (var schemaKey in this._schema) {
//            if (!_.isUndefined(json[schemaKey])) {
//                jsonKey = schemaKey;
//            } else if (!_.isUndefined(this._schema[schemaKey].persistingName) &&
//                neogenz.utilities.hasThisProperty(json, this._schema[schemaKey].persistingName)) {
//                jsonKey = this._schema[schemaKey].persistingName;
//            } else {
//                jsonKey = null;
//            }
//
//            if (!_.isUndefined(json[jsonKey]) && !_.isObject(json[jsonKey])) {
//                this[schemaKey] = json[jsonKey];
//            } else if (!_.isUndefined(json[jsonKey]) && _.isObject(json[jsonKey])) {
//                if (this._schema[schemaKey].type === app.beans.type.ARRAY_OBJECT) {
//                    this[schemaKey] = [];
//                    for (var i = 0; i < json[jsonKey].length; i++) {
//                        this[schemaKey].push(app.beans.factory.getBean(this._schema[schemaKey].contentObject.beanName, json[jsonKey][i]));
//                    }
//                } else {
//                    this[schemaKey] = app.beans.factory.getBean(this._schema[schemaKey].beanName, json[jsonKey]);
//                }
//            }
//        }
//    };
//
//    AbstractBean.prototype.initWithDefaultValue = function () {
//        for (var key in this._schema) {
//            if (this._schema[key].mandatory) {
//                this[key] = this._schema[key].defaultValue;
//            }
//        }
//    }
//})();

