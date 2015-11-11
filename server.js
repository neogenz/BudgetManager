//var env       = process.env.NODE_ENV || "development";
//var dbConfig = require('./config/database.json')[env];
var express = require('express');
var app = express();
var port = 5000;
var http = require('http');

var morgan = require('morgan');
var models = require('./model');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');

var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

// configuration ==============================================================
app.set('port', process.env.PORT || port);
process.env.JWT_SECRET = 'applciationbudgetmanager';

//app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());// get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

// options ====================================================================
app.use(morgan('dev')); // log every request to the console
app.use(cors({credentials: true, origin: true}));

// models init =================================================================
models.sequelize.sync(/*{force: true}*/).then(function () {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
        require('./routing')(app, models, jwt);
        require(__dirname + '/dal/ProvisionalPlan')(app, models, jwt);
        require(__dirname + '/dal/Movement')(app, models, jwt);
        require(__dirname + '/dal/User')(app, models, jwt);
    });
});

//http.createServer(app).listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + app.get('port'));
//    mongoose.connect(dbConfig.mongoDb.protocol + '://' + dbConfig.mongoDb.host + '/' + dbConfig.mongoDb.name );
//    //require('./routing')(app, models, jwt);
//    var ProvisionalPlanProvider = require(__dirname + '/model/ProvisionalPlan')(mongoose);
//    ProvisionalPlanProvider.prototype.findAll(function(data){
//        var i = data;
//
//    });
//    //require(__dirname + '/dal/ProvisionalPlan')(mongoose);
//});

