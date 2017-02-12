var less = require('gulp-less');
var path = require('path');

var gulp = require('gulp')
var ts = require('gulp-less');
gulp.task('less', function() {
    return gulp.src('./src/styles/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./build/styles'));
});