'use strict';

myLib.technical.defineNamespace(app, 'budgetManager.config');

(function init(){
    app.budgetManager.config.webApi = {
        domain: 'localhost',
        port: '5000',
        protocol: 'http'
    };
})();

//app.budgetManager.config.webApi.protocol + '://' + app.budgetManager.config.webApi.domain + ':' + app.budgetManager.config.webApi.port,