const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const less = require('gulp-less');
const path = require('path');
const watchLess = require('gulp-watch-less');
 
const cssMin = require('gulp-css');
// const sprite = require('gulp-sprite-generator');
// const gulpif = require("gulp-if");
// const spritesmith = require('gulp-spritesmith');
// var buffer = require('vinyl-buffer');
 

 
gulp.task('css', function(){
  return gulp.src('src/**/*.css')
    .pipe(cssMin())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('build/'));
});

 
gulp.task('less', function () {
  return gulp.src('./less/style.less')
    .pipe(watchLess('./less/style.less'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch-less', function() {
    gulp.watch('./less/**/*.less', ['less']);  // Watch all the .less files, then run the less task
});



 


// gulp.task('sprites', function() {
//     var spriteOutput;
 
//     spriteOutput = gulp.src("./css/*.css")
//         .pipe(sprite({
//             baseUrl:         "C:/Users/Star-pc/Web_layouts/Adverting_test_task\\img",
//             spriteSheetName: "sprite.png",
//             spriteSheetPath: "/dist/image"
//         }));
 
//     spriteOutput.css.pipe(gulp.dest("./dist/css"));
//     spriteOutput.img.pipe(gulp.dest("./dist/image"));
// });


// gulp.task('sprites', function() {
//     var spriteData = 
//         gulp.src('./img/*.*') // путь, откуда берем картинки для спрайта
//             .pipe(buffer())
//             .pipe(spritesmith({
//                 imgName: 'sprite.png',
//                 cssName: 'sprite.css',
//             }));

//     spriteData.img.pipe(gulp.dest('./built/images/')); // путь, куда сохраняем картинку
//     spriteData.css.pipe(gulp.dest('./built/styles/')); // путь, куда сохраняем стили
// });


gulp.task('sprites', function () {
    return  gulp.src('./img/*.*')
                .pipe(spritesmith({
                    imgName: 'sprite.png',
                    styleName: 'sprite.less',
                    imgPath: '../img/sprite.png'
                }))
                .pipe(gulpif('*.png', gulp.dest('./dist/img/')))
                .pipe(gulpif('*.css', gulp.dest('./dist/css/')));
});