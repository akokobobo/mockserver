var express = require('express');
var app = express();

var request = require('request');
var dictionary = require('./words')

/**
Word search api
*/
app.get('/search', function(req, res){
  res.send({result: dictionary.match(req.query.input || '')});
});

/**
Google places api
*/
var GOOGLE_API_BROWSER = "<API>"
app.get('/location/search', function(req, res){
  	if (!req.query.input) res.send("give me something to search");
  	request({
  		url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
  		qs: {
  			input: req.query.input,
  			key: GOOGLE_API_BROWSER
  		},
  		json: true
  	}, function (error, response, data) {
  		res.send({result: data});
  	});

});

app.listen(3000);