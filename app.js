var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

//  required for getImages(), client.getPhotos, client.getImages
var fs = require('fs');
var tumblr = require('tumblr.js');
var client = require('./tumblr-auth.js')
var forEachAsync = require('forEachAsync').forEachAsync;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

getImages();

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function getImages() {
        var categories = JSON.parse(fs.readFileSync('public/files/categories.json', 'utf8'));
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
        console.log('all done!\n');
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


module.exports = app;
