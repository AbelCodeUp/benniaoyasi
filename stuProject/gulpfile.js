var gulp = require('gulp');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');
var jsmin = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

var assetRev = require('gulp-asset-rev');
var runSequence = require('run-sequence');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

//定义css、js源文件路径
var cssSrc = 'css/*.css',
  jsSrc = 'controller/*.js';

//为css中引入的图片/字体等添加hash编码
gulp.task('assetRev', function(){
  return gulp.src(cssSrc)  //该任务针对的文件
   .pipe(assetRev()) //该任务调用的模块
   .pipe(gulp.dest('src/css')); //编译后的路径
});
  
//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
  return gulp.src(cssSrc)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});
  
  
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
  return gulp.src(jsSrc)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'));
});
  
  
//Html替换css、js文件版本
gulp.task('revHtml', function () {
  return gulp.src(['rev/**/*.json', 'index.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('./'));
});


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

// gulp.task('default',['serve']);
gulp.task('default',['serve'], function (done) {
  condition = false;
  runSequence(    //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
    ['assetRev'],
    ['revCss'],
    ['revJs'],
    ['revHtml'],
    done);
});
