const db = require('./models/db');
const StylesSeed = require('./data');

// delete info in tables
db.Barber.destroy({ where: {} })
  .then(() => {
    db.Client.destroy({ where: {} });
  })
  .then(() => {
    db.Style.destroy({ where: {} });
  })
  .then(() => {
    db.Transaction.destroy({ where: {} });
  })
  .then(() => {
    db.BarberStyles.destroy({ where: {} });
  })
  .then(() => {
    db.Favorite.destroy({ where: {} });
  })
  .then(() => {
    db.BarberReview.destroy({ where: {} });
  })
  .then(() => {
    db.ClientReview.destroy({ where: {} });
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
