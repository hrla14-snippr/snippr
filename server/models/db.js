const Sequelize = require('sequelize');

const db = new Sequelize();

/*
  MODELS
*/

const Barber = db.define('barber', {
  fname: Sequelize.STRING,
  lname: Sequelize.STRING,
  address: Sequelize.STRING,
  styles: Sequelize.STRING,
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
Style.belongsToMany(Barber, { through: 'BarberStyles' });
Barber.belongsToMany(Style, { through: 'BarberStyles' });

Barber.sync();
Client.sync();
Style.sync();
Transaction.sync();
