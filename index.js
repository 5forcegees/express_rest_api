var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var sankeyData = require('./app/getSankeyData');

var returnme = {};

//var Sequelize = require('sequelize');
//
//var seq = new Sequelize(pkg.database_name, pkg.database_user, pkg.database_pw, {
//    host: 'localhost',
//    dialect: 'mysql'
//});
//
//// load models, allows for adding models later if needed, just add them in app/models and then to this array
//var models = [
//    'whole_sheet'
//];
//
//models.forEach(function(model) {
//    module.exports[model] = seq.import(__dirname + '/app/models/' + model);
//});
//
//// export connection
//module.exports.seq = seq;
//
//
//app.set('models', require(__dirname + '/app/models/api.js'));
//
////seq.({
////    where: { screen: "SC1001"}
////});
//
//var whole_sheet = app.get('models').whole_sheet;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    var field_name = req.param('field_name');
    var field_value = req.param('field_value');
    var sankey = req.param('sankey');

    if (sankey == 'true') {

        returnme = sankeyData.getSankeyData(field_name, field_value, function(returnme){

            console.log('returnme: ');
            console.log(returnme);
            console.log('/returnme\n ');

            res.json(returnme);
        });
    }
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
