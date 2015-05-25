//app.modelfunction buildDefaultMovement() {
//    this.id = null;
//    this.name = "";
//    this.amount = 0;
//    this.type = "down";
//    this.repeat = 1;
//    this.comment = "";
//    this.active = true;
//    this.ProvisionalPlanId = null;
//};

__.namespace(app, 'model');
__.namespace(app, 'Movement');

app.model.Movement = (function () {
    var _Movement = function (param) {
        this.id = __.verifparam(param, 'id');
        this.name = __.verifparam(param, 'name');
        this.amount = __.verifparam(param, 'amount');
        this.type = __.verifparam(param, 'type');
        this.repeat = __.verifparam(param, 'repeat');
        this.comment = __.verifparam(param, 'comment');
        this.active = __.verifparam(param, 'active');
        this.provisionalPlanId = __.verifparam(param, 'ProvisionalPlanId');
    };

    return _Movement;
})();