var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('autoprefixer', function() {
	return gulp.src('app/css/style.css')
	.pipe(autoprefixer ({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('dist'))
});

gulp.task('browser-sync', function() {
	browserSync ({
		server: {
			baseDir: 'app'				
		},
		notify: false
	})
});

gulp.task('watch', ['browser-sync', 'sass', 'autoprefixer'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass', "autoprefixer"]);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});