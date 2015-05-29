var client = require('../tumblr-auth');

//  simple wrapper around basic tumblr API
//  returns an array of JSON objects comprised of either Youtube URLs or
//  links to three sizes of an image and a caption if present
client.getMedia = function(tag, type, limit, cb) {
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
          lg: thiss.photos[0].alt_sizes[0].url,
          md: thiss.photos[0].alt_sizes[1].url,
          sm: thiss.photos[0].alt_sizes[2].url
        }
        media.push(photo);
      }
    }

    cb(null, media);
  }); //  end client.posts
}

module.exports = client;