const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');

env({
  file: './.env',
  type: 'ini',
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'server/index.js',
    watch: ['server/**'],
    ignore: ['client/**'],
  });
});
