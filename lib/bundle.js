var config = require('../config.json');
var parse = require('./parse');
var utils = require('./tumblr-utils');
var download = require('./download');

function bundle() {
  var categories = parse(config.categories).categories;
  utils.parseAllTags(categories, function(err, result) {
    // console.log(JSON.stringify(result));
    var staticResources = download(result);
    console.log(staticResources);
  });
}

module.exports = bundle;