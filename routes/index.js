var express = require('express');
var router = express.Router();
var text = require('../lib/static-text');

router.get('/', function(req, res) {
  console.log(text.tags);
	res.render('index', {
		title: 'William Matsuda',
		categories: text.categories,
		about: text.landing,
    contact: text.contact,
		published: text.published,
    tags: text.tags
	});
});

module.exports = router;
