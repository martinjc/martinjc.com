// gulp, obvs
var gulp        = require('gulp');
var gutil       = require('gulp-util');

// browser sync handles reloading
var browserSync = require('browser-sync').create();

// CSS
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cleancss   = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

// JS
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');

// HTML
var htmlmin     = require('gulp-htmlmin');

// Images
var imagemin    = require('gulp-imagemin');

// Jekyll
var cp          = require('child_process');
var jekyll      = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages    = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
    sass: '<span style="color: grey">Running:</span> $ sass',
    js: '<span style="color: grey">Running:</span> $ js',
    img: '<span style="color: grey">Running:</span> $ img'
};

// Package files
var pkg = require('./package.json')


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', ['sass', 'js'], function(gulpCallback) {
    browserSync.notify(messages.jekyllBuild);
    var jk = cp.spawn(jekyll , ['build'], {stdio: 'inherit'});

    jk.on('exit', function(code){
        gulpCallback(code === 0 ? null : 'Error: Jekyll process exited with code: ' + code);
    });
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('reload', function() {
    return browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    return browserSync.init({
        server: {
            baseDir: '_site'
        }
    });
});


/* 
 * HTML
 */ 
gulp.task('html', ['jekyll-build'], function() {
    // --> Minhtml
    gulp.src(['_site/*.html', '_site/**/*.html'])
        .pipe(htmlmin({      
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest('_site'))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Compile files from _scss into css )
 */
gulp.task('sass', function() {
    browserSync.notify(messages.sass);
    return gulp.src('_src/_sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['sass'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 3 versions', '> 5%'], { cascade: true }))
        .pipe(cleancss({keepBreaks: false, keepSpecialComments:true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Concatenate & build JS
 */
gulp.task('js', function(){
    browserSync.notify(messages.js);
    return gulp.src('_src/_js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(sourcemaps.write('./'));
});

/**
 * Minify images
 */
gulp.task('img', function(){
    browserSync.notify(messages.img);
    return gulp.src('_src/_img/**/*.*')
        .pipe(imagemin({
          progressive: true,
          interlaced: true
        }))
        .pipe(gulp.dest('img'));
})

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
    gulp.watch('_src/_sass/*.scss', ['html']);
    gulp.watch('_src/_js/*.js', ['html']);
    gulp.watch('_src/_img/**/*.*', ['img']);
    gulp.watch(['*.html', '*/**/*.html', '*/**/*.md', '!_site/{,/**}'], ['html']);
    gulp.watch('_config.yml', ['html']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
