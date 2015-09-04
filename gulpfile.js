var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var del = require('del');
var Builder = require('systemjs-builder');
var builder = new Builder();

gulp.task('clean', function(cb) {
  return del(['dist'], cb);
});

gulp.task('builder', ['clean'], function (cb) {
	builder.buildSFX('dali', 'dist/build.js', {
		sourceMaps: true,
		config: {
			baseURL: 'src',
			defaultJSExtensions: true,
			transpiler: 'babel',
			experimental: true
		}
	}).then( function() {
		cb();
	}, function( err ) {
		console.log( err );
		cb();
	});
});

gulp.task('default', ['builder']);