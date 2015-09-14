'use strict';

myLib.technical.defineNamespace(app, 'bean.factory');

(function init() {
    app.bean.factory = new Factory();

    function _getConstructor(modelToFactored) {
        if (_.isUndefined(modelToFactored) || _.isNull(modelToFactored)) {
            throw new Error('Factory doesn\'t find constructor of : ' + name);
        } else {
            return modelToFactored;
        }
    }

    function Factory() {
        var self = this;
        self.constructor = null;

        return {
            runFactory: _runFactory
        };

        function _runFactory(collection, name) {
            var v_result = null;
            if (myLib.technical.isUndefinedOrNull(name)) {
                throw new Error('Name of collections to factored is not defined.');
            }
            if (myLib.technical.isUndefined(collection)) {
                throw new Error('Object to serialize is not defined');
            }
            if (_.isNull(collection)) {
                v_result = null;
            }

            self.constructor = _getConstructor(app.bean[name]);

            if (_.isArray(collection)) {
                v_result = [];
                if (!_.isEmpty(collection)) {
                    var i = collection.length;
                    while (i--) {
                        self.constructor = _getConstructor(app.bean[name]);
                        if (myLib.technical.isUndefined(collection[i])) {
                            throw new Error('Element ' + i + ' of collections to factored is not defined.');
                        }
                        if (_.isNull(collection[i])) {
                            v_result.push(null);
                        } else {
                            try {
                                v_result.push(new self.constructor(collection[i]))
                            }
                            catch (e) {
                                throw new Error(e);
                            }
                        }
                    }
                }
            } else {
                var singleObject = collection;
                try {
                    v_result = new self.constructor(singleObject);
                }
                catch (e) {
                    throw new Error('Fail to construct new self.constructor(singleObject)');
                }
            }
            return v_result;
        }
    }

})();