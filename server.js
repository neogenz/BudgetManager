var env = process.env.NODE_ENV || "development";
var dbConfig = require('./config/database.json')[env];
var express = require('express');
var app = express();
var port = 5000;
var http = require('http');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');

var mongoose = require('mongoose');

// configuration ==============================================================
app.set('port', process.env.PORT || port);
process.env.JWT_SECRET = 'applicationbudgetmanager';

//app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());// get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

// options ====================================================================
app.use(morgan('dev')); // log e
// very request to the console
app.use(cors({credentials: true, origin: true}));

// models init =================================================================

http.createServer(app).listen(app.get('port'), function () {
    //require('./model/User')(mongoose);
    //require('./model/Movement')(mongoose);
    //var ProvisionalPlanProvider = require(__dirname + '/model/ProvisionalPlan')(mongoose);
    //var provisionalPlanProvider = new ProvisionalPlanProvider();
    var dbURI = dbConfig.mongoDb.protocol + '://' + dbConfig.mongoDb.host + '/' + dbConfig.mongoDb.name;
    mongoose.connect(dbURI);
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + dbURI);
        require('./routing')(app, mongoose, jwt);
        require('./02_Webservices/ProvisionalPlanProvider')(app);
        require('./02_Webservices/MovementProvider')(app);

        console.log('Express server listening on port ' + app.get('port'));
    });

// If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

// When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

// If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    //require('./04_Models/test');
    //require('./routing')(app, mongoose, jwt);
    //require(__dirname + '/dal/ProvisionalPlan')(app, jwt, mongoose, provisionalPlanProvider);
    ////require(__dirname + '/dal/Movement')(app, jwt, mongoose);
    //require(__dirname + '/dal/User')(app, jwt, mongoose);

    //console.log('Express server listening on port ' + app.get('port'));

});

