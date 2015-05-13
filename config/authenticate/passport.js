/**
 * Created by maximedesogus on 26/03/15.
 */
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    var User = function (username, password) {
        this.username = username;
        this.password = password;
    };

    // objet utilisateur -> identifiant de session
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    // identifiant de session -> objet utilisateur
    passport.deserializeUser(function (username, done) {
        done(null, new User(username));
    });

    passport.use('local', new LocalStrategy(
        {
            // champs du formulaire login
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            var user = new User(username, password);
            if (password === 'admin') {
                return done(null, user);
            }
            else return done(null, false, {message: "The user is not exist"});
        }
    ));

    passport.use(new TwitterStrategy({
                consumerKey: twitterAuthenticateKeys.parameters.consumerKey,
                consumerSecret: twitterAuthenticateKeys.parameters.consumerSecret,
                callbackURL: twitterAuthenticateKeys.parameters.callbackURL
            },
            function (token, tokenSecret, profile, done) {
                process.nextTick(function () {
                    return done(null, new User(profile.username, ''));
                });
            })
    );
};