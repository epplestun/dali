var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

gulp.task('clean', function(cb) {
  return del(['dist'], cb);
});
 
gulp.task('default', ['clean'], function () {
    return gulp.src([
        "src/http/*.js",
        "src/core/util/*.js",
        "src/core/component/*.js",
        "src/core/di/*.js",
        "src/core/directives/*.js",
        "src/core/dom/*.js",
        "src/core/evaluator/*.js",
        "src/core/event/*.js",
        "src/core/filters/*.js",
        "src/core/module/*.js",
        "src/core/render/*.js",
        "src/core/runnable/*.js",        
        "src/core/view/*.js",
        "src/core/router/*.js",
        "src/core/bootstrap.js"
      ])
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