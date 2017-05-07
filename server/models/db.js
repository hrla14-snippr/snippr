require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.ESQL_URL);

/*
  MODELS
*/


const Snyppr = db.define('snyppr', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
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
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const SnypprStripe = db.define('snypprstripe', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
}, {
  timestamps: true,
});

const Snypee = db.define('snypee', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
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
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const Style = db.define('style', {
  style: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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
  snypprId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const SnypprReview = db.define('snypprreview', {
  snypeeId: {
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

const SnypeeReview = db.define('snypeereview', {
  snypprId: {
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

Snyppr.hasMany(Transaction);
Snypee.hasMany(Transaction);
Transaction.belongsTo(Snyppr);
Transaction.belongsTo(Snypee);

Snyppr.hasMany(SnypprReview);
SnypprReview.belongsTo(Snyppr);
Snypee.hasMany(SnypeeReview);
SnypeeReview.belongsTo(Snypee);
Transaction.hasOne(SnypprReview, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Transaction.hasOne(SnypeeReview, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Snyppr.hasOne(SnypprStripe);

const SnypprStyles = db.define('snypprStyles', {}, { timestamps: false });
Style.belongsToMany(Snyppr, { through: SnypprStyles });
Snyppr.belongsToMany(Style, { through: SnypprStyles });

Snypee.hasMany(Favorite);
Favorite.belongsTo(Snypee);

Snyppr.sync();
Snypee.sync();
Style.sync();
Transaction.sync();
SnypprStyles.sync();
SnypprStripe.sync();
Favorite.sync();
SnypprReview.sync();
SnypeeReview.sync();
SnypprStripe.sync();


db.authenticate()
  .then(() => {
    console.log('database connected successfully!');
  })
  .catch((err) => {
    console.log('database fucked up bro! ', err);
  });

module.exports.Snyppr = Snyppr;
module.exports.Snypee = Snypee;
module.exports.SnypprStripe = SnypprStripe;
module.exports.Style = Style;
module.exports.Transaction = Transaction;
module.exports.SnypprStyles = SnypprStyles;
module.exports.Favorite = Favorite;
module.exports.SnypprReview = SnypprReview;
module.exports.SnypeeReview = SnypeeReview;
module.exports.SnypprStripe = SnypprStripe;
