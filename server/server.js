var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

	url = 'http://www.mdspca.org/programs/lost-found/lost';
	var json = new Array();
	var names = new Array();
	var ids = new Array();

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var pet_name, pet_id;
			var data = null;

			$('.pets').each(function(i, obj) {
				$('.pets').filter(function(){
					data = $(this);

					names.push(data.find('.pet__heading').text());
					console.log(data.find('.pet__heading').text());

					ids.push(data.find('.pet__id').text());
					console.log(data.find('.pet__id').text());
				})
			});

			console.log(names[count].trim().substring(10));

			var count = 0;
			names.forEach(function(entry) {
				ids.forEach(function(entry) {
    				json.push({ "pet_name" : names[count].trim().substring(10) , "pet_id" : ids[count].trim().substring(8)});
				});
				count = count + 1;
			});

			console.log(json);
		}
		fs.writeFile('output.json', JSON.stringify(json), function(err){
        	console.log('File successfully written! - Check your project directory for the output.json file');
        })
        res.send('Check your console!')
	})
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
