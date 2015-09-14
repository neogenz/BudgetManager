'use strict';

myLib.technical.defineNamespace(app, 'bean.ProvisionalPlan');

(function init() {
    app.bean.ProvisionalPlan = _ProvisionalPlan;

    function _ProvisionalPlan(param) {
        this.id = myLib.technical.verifParam(param, 'id');
        this.name = myLib.technical.verifParam(param, 'name');
        this.baseAmount = myLib.technical.verifParam(param, 'baseAmount');
        this.valid = myLib.technical.verifParam(param, 'valid');
        this.movements = myLib.technical.verifParam(param, 'Movements');
        if (this.movements.length > 0) {
            this.movements = app.bean.factory.runFactory(this.movements, 'Movement');
        }
        this.userId = myLib.technical.verifParam(param, 'UserId');
    };
})();
