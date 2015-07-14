var gulp = require('gulp'),
		jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
		mocha = require('gulp-mocha');

gulp.task('test', function() {
	return gulp.src('test/*.js')
	  .pipe(mocha({reporter: 'Spec'}));
});

gulp.task('lint', function() {
	return gulp.src('*.js')
	  .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('style', function() {
  return gulp.src('*.js')
    .pipe(jscs());
});

/*gulp.task('default', function() {
  gulp.run('test');
  gulp.run('lint');
  gulp.run('style');
});
*/
