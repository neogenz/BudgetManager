//(function init() {
//    'use strict';
//
//    window.neogenz = {};
//    window.neogenz = {
//        beans: {}
//    };
//    neogenz.beans.Logger = _Logger;
//    neogenz.beans.Utilities = _Utilities;
//    neogenz.beans.HttpUtilities = _HttpUtilities;
//    neogenz.logger = {};
//    neogenz.utilities = {};
//    neogenz.httpUtilities = {};
//
//    /**
//     * @class _Logger
//     * Class used to log things on console.
//     */
//    function _Logger() {
//    }
//
//    _Logger.prototype = {
//        logExceptionWithThrow: _logExceptionWithThrow,
//        logExceptionWithoutThrow: _logExceptionWithoutThrow,
//        logError: _logError,
//        logWarning: _logWarning,
//        logInfo: _logInfo,
//        logDebug: _logDebug
//    };
//
//
//    /**
//     * @class _Utilities
//     * Class used to make lot of things.
//     */
//    function _Utilities() {
//    }
//
//    _Utilities.prototype = {
//        defineNamespace: _defineNamespace,
//        hasThisProperty: _hasThisProperty,
//        isUndefinedOrNull: _isUndefinedOrNull,
//        isUndefined: _isUndefined
//    };
//
//
//    /**
//     * @class _HttpUtilities
//     * Class used to build http call options objects.
//     */
//    /* jshint validthis: true */
//    function _HttpUtilities() {
//        //@todo Remplacer par fichier de conf
//        this.baseUrl = 'http://localhost'; //app.budgetManager.endpoints['nodeEndpoint']
//        this.portNumber = 3000;
//    }
//
//    _HttpUtilities.prototype = {
//        buildPostRequestOptToCallThisUrl: _buildPostRequestOptionsToCallThisUrl,
//        buildGetRequestOptToCallThisUrl: _buildGetRequestOptionsToCallThisUrl,
//        buildPutRequestOptToCallThisUrl: _buildPutRequestOptionsToCallThisUrl,
//        buildDeleteRequestOptToCallThisUrl: _buildDeleteRequestOptionsToCallThisUrl
//    };
//
//    /**
//     * @name _defineNamespace
//     * Create an objects structure attached to a namespace
//     * @param {object} app parent ex: app, core....
//     * @param {string} nsString to parse
//     */
//    function _defineNamespace(app, nsString) {
//        try {
//            var parts = nsString.split('.'),
//                parent = app;
//            if (parts[0 === parent]) {
//                parts = parts.slice(1);
//            }
//            for (var i = 0; i < parts.length; i++) {
//                //create a property if doesn't exist
//                if (_.isUndefined(parent[parts[i]])) {
//                    parent[parts[i]] = {};
//                }
//                parent = parent[parts[i]];
//            }
//            return parent;
//        } catch (err) {
//        }
//    }
//
//
//    /**
//     * @name _hasThisProperty
//     * Test if an object have an property in their proptotype and parents
//     * prototype.
//     * @param {object} object Object to test
//     * @param {string} propertyName Name of property to test
//     */
//    function _hasThisProperty(object, propertyName) {
//        try {
//            if (_.isUndefined(object[propertyName])) {
//                throw new TypeError('Object[' + propertyName + '] not available.');
//            } else {
//                return true;
//            }
//        } catch (err) {
//            neogenz.logger.logInfo('commonHelpers.js', 'neogenz.utilities.hasThisProperty()', err.message);
//            return false;
//        }
//    }
//
//
//    /**
//     * @name _isUndefinedOrNull
//     * Test if an variable is null or undefined.
//     * @param {object} value Variable to test
//     */
//    function _isUndefinedOrNull(value) {
//        return (value === undefined || value === null);
//    }
//
//
//    /**
//     * @name _isUndefined
//     * Test if an variable is null.
//     * @param {object} value Object to test
//     */
//    function _isUndefined(value) {
//        return (value === undefined);
//    }
//
//
//    /**
//     * @name _buildPostRequestOptionsToCallThisUrl
//     * Build an basic object preparate to be passed to an HTTP POST call
//     * AngularJS.
//     * @param {string} endpoint Endpoint to call
//     * @param {Object} bodyRequest Body passed to HTTP call
//     */
//    function _buildPostRequestOptionsToCallThisUrl(endpoint, bodyRequest) {
//        return {
//            method: 'POST',
//            url: this.baseUrl + ':' + this.portNumber + endpoint,
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            data: bodyRequest
//        };
//    }
//
//
//    /**
//     * @name _buildGetRequestOptionsToCallThisUrl
//     * Build an basic object preparate to be passed to an HTTP GET call
//     * AngularJS.
//     * @param {string} endpoint Endpoint to call
//     */
//    function _buildGetRequestOptionsToCallThisUrl(endpoint) {
//        return {
//            method: 'GET',
//            url: this.baseUrl + ':' + this.portNumber + endpoint,
//        };
//    }
//
//
//    /**
//     * @name _buildPutRequestOptionsToCallThisUrl
//     * Build an basic object preparate to be passed to an HTTP PUT call
//     * AngularJS.
//     * @param {string} endpoint Endpoint to call
//     * @param {Object} bodyRequest Body passed to HTTP call
//     */
//    function _buildPutRequestOptionsToCallThisUrl(endpoint, bodyRequest) {
//        return {
//            method: 'PUT',
//            url: this.baseUrl + ':' + this.portNumber + endpoint,
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            data: bodyRequest
//        };
//    }
//
//
//    /**
//     * @name _buildDeleteRequestOptionsToCallThisUrl
//     * Build an basic object preparate to be passed to an HTTP DELETE call
//     * AngularJS.
//     * @param {string} endpoint Endpoint to call
//     */
//    function _buildDeleteRequestOptionsToCallThisUrl(endpoint) {
//        return {
//            method: 'DELETE',
//            url: this.baseUrl + ':' + this.portNumber + endpoint,
//        };
//    }
//
//
//    /**
//     * @name _logExceptionWithThrow
//     * Log an exception, may be with parameters. Rethrow exception after log.
//     * @param {Error} exception Exception to log.
//     * @param {Array<Object>} parameters Array of parameters. Optionally.
//     */
//    function _logExceptionWithThrow(exception, parameters) {
//        console.error(exception);
//        throw exception;
//    }
//
//
//    /**
//     * @name _logExceptionWithoutThrow
//     * Log an exception, may be with parameters. Don't rethrow the exception.
//     * @param {Error} exception Exception to log.
//     * @param {Array<Object>} parameters Array of parameters. Optionally.
//     */
//    function _logExceptionWithoutThrow(exception, parameters) {
//        console.error(exception);
//    }
//
//
//    /**
//     * @name _logError
//     * Log an error on error chanel. Traced by file, method and name of
//     * scope or function which the error was logged.
//     * @param {string} file File name where the error is detect.
//     * @param {string} method Function name where the error is detect.
//     * @param {string} message Personnalised message.
//     */
//    function _logError(file, method, message) {
//        console.error('ERROR - ' + file + ' - ' + method + ' - ' + message);
//    }
//
//
//    /**
//     * @name _logWarning
//     * Log an error on warning chanel. Traced by file, method and name of
//     * scope or function which the error was logged.
//     * @param {string} file File name where the error is detect.
//     * @param {string} method Function name where the error is detect.
//     * @param {string} message Personnalised message.
//     */
//    function _logWarning(file, method, message) {
//        console.warn('WARN - ' + file + ' - ' + method + ' - ' + message);
//    }
//
//
//    /**
//     * @name _logInfo
//     * Log an message on info chanel. Traced by file, method and name of
//     * scope or function which the message was logged.
//     * @param {string} file File name where the message is detect.
//     * @param {string} method Function name where the message is logged.
//     * @param {string} message Personnalised message.
//     */
//    function _logInfo(file, method, message) {
//        console.info('INFO - ' + file + ' - ' + method + ' - ' + message);
//    }
//
//
//    /**
//     * @name _logDebug
//     * Log an message on debug chanel. Traced by file, method and name of
//     * scope or function which the message was logged.
//     * @param {string} file File name where the message is detect.
//     * @param {string} method Function name where the message is logged.
//     * @param {string} message Personnalised message.
//     */
//    function _logDebug(file, method, message) {
//        console.debug('DEBUG - ' + file + ' - ' + method + ' - ' + message);
//    }
//
//    neogenz.logger = new neogenz.beans.Logger();
//    neogenz.utilities = new neogenz.beans.Utilities();
//    neogenz.httpUtilities = new neogenz.beans.HttpUtilities();
//})();
//
////
////
////'use strict';
////
////(function init() {
////    neogenz.utilities = {
////        defineNamespace: _defineNamespace,
////        verifParam: _verifParam,
////        isUndefinedOrNull: _isUndefinedOrNull,
////        isUndefined: _isUndefined,
////        buildPostRequestOptToCallThisUrl: _buildPostRequestOptToCallThisUrl,
////        buildGetRequestOptToCallThisUrl: _buildGetRequestOptToCallThisUrl,
////        buildPutRequestOptToCallThisUrl: _buildPutRequestOptToCallThisUrl,
////        buildDeleteRequestOptToCallThisUrl: _buildDeleteRequestOptToCallThisUrl,
////        log: {
////            logExceptionWithThrow: _logExceptionWithThrow,
////            logExceptionWithoutThrow: _logExceptionWithoutThrow,
////            logError: _logError,
////            logWarning: _logWarning,
////            logInfo: _logInfo,
////            logDebug: _logDebug
////        }
////    };
////
////    /**
////     * @name _defineNamespace
////     * Créer une chaine d'objet rattachés à un objet parent à partir d'une string
////     * @param {object} app parent ex: app, core....
////     * @param {string} nsString Namespace in string, to parse
////     */
////    function _defineNamespace(app, nsString) {
////        try {
////            var parts = nsString.split('.'),
////                parent = app;
////            if (parts[0 === parent]) {
////                parts = parts.slice(1);
////            }
////            for (var i = 0; i < parts.length; i++) {
////                //create a property if doesn't exist
////                if (_.isUndefined(parent[parts[i]])) {
////                    parent[parts[i]] = {};
////                }
////                parent = parent[parts[i]];
////            }
////            return parent;
////        } catch (err) {
////        }
////    }
////
////
////    function _verifParam(param, key) {
////        try {
////            if (_.isUndefined(param[key])) {
////                throw new Error('Field : ' + key + ' not available.');
////            } else {
////                return param[key];
////            }
////        } catch (err) {
////
////        }
////    }
////
////
////    function _isUndefinedOrNull(param) {
////        return (_.isUndefined(param) || _.isNull(param));
////    }
////
////
////    function _isUndefined(param) {
////        return (_.isUndefined(param));
////    }
////
////
////    function _buildPostRequestOptToCallThisUrl(url, bodyRequest) {
////        return {
////            method: 'POST',
////            url: url,
////            headers: {
////                'Content-Type': 'application/json',
////            },
////            data: bodyRequest
////        };
////    }
////
////
////    function _buildGetRequestOptToCallThisUrl(url) {
////        return {
////            method: 'GET',
////            url: url
////        };
////    }
////
////
////    function _buildPutRequestOptToCallThisUrl(url, bodyRequest) {
////        return {
////            method: 'PUT',
////            url: url,
////            headers: {
////                'Content-Type': 'application/json'
////            },
////            data: bodyRequest
////        };
////    }
////
////
////    function _buildDeleteRequestOptToCallThisUrl(url) {
////        return {
////            method: 'DELETE',
////            url: url
////        };
////    }
////
////
////    function _logExceptionWithThrow() {
////        throw new Error('Not yet implemented');
////    }
////
////
////    function _logExceptionWithoutThrow() {
////        throw new Error('Not yet implemented');
////    }
////
////    function _logError(file, method, message) {
////        console.error(file + ' - ' + method + ' - ' + message);
////    }
////
////
////    function _logWarning(file, method, message) {
////        console.warn(file + ' - ' + method + ' - ' + message);
////    }
////
////
////    function _logInfo(file, method, message) {
////        console.info(file + ' - ' + method + ' - ' + message);
////    }
////
////
////    function _logDebug(file, method, message) {
////        console.debug(file + ' - ' + method + ' - ' + message);
////    }
////})();