(function initSchema(exports) {
    'use strict';

    exports.AbstractSchema = AbstractSchema;


    /**
     * @class AbstractSchema
     */
    /*jshint forin: false */
    function AbstractSchema(initObject) {
        if (!neogenz.utilities.isUndefinedOrNull(initObject)) {
            for (var key in initObject) {
                if (!neogenz.utilities.isUndefined(this[key])) {
                    this[key] = initObject[key];
                }
            }
        }
    }


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
     * @param {object} value Value to test from schema
     * @param {string} propertyName Name of property tested on schema, to log if an error is occurred
     * @memberOf AbstractSchema.prototype
     */
    AbstractSchema.prototype._checkTypeIntegrityBySchema = function (schema, value, propertyName) {
        if (neogenz.utilities.isUndefinedOrNull(schema)) {
            throw new Error('The schema is null or undefined');
        }
        if (!schema.type.checkIntegrity(value)) {
            throw new Error('The property ' + propertyName + ' must be of type ' + schema.type.toString() + '.');
        }
    };


    /**
     * @function _getJsonKey
     * @desc    Get the key where property in json is defined or null is she is undefined.
     *          If she is undefined, we notify state of instance.
     * @param {AbstractSchema} schema Schema model to used to test
     * @param {Object} json json to get the good key
     * @param {string} keyToFindInJson Key to test json
     * @memberOf AbstractSchema.prototype
     */
    AbstractSchema.prototype._getJsonKey = function (schema, json, keyToFindInJson) {
        var jsonKey = null;
        if (neogenz.utilities.isUndefined(json[keyToFindInJson])) {
            console.warn('This porperty : ' + keyToFindInJson +
                ' is not defined in json. See with persisting name' +
                ' if he is specified.');
            //see in persistingName
            var persistingName = schema.persistingName;
            if (neogenz.utilities.isUndefined(json[persistingName])) {
                this._propertyIsPresentInJson = false;
                jsonKey = null;
            } else {
                jsonKey = schema.persistingName;
            }
        } else {
            jsonKey = keyToFindInJson;
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
     * @desc Check the integrity of json from a class-schema
     *       (object containing more AbstractSchema members).
     * @param {Object} schema Schema object containing more
     *        AbstractSchema members.
     * @param {Object} json Json to test integrity.
     * @memberOf AbstractSchema.prototype
     */
    AbstractSchema.prototype.checkIntegrity = function (schema, json) {
        var jsonKey, currentSchemaMember, currentJsonMember;
        if (neogenz.utilities.isUndefinedOrNull(schema)) {
            throw new Error('Schema to test must be defined and not null.');
        }

        for (var key in schema) {
            this._resetControlState();
            currentSchemaMember = schema[key];
            jsonKey = AbstractSchema.prototype._getJsonKey(currentSchemaMember, json, key);
            currentJsonMember = json[jsonKey];
            _validMandatoryConstraint(
                this._propertyIsPresentInJson,
                currentSchemaMember.mandatory,
                key
            );
            _validNullableConstraint(
                currentJsonMember,
                currentSchemaMember.nullable,
                key
            );
            if (!_.isUndefined(currentJsonMember) && _.isNull(currentJsonMember)) {
                AbstractSchema.prototype._checkTypeIntegrityBySchema(currentSchemaMember, currentJsonMember, key);
            }
        }
    };


    /**
     * @function _validNullableConstraint
     * @desc Test if the value is null and the nullability constraint. Throw
     *       an Error if it's not respected.
     * @param {object} value Value to test.
     * @param {boolean} isNullable Value is nullable.
     * @param {string} propertyKeyTested Key of object property tested.
     * @memberOf AbstractSchema closure
     */
    function _validNullableConstraint(value, isNullable, propertyKeyTested) {
        if (_.isNull(value) && !isNullable) {
            throw new Error('The property ' + propertyKeyTested +
                ' can\'t be null.');
        }
    }

    /**
     * @function _validNullableConstraint
     * @desc Test if the value is undefined and if the mandatory constraint is
     *       present. Throw an Error if she's not respected.
     * @param {boolean} isPresent Value is present.
     * @param {boolean} isMandatory Value is mandatory.
     * @param {string} propertyKeyTested Key of object property tested.
     * @memberOf AbstractSchema closure
     */
    function _validMandatoryConstraint(isPresent, isMandatory, propertyKeyTested) {
        if (!isPresent && isMandatory) {
            throw new Error('The property ' + propertyKeyTested +
                ' is mandatory in schema but undefined in json.');
        }
    }

    exports.type = {
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
    };
})(app.beans);
