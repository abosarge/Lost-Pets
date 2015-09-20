var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var Firebase = require('firebase');

var myFirebaseRef = new Firebase("https://radiant-inferno-7526.firebaseio.com/");
var petRef = myFirebaseRef.child("pets");

app.get('/scrape', function(req, res){
	var urlArray = new Array();
	var count;

	url = 'http://www.mdspca.org/programs/lost-found/lost';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var info;
			var data;

			var count = 0;
			$('article.pet').each(function(i, obj){
		        data = $(this);
		        info = data.find('a').attr('href');
				urlArray.push(info);
				count = count + 1;
	        })
		}

		urlArray.forEach(function(entry)
		{
			url = 'http://www.mdspca.org/' + entry;
			var names = new Array();
			var ids = new Array();

			request(url, function(error, response, html)
			{
				if(!error){
					var $ = cheerio.load(html);
					var pet_name, pet_id;
					var data;

					$('.pet__heading').each(function(i, obj) {
						data = $(this);

						pet_name = data.text();
						pet_name = pet_name.replace(/[\n\t\r]/g,"");
						pet_name = pet_name.trim();

						console.log(pet_name);
						names.push(pet_name);
					});

					$('.pet__id').each(function(i, obj) {
						data = $(this);

						pet_id = data.text();
						pet_id = pet_id.replace(/[\n\t\r]/g,"");
						pet_id = pet_id.trim();

						console.log(pet_id);
						ids.push(pet_id);
					});
				}

			})
		});
        	console.log('File successfully written!');
        })

        res.send('Check your console!')
	})
app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
