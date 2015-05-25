var express = require('express');
var router = express.Router();
var fs = require('fs');
var text = require('../lib/static-text');

router.get('/', function(req, res) {
	console.log('hello from index.js\n' + JSON.stringify(text) );

	res.render('index', {
		title: 'William Matsuda',
		categories: text.categories,
		about: text.landing,
		published: text.published
	});
});

module.exports = router;
