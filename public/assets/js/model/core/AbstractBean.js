(function init(exports) {
    'use strict';

    /**
     * @class AbstractBean
     * Class inherited by all models class.
     */
    // function AbstractBean() {
    //     this._schema = null;
    // }
    //
    // AbstractBean.prototype.checkField = _checkField;
    //
    // AbstractBean.prototype.init = _init;
    //
    // AbstractBean.prototype.initWith = _initWith;
    //
    // AbstractBean.prototype.initWithDefaultValue = _initWithDefaultValue;
    //
    // AbstractBean.prototype.getValidKeyOfProperty = _getValidKeyOfProperty;

    var AbstractBean = neogenz.BaseClass.extend({
        initialize: function () {
            this._schema = null;
        },
        checkField: _checkField,
        init: _init,
        initWith: _initWith,
        initWithDefaultValue: _initWithDefaultValue,
        getValidKeyOfProperty: _getValidKeyOfProperty
    });
    
    
    /**
     * @name _init
     * Init the current bean in construction. Call the init with default value method or with an initialization
     * object.
     * @param {object|undefined|null} objectToInit Object to init the current bean.
     */
    function _init(objectToInit) {
        /* jshint validthis: true */
        if (!neogenz.utilities.isUndefinedOrNull(objectToInit)) {
            this.initWith(objectToInit);
        } else {
            this.initWithDefaultValue();
        }
    }


    /**
     * @name _checkField
     * Get the valid key on json. The _schema key or the persistingName key
     * specified in _schema. Or null if between is undefined in json.
     * @param {object} objectToTest Object to test the key.
     * @param {string} keyToTest Key to find in object.
     */
    /* jshint validthis: true */
    function _checkField(json) {
        neogenz.beans.AbstractSchema.prototype.checkIntegrity(this._schema, json);
    }


    /**
     * @name _initWith
     * Init the bean focused by this by the object passed in parameter.
     * @param {object} objectToInit Object used to init this bean.
     */
    /* jshint validthis: true */
    function _initWith(objectToInit) {
        this.checkField(objectToInit);
        var objectKey = null;
        /*jshint forin: false */
        for (var schemaKey in this._schema) {
            objectKey = this.getValidKeyOfProperty(objectToInit, schemaKey);
            if (_.isNull(objectKey)) {
                continue;
            }
            if (_isAPrimaryType(objectToInit[objectKey])) {
                this[schemaKey] = objectToInit[objectKey];
            } else if (_isAComplexeType(objectToInit[objectKey])) {
                if (this._schema[schemaKey].type === neogenz.beans.type.ARRAY_OBJECT) {
                    this[schemaKey] = _getArrayBeanByBeanNameAndInitObject(
                        this._schema[schemaKey].contentObject.beanName,
                        objectToInit[objectKey]
                    );
                } else {
                    this[schemaKey] = neogenz.beans.factory.getBean(
                        this._schema[schemaKey].beanName,
                        objectToInit[objectKey]
                    );
                }
            }
        }
    }


    /**
     * @name _initWithDefaultValue
     * Init the bean focused by this with default value of this _schema.
     */
    /* jshint validthis: true */
    function _initWithDefaultValue() {
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
    function _getValidKeyOfProperty(objectToTest, keyToTest) {
        var _validKey = null;
        if (!_.isUndefined(objectToTest[keyToTest])) {
            _validKey = keyToTest;
        }
        /* jshint validthis: true */
        else if (!_.isUndefined(this._schema[keyToTest].persistingName)) {
            if (neogenz.utilities.hasThisProperty(objectToTest, this._schema[keyToTest].persistingName)) {
                _validKey = this._schema[keyToTest].persistingName;
            }
        }
        return _validKey;
    }


    /**
     * @name _isAPrimaryType
     * Test if an value is a primary type.
     * @param {object} value Value to test.
     * @return {boolean} Is a primary type.
     */
    function _isAPrimaryType(value) {
        return (!_.isUndefined(value) && !_.isObject(value));
    }


    /**
     * @name _isAComplexeType
     * Test if an value is a complexe type (object).
     * @param {object} value Value to test.
     * @return {boolean} Is a complexe type.
     */
    function _isAComplexeType(value) {
        return (!_.isUndefined(value) && _.isObject(value));
    }


    /**
     * @name _getArrayBeanByBeanNameAndInitObject
     * Build an array of bean by bean name and array of object to init each beans in array.
     * @param {string} beanName Name of bean to build for each element of array.
     * @param {Array<object>} collectionOfInitObjects Collection of object used to init the array of bean.
     * @return {Array<AbstractBean>} The array of bean initialized.
     */
    function _getArrayBeanByBeanNameAndInitObject(beanName, collectionOfInitObjects) {
        var _arrayOfBeans = [];
        var beanCreated = null;
        for (var i = 0; i < collectionOfInitObjects.length; i++) {
            try {
                beanCreated = neogenz.beans.factory.getBean(beanName, collectionOfInitObjects[i]);
                _arrayOfBeans.push(beanCreated);
            } catch (err) {
                continue;
            }
        }
        return _arrayOfBeans;
    }

    exports.AbstractBean = AbstractBean;
})(neogenz.beans);
