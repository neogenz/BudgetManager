module.exports = function (provider, models, jwt) {
    var tokenUtils = require("../utils/token")(jwt);

    var _checkPassword = function(req, res){
        var passwordToCheck = req.params.passwordToCheck;
        models.User.findOne({
            where: {
                email: req.user.email
            }
        })
        .then(function (user) {
            if (!user) {
                console.error('Invalid password');
                res.status(403);
                res.send({
                    message: 'User not found.'
                });
            }
            if (!user.validPassword(passwordToCheck)) {
                console.error('Invalid password');
                res.status(403);
                res.send({
                    message: 'Invalid password.'
                });
            }else{
                res.sendStatus(200);
            }
        });
    }

    var _changePassword = function(req, res){
        models.User
        .findOne({
            where: {
                email: req.user.email
            }
        })
        .then(function (user) {
            if (!user) {
                console.error('Invalid password');
                res.status(403);
                res.send({
                    message: 'User not found.'
                });
            } else {
                if (!user.validPassword(req.body.holdPassword)) {
                    console.error('Invalid password');
                    res.status(403);
                    res.send({
                        message: 'Invalid password.'
                    });
                }else{
                    user.password = user.generateHash(req.body.newPassword);
                    user.save().then(function (userSaved) {
                        var token = jwt.sign(userSaved, process.env.JWT_SECRET, {
                            expiresInMinutes: 1440 // expires in 24 hours
                        });
                        res.status = 201;
                        res.send({
                            token: token
                        });
                    }).catch(function (error) {
                        res.status = 500;
                        res.send({
                            message: error
                        });
                    });
                }
            }
        }, function () {
            res.status = 500;
            res.send({message: 'An error has occurred, see first the ORM API.'});
        });
    }

    provider.get("/checkPassword/:passwordToCheck", tokenUtils.ensureAuthorized, _checkPassword);
    provider.post("/changePassword", tokenUtils.ensureAuthorized, _changePassword);
};