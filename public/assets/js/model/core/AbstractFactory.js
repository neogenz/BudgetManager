(function init(exports, beansNamespace) {
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
            var beanCreated = null;
            debugger; //Verif le new Bean ? on pourrais donc enlever les beansNamespaces
            try {
                beanCreated = (Bean ? new Bean(initializationObject) : null);
                beanCreated.init(initializationObject);
                return beanCreated;
            } catch (err) {
                neogenz.logger.logError('AbstractFactory.js', '_getBean() of type ' + type, err.message);
                throw err;
            }
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
            if (typeof proto.init === 'function') {
                _beanTypes[type] = Bean;
            } else {
                neogenz.logger.logError('AbstractFactory.js',
                    '_registerBean()',
                    'The bean ' + type + ' do not respect the contract.');
            }
            debugger; // vérifier si exports est pris dans la closure sinon utiliser neoegenz.factory
            return exports.factory;
        }


        return {
            getBean: _getBean,
            registerBean: _registerBean
        };
    })();
})(neogenz.beans, budgetManager.beans);