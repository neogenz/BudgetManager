(function init() {
    'use strict';
    app.beans.AbstractBean = AbstractBean;

    function AbstractBean(json) {
        if (!app.helpers.isUndefinedOrNull(json)) {
            this.initWith(json);
        } else {
            this.initWithDefaultValue();
        }
    }

    AbstractBean.prototype.checkField = function (json) {
        app.beans.AbstractSchema.prototype.checkIntegrity(this._schema, json);
    };

    AbstractBean.prototype.initWith = function (json) {
        this.checkField(json);
        var realKey = null;
        for (var key in this._schema) {
            if (!_.isUndefined(json[key])) {
                realKey = key;
            } else if (!_.isUndefined(this._schema[key].persistingName) && !_.isUndefined(json[this._schema[key].persistingName])) {
                realKey = this._schema[key].persistingName;
            } else {
                realKey = null;
            }

            if (!_.isUndefined(json[realKey]) && !_.isObject(json[realKey])) {
                this[key] = json[realKey];
            } else if (!_.isUndefined(json[realKey]) && _.isObject(json[realKey])) {
                if (this._schema[key].type === app.beans.type.ARRAY_OBJECT) {
                    this[key] = [];
                    for (var i = 0; i < json[realKey].length; i++) {
                        this[key].push(app.beans.factory.getBean(this._schema[key].contentObject.beanName, json[realKey][i]));
                    }
                } else {
                    this[key] = app.beans.factory.getBean(this._schema[key].beanName, json[realKey]);
                }
            }
        }
    };

    AbstractBean.prototype.initWithDefaultValue = function () {
        debugger;
        for (var key in this._schema) {
            if (this._schema[key].mandatory) {
                this[key] = this._schema[key].defaultValue;
            }
        }
    }
})();