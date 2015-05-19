var forEachAsync = require('forEachAsync').forEachAsync;
var tumblr = require('tumblr.js');
var client = require('../tumblr-auth');

var config = require('../config.json');
var parse = require('./parse');
var download = require('./download');

//  returns an array[limit] of media URIs for a given tag:
//    - youtube embed URL for video
//    - array of image URLs in various sizes for photo
client.getURIsForTag = function(tag, type, limit, cb) {
  client.posts('williammatsuda', {type: type, tag: tag, limit: limit}, function(err, docs) {
    if (err) return cb(err);

    var uris = [];

    for (p in docs.posts) {
      if (type === 'video') {
        var rawUrl = docs.posts[p].permalink_url;
        var split = rawUrl.split("?v=");
        uris.push('//www.youtube.com/embed/' + split[1]);
      } else {
        var sizes = docs.posts[p].photos[0].alt_sizes;
        uris.push( [{1280: sizes[0].url}, {500: sizes[1].url}, {400: sizes[2].url} ] );
      }
    }

    cb(null, uris);
  }); //  end client.posts
}

function bundle() {
  //  
  var tags = parse(config.tagFile).tags;
  forEachAsync(tags, function(next, obj, i, arr) {
    client.getURIsForTag(obj.tag, obj.type, obj.limit, function(err, result) {
      console.log('\ncompiling getURIsForTag ' + obj.id + ":\n");
      // console.log(result);

      download(obj, result);

      next();
    }); //  end getURIs
  }).then(function () {
    console.log('all done!');
    return console.log('hello from bundle!');
  });





}

module.exports = bundle;