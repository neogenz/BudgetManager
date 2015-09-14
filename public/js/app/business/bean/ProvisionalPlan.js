//function ProvisionalPlan(){
//    this.id = null;
//    this.name;
//    this.valid;
//    this.baseAmount;
//    this.UserId = null;
//};

/********************************
 * DEPENDENCIES : models/Movement.js, DTO/factory.js
 ********************************/

__.namespace(app, 'model');
__.namespace(app, 'ProvisionalPlan');

app.model.ProvisionalPlan = (function () {
    var _ProvisionalPlan = function (param) {
        this.id = __.verifparam(param, 'id');
        this.name = __.verifparam(param, 'name');
        this.baseAmount = __.verifparam(param, 'baseAmount');
        this.valid = __.verifparam(param, 'valid');
        this.movements = __.verifparam(param, 'Movements');
        if (this.movements.length > 0) {
            this.movements = app.model.factory.runFactory(this.movements, 'Movement');
        }
        this.userId = __.verifparam(param, 'UserId');
    };

    return _ProvisionalPlan;
})();