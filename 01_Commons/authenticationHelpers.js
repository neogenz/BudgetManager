'use strict';

(function init() {

    var jwt = require('jsonwebtoken');

    function AuthenticationsHelpers() {
    }

    AuthenticationsHelpers.prototype.ensureAuthorized = function (req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            jwt.verify(bearerToken, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    res.status(400);
                    console.log(decoded);
                    return res.json({success: false, message: 'Failed to authenticate token. (err : ' + err + ')'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    };

    module.exports = new AuthenticationsHelpers();
})();