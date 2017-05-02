require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.ESQL_URL);

/*
  MODELS
*/

const Barber = db.define('barber', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  fname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  s3url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const Client = db.define('client', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  fname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  s3url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const Style = db.define('style', {
  style: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const Transaction = db.define('transaction', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

const Favorite = db.define('favorite', {
  barberId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const BarberReview = db.define('barberreview', {
  barberId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const ClientReview = db.define('clientreview', {
  clientId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
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
Client.hasMany(Favorite);
Favorite.belongsTo(Client);


Barber.sync();
Client.sync();
Style.sync();
Transaction.sync();
BarberStyles.sync();
Favorite.sync();
BarberReview.sync();
ClientReview.sync();


db.authenticate()
  .then(() => {
    console.log('database connected successfully!');
  })
  .catch((err) => {
    console.log('database fucked up bro! ', err);
  });

module.exports.Barber = Barber;
module.exports.Client = Client;
module.exports.Style = Style;
module.exports.Transaction = Transaction;
module.exports.BarberStyles = BarberStyles;
module.exports.Favorite = Favorite;
module.exports.BarberReview = BarberReview;
module.exports.ClientReview = ClientReview;
