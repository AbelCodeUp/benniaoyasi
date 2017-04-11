var gulp = require('gulp'),
    jade = require('gulp-jade'),
    del = require('del'),
    connect = require('gulp-connect');

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./layouts/*.jade')
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify("Templates task complete"))
});


gulp.task('clean',function(cb){
  del(['./dist'],cb)
})

gulp.task('webserver', function() {
    connect.server();
});

gulp.task('default',['clean','webserver'],function(){
  gulp.start('templates');
})

gulp.task('watch',function(){
  gulp.watch('./views/*.jade',['templates']);
})

