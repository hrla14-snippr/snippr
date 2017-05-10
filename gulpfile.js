/* eslint no-unused-vars: 0 */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');

env({
  file: './.env',
  type: 'ini',
});

gulp.task('nodemon', () => {
  const stream = nodemon({
    script: 'server/index.js',
    watch: ['server/**'],
    ignore: ['client/**'],
  });
});
