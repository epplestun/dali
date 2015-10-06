var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var babelMocha = require('babel/register');

gulp.task('clean', function(cb) {
  return del(['dist'], cb);
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js']) 
      .pipe(eslint(
        {
          "parser": "babel-eslint",
          "rules": {
            "strict": 0,
            "arrowFunctions": 0
          }
      }))
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task('test', function() {
  return gulp.src(['test/**/*.js'])
    .pipe(mocha({
      //reporter: 'list',
      compilers: {
        js: babelMocha
      }
    }));
});

gulp.task('build', ['clean', 'lint', 'test'], function () {
  return gulp.src([
      "src/core/util/*.js",  
      "src/http/*.js",    
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
      "src/core/bootstrap.js",     
      "src/json/*.js"
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

gulp.task('default', ['build']);