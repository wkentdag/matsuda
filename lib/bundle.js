var config = require('../config.json');
var parse = require('./parse');
var utils = require('./tumblr-utils');

function bundle() {
  var categories = parse(config.categories).categories;
  utils.parseAllTags(categories, function(err, result) {
    console.log(JSON.stringify(result));
  });
}

module.exports = bundle;