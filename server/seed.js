const db = require('./models/db');
const StylesSeed = require('./data');

// delete info in tables
db.Snyppr.destroy({ where: {} })
  .then(() => {
    db.Snypee.destroy({ where: {} });
  })
  .then(() => {
    db.Transaction.destroy({ where: {} });
  })
  .then(() => {
    db.Favorite.destroy({ where: {} });
  })
  .then(() => {
    db.SnypprReview.destroy({ where: {} });
  })
  .then(() => {
    db.SnypeeReview.destroy({ where: {} });
  })
  .then(() => db.Snyppr.bulkCreate(StylesSeed.SNYPPRS))
  .then(data => console.log('bulk created', data))
  .then(() => db.Snyppr.findAll())
  .then(data => console.log('findall barbers', data))
  .catch(err => console.log('error seeding db', err));
