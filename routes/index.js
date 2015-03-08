var express = require('express');
var router = express.Router();

var fs = require('fs');
var tumblr = require('tumblr.js');
var client = require('../tumblr-auth.js')
var forEachAsync = require('forEachAsync').forEachAsync;
var async = require('async');

/* GET home page. */
router.get('/', function(req, res) {

	var categories = JSON.parse(fs.readFileSync('public/files/categories.json', 'utf8'));
	var tags = categories.tags;
	
	for (item in tags) {
		console.log(tags[item].tag);
	}

	// forEachAsync(categories.tags, function (next, cat, i, arr) {
	// 	console.log('hi');
	// 	next();
	// }).then(function () {	
	// 	console.log('all done!')
		client.getPosts('lovers', 'photo', 10, function(err, posts) {
			// console.log(posts);

			res.render('index', {title: 'William Matsuda', docs: posts});
		});
	// });
});


client.getPosts = function(tag, type, limit, cb) {
	client.posts('williammatsuda', {type: type, tag: tag, limit: limit}, function(err, docs) {
		if (err) {
			cb(err);
		} else {
			cb(null, docs);
		}
	});
}

module.exports = router;
