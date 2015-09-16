var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

gulp.task('clean', function(cb) {
  return del(['dist'], cb);
});
 
gulp.task('default', ['clean'], function () {
  return gulp.src('src/**/*.js')
      .pipe(babel({ 
      	optional: [
          "es7.decorators",
          "es7.classProperties",
          "es7.exportExtensions",
          "es7.functionBind"
        ],
      	modules: 'ignore'
      }))
      .pipe(concat('dali.js'))
      .pipe(gulp.dest('dist'));
});