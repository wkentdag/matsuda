var debug = require('debug')('matsuda');
var forEachAsync = require('forEachAsync').forEachAsync;
var client = require('../tumblr-auth');
var config = require('../config.json');
var parse = require('./parse');
var categories = parse(config.categories).categories;

//  simple wrapper around basic tumblr API
//  returns an array of JSON objects comprised of either Youtube URLs or
//  links to three sizes of an image and a caption if present
client.parseMediaForTag = function(tag, type, limit, cb) {
  client.posts('williammatsuda', {type: type, tag: tag, limit: limit}, function(err, docs) {
    if (err) return cb(err);

    var media = [];
    //  iterate over each media object, stripping inessential info
    for (var obj in docs.posts) {
      var thiss = docs.posts[obj];

      if (type === 'video') {
        var video = {};
        video.youtube = thiss.permalink_url;
        media.push(video);

      } else {
        var photo = {};
        if (thiss.caption) {
          photo.caption = thiss.caption;
        }
        photo.remoteImages = {
          sm: thiss.photos[0].alt_sizes[2].url,
          md: thiss.photos[0].alt_sizes[1].url,
          lg: thiss.photos[0].alt_sizes[0].url
        }
        media.push(photo);
      }
    }
    cb(null, media);
  }); //  end client.posts
}

// calls parseMediaForTag on each tag in the categories file, 
// returns an array of JSON objects with the following fields:
//  title: title of the category (i.e., News)
//  galleries: [title: <gallery tag>, id: <gallery id>, data: <result from parseMediaForTag(tag)]
client.parseAllTags = function(categories, cb) {
  debug('Parsing tags...');
  var media = [];

  forEachAsync(categories, function(next, c, i, arr) {
    var obj = {};
    obj.title = c.title;
    obj.galleries = [];

    forEachAsync(c.galleries, function(next1, g, j, arr) {
      debug('\t' + g.tag);
      client.parseMediaForTag(g.tag, g.type, g.limit, function(err, result) {
        if (err) return cb(err);
        obj.galleries.push({title: g.tag, id: g.id, data: result});
        next1();
      });
    }).then( function() {
      media.push(obj);
      next();
    });

  }).then( function() {
    debug('Finished parsing tags');
    cb(null, media);
  });
}

module.exports = client;