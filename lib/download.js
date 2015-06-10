var debug = require('debug')('matsuda');
var request = require('request');
var mkdirp = require('mkdirp');
var youtubedl = require('youtube-dl');
var forEachAsync = require('forEachAsync').forEachAsync;
var fs = require('fs');
var jf = require('jsonfile')
var config = require('../config.json');
var parse = require('./parse');

var dl = {};


/** @param "parsed": an array of JSON objects returned from parseAllTags
  *  downloads the remote media linked to within each object, returning 
  *  "parsed" as-is, plus an additional "staticMedia" property,
  *  an array of paths to the files at which the media has been downloaded.
**/  
dl.downloadAll = function(parsed, cb) {
  console.log('Downloading files (this may take awhile)...')
  var data = parsed;
  forEachAsync(data, function(next, category, i, array) {
    // console.log(category);

    forEachAsync(category.galleries, function(next1, gallery, j, array1) {
      // console.log(gallery);

      forEachAsync(gallery.data, function(next2, mediaObj, k, array2) {
        // console.log(mediaObj);

        var isPhoto = !mediaObj.hasOwnProperty('youtube');
        if (isPhoto) {
          var imageURIs = [mediaObj.remoteImages.sm, mediaObj.remoteImages.md, mediaObj.remoteImages.lg];
          // console.log(mediaObj.remoteImages);

          var staticMedia = [];
          forEachAsync(imageURIs, function(next3, uri, l, array3) {
            dl.downloadOne(uri, isPhoto, gallery.id + '/' + k, l + '.jpg', function(err, path) {
              if (err) {
                console.log(err);
                return cb(err);
              }
              var relPath = path.replace('public/', '');
              staticMedia.push(relPath);
              debug('\tFile saved to path: ' + path);
              next3();
            });
          }).then(function() {
            mediaObj['staticMedia'] = staticMedia;
            next2();
          });

        } else {
          var uri = mediaObj.youtube;
          dl.downloadOne(uri, isPhoto, gallery.id + '/' + k, '0.mp4', function(err, path) {
            if (err) {
              console.log(err);
              return cb(err);
            }

            var relPath = path.replace('public/', '');
            mediaObj['staticMedia'] = [relPath];
            debug('\tFile saved to path: ' + path);
            next2();
          });
        }
      }).then( function() {
        next1();
      });
    }).then(function() {
      next();
    });
  }).then(function () {
    console.log('Finished downloading static assets');
    return cb(null, data);
  });
}

/**
  *
  * Downloads one remote media URI and returns the 
  * path it's been downloaded to
  *
**/
dl.downloadOne = function(uri, isPhoto, dest, filename, cb) {
  dest = config.staticMedia + dest + '/';
  mkdirp(dest, function(err) {
    if (err) return cb(err);

    if (isPhoto) {
      request.get({url: uri, encoding: 'binary'}, function(err, response, body) {
        fs.writeFile(dest + filename, body, 'binary', function(err) {
          if (err) {
            console.log(err);
            return cb(err);
          } else {
            return cb(null, dest + filename);
          }
        });
      });
    } else {
      var video = youtubedl(uri);
      video.on('info', function(info) {
        debug('Download started');
        debug('filename: ' + info._filename);
        debug('size: ' + info.size);
      });
      video.pipe(fs.createWriteStream(dest + filename));
      return cb(null, dest + filename);
    }
  }); //  end mkdirp
}


dl.saveStaticSitemap = function(json, file, cb) {
  dest = config.staticText + '/';
  mkdirp(dest, function(err) {
    if (err) return cb(er);
      var path = dest + file;
      jf.writeFile(path, json, function(err) {
        if (err) return cb(err);
        console.log('static sitemap located at:\t' + path);
        cb(null, path);
      });
  });
}

module.exports = dl;