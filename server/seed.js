const db = require('./models/db');
const StylesSeed = require('./data');

// delete info in tables
db.Snyppr.destroy({ where: {} })
  .then(() => {
    db.Snypee.destroy({ where: {} });
  })
  .then(() => {
    db.Style.destroy({ where: {} });
  })
  .then(() => {
    db.Transaction.destroy({ where: {} });
  })
  .then(() => {
    db.SnypprStyles.destroy({ where: {} });
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
  .then(() => db.Style.bulkCreate(StylesSeed.HAIRSTYLES, { returning: true }))
  .then(data => console.log('bulk created', data))
  .then(() => db.Style.findAll())
  .then(data => console.log('findall styles', data))
  .then(() => db.Barber.bulkCreate(StylesSeed.BARBERS))
  .then(data => console.log('bulk created', data))
  .then(() => db.Barber.findAll())
  .then(data => console.log('findall barbers', data))
  .catch(err => console.log('error seeding db', err));
