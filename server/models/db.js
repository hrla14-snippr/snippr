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
  certified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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

const SnypprImage = db.define('snypprimage', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

const ProfilePic = db.define('profilepic', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

const CertificatePic = db.define('certificatepic', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

const ResultPic = db.define('resultpic', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

/*
  RELATIONSHIPS
*/

Snyppr.hasMany(Transaction);
Snypee.hasMany(Transaction);
Transaction.belongsTo(Snyppr);
Transaction.belongsTo(Snypee);

Snyppr.hasMany(SnypprReview);
Snypee.hasMany(SnypprReview);
SnypprReview.belongsTo(Snyppr);
SnypprReview.belongsTo(Snypee);
Snypee.hasMany(SnypeeReview);
Snyppr.hasMany(SnypeeReview);
SnypeeReview.belongsTo(Snypee);
SnypeeReview.belongsTo(Snyppr);
Transaction.hasOne(SnypprReview, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Transaction.hasOne(SnypeeReview, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Snyppr.hasOne(SnypprStripe);

Snypee.hasMany(Favorite);
Favorite.belongsTo(Snypee);

Snyppr.hasMany(SnypprImage);
SnypprImage.belongsTo(Snyppr);

Snyppr.hasOne(ProfilePic);
Snypee.hasOne(ProfilePic);
Snyppr.hasOne(CertificatePic);
ProfilePic.belongsTo(Snypee);
ProfilePic.belongsTo(Snyppr);
CertificatePic.belongsTo(Snyppr);
ResultPic.belongsTo(Snyppr);

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
module.exports.Transaction = Transaction;
module.exports.Favorite = Favorite;
module.exports.SnypprReview = SnypprReview;
module.exports.SnypeeReview = SnypeeReview;
module.exports.SnypprImage = SnypprImage;
module.exports.ProfilePic = ProfilePic;
module.exports.CertificatePic = CertificatePic;
module.exports.ResultPic = ResultPic;
