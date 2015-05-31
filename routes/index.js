var express = require('express');
var router = express.Router();
var text = require('../lib/static-text');
var staticAssets = require('../lib/sort-static');

var sections = staticAssets.sections();
var galleries = staticAssets.galleries();

router.get('/', function(req, res) {
	res.render('index', {
		title: 'William Matsuda',
    sections: sections,
    galleries: galleries,
		about: text.landing,
    contact: text.contact,
		published: text.published,
	});
});

module.exports = router;
