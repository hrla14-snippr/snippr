const Sequelize = require('sequelize');

const db = new Sequelize('snyppr', 'root', '');

/*
  MODELS
*/

const Barber = db.define('barber', {
  fname: Sequelize.STRING,
  lname: Sequelize.STRING,
  address: Sequelize.STRING,
  stylesList: Sequelize.STRING,
  s3url: Sequelize.STRING,
}, {
  timestamps: false,
});

const Client = db.define('client', {
  fname: Sequelize.STRING,
  lname: Sequelize.STRING,
  address: Sequelize.STRING,
  s3url: Sequelize.STRING,
}, {
  timestamps: false,
});

const Style = db.define('style', {
  style: Sequelize.STRING,
}, {
  timestamps: false,
});

const Transaction = db.define('transaction', {
  price: Sequelize.FLOAT,
});


/*
  RELATIONSHIPS
*/

Barber.hasMany(Transaction);
Client.hasMany(Transaction);
Transaction.belongsTo(Barber);
Transaction.belongsTo(Client);

const BarberStyles = db.define('barberStyles', {}, { timestamps: false });

Style.belongsToMany(Barber, { through: BarberStyles });
Barber.belongsToMany(Style, { through: BarberStyles });


Barber.sync();
Client.sync();
Style.sync();
Transaction.sync();
BarberStyles.sync();


db.authenticate()
  .then(() => {
    console.log('database connected successfully!');
  })
  .catch(() => {
    console.log('database fucked up bro!');
  });
