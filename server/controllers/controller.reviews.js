const db = require('../models/db');

// exports.fetchReviews = (req, res) => {

// };

exports.addReview = (req, res) => {
  // req.body.description, snypprId, snypeeId, rating
  // transactionId, model: SnypprReview or SnypeeReview
  const model = req.body.model;
  const transactionId = req.body.transactionId;
  delete req.body.transactionId;
  delete req.body.model;
  db.Transaction
    .findOne({ where: { id: transactionId } })
    .then(({ dataValues }) => {
      req.body.transactionId = dataValues.id;
      return db[model].create(req.body);
    })
    .then(({ dataValues }) => {
      console.log(`review created in ${model}`, dataValues);
      res.send(`review created in ${model}`);
    })
    .catch(e => console.log('error adding review', e));
};
