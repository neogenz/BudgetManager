'use strict';

__.namespace(app, 'data');
__.namespace(app.data, 'autocomplete');

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

app.data.autocomplete.Movement = function () {
    var objectModelServerLike = new MovementMock();
    var collection = [];
    collection[0] = objectModelServerLike;
    console.log(collection);
    return app.model.factory.runFactory(collection, 'Movement');
};