var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer')
var connect = require('gulp-connect');


var folder = {
    src: 'src/',
    dist: 'dist/'
}
var env = process.env.NODE_ENV == 'development';

function html() {
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
    if (!env) {
        page.pipe(htmlclean())
    }
    page.pipe(gulp.dest(folder.dist + 'html/'))
    return page
}

function image() {
    return gulp.src(folder.src + 'image/*')
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + 'image/'))
}
function css() {
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postcss([autoprefixer()]))
    if (!env) {
        page.pipe(cleanCSS())
    }

    page.pipe(gulp.dest(folder.dist + 'css/'))
    return page
}
function js() {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
    if (!env) {
        page.pipe(uglify())
    }
    page.pipe(gulp.dest(folder.dist + 'js/'))
    return page
}
gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', gulp.parallel(html))
    gulp.watch(folder.src + 'css/*', gulp.parallel(css))
    gulp.watch(folder.src + 'js/*', gulp.parallel(js))
})

exports.default = gulp.parallel(html, css, js, image, 'connect', 'watch');

