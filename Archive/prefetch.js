
// save this file as prefetch.js
//
// run like this: node ./prefetch.js {env}
//                              
// (if env is ommited, defaults to QAT)
//

var http = require('http');
var https = require('https');

// when re-using this example module, modify the module name (moduleExample) as needed
// on line 20. This stub module, can be used as a command line module
// or included via "require" in node enviorments (returning an object)
// or used in browser. (See the test folder for usage as a required module.)
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
        
        // invoke if running cli instance
        if (!module.parent) {
        	module.exports.cli(process.argv.slice(2));
    	}

    } else {
        // Browser globals (root is window)
        root.login = factory();
  }
}(this, function (api, cli_arguments) {
	// setup _p (private), _seal, _unseal
	// _p contains elements that are private to this module

	// api contains all of the elements that will be exported by this
	// module, which constitute it's "api" to the outside world

	api = api || {};
	var _p = api._p = api._p || {},
		_seal = api._seal = api._seal || function () {
			delete api._p;
			delete api._seal;
			delete api._unseal;
		},
		_unseal = api._unseal = api._unseal || function () {
			api._p = _p;
			api._seal = _seal;
			api._unseal = _unseal;
		};

		// comment out next line if you don't want to hide
		// private elements
		api._seal();

		_p.version = "0.1.0";

		// hotpath console.timeEnd for our own purposes... (evil)
		console.timeEnd = function(label) {
		  var time = this._times.get(label);
		  if (!time) {
		    throw new Error('No such label: ' + label);
		  }
		  var duration = Date.now() - time;
		  this.log('%s: %dms', label, duration);
		  return duration;
		};

		// sample method to be exported
		api.echo = function(msg) {
			return (msg+" (version "+_p.version+")");
		};

		api.httpCall = function(options, cb){
			var req = http.request(options, function(res) {
		        var data = '';

				res.on('data', function(chunk) {
				    data += chunk;
				});

				res.on('end', function() {
				   	cb(null, res.statusCode,res.headers,data)
				});
		    });

			// handle post body
		    if (options.method==='POST') {
		    	req.write(options.data);
		    }
		    // end (and process) the request
		    req.end();

		    // setup error handler
		    req.on('error', function(err){
		         cb(err,res.statusCode,res.headers);
		    });
		};

		api.httpsCall = function(options, cb){
            var startTime = new Date().getTime();
			var req = https.request(options, function(res) {
		        var data = '';
				res.on('data', function(chunk) {
				    data += chunk;
				});

				res.on('end', function() {
					// var callLength = console.timeEnd('\n\nhttpCall');
                    var callLength = new Date().getTime() - startTime;
                    
				   	cb(null, res.statusCode,res.headers,data, callLength);
				});

		    });

			// handle post body
		    if (options.method==='POST') {
		    	req.write(options.data);
		    }
		    // end (and process) the request
		    console.time('\n\nhttpCall');
		    req.end();

		    // setup error handler
		    req.on('error', function(err){
		         cb(err,res.statusCode,res.headers);
		    });
		};

		// get core token for QAT environment
		// curl -X GET -H "Authorization: Basic REJSZnFyTmJuUXNkUXlTR2cwVTBOaUR2OGl3c1UyNWQ6QTBJNkNLZ1NtZWQ0RWVoWg==" -H "Content-Type: application/json" -H "Accept: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: fa984b0b-f40f-191c-a05a-f5994f72ef56" "https://qat01.api.t-mobile.com/v1/oauth2/accesstoken?grant_type=client_credentials"
		
		api.getCoreToken = function(env, cb){
			if (env==="qat"){
				var options = {
				 	host :  'qat01.api.t-mobile.com',
			        path : '/v1/oauth2/accesstoken?grant_type=client_credentials',
			        method : 'GET',
			        headers: {
						"Authorization": "Basic REJSZnFyTmJuUXNkUXlTR2cwVTBOaUR2OGl3c1UyNWQ6QTBJNkNLZ1NtZWQ0RWVoWg=="
					}
				}
				api.httpsCall(options, function(err,statusCode,headers,data){
					if (err) { throw new Error(err+' error getting csrf token '+statusCode+JSON.strinigy(data));}
					
					var response = JSON.parse(data.toString('utf8').replace(')]}\',','') || '{}');
		        	
		        	cb(null,response);
				})
			}
		};

		api.sendResults = function(data, cb){
			 
			var options = {
			 	host :  'remotech2web.rebellion.t-mobile.com',
		        path : '/api/results',
		        method : 'POST',
		        port: 8080,
		        headers: {
					"Content-Type": "application/json"
				},
				data:JSON.stringify(data)
			};

			api.httpCall(options, function(err,statusCode,headers,data){
				if (err) { throw new Error(err+' error sending data to db '+statusCode+JSON.strinigy(data));}
				
				var response = JSON.parse(data.toString('utf8') || '{}');
	        	
	        	cb(null,response);
			})
			 
		};

		// curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "senderid: Rebellion" -H "channelid: CARE" -H "applicationid: ACUI" -H "Authorization: Bearer cd7HEqUwQaKneB6DjnpbIeIgOXg5" -H "Cache-Control: no-cache" -H "Postman-Token: c5006ae5-8b66-f8d8-f18e-a043739ee52d" -d '{
		// "searchCriteria": {
		// 		"requestDateTime": "2015-03-15T00:00:00-09:00",
		// 		"asOfDateTime": "2015-03-15T00:00:00-00:00",
		// 		"eligibilityCriteria": {
		// 			"postalCode": "98029"
		// 		}
		// 	}
		// }' "https://qat01.api.t-mobile.com/v2/productoffering/search"

		api.getPrefetch = function(env, token, cb) {
			if (env==="qat"){
				var method='POST';
				var host='qat01.api.t-mobile.com';
				var path='/v2/productoffering/search';

				var headers={
					"Content-Type": "application/json",
					"Accept": "application/json",
					"senderid": "Rebellion",
					"channelid": "CARE", 
					"applicationid": "ACUI",
					"Authorization": "Bearer "+token,
					"Cache-Control": "no-cache"
				};

				var payload={
					"searchCriteria": {
						"requestDateTime": "2015-03-15T00:00:00-09:00",
						"asOfDateTime": "2015-03-15T00:00:00-00:00",
						"eligibilityCriteria": {
							"postalCode": "98029"
						}
					}
				};

				var options = {
				 	host :  host,
			        path : path,
			        method : method,
			        headers: headers,
			        data: JSON.stringify(payload)
				}

				console.log(options);

				api.httpsCall(options, function(err,statusCode,headers,data, callLength	){
					if (err) { throw new Error(err+' error getting prefetch '+statusCode+JSON.strinigy(data));}
					
					var response = { headers:headers, body: (data.toString('utf8') || '{}').length, statusCode:statusCode,callLength:callLength };
		        	
		        	cb(null,response);
				})

			}
		};


		// sample cli method... in production, further processing
		// based on args
		api.cli = function(args) {

			var env = args[0] || 'qat';
			
			var coreToken = '';

			if (env === 'qat') {
				
				console.log('\n\n getting core token for env=', env);

				api.getCoreToken(env,function(err, tokenResponse){
					
					console.log('\n\ntoken response:', tokenResponse, typeof tokenResponse);

					coreToken = tokenResponse.access_token;

					api.getPrefetch(env, coreToken, function(err, prefetch){
						var output = {
							name: "core pre-fetch call",
							httpstatus: prefetch.statusCode,
							status: (prefetch.statusCode === 200) ? (prefetch.body+0>100000) ? "up" : "questionable" : "down",
							api_checked_date: new Date(),
							elapsed_time: prefetch.callLength,
							headers: JSON.stringify({
								"Content-Type": "application/json",
								"Accept": "application/json",
								"senderid": "Rebellion",
								"channelid": "CARE", 
								"applicationid": "ACUI",
								"Authorization": "Bearer "+coreToken,
								"Cache-Control": "no-cache"
							}),
							request: JSON.stringify({
								"searchCriteria": {
									"requestDateTime": "2015-03-15T00:00:00-09:00",
									"asOfDateTime": "2015-03-15T00:00:00-00:00",
									"eligibilityCriteria": {
										"postalCode": "98029"
									}
								}
							}),
							response: "large response, size = "+prefetch.body
						};

						console.log("\n\n",JSON.stringify(output),"\n\n");

						api.sendResults(output,function(err,data){
							if (err) { throw new Error(err); }
							console.log("\n\n results sent to db: ", data);
						});

					});
				});

			} 
		};

	return api;
}));
