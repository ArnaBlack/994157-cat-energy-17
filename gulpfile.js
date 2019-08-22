"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var uglify = require("gulp-uglify");
var del = require("del");


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
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});
// минификация js
gulp.task("js", function () {
  return gulp.src("source/js/index.js")
  .pipe(uglify())
  .pipe(rename("index.min.js"))
  .pipe(gulp.dest("build/js"))
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
// обновляем html-файлы в папке build
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
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
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
//  отслеживаем обновления файлов
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/js/**/*.js", gulp.series("js"));
  gulp.watch("source/*.html", gulp.series( "html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
 });
 // очищаем папку билд
gulp.task("clean", function () {
  return del("build");
});

// копируем файлы в папку билд
gulp.task("copy", function () {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/img/**",
  "source/*.ico",
  "source/js/libs/*.js",
  "source/*.html"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
});


gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "js"
));
gulp.task("start", gulp.series("build", "server"));
