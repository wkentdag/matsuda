var express = require('express');
var router = express.Router();

var tumblr = require('tumblr.js');
var client = require('../tumblr-auth.js')

/* GET home page. */
router.get('/', function(req, res) {
	client.posts('williammatsuda', {type: 'photo', limit: 10}, function (err, data) {
		if (err) {console.log(err);} else {
			console.log(data);
			// for (var p in data.posts) {
			// 	console.log(p.photos.[0].caption);
			// }

			for (var i=0; i<10; i++) {
				console.log(data.posts[i].photos[0].alt_sizes[0].url)
			}
		}

		res.render('index', { title: 'Will Matsuda' });
	});
});

module.exports = router;
