var gulp = require('gulp');
var del = require('del');
var Builder = require('systemjs-builder');
var builder = new Builder();
var concat = require('gulp-concat');

gulp.task('clean', function(cb) {
  return del(['dist'], cb);
});
 
gulp.task('default', ['clean'], function() {
	return gulp.src('src/**/*.js')
    .pipe(concat('dali.js'))
    .pipe(gulp.dest('dist'));
});

/*
gulp.task('builder', ['clean'], function (cb) {
	builder.buildSFX('dali', 'dist/dali.js', {
		sourceMaps: false,
		minify: true,
		config: {
			baseURL: 'src',
			defaultJSExtensions: true,
			transpiler: 'babel',
			experimental: true,
			babelOptions: {
				optional: ["es7.decorators"]	
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
*/