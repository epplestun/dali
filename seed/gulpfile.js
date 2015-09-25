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

gulp.task('copy-html', function() {
   return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-dali', function() {
	return gulp.src('node_modules/dalijs/dist/dali.js')
		.pipe(gulp.dest('src/dali/'));
});

gulp.task('builder', ['clean', 'copy-html', 'copy-dali'], function (cb) {
	builder.buildSFX('main', 'dist/main.js', {
		sourceMaps: false,
		config: {
			baseURL: 'src',
			defaultJSExtensions: true,
			transpiler: 'babel',
			experimental: true,
			babelOptions: {
				optional: [
					"es7.decorators",
					"es7.classProperties",
					"es7.exportExtensions",
					"es7.functionBind"
				]
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