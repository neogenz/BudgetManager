'use strict';

__.namespace(app, 'model');
__.namespace(app.model, 'factory');

function refreshConstructor(modelToFactored) {
    if (!modelToFactored) {
        throw new Error('Factory doesn\'t find constructor of : ' + name);
    } else {
        return modelToFactored;
    }
}

function Factory() {
    var self = this;
    self.constructor = null;
    var _runFactory = function (collection, name) {
        if (name === undefined || !name) {
            throw new Error('Name of collections to factored is not defined.');
        }
        if (!collection) {
            throw new Error('Object to serialize is not defined');
        }
        var tab = [];
        self.constructor = refreshConstructor(app.model[name]);

        if (!collection.length) {

            if (collection.length === 0) return [];

            var singleObject = collection;
            var newItem = null;
            try {
                newItem = new self.constructor(singleObject);
            }
            catch (e) {
                throw new Error('Fail to construct new self.constructor(singleObject)');
            }
            return newItem;
        }

        var i = collection.length;
        while (i--) {
            self.constructor = refreshConstructor(app.model[name]);
            if (collection[i] === undefined) {
                throw new Error('Element ' + i + ' of collections to factored is not defined.');
            }

            try {
                var newItem = new self.constructor(collection[i]);
            }
            catch (e) {
                throw new Error(e);
            }

            tab.push(newItem);
        }
        return tab;
    };
    return {
        runFactory: _runFactory
    };
}

app.model.factory = new Factory();
