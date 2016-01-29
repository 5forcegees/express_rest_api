var pkg = require(__dirname + '/../package.json');
var mysql = require("mysql");

var returnme = {}, nodes = [], ret_nodes = [], links = [];

var con = mysql.createConnection({
    host: "localhost",
    user: pkg.database_user,
    password: pkg.database_pw,
    database: pkg.database_name
});

module.exports.getSankeyData = function(field, field_values, callback) {
    console.log('got field ' + field);
    console.log('and values ' + field_values);
    con.connect(function (err) {
        if (err) {
            console.log('Error connecting to Db');
        }else {
            var query_array = field_values.split(",");
            var query_string = 'select screen_name, facade_api, core_api, e_wsil from whole_sheet where screen in ';
            query_string += '(\''+ query_array.join('\', \'') + '\')';

            console.log('starting query:');
            console.log(query_string);

            con.query( query_string, function (err, rows) {

                if (err) {
                    console.log('Error connecting to Db');
                }else{

                    //console.log("looping over rows: " + rows);
                    rows.forEach(function (result) {
                        console.log(result);
                        var previous_key = '';
                        for (var key in result) {
                            //console.log("looping over key: " + key + " with value: " + result[key]);
                            if (result.hasOwnProperty(key)) {
                                //console.log(key + " -> " + result[key]);
                                if (nodes.indexOf(result[key]) == -1) {
                                    //using the nodes array to easily detect nodes I've already pushed
                                    nodes.push(result[key]);
                                    //returning the array of json objects
                                    ret_nodes.push({name: result[key], id: result[key]});
                                }
                            }
                            if (previous_key.length > 0) {
                                //TODO: count the number of times each link is made to set the 'value' in the links obj
                                links.push({
                                    source: nodes.indexOf(previous_key),
                                    target: nodes.indexOf(result[key]),
                                    value: 1
                                });
                            }
                            previous_key = result[key];
                        }

                    });
                    //console.log('nodes: ');
                    //console.log(ret_nodes);
                    //console.log('\\ nodes ');
                    //console.log('links: ');
                    //console.log(links);
                    //console.log('\\ links ');

                    returnme = {nodes: ret_nodes, links: links};

                    callback(returnme);
                }
            });
        }
    });


};