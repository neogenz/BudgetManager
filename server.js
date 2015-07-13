// set up ========================================================================================================
// get all the tools we need
var express = require("express");
var app = express();
var port = 5000;
var http = require("http");

var morgan = require("morgan");
var models = require("./models");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var jwt = require("jsonwebtoken");


// configuration ==============================================================
app.set('port', process.env.PORT || port);
process.env.JWT_SECRET = "applciationbudgetmanager";

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());// get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

// options ====================================================================
app.use(morgan('dev')); // log every request to the console
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

// models init =================================================================
models.sequelize.sync(/*{force: true}*/).then(function () {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
        require('./routing')(app, models, jwt);
        require(__dirname + "/dal/ProvisionalPlan")(app, models, jwt);
        require(__dirname + "/dal/Movement")(app, models, jwt);
    });
});