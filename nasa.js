/*
Author: Elliot Bates
Email: batese@oregonstate.edu
Description: Web server for week 8 assignment using node js
*/

var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'}); // This is where the default layout is chosen
var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); // This line allows us to ommit the .handlebars extension
app.set('port', 3502); //Set the port for the app here

var session = require('express-session');
app.use(session({secret:'fkK7@99xSg'})); //This string is used to encrypt session data on the client machine so that the client cannot tamper with it

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); // Lets you deal with url encoded submissions
app.use(bodyParser.json()); // Adds the parser for JSON

var cb = require('./callbacks.js'); //These are my own files containing functions/data

app.use(express.static('public')); //Tells the appt to look in the public folder for static files (files that don't get dynamically changed like stylesheeets or scripts)

//These are the handlers for the main web pages
app.get('/', cb.index);
app.get('/index', cb.index);
app.get('/earth', cb.earth);
app.get('/marsRoverPhotos', cb.marsRoverPhotos);
app.get('/additionalResources', cb.additionalResources);

// Handles requests where the page could not be found
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// Handles errors. Express knows that since this function takes 4 arguments then it is the error handler
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});