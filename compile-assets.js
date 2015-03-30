//  required for bundleLinks(), client.getPhotos, client.getImages
var fs = require('fs');
var tumblr = require('tumblr.js');
var client = require('./tumblr-auth.js')
var forEachAsync = require('forEachAsync').forEachAsync;

//  required for download()
var request = require('request');
var mkdirp = require('mkdirp');
var youtubedl = require('youtube-dl');

function bundleLinks() {
    var categories = JSON.parse(fs.readFileSync('public/files/tags.json', 'utf8'));
    var media = {};

    forEachAsync(categories.tags, function (next, obj, i, arr) {

        if (obj.type === 'video') {
            client.getVideos(obj.tag, obj.limit, function (err, posts) {

                if ( obj.hasOwnProperty('navGroup') ) {
                    //  if true, the 'posts' object belongs within a navbar sub-category
                    var navGroup = obj.navGroup;
                    var tag = obj.tag;

                    if ( !(media.hasOwnProperty(navGroup)) ) {
                        //  instantiate the master nav category if it doesn't already exist
                        media[navGroup] = {};
                    }

                    var masterCat = media[navGroup];
                    masterCat[tag] = posts;

                } else {
                    //  if false, the 'posts' object belongs to its own nav category, and can be directly assigned
                    media[obj.tag] = posts;
                };

                next();
            });
        } else {
            client.getPhotos(obj.tag, obj.limit, function (err, posts) {

                if ( obj.hasOwnProperty('navGroup') ) {
                    //  if true, the 'posts' object belongs within a navbar sub-category
                    var navGroup = obj.navGroup;
                    var tag = obj.tag;

                    if ( !(media.hasOwnProperty(navGroup)) ) {
                        //  instantiate the master nav category if it doesn't already exist
                        media[navGroup] = {};
                    }

                    var masterCat = media[navGroup];
                    masterCat[tag] = posts;

                } else {
                    //  if false, the 'posts' object belongs to its own nav category, and can be directly assigned
                    media[obj.tag] = posts;
                };

                next();
            });
        };

    }).then( function () {
        console.log('all done!\n', media);
        return media;
    });
}

client.getPhotos = function(tag, limit, cb) {
    client.posts('williammatsuda', {type: 'photo', tag: tag, limit: limit}, function(err, docs) {
        if (err) {
            cb(err);
        } else {
            var posts = [];
            for (p in docs.posts) {
                var sizes = docs.posts[p].photos[0].alt_sizes;
                // posts.push(docs.posts[p].photos[0].alt_sizes[1].url);
                posts.push( [sizes[0].url, sizes[1].url, sizes[2].url ] );
            }
            cb(null, posts);
        }
    });
}

client.getMediaURI = function(tag, type, limit, id, cb) {
	client.posts('williammatsuda', {type: type, tag: tag, limit: limit}, function(err, docs) {
		if (err) {
			cb(err);
		} else {
			if (type === 'video') {
				var posts = [];
	            for (p in docs.posts) {
	                var rawUrl = docs.posts[p].permalink_url;
	                var split = rawUrl.split("?v=");
	                var embedUrl = '//www.youtube.com/embed/' + split[1];
	                posts.push(embedUrl);
	            }
	            cb(null, posts);
			} else {
				var posts = [];
	            for (p in docs.posts) {
	                var sizes = docs.posts[p].photos[0].alt_sizes;
	                // posts.push(docs.posts[p].photos[0].alt_sizes[1].url);
	                posts.push( [{1280: sizes[0].url}, {500: sizes[1].url}, {400: sizes[2].url} ] );
	            }
	            cb(null, posts);
			}
		}
	});
}

client.getVideos = function(tag, limit, cb) {
    client.posts('williammatsuda', {type: 'video', tag: tag, limit: limit}, function(err, docs) {
        if (err) {
            cb(err);
        } else {
            var posts = [];
            for (p in docs.posts) {
                var rawUrl = docs.posts[p].permalink_url;
                var split = rawUrl.split("?v=");
                var embedUrl = '//www.youtube.com/embed/' + split[1];
                posts.push(embedUrl);
            }
            cb(null, posts);
        }
    });
}



function getTags() {
	return JSON.parse(fs.readFileSync('public/files/tags.json', 'utf8'));
}


/**
 *  takes in a url and downloads its media to the specified file/folder,
 *      returning the path to the new file or an error
 *  @param uri: uri of media to download
 *  @param format: format of media (photo or video)
 *  @param filename: name of newly created file
 *  @param dest: directory within which to place said file
 *  @param cb: callback
**/
function downloadMedia(uri, format, filename, dest, cb) {
    if (format === video) {
        dest = 'public/video/' + dest;
        mkdirp(dest, function(err) {
            if (err) {
                cb(err);
            } else {
                var video = youtubedl(uri);
                video.pipe(fs.createWriteStream(dest + filename)).on('close', cb(null, dest + filename));
            }
        });
    } else {
        dest = 'public/images/' + dest;
        mkdirp(dest, function(err) {
            if (err) {
                cb(err);
            } else {
                request.head(uri, function(err, res, body) {
                    request(uri).pipe(fs.createWriteStream(dest + filename)).on('close', cb(null, dest + filename));
                });
            }
        });
    }   
}

function compile() {
	//	parse the tags.json
	var tags = getTags();
	var tagLinks = {};

	//	for each tag, get URIs for the latest tag.limit # of media objects
	forEachAsync(tags.tags, function(next, tag, i, arr) {
		client.getMediaURI(tag.tag, tag.type, tag.limit, tag.id, function(err, result) {
			console.log('hi from getMediaURI\t', result);
			tagLinks[tag.tag] = result;
			next();
		});
	}).then( function() {

		//	download the latest tag.limit # of media objects, returning the public filepath for each object
		forEachAsync(tagLinks, function(next, tagGroup, i, arr) {
			console.log('tagGroup', tagGroup);
			next();
		}).then( function() {
			console.log('done!');

			console.log(JSON.stringify(tagLinks));
			return tagLinks;
		});
		
	});
}

module.exports = compile;