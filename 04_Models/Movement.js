'use strict';
(function init() {
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;
    var MovementSchema = new Schema({
        name: String,
        amount: Number,
        type: {type: String, default: 'down'},
        repeat: {type: Number, default: 1},
        comment: String,
        active: {type: Boolean, default: true},
        updatedAt: Date,
        createdAt: Date
    });

    // on every save, add the date
    MovementSchema.pre('save', function (next) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updatedAt = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.createdAt)
            this.createdAt = currentDate;

        next();
    });


    var Movement = mongoose.model('Movement', MovementSchema, 'Movements');
    //return Movement;

    //module.exports = MovementSchema;
    module.exports = Movement;
})();
