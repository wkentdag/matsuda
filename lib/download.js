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
      // console.log('its a vidoe url');
      downloadOne(obj, 'video', tagObj.id, i, function(err, result) {
        // console.log(err, result);
        console.log('downloadOne finished');
      });
    } else {
      // console.log('its an object');
    }


    next();
  }).then( function() {
    return console.log("\tdownload() finished!");
  });
}

function downloadOne(uri, format, dest, filename, cb) {
  if (format === 'video') {
    dest = config.videoDir + dest + '/';
  } else {
    dest = config.imgDir + dest + '/';
  }


  console.log('\nhello from downloadOne\n');
  console.log('uri:\t' + uri + '\nformat:\t' + format + '\ndest:\t' + dest + '\nfilename:\t' + filename);
  cb(null, dest);

  mkdirp(dest, function(err) {
    if (err) return cb(err);
    var video = youtubedl(uri);
    // video.pipe(fs.createWriteStream(dest + filename)).on('close', cb(null, dest + filename));
  }); //  end mkdirp
}

module.exports = download;