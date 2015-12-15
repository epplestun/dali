import gulp from 'gulp';
import del from 'del';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

const PATHS = {
  SOURCE: 'src',
  BUILD: 'dist',
  TEST: 'test'
};

gulp.task('clean', (cb) => {
  return del([PATHS.BUILD], cb)
});

gulp.task('test', () => {
  return gulp.src(PATHS.TEST + '/**/*.js')
    .pipe(mocha({
      reporter: 'list',
      timeout: 20000
    }));
});

gulp.task('lint', () => {
  return gulp.src(PATHS.SOURCE + '/**/*.js')
    .pipe(eslint({
      "parser": 'babel-eslint',
      "rules": {
        "strict": 0,
        "arrowFunctions": 0
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build', ['clean', 'lint', 'test'], () => {
  return gulp.src(PATHS.SOURCE + '/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('dali.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.BUILD));
});

gulp.task('default', ['build']);