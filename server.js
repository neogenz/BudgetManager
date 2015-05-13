// set up ========================================================================================================
// get all the tools we need
var express = require("express");
var app = express();
var port = 5000;
var morgan = require("morgan");
var http = require("http");
var models = require("./models");
var bodyParser = require("body-parser");

// configuration ===============================================================
app.set('port', process.env.PORT || port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// set up our express application
app.use(morgan('dev')); // log every request to the console

// models init =================================================================
models.sequelize.sync(/*{force: true}*/).then(function () {
    // launch ======================================================================
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
        require('./routing')(app);
        require(__dirname + "/webApi/ProvisionalPlan")(app);
        require(__dirname + "/webApi/Movement")(app);

    });
});