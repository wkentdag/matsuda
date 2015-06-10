var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var config = require('./config.json');
var path = require('path');

var paths = {
  dev: {
    js: path.join(config.javascripts.dev, '*.js'),
    scss: path.join(config.stylesheets.dev, '*.scss')
  },
  build: {
    js: config.javascripts.build,
    css: config.stylesheets.build
  }
};

var handleError = function(err) { console.log(err); if (this.emit) { this.emit('end'); }};

gulp.task('clean', function(cb) {
  del([paths.build.js, paths.build.css], cb);
});

gulp.task('sass', function () {
  del([paths.build.css], function(err) {
    if (err) handleError;
    gulp.src(paths.dev.scss)
      .pipe(plugins.sass({onError: handleError}))
      .pipe(plugins.concat('style.css'))
      .pipe(plugins.minifyCss())
      .pipe(plugins.rename({extname: '.min.css'}))
      .pipe(gulp.dest(paths.build.css));
  }); 
});

gulp.task('js', function () {
  del([paths.build.js], function(err) {
    if (err) handleError;
    gulp.src(paths.dev.js)
      .pipe(plugins.concat('scripts.js'))
      .pipe(plugins.uglify())
      .pipe(plugins.rename({extname: '.min.js'}))
      .pipe(gulp.dest(paths.build.js));
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.dev.js, ['js']);
  gulp.watch(paths.dev.scss, ['sass']);
});

gulp.task('build', ['sass', 'js'], function () {
  console.log('\nbuild succeeded!\n');
});

gulp.task('default', ['watch', 'build'], function() {
  console.log('starting gulp');
});




