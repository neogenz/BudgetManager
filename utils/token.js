module.exports = function (jwt) {

    return {
        ensureAuthorized: ensureAuthorized
    };

    function ensureAuthorized(req, res, next) {

        var bearerToken;
        var bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            jwt.verify(bearerToken, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
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
    }
};