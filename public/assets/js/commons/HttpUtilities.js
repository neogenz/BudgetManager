(function init(exports, baseUrl, portNumber) {

    if (!baseUrl || !portNumber) {
        throw new Error('The baseUrl or portNumber parameters is undefined.');
    }

    var _baseUrl = baseUrl,
        _portNumber = portNumber;

    exports.httpUtilities = (function () {
        return {
            buildPostRequestOptToCallThisUrl: _buildPostRequestOptionsToCallThisUrl,
            buildGetRequestOptToCallThisUrl: _buildGetRequestOptionsToCallThisUrl,
            buildPutRequestOptToCallThisUrl: _buildPutRequestOptionsToCallThisUrl,
            buildDeleteRequestOptToCallThisUrl: _buildDeleteRequestOptionsToCallThisUrl,
            setBaseUrl: function (value) {
                _baseUrl = value;
            },
            setPortNumber: function (value) {
                _portNumber = value;
            }
        }
    })();

    /**
     * @name _buildPostRequestOptionsToCallThisUrl
     * Build an basic object preparate to be passed to an HTTP POST call
     * AngularJS.
     * @param {string} endpoint Endpoint to call
     * @param {Object} bodyRequest Body passed to HTTP call
     */
    function _buildPostRequestOptionsToCallThisUrl(endpoint, bodyRequest) {
        return {
            method: 'POST',
            url: _baseUrl + ':' + _portNumber + endpoint,
            headers: {
                'Content-Type': 'application/json'
            },
            data: bodyRequest
        };
    }


    /**
     * @name _buildGetRequestOptionsToCallThisUrl
     * Build an basic object preparate to be passed to an HTTP GET call
     * AngularJS.
     * @param {string} endpoint Endpoint to call
     */
    function _buildGetRequestOptionsToCallThisUrl(endpoint) {
        return {
            method: 'GET',
            url: _baseUrl + ':' + _portNumber + endpoint,
        };
    }


    /**
     * @name _buildPutRequestOptionsToCallThisUrl
     * Build an basic object preparate to be passed to an HTTP PUT call
     * AngularJS.
     * @param {string} endpoint Endpoint to call
     * @param {Object} bodyRequest Body passed to HTTP call
     */
    function _buildPutRequestOptionsToCallThisUrl(endpoint, bodyRequest) {
        return {
            method: 'PUT',
            url: _baseUrl + ':' + _portNumber + endpoint,
            headers: {
                'Content-Type': 'application/json'
            },
            data: bodyRequest
        };
    }


    /**
     * @name _buildDeleteRequestOptionsToCallThisUrl
     * Build an basic object preparate to be passed to an HTTP DELETE call
     * AngularJS.
     * @param {string} endpoint Endpoint to call
     */
    function _buildDeleteRequestOptionsToCallThisUrl(endpoint) {
        return {
            method: 'DELETE',
            url: _baseUrl + ':' + _portNumber + endpoint,
        };
    }
})(neogenz, budgetManager.config.webApi.baseUrl, budgetManager.config.webApi.port);
//@todo Remplacer par fichier de conf, tester quand undefined
