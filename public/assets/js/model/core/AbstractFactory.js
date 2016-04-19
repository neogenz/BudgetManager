(function init(exports) {
    'use strict';
    //Revealing module pattern
    exports.factory = (function () {

        // Storage for our bean types
        var _beanTypes = {};

        /**
         * @name _getBean
         * Get the bean by type in the closed object and return if he's exist.
         * @param {string} type Bean name.
         * @param {Object} initializationObject Object passed to bean constructor.
         */
        function _getBean(type, initializationObject) {
            var Bean = _beanTypes[type];

            return (Bean ? new app.beans[type](initializationObject) : null);
        }


        /**
         * @name _registerBean
         * Register constructor function in scoped object with bean name like key.
         * @param {string} type Bean name.
         * @param {Object} Bean Constructor-function-object which is stocked.
         */
        function _registerBean(type, Bean) {
            var proto = Bean.prototype;

            // only register classes that fulfill the bean contract
            if (proto._schema) {
                _beanTypes[type] = Bean;
            }

            return app.beans.factory;
        }


        return {
            getBean: _getBean,
            registerBean: _registerBean
        };
    })();
})(app.beans);