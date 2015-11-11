/**
 * Created by maximedesogus on 07/11/2015.
 */
var provisionalPlanJson = {id: 12, name: 'test', baseAmount: 394, valid: true, userId: 12};
var movementJson = {
    id: 14,
    name: 'test',
    type: 'down',
    repeat: 3,
    comment: 'aucun',
    active: true,
    provisionalPlanId: 12,
    provisionalPlan: provisionalPlanJson
};
var beanMovement = app.bean.factory.createBean('Movement', movementJson);