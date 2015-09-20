var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var Firebase = require('firebase');

var myFirebaseRef = new Firebase("https://radiant-inferno-7526.firebaseio.com/");
var petRef = myFirebaseRef.child("pets");

app.get('/scrape', function(req, res){

	url = 'http://www.mdspca.org/programs/lost-found/lost';
	var json = new Array();
	var names = new Array();
	var ids = new Array();
	var count;

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var pet_name, pet_id;
			var data;

			$('.pet__heading').each(function(i, obj) {
				data = $(this);

				pet_name = data.text();
				pet_name = pet_name.replace(/[\n\t\r]/g,"");

				console.log(pet_name);
				names.push(pet_name);
			});

			$('.pet__id').each(function(i, obj) {
				data = $(this);

				pet_id = data.text();
				pet_id = pet_id.replace(/[\n\t\r]/g,"");

				console.log(pet_id);
				ids.push(pet_id);
			});

			console.log(names);
			console.log(ids);
			count = names.length - 1;

			while (count > 0 )
			{
				petRef.push({
					petID: ids[count].substring(8),
					name: names[count].substring(10),
					description : "Super fluffy",
					status : "found",
					location: {
						lat : "39.2833",
						long : "-76.6167",
						city: "Baltimore",
						state: "Maryland",
						zip: "21223"
					}
				});
				count = count - 1;
			}
		}
        	console.log('File successfully written!');
        })
        res.send('Check your console!')
	})
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
