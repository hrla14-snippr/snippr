// const db = require('../models/db');

exports.fetchFavorites = (req, res) => {
  // db.Favorite.findAll({
  //   where: {
  //     id: req.body.id,
  //   },
  // })
  //   .then((results) => {
  //     res.send(results);
  //   })
  //   .catch((err) => {
  //     console.log('error fetching favorites on the server ', err);
  //     res.status(400);
  //   });
  res.send('fetch favorites');
};

exports.addFavorite = (req, res) => {
  const favObj = {
    snypprId: req.body.snypprId,
    snypeeId: req.body.snypeeId
  }

  console.log("the favObj is ", favObj);

  res.send('add favorites');
};
