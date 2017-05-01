const db = require('./models/db');
const Barbers = require('./data');

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
  .catch((err) => {
    console.log('error occured destroying models ', err);
  });

console.log('these are the barbers', Barbers);
// create barbers (testing)
db.Barber.bulkCreate(Barbers.Barber)
  .then(() =>  // Notice: There are no arguments here, as of right now you'll have to...
     db.Barber.findAll())
  .then((barbers) => {
    console.log('created list of barbers', barbers); // ... in order to get the array of user objects
  })
  .catch((err) => {
    console.log('error occured trying to bulk create barbers ', err);
  });

