'use strict';
//app.helpers.defineNamespace(app, 'bean.core');
(function initSchema() {
    var AbstractSchema = function (initObject) {
        if (!app.helpers.isUndefinedOrNull(initObject)) {
            for (var key in initObject) {
                if (!app.helpers.isUndefined(this[key])) {
                    this[key] = initObject[key];
                }
            }
        }
    };


    AbstractSchema.prototype = Object.create(AbstractSchema.prototype, {
        constructor: {value: AbstractSchema, writable: true},
        type: {value: null, writable: true},
        beanName: {value: null, writable: true},
        mandatory: {value: true, writable: true},
        persisted: {value: true, writable: true},
        nullable: {value: false, writable: true},
        defaultValue: {value: null, writable: true},
        contentObject: {value: null, writable: true},
        persistingName: {value: null, writable: true},
        _propertyIsPresentInJson: {value: true, writable: true}
    });


    /**
     * @function _checkTypeIntegrityBySchema
     * @desc Check the integrity of value by the schema configuration
     * @param {AbstractSchema} schema Schema model to used to test
     * @param {var} value Value to test from schema
     * @param {string} propertyName Name of property tested on schema, to log if an error is occurred
     * @memberOf AbstractSchema.prototype
     */
    AbstractSchema.prototype._checkTypeIntegrityBySchema = function (schema, value, propertyName) {
        if (app.helpers.isUndefinedOrNull(schema)) {
            throw new Error('The schema is null or undefined');
        }
        if (!schema.type.checkIntegrity(value)) {
            throw new Error('The property ' + propertyName + ' must be of type ' + schema.type.toString() + '.');
        }
    };


    /**
     * @function _getJsonKey
     * @desc    Get the key where property in json is defined or null is she is undefined.
     *              If she is undefined, we notify state of instance.
     * @param {AbstractSchema} schema Schema model to used to test
     * @param {Object} json json to get the good key
     * @param {string} key Key to test json
     * @memberOf AbstractSchema.prototype
     */
    AbstractSchema.prototype._getJsonKey = function (schema, json, key) {
        var jsonKey = null;
        if (app.helpers.isUndefined(json[key])) {
            console.warn('This porperty : ' + key + ' is not defined in json. See with persisting name.');
            //see in persistingName
            var persistingName = schema.persistingName;
            if (app.helpers.isUndefined(json[persistingName])) {
                this._propertyIsPresentInJson = false;
                jsonKey = null;
            } else {
                jsonKey = schema.persistingName;
            }
        } else {
            jsonKey = key;
        }
        return jsonKey;
    };


    /**
     * @function _resetControlState
     * @desc Reset the controls states of instance
     * @memberOf AbstractSchema.prototype
     */
    AbstractSchema.prototype._resetControlState = function () {
        this._propertyIsPresentInJson = true;
    };


    /**
     * @function _checkTypeIntegrityBySchema
     * @desc Check the integrity of json from a class-schema (object containing more AbstractSchema members)
     * @param {Object} schema Schema object containing more AbstractSchema members
     * @param {Object} json Json to test integrity
     * @memberOf AbstractSchema.prototype
     */
    AbstractSchema.prototype.checkIntegrity = function (schema, json) {
        var jsonKey, currentSchemaMember, currentJsonMember;
        if (app.helpers.isUndefinedOrNull(schema)) {
            throw new Error('Schema to test must be defined and not null.');
        }
        for (var key in schema) {

            this._resetControlState();
            currentSchemaMember = schema[key];
            jsonKey = AbstractSchema.prototype._getJsonKey(currentSchemaMember, json, key);
            currentJsonMember = json[jsonKey];
            if (currentSchemaMember.mandatory && !this._propertyIsPresentInJson) {

                throw new Error('The property ' + key + ' is mandatory in schema but undefined in json.');

            } else if (this._propertyIsPresentInJson) {

                if (_.isNull(currentJsonMember) && !currentSchemaMember.nullable) {

                    throw new Error('The property ' + key + ' can\'t be null.');

                } else if (!_.isNull(currentJsonMember)) {

                    AbstractSchema.prototype._checkTypeIntegrityBySchema(currentSchemaMember, currentJsonMember, key);
                }

            }

        }
    };


    app.beans.AbstractSchema = AbstractSchema;


    app.beans.type = {
        STRING: {
            toString: function () {
                return 'string';
            },
            checkIntegrity: function (value) {
                return _.isString(value);
            }
        },
        NUMBER: {
            toString: function () {
                return 'number';
            },
            checkIntegrity: function (value) {
                return _.isNumber(value);
            }
        },
        OBJECT: {
            toString: function () {
                return 'object';
            },
            checkIntegrity: function (value) {
                return _.isObject(value);
            }
        },
        ARRAY: {
            toString: function () {
                return 'array';
            },
            checkIntegrity: function (value) {
                return _.isArray(value);
            }
        },
        ARRAY_OBJECT: {
            toString: function () {
                return 'array of objects';
            },
            checkIntegrity: function (value) {
                if (!_.isArray(value)) {
                    return false;
                } else {
                    for (var i = 0; i < value.length; i++) {
                        if (!_.isObject(value[i])) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        },
        BOOLEAN: {
            toString: function () {
                return 'boolean';
            },
            checkIntegrity: function (value) {
                return _.isBoolean(value);
            }
        }
    }
})();