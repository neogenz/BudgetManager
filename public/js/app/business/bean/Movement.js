'use strict';

myLib.technical.defineNamespace(app, 'bean.Movement');

(function init() {
    app.bean.Movement = _Movement;

    function _Movement(param) {
        this.id = myLib.technical.verifParam(param, 'id');
        this.name = myLib.technical.verifParam(param, 'name');
        this.amount = myLib.technical.verifParam(param, 'amount');
        this.type = myLib.technical.verifParam(param, 'type');
        this.repeat = myLib.technical.verifParam(param, 'repeat');
        this.comment = myLib.technical.verifParam(param, 'comment');
        this.active = myLib.technical.verifParam(param, 'active');
        this.provisionalPlanId = myLib.technical.verifParam(param, 'ProvisionalPlanId');
    }
})();
