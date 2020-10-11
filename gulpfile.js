/* ----- DEPENDENCIES ----- */
const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const deleteDist = require('del');

// For JS tasks
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// For HTML tasks
const htmlmin = require('gulp-htmlmin');

// For CSS tasks
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

// Concatenate, minify, sourcemaps
const concat = require('gulp-concat')
const imageMin = require('gulp-imagemin');
const sourceMaps = require('gulp-sourcemaps');
const mergeStream = require('merge-stream');



/* ----- FILE PATHS ----- */
const path = {
  html: 'src/**/*.html',
  css: 'src/styles/**/*.css',
  scss: 'src/styles/**/*.scss',
  js: 'src/js/**/*.js',
  images: 'src/images/*',
  dist: 'dist'
}



/* ----- TASKS ----- */
// Deletes dist folder
const cleanDist = async () => {
  await deleteDist(path.dist);
}



// HTML Task - minify
const html = async () => {
  await src(path.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(path.dist))
}



// STYLES Task
const styles = async () => {
  // Merge SCSS and CSS
  await mergeStream(
    // CSS files
    await src(path.css)
      .pipe(sourceMaps.init())
      .pipe(concat('css-styles.css'))
      .pipe(sourceMaps.write())
    ,
    // SCSS files
    await src(path.scss)
      .pipe(sourceMaps.init())
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(concat('scss-styles.scss'))
      .pipe(sourceMaps.write())
  )
    .pipe(concat('/css/style.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest(path.dist))
}



// JS Task - ES6 to ES5 + uglify
const js = async () => {
  await src(path.js)
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('/js/main.js'))
    .pipe(uglify())
    .pipe(sourceMaps.write())
    .pipe(dest(`${path.dist}`))
}



// Images Task - Minify
const images = () => {
  return src(path.images)
    .pipe(imageMin())
    .pipe(dest(`${path.dist}/images`))
}



// Favicon Task
const favicon = () => {
  return src('src/favicon.ico')
    .pipe(dest(path.dist))
}



// File watch - Reload browser on file changes
const watcher = async () => {
  await watch(path.html).on('change', series(html, browserSync.reload))
  await watch(path.css).on('change', series(styles, browserSync.reload))
  await watch(path.scss).on('change', series(styles, browserSync.reload))
  await watch(path.js).on('change', series(js, browserSync.reload))
  await watch(path.images).on('change', series(images, browserSync.reload))
}



// Run Live Server
const server = async () => {
  await browserSync.init({
    server: {
      // Which directory to serve
      baseDir: path.dist
    }
  })
}



exports.default = series(
  cleanDist,
  parallel(html, styles, js, images, favicon),
  server,
  watcher
);
