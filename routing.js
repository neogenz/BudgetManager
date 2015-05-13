/**
 * Created by maximedesogus on 26/03/15.
 */
module.exports = function (provider) {
    var public = __dirname + "/public/";
    var css = public + "css/";
    var js = public + "js/";
    var fonts = public;
    var angularAppFileName = "appBudgetManager.js";

    provider.get('*/appBudgetManager.js', function (req, res) {
        res.sendFile(public + angularAppFileName);
    });

    provider.get(['/', '/views/*'], function (req, res) {
        if (req.originalUrl === '/') {
            req.originalUrl = 'index';
        }
        res.sendFile(public + req.originalUrl + '.html');
    });

    provider.get('*.js', function (req, res) {
        res.sendFile(js + req.originalUrl);
    });

    provider.get('*.css', function (req, res) {
        res.sendFile(css + req.originalUrl);
    });

    provider.get(['*.woff', '*.ttf'], function (req, res) {
        res.sendFile(fonts + req.path);
    });
}

