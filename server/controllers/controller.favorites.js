const db = require('../models/db');

exports.fetchFavorites = (req, res) => {
  console.log(req.params, 'this is req.params');
  db.Favorite.findAll({
    where: {
      snypeeId: req.params.snypeeId,
    },
  })
    .then((results) => {
      // console.log(results.dataValues, 'this is all the favoritessssss');
      const ids = results.map(snyppr => snyppr.dataValues.snypprId);
      console.log(ids, 'this is all the favorites actual ids');
      db.Snyppr.findAll({
        where: {
          id: ids,
        },
        include: [db.SnypprStripe, {
          model: db.SnypprReview,
          include: db.Snypee,
        }],
      })
        .then((favs) => {
          console.log(favs, 'these are the favorites after final query ');
          res.send(favs);
        })
        .catch((err) => {
          console.log('line 23 of controller favorites ', err);
          res.send('fuck up on line 23 of controller favorites');
        });
    })
    .catch((err) => {
      console.log('error fetching favorites on the server ', err);
      res.status(400);
    });
};

exports.addFavorite = (req, res) => {
  const favObj = {
    snypprId: req.body.snypprId,
    snypeeId: req.body.snypeeId,
  };
  console.log('the favObj is ', favObj);
  db.Favorite.findOrCreate({ where: {
    snypeeId: req.body.snypeeId,
    snypprId: req.body.snypprId,
  },
  })
    .spread((favorite, created) => {
      console.log(favorite.get({
        plain: true,
      }));
      console.log(created);
      if (created) {
        res.send(created);
      } else {
        res.send('created already');
      }
    })
    .catch((err) => {
      console.log('error while posting favorites ', err);
    });
};

exports.deleteFavorite = (req, res) => {
  const info = JSON.parse(req.params.favToDelete);
  db.Favorite.destroy({
    where: {
      snypeeId: info.snypeeId,
      snypprId: info.snypprId,
    },
  })
    .then((affectedRows) => {
      console.log(affectedRows, 'this is the number of affected rows , ', affectedRows);
      if (affectedRows === 1) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((err) => {
      res.send('something went wrong deleteing favorites , ', err);
    });
};
