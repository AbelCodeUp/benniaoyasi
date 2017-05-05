var gulp = require('gulp');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');
var jsmin = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('mincss', function(){
	gulp.src('css/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'))
		.pipe(reload({stream: true}))

})

gulp.task('jsmin', function(){
	gulp.src('js/*.js')
		.pipe(rename({suffix:'.min'}))
		.pipe(jsmin())
		.pipe(gulp.dest('dist/js'))
})

gulp.task('imagesimg',function(){
	gulp.src('images/*.*')
		.pipe(imagemin({
			optimizationLevel:3,//默认3，取值范围：0-7
			progressive:false, //无损压缩图片
			interlaced:true, //隔行扫描gif进行渲染
			multipass: true //多次优化|svg直到完全优化
		}))
		.pipe(gulp.dest('dist/imgs'))
})

gulp.task('serve',[],function(){
	browserSync.init({
		server:{
			baseDir:'./'
		}
	})
	// gulp.watch('css/*.css',['mincss']);
	gulp.watch('*.html').on('change',reload);
	gulp.watch('template/*.html').on('change',reload);
	gulp.watch('css/*.css').on('change',reload);
	gulp.watch('js/*.js').on('change',reload);
	gulp.watch('controller/*.js').on('change',reload);
	gulp.watch('service/*.js').on('change',reload);
})

gulp.task('default',['serve']);
