var gulp = require('gulp');
var del = require('del');
var Builder = require('systemjs-builder');
var builder = new Builder();
var connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server();
});

gulp.task('clean', function(cb) {
  return del(['dist/main.js'], cb);
});

gulp.task('builder', ['clean'], function (cb) {
	builder.buildSFX('main', 'dist/main.js', {
		sourceMaps: false,
		config: {
			baseURL: 'src',
			defaultJSExtensions: true,
			transpiler: 'babel',
			experimental: true,
			babelOptions: {
				optional: ["es7.decorators", "es7.classProperties", "es7.exportExtensions"]
			}			
		}
	}).then( function() {
		cb();
	}, function( err ) {
		console.log( err );
		cb();
	});
});

gulp.task('default', ['builder']);