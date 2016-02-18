'use strict';

app.helpers.defineNamespace(app, 'budgetManager.config');
app.helpers.defineNamespace(app, 'budgetManager.endpoints');

(function init() {
    app.budgetManager.config.webApi = {
        subdomain: '',
        domain: 'localhost', //mdesogus.com
        port: '3000', //80
        protocol: 'http'
    };

    app.budgetManager.endpoints = {
        nodeEndpoint: app.budgetManager.config.webApi.protocol + '://' +
            //app.budgetManager.config.webApi.subdomain + '.' +
        app.budgetManager.config.webApi.domain + ':' +
        app.budgetManager.config.webApi.port
    }
})();