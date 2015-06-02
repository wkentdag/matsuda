var debug = require('debug')('matsuda');
var del = require('del');
var forEachAsync = require('forEachAsync').forEachAsync;
var config = require('../config.json');
var parse = require('./parse');
var utils = require('./tumblr-utils');
var download = require('./download');

var b = {};

b.bundle = function(cb) {
  var categories = parse(config.categories).categories;
  del(config.staticMedia, function(err) {
    if (err) return console.log(err);

    utils.parseAllTags(categories, function(err, result) {
      b.getLanding(function(err, staticLanding) {
        if (err) {
          console.log(err);
          return cb(err);
        } else {
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
          }); //  end downloadAll
        }
      }); //  end getLanding
    }); //  ned parseAllTags
  }); //  end del 
}

b.getLanding = function(cb) {
  utils.parseMediaForTag('landing', 'photo', 0, function(err, result) {
    if (err) {
      console.log(err);
      return cb(err);
    } else {

      var imageURIs = [result[0].remoteImages.sm, result[0].remoteImages.md, result[0].remoteImages.lg];
      var staticMedia = [];
      forEachAsync(imageURIs, function(next, uri, l, array) {
        download.downloadOne(uri, true, 'landing/', l + '.jpg', function(err, path) {
          if (err) {
            console.log(err);
            return cb(err);
          }
          var relPath = path.replace('public/', '');
          staticMedia.push(relPath);
          debug('\tFile saved to path: ' + path);
          next();
        });
      }).then(function() {
        result['staticMedia'] = staticMedia;
        cb(null, result);
      });
    }
  });
}

module.exports = b;