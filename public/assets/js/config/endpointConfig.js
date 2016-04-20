(function init() {
    'use strict';

    neogenz.utilities.defineNamespace(app, 'budgetManager.config');
    neogenz.utilities.defineNamespace(app, 'budgetManager.endpoints');

    app.budgetManager.config.webApi = (function () {
        var _subdomain = 'budgetmanager',
            _domain = 'localhost',
            _port = '3000', //80
            _protocol = 'http',
            _baseUrl = _protocol + '://' + _domain;
        return {
            subdomain: _subdomain,
            domain: _domain,
            port: _port, //80
            protocol: _protocol,
            baseUrl: _baseUrl
        };
    })();

    app.budgetManager.endpoints = {
        nodeEndpoint: app.budgetManager.config.webApi.protocol + '://' +
            //app.budgetManager.config.webApi.subdomain + '.' +
        app.budgetManager.config.webApi.domain + ':' +
        app.budgetManager.config.webApi.port
    };
})();
