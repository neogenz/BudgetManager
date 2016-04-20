(function init(exports) {
    exports.utilities = (function () {
        return {
            defineNamespace: _defineNamespace,
            hasThisProperty: _hasThisProperty,
            isUndefinedOrNull: _isUndefinedOrNull,
            isUndefined: _isUndefined,
            extendsChildFromParent: _extendsChildFromParent
        };
    })();

    /**
     * @name _defineNamespace
     * Create an objects structure attached to a namespace
     * @param {object} app parent ex: app, core....
     * @param {string} nsString to parse
     */
    function _defineNamespace(app, nsString) {
        try {
            var parts = nsString.split('.'),
                parent = app;
            if (parts[0 === parent]) {
                parts = parts.slice(1);
            }
            for (var i = 0; i < parts.length; i++) {
                //create a property if doesn't exist
                if (_.isUndefined(parent[parts[i]])) {
                    parent[parts[i]] = {};
                }
                parent = parent[parts[i]];
            }
            return parent;
        } catch (err) {
        }
    }


    /**
     * @name _hasThisProperty
     * Test if an object have an property in their proptotype and parents
     * prototype.
     * @param {object} object Object to test
     * @param {string} propertyName Name of property to test
     */
    function _hasThisProperty(object, propertyName) {
        try {
            if (_.isUndefined(object[propertyName])) {
                throw new TypeError('Object[' + propertyName + '] not available.');
            } else {
                return true;
            }
        } catch (err) {
            neogenz.logger.logInfo('commonHelpers.js', 'neogenz.utilities.hasThisProperty()', err.message);
            return false;
        }
    }


    /**
     * @name _isUndefinedOrNull
     * Test if an variable is null or undefined.
     * @param {object} value Variable to test
     */
    function _isUndefinedOrNull(value) {
        return (value === undefined || value === null);
    }


    /**
     * @name _isUndefined
     * Test if an variable is null.
     * @param {object} value Object to test
     */
    function _isUndefined(value) {
        return (value === undefined);
    }


    /**
     * @name _extendsChildFromParent
     * Create a prototypal inheritance by two object.
     * @param {object} child Object that will have the prototype extended.
     * @param {object} parent The protoype of this object that will used to extend the child object.
     */
    function _extendsChildFromParent(child, parent) {
        child.prototype = Object.create(parent.prototype, {
            constructor: {value: child, writable: true, enumerable: false}
        });
    };

})(neogenz);
