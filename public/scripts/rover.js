document.addEventListener('DOMContentLoaded', bindButton);
document.addEventListener('DOMContentLoaded', logObjects);

function bindButton(){
	document.getElementById('search').addEventListener('click', function(event){
		event.preventDefault();
		var apikey = "f4bERMgBr0exmyAtYo98Z2c5corPHTsg7PXPSEur";
		var req = new XMLHttpRequest();
		var camera = document.getElementById('selectCamera').value;
		var date = getDate();
		req.open('GET', "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + date + "&camera=" + camera + "&api_key=" + apikey, true);
		req.addEventListener('load',function(){
			if(req.status >= 200 && req.status < 400){
				var response = JSON.parse(req.responseText);
				document.getElementById('roverImage').src = response.photos[0].img_src;
			} else {
				console.log("Error in network request: " + request.statusText);
			}});
		req.send();
	})
}

function logObjects() {
	var objects = {};
	var req = new XMLHttpRequest();
	req.open('GET', "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEY", true);
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			objects.response1 = response;
			document.getElementById("response1").textContent = req.responseText;
			console.log(objects);
		} else {
			console.log("Error in network request: " + req.statusText);
		}});
	req.send();
}



function getDate() {
	var today = new Date();
	var dd = today.getDate() - 1; //Actually look for yesterday
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
		dd = '0' + dd;
	} 
	if(mm<10) {
		mm= '0' + mm;
	} 
	today = yyyy + '-' + mm + '-' + dd;
	return today;
}