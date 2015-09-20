/**
 * Module dependencies.
 */

var express = require('express')
, jsdom = require('jsdom')
, request = require('request')
, url = require('url')
, app = module.exports = express.createServer();

app.get('/nodetube', function (req, res) {
    //Tell the request that we want to fetch youtube.com, send the results to a callback function
    request({
        uri: 'http://youtube.com'
    }, function (err, response, body) {
        var self = this;
        self.items = new Array(); //I feel like I want to save my results in an array

          //Just a basic error check
        if (err && response.statusCode !== 200) {
            console.log('Request error.');
        }

          //Send the body param as the HTML code we will parse in jsdom
        //also tell jsdom to attach jQuery in the scripts
        jsdom.env({
            html: body,
            scripts: ['http://code.jquery.com/jquery-1.6.min.js']
        }, function (err, window) {
            //Use jQuery just as in any regular HTML page
            var $ = window.jQuery,
                $body = $('body'),
                $videos = $body.find('.video-entry');

                //I know .video-entry elements contain the regular sized thumbnails
            //for each one of the .video-entry elements found
            $videos.each(function (i, item) {

                     //I will use regular jQuery selectors
                var $a = $(item).children('a'),

                          //first anchor element which is children of our .video-entry item
                    $title = $(item).find('.video-title .video-long-title').text(),

                          //video title
                    $time = $a.find('.video-time').text(),

                          //video duration time
                    $img = $a.find('span.clip img'); //thumbnail

                     //and add all that data to my items array
                self.items[i] = {
                    href: $a.attr('href'),
                    title: $title.trim(),
                    time: $time,

                          //there are some things with youtube video thumbnails, those images whose data-thumb attribute
                    //is defined use the url in the previously mentioned attribute as src for the thumbnail, otheriwse
                    //it will use the default served src attribute.
                    thumbnail: $img.attr('data-thumb') ? $img.attr('data-thumb') : $img.attr('src'),
                    urlObj: url.parse($a.attr('href'), true) //parse our URL and the query string as well
                };
            });

                //let's see what we've got
            console.log(self.items);
            res.end('Done');
        });
    });
});
