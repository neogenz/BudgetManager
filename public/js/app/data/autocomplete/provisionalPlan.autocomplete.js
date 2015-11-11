'use strict';

myLib.technical.defineNamespace(app, 'data');
myLib.technical.defineNamespace(app.data, 'autocomplete');

function ProvisionalPlanMock() {
    this.id = -1;
    this.name = '';
    this.baseAmount = 0;
    this.Movements = [];
    this.UserId = -1;
    this.valid = true;

}

app.data.autocomplete.ProvisionalPlan = function () {
    var objectModelServerLike = new ProvisionalPlanMock();
    var collection = [];
    collection[0] = objectModelServerLike;
    return app.bean.factory.createBean('ProvisionalPlan', objectModelServerLike);
};