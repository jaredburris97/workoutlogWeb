var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var javascriptfiles = [
	'./app.js',
	'./workouts/define.js',
	'./workouts/log.js',
	'./user/auth.js'
	];

	gulp.task('bundle', function() {
		return gulp.src(javascriptfiles)
		.pipe(concat('bundle.js')) // Squish all files together into one file
		.pipe(uglify())
		.pipe(gulp.dest("./dist")); // Save the bundle.js
	});

	// Default task when 'gulp' runs: bundle, starts web server, then watches for changes
	gulp.task('default', ['bundle']);