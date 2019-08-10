"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");

// сборка css
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({
      includePaths: require("node-normalize-scss").includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});
// оптимизация изображений
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("source/img"));
});
// создаем webP
gulp.task("webp", function () {
  return gulp.src(["source/img/buckwheat-*.{png,jpg}", "source/img/fish-*.{png,jpg}", "source/img/chicken-*.{png,jpg}","source/img/rice-*.{png,jpg}", "source/img/index-can-*.{png,jpg}"])
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("source/img"));
 });
// запуск сервера
gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
//  отслеживаем обновления файлов
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));
