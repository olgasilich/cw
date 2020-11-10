
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyjs = require('gulp-js-minify'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create();

const cleanDist = () => {
    return gulp.src('dist', {
            read: false
        })
        .pipe(clean());
}

const scssBuild = () => {
    return gulp.src('src/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css/'));
};

const jsBuild = () => {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(minifyjs())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
};

const imagesBuild = () => {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('dist/img/'));
}
const htmlBuild = () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'))
}

const watch = () => {
    gulp.watch('src/scss/*.scss', scssBuild).on('change', browserSync.reload);
    gulp.watch('src/js/*.js', jsBuild).on('change', browserSync.reload);
    gulp.watch('src/*.html', htmlBuild).on('change', browserSync.reload);
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
};

gulp.task('dev', watch);
gulp.task('build', gulp.series(cleanDist, scssBuild, jsBuild, imagesBuild));
