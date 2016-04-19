(function init() {
    'use strict';

    neogenz.utilities.defineNamespace(app, 'budgetManager.config');
    neogenz.utilities.defineNamespace(app, 'budgetManager.endpoints');

    app.budgetManager.config.webApi = {
        subdomain: 'budgetmanager',
        domain: 'localhost',
        port: '3000', //80
        protocol: 'http'
    };

    app.budgetManager.endpoints = {
        nodeEndpoint: app.budgetManager.config.webApi.protocol + '://' +
            //app.budgetManager.config.webApi.subdomain + '.' +
        app.budgetManager.config.webApi.domain + ':' +
        app.budgetManager.config.webApi.port
    };
})();
