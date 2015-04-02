var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
// var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');
var react = require('gulp-react');

var paths = {
    scss: ['./app/src/scss/*.scss'],
    watch_scripts: ['./app/src/js/modules/*/*.js', './app/src/js/modules/*/tpl/*.js'],
    reacts: ['./app/src/js/modules/*/tpl/*.jsx'],
    index_scripts: ['./app/src/js/modules/home/index.js', './app/src/js/modules/product/index.js', './app/src/js/modules/login/index.js'],
    base_scripts: ['./app/src/js/lib/jquery.js', './app/src/js/lib/react.js', './app/src/js/lib/bootstrap.js']
};

// 清空目录任务
gulp.task('clean', function(cb) {
  del(['build'], cb);
});

// 检查脚本
gulp.task('lint', function() {
    gulp.src(paths.watch_scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src(paths.scss)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./app/build/css'));
});

gulp.task('base', function() {
    gulp.src(paths.base_scripts)
        .pipe(concat('base.js'))
        .pipe(gulp.dest('./app/build/js/lib/'));
});

gulp.task('react', function() {
    gulp.src(paths.reacts)
        .pipe(plumber())
        .pipe(react({harmony: true}))
        .pipe(gulp.dest('./app/src/js/modules/'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
	for (var i = 0; i < paths.index_scripts.length; i++) {
		var tempPath = paths.index_scripts[i].replace('src', 'build');
		tempPath = tempPath.replace('index.js', '');
        try{
            browserify(paths.index_scripts[i])
                .bundle()
                //Pass desired output filename to vinyl-source-stream
                .pipe(source('index.js'))
                // Start piping stream to tasks!
                .pipe(gulp.dest(tempPath));
        }catch(e) {
            console.log('Error:' + e);
        }
	}

    // var tempCb = function(err, buff){
    //     console.log(1);
    //     del(['./app/src/js/modules/common/tpl/*.js', './app/src/js/modules/home/tpl/*.js'], function(err, data){
    //         console.log(err, data);
    //     });
    // };
});

//监测任务
gulp.task('watch', function() {
    gulp.watch(paths.scss, function(){
        gulp.run('sass');
    });
    gulp.watch(paths.reacts, function(){
        gulp.run('react');
    });
    gulp.watch(paths.watch_scripts, function(){
        gulp.run('scripts');
    });
});

// 默认任务
gulp.task('default', ['clean', 'sass', 'react', 'scripts', 'watch']);