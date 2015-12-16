(function init() {
    var mongoose = require('mongoose');

    var User = require('./User');
    var ProvisionalPlan = require('./ProvisionalPlan');
    var Movement = require('./Movement');

    var data = new User({
        email: 'sdfsdf',
        password: 'zefd',
        firstName: 'max',
        lastName: 'maxfsdf',
        username: 'tezzdf'
    });

    data.provisionalPlans.push(new ProvisionalPlan({
        name: 'coucou',
        valid: true,
        baseAmount: 12,
        movements: [
            new Movement({
                name: 'test',
                amount: 4,
                type: 'up',
                repeat: 1,
                comment: '',
                active: true
            }),
            new Movement({
                name: 'prix',
                amount: 35,
                type: 'down',
                repeat: 1,
                comment: 'sdfsfdqsdf',
                active: true
            }),
            new Movement({
                name: 'forfait',
                amount: 4,
                type: 'up',
                repeat: 1,
                comment: 'sdfsdf',
                active: false
            })
        ]
    }));


    data.provisionalPlans.push(new ProvisionalPlan({
        name: 'decembre',
        valid: true,
        baseAmount: 345456,
        movements: [
            new Movement({
                name: 'test',
                amount: 546,
                type: 'down',
                repeat: 4,
                comment: 'lmkm krjgdb sf',
                active: true
            })
        ]
    }));

    data.provisionalPlans[0].movements.push(new Movement({
        name: 'test',
        amount: 546,
        type: 'down',
        repeat: 4,
        comment: 'lmkm krjgdb sf',
        active: true
    }));

    data.save(function (err, saved) {
        if (err) {
            console.log(err);
        }
    });


})();