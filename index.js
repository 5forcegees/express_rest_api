var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var sankeyData = require('./app/getSankeyData');

var returnme = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    var field_name = req.param('field_name');
    var field_value = req.param('field_value');
    var sankey = req.param('sankey');
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (sankey == 'true') {

        returnme = sankeyData.getSankeyData(field_name, field_value, function(returnme, con, nodes, ret_nodes, links, ret_links){

            console.log('returnme: ');
            console.log(returnme);
            console.log('/returnme\n ');

            res.json(returnme);
            con.end();
            //blank out the arrays so each call gets an empty starting array
            nodes.length = 0;
            ret_nodes.length = 0;
            links.length = 0;
            ret_links.length = 0;
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
