'use strict';

__.namespace(app, 'data');
__.namespace(app.data, 'autocomplete');

function ProvisionalPlanMock() {
    this.id = null;
    this.name = null;
    this.baseAmount = 0;
    this.Movements = [];
    this.UserId = null;
    this.valid = true;

}

app.data.autocomplete.ProvisionalPlan = function () {
    var objectModelServerLike = new ProvisionalPlanMock();
    var collection = [];
    collection[0] = objectModelServerLike;
    return app.model.factory.runFactory(collection, 'ProvisionalPlan');
};