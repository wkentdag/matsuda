var del = require('del');
var config = require('../config.json');
var parse = require('./parse');
var utils = require('./tumblr-utils');
var download = require('./download');

function bundle(cb) {
  var categories = parse(config.categories).categories;
  del(config.staticMedia, function(err) {
    if (err) return console.log(err);

    utils.parseAllTags(categories, function(err, result) {
      download.downloadAll(result, function(err, result) {
        if (err) {
          console.log(err);
          return cb(err);
        } else {
          download.saveStaticSitemap(result, 'staticAssets.json', function(err, staticAssetMap) {
            if (err) return cb(err);
            return cb(null, staticAssetMap);
          });
        }
      });
    });

  }); //  end del 
}

module.exports = bundle;