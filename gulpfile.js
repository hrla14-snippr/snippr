/* eslint no-unused-vars: 0 */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const sequelizeFixtures = require('sequelize-fixtures');

env({
  file: './.env',
  type: 'ini',
});

const db = require('./server/models/db');

const models = {
  Snyppr: db.Snyppr,
};

gulp.task('seed:wipe', (cb) => {
  db.Snyppr.sync({ force: true })
    .then(() => db.Snypee.sync({ force: true }))
    .then(() => db.Transaction.sync({ force: true }))
    .then(() => db.Favorite.sync({ force: true }))
    .then(() => db.SnypprReview.sync({ force: true }))
    .then(() => db.SnypeeReview.sync({ force: true }))
    .then(() => { cb(); })
    .catch((err) => { cb(err); });
});

gulp.task('seed:seed', ['seed:wipe'], (cb) => {
  sequelizeFixtures.loadFile('./server/models/seedData/data.json', models)
    .then(() => {
      cb();
    })
    .catch((err) => { cb(err); });
});

gulp.task('seed', ['seed:wipe', 'seed:seed']);

gulp.task('nodemon', () => {
  const stream = nodemon({
    script: 'server/index.js',
    watch: ['server/**'],
    ignore: ['client/**'],
  });
});
