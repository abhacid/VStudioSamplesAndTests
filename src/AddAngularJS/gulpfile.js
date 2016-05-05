/// <binding Clean='clean' />
'use strict';

var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');
    

var webroot = './wwwroot/';

var paths = {
    npm : './node_modules/',
    lib: webroot + 'lib/',
    js: webroot + 'js/',
    css: webroot + 'css/',
};

var sources = {  
    angular: paths.npm + 'angular/'
};

var dests = {
    angular: paths.lib + 'angular/',
    jsFileMinified: paths.js + 'site.min.js',
    cssFileMinified: paths.css + 'site.min.css'
};



//var itemsToCopy = {
//    './node_modules/angular/angular*.js' : webroot + 'lib/angular'
//}

//gulp.task('copy', function () {
//    for (var src in itemsToCopy) {
//        if (!itemsToCopy.hasOwnProperty(src)) continue;
//        gulp.src(src)
//        .pipe(gulp.dest(itemsToCopy[src]));
//    }
//});

gulp.task('clean:angular', function () {
    return del( dests.angular + 'angular*.js');
});

gulp.task('clean:js', function () {
    return del(dests.jsFileMinified);
});

gulp.task('clean:css', function () {
    return del(dests.cssFileMinified);
});

gulp.task('clean', ['clean:angular', 'clean:js', 'clean:css']);


gulp.task('copy:angular', function () {
    gulp.src(sources.angular + 'angular*.js')
    .pipe(gulp.dest(dests.angular));
});

gulp.task('copy', ['copy:angular']);


gulp.task('min:js', function () {
    return gulp.src([paths.js + '**/*.js', '!' + paths.js + '**/*.min.js'], { base: '.' })
        .pipe(concat(dests.jsFileMinified))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('min:css', function () {
    return gulp.src([paths.css + '**/*.css', '!' + paths.css + '**/*.min.css'])
        .pipe(concat(dests.cssFileMinified))
        .pipe(cssmin())
        .pipe(gulp.dest('.'));
});

gulp.task('min', ['min:js', 'min:css']);


gulp.task('default', ['clean', 'copy', 'min']);