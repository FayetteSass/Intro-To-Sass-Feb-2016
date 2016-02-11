var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var compass = require('gulp-compass');
var nano = require('gulp-cssnano');

var config = {
    fontDir: 'fonts',
    sassDir: 'sass',
    cssDir: 'css',
    imageDir: 'img'
}

gulp.task('css', function() {
  gulp.src(['./sass/style.scss', './sass/fonts.scss'])
    .pipe(compass({
        css: config.cssDir,
        sass: config.sassDir,
        image: config.imageDir
    }))
    .on('error', function(err) {
        this.emit('end');
    })
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(config.cssDir));
});

gulp.task('css:min', function() {
  gulp.src(['./sass/style.scss', './sass/fonts.scss'])
    .pipe(compass({
        css: config.cssDir,
        sass: config.sassDir,
        image: config.imageDir
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(nano({
            discardComments: {removeAll: true},
            discardUnused: {fontFace: false}
        }))
    .pipe(gulp.dest(config.cssDir));
});

gulp.task('watch', function() {
    'use strict';
    gulp.watch([config.sassDir + '/**/*.scss'], { interval: 1000 }, ['css']);
});

gulp.task('default', ['css:min']);
