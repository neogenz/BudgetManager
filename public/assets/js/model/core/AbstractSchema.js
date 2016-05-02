(function initSchema(exports) {
    'use strict';

    /**
     * @class AbstractSchema
     */
    /*jshint forin: false */
    var AbstractSchema = neogenz.BaseClass.extend({
        initialize: function (initObject) {
            this.type = null;
            this.beanName = null;
            this.mandatory = true;
            this.persisted = true;
            this.nullable = false;
            this.defaultValue = null;
            this.contentObject = null;
            this.persistingName = null;
            this._propertyIsPresentInJson = true;
            if (!neogenz.utilities.isUndefinedOrNull(initObject)) {
                for (var key in initObject) {
                    if (!neogenz.utilities.isUndefined(this[key])) {
                        this[key] = initObject[key];
                    }
                }
            }
        },
        _checkTypeIntegrityBySchema: _checkTypeIntegrityBySchema,
        _getJsonKey: _getJsonKey,
        _resetControlState: _resetControlState,
        checkIntegrity: _checkIntegrity
    })
    // function AbstractSchema(initObject) {
    //     this.type = null;
    //     this.beanName = null;
    //     this.mandatory = true;
    //     this.persisted = true;
    //     this.nullable = false;
    //     this.defaultValue = null;
    //     this.contentObject = null;
    //     this.persistingName = null;
    //     this._propertyIsPresentInJson = true;
    //     if (!neogenz.utilities.isUndefinedOrNull(initObject)) {
    //         for (var key in initObject) {
    //             if (!neogenz.utilities.isUndefined(this[key])) {
    //                 this[key] = initObject[key];
    //             }
    //         }
    //     }
    // }
    
    
    /**
     * @function _checkTypeIntegrityBySchema
     * @desc Check the integrity of value by the schema configuration
     * @param {AbstractSchema} schema Schema model to used to test
     * @param {object} value Value to test from schema
     * @param {string} propertyName Name of property tested on schema, to log if an error is occurred
     * @memberOf AbstractSchema.prototype
     */
    function _checkTypeIntegrityBySchema(schema, value, propertyName) {
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
    function _getJsonKey(schema, json, keyToFindInJson) {
        var jsonKey = null;
        if (neogenz.utilities.isUndefined(json[keyToFindInJson])) {
            console.warn('This porperty : ' + keyToFindInJson +
                ' is not defined in json. See with persisting name' +
                ' if he is specified.');
            //see in persistingName
            var persistingName = schema.persistingName;
            if (neogenz.utilities.isUndefined(json[persistingName])) {
                schema._propertyIsPresentInJson = false;
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
    function _resetControlState() {
        this._propertyIsPresentInJson = true;
    };


    /**
     * @function _checkTypeIntegrityBySchema
     * @desc Check the integrity of json from a class-schema
     *       (object containing more AbstractSchema members).
     * @param {Object} schemaContainer Schema object containing more
     *        AbstractSchema members.
     * @param {Object} json Json to test integrity.
     * @memberOf AbstractSchema.prototype
     */
    function _checkIntegrity(schemaContainer, json) {
        var jsonKey, currentSchemaMember, currentJsonMember;
        if (neogenz.utilities.isUndefinedOrNull(schemaContainer)) {
            throw new Error('schemaContainer to test must be defined and not null.');
        }
        for (var key in schemaContainer) {
            if (schemaContainer.hasOwnProperty(key)) {
                AbstractSchema.prototype._resetControlState.call(schemaContainer[key]);
                currentSchemaMember = schemaContainer[key];
                jsonKey = AbstractSchema.prototype._getJsonKey(currentSchemaMember, json, key);
                currentJsonMember = json[jsonKey];
                _validMandatoryConstraint(
                    schemaContainer[key],
                    currentSchemaMember.mandatory,
                    key
                );
                _validNullableConstraint(
                    currentJsonMember,
                    currentSchemaMember.nullable,
                    key
                );
                if (!_.isUndefined(currentJsonMember) && !_.isNull(currentJsonMember)) {
                    AbstractSchema.prototype._checkTypeIntegrityBySchema(currentSchemaMember, currentJsonMember, key);
                }
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

    exports.AbstractSchema = AbstractSchema;
    
})(neogenz.beans);
