'use strict';

myLib.technical.defineNamespace(app, 'ui.manager.modal');
myLib.technical.defineNamespace(app, 'ui.messages');


(function init() {
    app.ui.manager.modal.mode = {
        edit: 0,
        add: 1,
        create: 2
    };

    app.ui.messages.signup = {
        passwordNotEquals: 'Les mots de passes ne corresponde pas.',
        success: 'Inscription effectué avec succès.',
        fail: 'Une erreur est survenue lors de l\'inscription.'
    };
})();


