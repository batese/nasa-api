var credentials = require('./credentials.js');
var request = require('request'); // Request needs no configuration

module.exports = {
	//This callback function handles get requests to the home page
	index: function (req, res, next) {
		res.render('index');
	},
	earth: function (req, res, next) {
		res.render('earth');
	},
	marsRoverPhotos: function (req, res, next) {
		res.render('marsRoverPhotos');
	},
	additionalResources: function (req, res, next) {
		res.render('additionalResources');
	}
}
	
	
	
	
	
	
//This callback function handles post request to the home page
/*postHomeCallback: function (req, res, next) {
	//If a user is logging out
	if(req.body['End Session']) {
		req.session.destroy();
		res.render('home');
		return;
	}
	//If a new user has enterd their name then store in the session object along with some default values
	var context = {};
	if(req.body['New User']) {
		req.session.name = req.body.name;
		req.session.list = [];
		req.session.curId = 0;
	}
	if(req.session.name) {
		context.name = req.session.name;
	}
	res.render('home', context);
},
getListCallback: function (req, res, next) {
	//Render the special page if no session is present
	if(!req.session.name) {
		res.render('nolist');
	//Render the list page with users data
	} else {
		var context = {};
		context.name = req.session.name;
		context.destinations = req.session.list;
		res.render('list', context);
	}
},
postListCallback: function (req, res, next) {
	//Render the special page if no session is present
	if(!req.session.name) {
		res.render('nolist');
		return;
	}
	
	if(req.body['Add Destination']) {
		var destination = req.body.destination;
		//This is the http request format for making requests from javascript
		//console.log('https://maps.googleapis.com/maps/api/geocode/json?address=\"' + destination + '\"&key=' + credentials.gmapsKey);
		//request:
		// err - will contain an error if one is returned
		// response - contains headers, status codes etc
		// body - what is actually returned
		request('http://api.openweathermap.org/data/2.5/weather?q=\"' + destination + '\"&APPID=' + credentials.owmKey, function(err, response, body){
			if(!err && response.statusCode < 400){
				var context = {};
				var reply = JSON.parse(body);
				console.log("Returned: " + reply.name + " " + reply.id);
				if (reply.id) { // If the city is found then add to the session and render page
					req.session.list.push({"name":reply.name, "lon":reply.coord.lon, "lat":reply.coord.lat}); // Add the destination to the list
					var context = {};
					context.name = req.session.name; //Add session data to context
					if (req.session.base) {
						context.base = req.session.base;
					}
					context.destinations = req.session.list;
					res.render('list', context);
				} else { // If no reply is recieved do nothing to the session and show error message to user
					context.name = req.session.name; //Add session data to context
					if (req.session.base) {
						context.base = req.session.base;
					}
					context.errormsg = "Destination not found."
					if (req.session.list) { // This may not be present if it is the first search
						context.destinations = req.session.list;
					}
					res.render('list', context);
				}
			} else {
				console.log(err);
				if(response){
					console.log(response.statusCode);
				}
				next(err);
			}
		});
	}
	
	if(req.body['Set Base']) {
		req.session.base = {"name":req.body.mybase, "lon":req.body.mylon, "lat":req.body.mylat};
		var context = {};
		context.name = req.session.name;
		context.baseName = req.session.base.name;
		context.baseLon = req.session.base.lon;
		context.baseLat = req.session.base.lat;
		context.destinations = req.session.list;
		res.render('list', context);
	}
	
	if(req.body['Calculate Distances']) {
		var origin = req.body.lon + "," + req.body.lat;
		var destination = req.session.list[0].lon + "," + req.session.list[0].lat;
		for (var y = 1; y < req.session.list.length; y++) {
			destination += "|" + req.session.list[y].lon + "," + req.session.list[y].lat;
		}
		console.log(origin + destination);
		// 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + destination + '&key='
		request('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + destination + '&key=' + credentials.gmapsKey, function(err, response, body){
			if(!err && response.statusCode < 400){
				console.log("Reply recieved");
				var reply = JSON.parse(body);
				console.log("Status: " + reply.status);
				request({
					"url":"http://httpbin.org/post",
					"method":"POST",
					"headers":{
					  "Content-Type":"application/json"
					},
					"body":body
				  }, function(err, response, body){
					if(!err && response.statusCode < 400){
						var context = {};
						context.httpbin = body;
						context.name = req.session.name;
						context.baseName = req.session.base.name;
						context.baseLon = req.session.base.lon;
						context.baseLat = req.session.base.lat;
						context.destinations = req.session.list;
						res.render('list', context);
					}else{
					  console.log(err);
					  if(response){
						console.log(response.statusCode);
					  }
					  next(err);
					}
				  });
			} else {
				console.log(err);
				if(response){
					console.log(response.statusCode);
				}
				next(err);
			}
		});
	}
},

buttonCallback: function (req, res, next) {
	res.render('button');
},

mapCallback: function (req, res, next) {
	var context = {};
	context.apiKey = "AIzaSyBOsg6DYhgcN9NRRjBspAG4X-k9qfzsTHM";
	res.render('map', context)
}

var request = require('request');
request([API url], function(err, response, body){
		var reply = JSON.parse(body);
	});


*/