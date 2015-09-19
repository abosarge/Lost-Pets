var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res, url){
	// Let's scrape Anchorman 2
	thisUrl = url;

	request(thisUrl, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var pet_name, pet_id;
			var json = { pet_name : "", pet_id : ""};

			$('.pet__heading').filter(function(){
		        var data = $(this);
		        pet__heading = data.text();

		        json.pet_name = pet__heading.trim().substring(10);
	        })

			$('.pet__id').filter(function(){
				var data = $(this);
				pet__id = data.text();

				json.pet_id = pet__id.trim().substring(8);
			})
		}

		fs.writeFile('spcaDetail.json', JSON.stringify(json, null, 4), function(err){
        	console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
	})
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
