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
  .then(() => console.log('Seed complete'))
  .catch(err => console.log('error seeding db', err));
