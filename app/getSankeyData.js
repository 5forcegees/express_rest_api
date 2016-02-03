var pkg = require(__dirname + '/../package.json');
var mysql = require("mysql");

var returnme = {}, nodes = [], ret_nodes = [], links = [], ret_links = [];

module.exports.getSankeyData = function (field, field_values, callback) {
  var con = mysql.createConnection({
    host: pkg.database_host,
    user: pkg.database_user,
    password: pkg.database_pw,
    database: pkg.database_name
  });

  con.connect(function (err) {
    if (err) {
      console.log('Error connecting to Db');
    } else {
      var query_array = field_values.split(",");
      //trim the field values strings
      query_array.forEach(function(field_value){
        query_array[query_array.indexOf(field_value)] = field_value.trim();
      });

      var query_string = 'select screen_name, facade_api, core_api, e_wsil from whole_sheet where ' + field + ' LIKE ';
      query_string += '\'%' + query_array.join('%\' OR ' + field + ' LIKE \'%') + '%\'';

      con.query(query_string, function (err, rows) {

        if (err) {
          console.log('Error connecting to Db');
        } else {

          //console.log("looping over rows: " + rows);
          rows.forEach(function (result) {
            var previous_key = '';
            for (var key in result) {
              //console.log("looping over key: " + key + " with value: " + result[key]);
              if (result.hasOwnProperty(key)) {
                //console.log(key + " -> " + result[key]);
                if (nodes.indexOf(result[key]) == -1 && result[key].length > 1) {
                  //using the nodes array to easily detect nodes I've already pushed
                  nodes.push(result[key]);
                  //returning the array of json objects
                  ret_nodes.push({name: result[key], id: result[key]});
                }
              }
              if (previous_key.length > 1 && result[key].length > 1) {
                //don't make circular links (N/A -> N/A, etc)
                if (nodes.indexOf(previous_key) != nodes.indexOf(result[key])) {
                  var link_key = nodes.indexOf(previous_key) + '-' + nodes.indexOf(result[key]);
                  if (links.indexOf(link_key) == -1) {
                    //using the links array to easily detect links I've already pushed
                    links.push(link_key);
                    //returning the array of json objects
                    ret_links.push({
                      source: nodes.indexOf(previous_key),
                      target: nodes.indexOf(result[key]),
                      value: 1
                    });
                  } else {
                    //value already exists, increment it
                    ret_links[links.indexOf(link_key)].value = ret_links[links.indexOf(link_key)].value + 1;
                  }


                }
              }
              previous_key = result[key];
            }

          });
          returnme = {nodes: ret_nodes, links: ret_links};

          callback(returnme, con, nodes, ret_nodes, links, ret_links);
        }
      });
    }
  });


};
