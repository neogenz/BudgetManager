'use strict';

myLib.technical.defineNamespace(app, 'data');
myLib.technical.defineNamespace(app.data, 'autocomplete');

function MovementMock() {
    this.id = null;
    this.name = 'Mouvement d\'argent';
    this.amount = 0;
    this.type = 'down';
    this.repeat = 1;
    this.comment = null;
    this.active = true;
    this.ProvisionalPlanId = null;
}

var movementMock = {
    id: null,
    name: 'Mouvement d\'argent',
    amount: 0,
    type: 'down',
    repeat: 1,
    comment: '',
    active: true,
    ProvisionalPlanId: null
};

app.data.autocomplete.Movement = function () {
    //return app.bean.factory.runFactory(new MovementMock(), 'Movement');
    return app.bean.factory.createBean('Movement', movementMock);
};