var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;


gulp.task('default', ['browser-sync'], function ()
{
});

gulp.task('browser-sync', ['nodemon'], function ()
{
    browserSync.init(null, {
        proxy: "http://localhost:5000", files: ["app/**/*.*"], port: 7000
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
                setTimeou(function ()
                {
                    reload({stream: false})
                }, 1000)
            });
});
