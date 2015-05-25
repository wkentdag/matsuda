var config = require('../config.json');
var parse = require('./parse');
var path = require('path');

//parse each static text file
var text_dir = config.staticText;
var text = {};
text.landing = parse(path.join(text_dir, 'landing.json')).text;
text.published = parse(path.join(text_dir, 'published.json')).published;
text.categories = parse(path.join(text_dir, 'categories.json')).categories;

module.exports = text;
