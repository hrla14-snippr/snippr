const db = require('../models/db');

exports.fetchStyles = (req, res) => {
  db.Style.findAll()
    .then(styles => res.json(styles))
    .catch(e => res.json({ success: false, err: e }));
};
