var express = require('express');
var router = express.Router();
var text = require('../lib/static-text');

router.get('/', function(req, res) {
	res.render('index', {
		title: 'William Matsuda',
		categories: text.categories,
		about: text.landing,
    contact: text.contact,
		published: text.published
	});
});

module.exports = router;
