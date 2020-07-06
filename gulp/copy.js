var gulp = require("gulp");

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/*.+(woff|woff2|otf|ttf)*",
    "src/img/*.+(png|jpg|svg|webp|ico)*",
    "src/video/*.+(mp4|webm)*",
  ], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});


gulp.task("copy_script", function (){
  return gulp.src("src/scripts/*.js")
    .pipe(gulp.dest("build/js"));
})