"use strict";
(function init() {
    var mongoose = require('mongoose');
    var Movement = require('./Movement');
    var Schema = mongoose.Schema;
    var ProvisionalPlanSchema = new Schema({
        name: String,
        valid: {type: Boolean, default: true},
        baseAmount: Number,
        updatedAt: Date,
        createdAt: Date,
        movements: {type: [Movement.schema], default: []}
    });

    /**
     * @desc Define an comportement/porperties at all save
     * @function pre
     */
    ProvisionalPlanSchema.pre('save', function (next) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updatedAt = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.createdAt)
            this.createdAt = currentDate;

        next();
    });

    var ProvisionalPlan = mongoose.model('ProvisionalPlan', ProvisionalPlanSchema, 'ProvisionalPlans');

    //module.exports = ProvisionalPlanSchema;
    module.exports = ProvisionalPlan;
})();
