'use strict';
const gulp = require('gulp'),
    browserSync = require('browser-sync').create(); // Обновляет страницу

gulp.task('connect', function () {
    browserSync.init({
        server: './'
    });
    gulp.watch([
        '*.html'
    ], ['buildHtml']);
    gulp.watch([
        '*.js'
    ], ['buildJs']);
});

gulp.task('buildHtml', function () {
    browserSync.reload();
});

gulp.task('buildJs', function () {
    browserSync.reload();
});

gulp.task('default', ['connect', 'buildHtml', 'buildJs']);