document.addEventListener('DOMContentLoaded', bindButton);
document.addEventListener('DOMContentLoaded', logObjects);
//document.addEventListener('DOMContentLoaded', nestedRequests);

function bindButton(){
	document.getElementById('search').addEventListener('click', function(event){
		event.preventDefault();
		var apikey = "f4bERMgBr0exmyAtYo98Z2c5corPHTsg7PXPSEur";
		var req = new XMLHttpRequest();
		var longitude = parseFloat(document.getElementById('longitude').value);
		var latitude = parseFloat(document.getElementById('latitude').value);
		req.open('GET', "https://api.nasa.gov/planetary/earth/imagery?lon=" + longitude + "&lat=" + latitude + "&api_key=" + apikey, true);
		req.addEventListener('load',function(){
			if(req.status >= 200 && req.status < 400){
				var response = JSON.parse(req.responseText);
				document.getElementById('dateAndTime').textContent = response.date;
				document.getElementById('landsatImage').src = response.url;
			} else {
				console.log("Error in network request: " + request.statusText);
			}});
		req.send();
	})
}

function logObjects() {
	var objects = {};
	var req = new XMLHttpRequest();
	req.open('GET', "https://api.nasa.gov/planetary/earth/imagery?lon=-73.967&lat=40.785&api_key=DEMO_KEY", true);
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			objects.response1 = response;
			document.getElementById("response1").textContent = req.responseText;
			var req2 = new XMLHttpRequest();
			req2.open('GET', "https://api.nasa.gov/planetary/earth/imagery?lon=-73.967&lat=40.785&date=2015-01-14&cloud_score=True&api_key=DEMO_KEY", true);
			req2.addEventListener('load',function(){
				if(req2.status >= 200 && req2.status < 400){
					var response = JSON.parse(req2.responseText);
					objects.response2 = response;
					document.getElementById("response2").textContent = req2.responseText;
					var req3 = new XMLHttpRequest();
					req3.open('GET', "https://api.nasa.gov/planetary/earth/assets?lon=-73.967&lat=40.785&begin=2016-01-01&api_key=DEMO_KEY", true);
					req3.addEventListener('load',function(){
						if(req3.status >= 200 && req3.status < 400){
							var response = JSON.parse(req3.responseText);
							objects.response3 = response;
							document.getElementById("response3").textContent = req3.responseText;
							console.log(objects);
						} else {
							console.log("Error in network request: " + req3.statusText);
						}});
					req3.send();
				} else {
					console.log("Error in network request: " + req2.statusText);
				}});
			req2.send();
		} else {
			console.log("Error in network request: " + req.statusText);
		}});
	req.send();
}

/*
function nestedRequests(){
	var apikey = "f4bERMgBr0exmyAtYo98Z2c5corPHTsg7PXPSEur";
	var req = new XMLHttpRequest();
	req.open('GET', "https://api.nasa.gov/planetary/earth/assets?lon=-73.967&lat=40.785&begin=2015-01-01&api_key=" + apikey, true);
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			for (var x = 0; x < response.count; x++) {
				var newReq = new XMLHttpRequest();
				var date = response.results[x].date.slice(0, 10);
				console.log(date);
				newReq.open('GET', "https://api.nasa.gov/planetary/earth/imagery?lon=-73.967&lat=40.785&date=" + date + "&api_key=" + apikey, true);
				newReq.addEventListener('load',function(){
					if(newReq.status >= 200 && newReq.status < 400){
						var newResponse = JSON.parse(newReq.responseText);
						console.log(newResponse.url);
					} else {
						console.log("Error in network request: " + newReq.statusText);
					}});
				newReq.send();
				
			}
		} else {
			console.log("Error in network request: " + req.statusText);
		}});
	req.send();
}

// ESRAMX95OA3P2EIL8FPUDFP
//https://tse3-mm.cn.bing.net/th?id=OIP.M1595f9d3088b76c5bf1bfbd590da0b96H0&pid=15.1
/*
var request = newXMLHttpRequest();
request.open('GET', [API url], true);
request.addEventListener('load', function(){
		var response = JSON.parse(request.responseText);
	});
*/