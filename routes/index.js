var express = require('express');
var router = express.Router();
var fs = require('fs');



/* GET home page. */
router.get('/', function(req, res) {
	var categories = JSON.parse(fs.readFileSync('public/files/categories.json', 'utf8'));
	var about = JSON.parse(fs.readFileSync('public/files/landing-text.json', 'utf8'));
	var published = JSON.parse(fs.readFileSync('public/files/published.json', 'utf8'));
	res.render('index', {
		title: 'Will Matsuda',
		categories: categories.categories,
		about: about.text,
		published: published.published
	});
});




module.exports = router;
