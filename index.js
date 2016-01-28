var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var pkg = require(__dirname + '/package.json');
var Sequelize = require('sequelize');

var seq = new Sequelize(pkg.database_name, pkg.database_user, pkg.database_pw, {
    host: 'localhost',
    dialect: 'mysql'
});

// load models, allows for adding models later if needed, just add them in app/models and then to this array
var models = [
    'whole_sheet'
];

models.forEach(function(model) {
    module.exports[model] = seq.import(__dirname + '/app/models/' + model);
});

// export connection
module.exports.seq = seq;


app.set('models', require(__dirname + '/app/models/api.js'));

//seq.({
//    where: { screen: "SC1001"}
//});

var whole_sheet = app.get('models').whole_sheet;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    var field_name = req.param('field_name');
    var field_value = req.param('field_value').split(',');
    var sankey = req.param('sankey');
    var nodes = [];
    var ret_nodes = [];
    var links = [];

    console.log(sankey);
    if (sankey){
        field_value.forEach(function(val){
            seq.query('select screen_name, facade_api, core_api, e_wsil from whole_sheet where screen = ? ',
                { replacements: [val] }).then(function(resultsets) {
                resultsets.forEach(function(results) {
                    //console.log(results);
                    results.forEach(function(result){
                        var previous_key = '';
                        for (var key in result) {
                            if (result.hasOwnProperty(key)) {
                                //console.log(key + " -> " + result[key]);
                                if (nodes.indexOf(result[key]) == -1 ){
                                    //using the nodes array to easily detect nodes I've already pushed
                                    nodes.push(result[key]);
                                    //returning the array of json objects
                                    ret_nodes.push({name: result[key], id: result[key].toString().replace(' ', '_')});
                                    //console.log("pushed the "+ result[key]+ " onto return nodes");
                                }
                            }
                            if (previous_key.length > 0 ){
                                //TODO: count the number of times each link is made to set the 'value' in the links obj
                                links.push({source: nodes.indexOf(previous_key), target: nodes.indexOf(key), value: 1});
                            }
                            previous_key = key;
                        }
                    });
                });
                console.log("in the seq.query links.count = " + links.count);
                console.log("and links = " + links);
            });
            console.log("just after the seq.query links.count = "+links.count);
            console.log("and links = " + links);
        });
        var returnme = {nodes: ret_nodes, links: links};
        res.json(returnme);

        console.log("just after the field_value.foreach links.count = "+links.count);
        console.log("and links = " + links);
    }else{
        console.log("into else");
        var returnme = {nodes: ret_nodes, links: links};
        res.json(returnme);
    }
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
