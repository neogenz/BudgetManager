/**
 * Created by maximedesogus on 26/03/15.
 */

module.exports = function (provider, mongoose, jwt) {
    var publicDir = __dirname + "/public/";
    var css = publicDir; //+ "css/";
    var js = publicDir;// + "js/";
    var fonts = publicDir;

    var userProvider = require('./03_DataAcessLayer/UserProvider');
    //var userProvider = new UserProvider();
    var authenticationHelpers = require('./01_Commons/AuthenticationHelpers');

    provider.get(['/', '*/app/components/*.html'/*, '*.html'*/], function (req, res) {
        if (req.originalUrl === '/') {
            req.originalUrl = 'index.html';
        }
        res.sendFile(publicDir + req.originalUrl);
    });

    provider.get(/*'*.js'*/['*/app/app.js', '*/app/routing.js', '*/assets/libs/*.js', '*/assets/js/*.js', '*/app/components/*.js', '*/app/shared/*.js'],
        function (req, res) {
            res.sendFile(js + req.originalUrl);
        });

    provider.get('*.css', function (req, res) {
        res.sendFile(css + req.originalUrl);
    });

    provider.get(['*.woff', '*.ttf', '*.woff2'], function (req, res) {
        res.sendFile(fonts + req.path);
    });

    var User = mongoose.model('User');

    // Signin ==============================================================
    provider.post('/signin', function (req, res) {
        userProvider.signinByEmailAndPassword(req.body.email, req.body.password, function (err, token) {
            if (err) {
                console.error(err);
                res.status(err.statusHttp).send({
                    message: err.message,
                    stack: (err.stack ? err.stack : '')
                });
            } else {
                res.send({token: token});
            }
        });
    });

    // Signup ==============================================================
    provider.post('/signup', function (req, res) {
        var newUser = userProvider.create(req.body);
        userProvider.signup(newUser, function (err, token) {
            if (err) {
                console.error(err);
                res.status((err.statusHttp ? err.statusHttp : 500)).send({
                    message: err.message,
                    stack: (err.stack ? err.stack : '')
                });
            } else {
                res.send({token: token});
            }
        });
    });

    provider.get('/isAuthenticated', authenticationHelpers.ensureAuthorized, _getUserAuthenticated);

    function _getUserAuthenticated(req, res) {
        res.send(req.user);
    }
};