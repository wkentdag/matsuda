var express = require('express');
var router = express.Router();
var text = require('../lib/static-text');
var staticAssets = require('../lib/sort-static');

router.get('/', function(req, res) {
	res.render('index', {
		title: 'William Matsuda',
    sections: staticAssets.sections(),
    galleries: staticAssets.galleries(),
		about: text.landing,
    contact: text.contact,
		published: text.published,
	});
});

module.exports = router;
