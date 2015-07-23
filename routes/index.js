var express = require('express');
var router = express.Router();
var text = require('../lib/static-text');
var staticAssets = require('../lib/sort-static');

router.get('/', function(req, res) {
  var sections = staticAssets.sections();
  var galleries = staticAssets.galleries();
	res.render('index', {
		title: 'William Matsuda',
    sections: sections,
    galleries: galleries,
    contact: text.contact,
		published: text.published,
	});
});

module.exports = router;
