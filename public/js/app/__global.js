'use strict';

var __ = __ || {};

/**
 * Créer une chaine d'objet rattachés à un objet parent à partir d'une string
 * @param {object} app parent ex: app, core....
 * @param {string} ns_string to parse
 * @return DOM Element
 */
__.namespace = function (app, ns_string) {
    var parts = ns_string.split('.'),
        parent = app;
    if (parts[0 === parent]) {
        parts = parts.slice(1);
    }
    for (var i = 0; i < parts.length; i++) {
        //create a property if doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};


__.verifparam = function (param, key) {
    if (param[key] === undefined) {
        throw new Error('Field : ' + key + ' not available.');
    } else {
        return param[key];
    }
};