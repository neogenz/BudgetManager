'use strict';

window.myLib = window.myLib || {};
window.myLib.technical = window.myLib.technical || {};

(function init() {
    window.myLib.technical = {
        defineNamespace: _defineNamespace,
        verifParam: _verifParam,
        isUndefinedOrNull: _isUndefinedOrNull,
        isUndefined: _isUndefined,
        buildPostRequestOptToCallThisUrl: _buildPostRequestOptToCallThisUrl,
        buildGetRequestOptToCallThisUrl: _buildGetRequestOptToCallThisUrl,
        buildPutRequestOptToCallThisUrl: _buildPutRequestOptToCallThisUrl,
        buildDeleteRequestOptToCallThisUrl: _buildDeleteRequestOptToCallThisUrl,
        log: {
            logExceptionWithThrow: _logExceptionWithThrow,
            logExceptionWithoutThrow: _logExceptionWithoutThrow,
            logError: _logError,
            logWarning: _logWarning,
            logInfo: _logInfo,
            logDebug: _logDebug
        }
    };

    /**
     * @name _defineNamespace
     * Créer une chaine d'objet rattachés à un objet parent à partir d'une string
     * @param {object} app parent ex: app, core....
     * @param {string} ns_string to parse
     */
    function _defineNamespace(app, ns_string) {
        try {
            var parts = ns_string.split('.'),
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


    function _verifParam(param, key) {
        try {
            if (_.isUndefined(param[key])) {
                throw new Error('Field : ' + key + ' not available.');
            } else {
                return param[key];
            }
        } catch (err) {

        }
    }


    function _isUndefinedOrNull(param) {
        return (_.isUndefined(param) || _.isNull(param));
    }


    function _isUndefined(param) {
        return (_.isUndefined(param));
    }


    function _buildPostRequestOptToCallThisUrl(url, bodyRequest) {
        return {
            method: 'POST',
            url: url,
            hearders: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'localhost'
            },
            data: bodyRequest
        };
    }


    function _buildGetRequestOptToCallThisUrl(url) {
        return {
            method: 'GET',
            url: url
        };
    }


    function _buildPutRequestOptToCallThisUrl(url, bodyRequest) {
        return {
            method: 'PUT',
            url: url,
            hearders: {
                'Content-Type': 'application/json'
            },
            data: bodyRequest
        };
    }


    function _buildDeleteRequestOptToCallThisUrl(url) {
        return {
            method: 'DELETE',
            url: url
        };
    }


    function _logExceptionWithThrow() {
        throw new Error('Not yet implemented');
    }


    function _logExceptionWithoutThrow() {
        throw new Error('Not yet implemented');
    }

    function _logError(file, method, message) {
        console.error(file + ' - ' + method + ' - ' + message);
    }


    function _logWarning(file, method, message) {
        console.warn(file + ' - ' + method + ' - ' + message);
    }


    function _logInfo(file, method, message) {
        console.info(file + ' - ' + method + ' - ' + message);
    }


    function _logDebug(file, method, message) {
        console.debug(file + ' - ' + method + ' - ' + message);
    }
})();