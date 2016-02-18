'use strict';

app.helpers.defineNamespace(app, 'budgetManager.config');

(function init() {
    app.budgetManager.config = {
        mock: false,
        debug: true
    }
})();