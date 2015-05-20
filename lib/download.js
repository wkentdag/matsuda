var request = require('request');
var mkdirp = require('mkdirp');
var youtubedl = require('youtube-dl');
var forEachAsync = require('forEachAsync').forEachAsync;
var fs = require('fs');
var config = require('../config.json');
var parse = require('./parse');
var tags = parse(config.tagFile).tags;


function download(tagObj, data) {
  console.log( "\tdownload() received " + tagObj.id + " w/num items: " + data.length + ' type: ' + tagObj.type);

  //  loop over each object in the group
  forEachAsync(data, function(next, obj, i, arr) {
    // console.log('\nforEachAsync iteration ' + i + ':\n' + obj + '\ntype:\t' + typeof(obj));

    if (typeof(obj) == 'string' && tagObj.type == 'video') {
      downloadOne(obj, 'video', tagObj.id, i, function(err, result) {
        console.log('downloadOne finished with result:\t' + result);

        next();
      });
    } else {

      //  loop over each item (JSON, k=width, v=URL) in the object
      forEachAsync(obj, function(next1, o, j, arr2) {
        // console.log('object at index' + j + ':\t' + JSON.stringify(obj[j]) );

        if (obj[j][500]) {
          downloadOne(obj[j][500], 'photo', tagObj.id + '/' + i, '500.jpg', function(err, result) {
            next1();
          });
        } else {
          downloadOne(obj[j][250], 'photo', tagObj.id + '/' + i, '250.jpg', function(err, result) {
            next1();
          });
        }
      }).then(function () {
        next();
      }); //  end forEachAsync 2
    }
  }).then( function() {
    return console.log("\tdownload() finished!");
  });
}

function downloadOne(uri, format, dest, filename, cb) {
  var photo = true;
  if (format === 'video') {
    dest = config.videoDir + dest + '/';
    photo = false;
  } else {
    dest = config.imgDir + dest + '/';
  }


  // console.log('\nhello from downloadOne');
  // console.log('uri:\t' + uri + '\nformat:\t' + format + '\ndest:\t' + dest + '\nfilename:\t' + filename);

  mkdirp(dest, function(err) {
    if (err) return cb(err);

    if (photo) {
      request.get({url: uri, encoding: 'binary'}, function(err, response, body) {
        fs.writeFile(dest + filename, body, 'binary', function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('the file was saved at :\t' + dest + filename);
          }
        });
      });
    } else {
      var video = youtubedl(uri);
      console.log('video!! -->\t' + video);
      // video.pipe(fs.createWriteStream(dest + filename)).on('close', cb(null, dest + filename));
    }

    cb(null, dest + filename);
  }); //  end mkdirp
}

module.exports = download;