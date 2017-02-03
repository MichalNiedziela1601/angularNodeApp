var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');



gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: ["app/public/**/*.*"],
        port: 7000
    });
});

gulp.task('nodemon', function ()
{
    var started = false;

    return nodemon({
        script: 'app/server.js',
        ext: 'html js'
    }).on('start', function ()
    {
        if (!started) {
            cb();
            started = true;
        }
    });
});
