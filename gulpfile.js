var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;


gulp.task('default', ['browser-sync'], function ()
{
    'use strict';
    gulp.watch(['app/public/**/*.html'], reload);
    gulp.watch(['app/public/**/*.js'], reload);
});

gulp.task('browser-sync', ['nodemon'], function ()
{
    browserSync({
        proxy: "http://localhost:5000", port: 7000
    });
});

gulp.task('nodemon', function ()
{
    var started = false;

    return nodemon({
        script: 'app/server.js', ignore: ['gulpfile.js', 'node_modules/']
    }).on('start', function ()
    {
        if (!started) {
            cb();
            started = true;
        }
    })
            .on('restart', function ()
            {
                setTimeout(function ()
                {
                    reload({stream: false})
                }, 1000)
            });
});
