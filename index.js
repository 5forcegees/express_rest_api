var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
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
    var ret = [];
    var nodes = [];
    var links = [];

    if (sankey){
        field_value.forEach(function(val){
            whole_sheet.find({ where: {screen: val }}).then(function(matched_row){
                var screen = matched_row.screen;
                var facade = matched_row.facade_api;
                var core = matched_row.core_api;
                var e = matched_row.e_wsil;
                console.log(screen+' screen '+facade+' facade '+core+' core '+ e + ' e ');
                //push each layer into nodes array if not present

                //get the array index of each value and push onto links array


                console.log(matched_row.get());

                ret.push(matched_row.get());
            });

        //assemble the links and array values into ret array

        });
    }

    res.json({
        message: 'hooray! welcome to our api!  Here is the request field_name: ' + field_name + ', field_value: ' + field_value[0] + ' + ' + field_value[1] +', sankey: ' + sankey + " ret: " + ret });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
