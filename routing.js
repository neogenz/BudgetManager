/**
 * Created by maximedesogus on 26/03/15.
 */
var userProvider = require('./03_DataAcessLayer/UserProvider');
var authenticationHelpers = require('./01_Commons/authenticationHelpers');

module.exports = function (provider) {
  var publicDir = __dirname + '/public/',
    css = publicDir,
    js = publicDir,
    fonts = publicDir,
    nodeModulesDir = __dirname + '/node_modules/';


  provider.get(['*/nm/*'],
    function (req, res) {
      var urlOfFile = req.originalUrl.split('/nm/')[1];
      res.sendFile(nodeModulesDir + urlOfFile);
    }
  );

  provider.get(['/', '*/app/components/*.html', '*/app/shared/*.html'],
    function (req, res) {
      var urlOfFile = req.originalUrl;
      if (urlOfFile === '/') {
        urlOfFile = 'index.html';
      }
      res.sendFile(publicDir + urlOfFile);
    }
  );

  provider.get(['*/app/app.js', '*/app/routing.js', '*/assets/libs/*.js',
      '*/assets/js/*.js', '*/app/components/*.js', '*/app/shared/*.js'],
    function (req, res) {
      res.sendFile(js + req.originalUrl);
    }
  );

  provider.get(['*.css', '!*/node_modules/*'], function (req, res) {
      res.sendFile(css + req.originalUrl);
    }
  );

  provider.get(['*.woff', '*.ttf', '*.woff2'], function (req, res) {
      res.sendFile(fonts + req.path);
    }
  );


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

  function getUserAuthenticated(req, res) {
    res.send(req.user);
  }

  provider.get('/isAuthenticated', authenticationHelpers.ensureAuthorized, getUserAuthenticated);
};
