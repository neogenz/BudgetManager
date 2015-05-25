'use strict';

//Dependancies ================================================================
if (typeof app === 'undefined') {
    throw new Error('dependancies app_start.js not load.');
}

if (typeof __ === 'undefined') {
    throw new Error('dependancies __global.js not load.');
}

//New namespaces ================================================================
__.namespace(app, 'config');
__.namespace(app.config, 'webApi');

//Data ================================================================
app.config.webApi = {
    domain: 'localhost',
    port: '5000',
    protocol: 'http'
};


