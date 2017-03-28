const jwt = require('jsonwebtoken');
const Model = require('../models/models');
const config_json = require('../../config/config.json');

const config = config_json[process.env.MODE_RUN]

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return Model.User.findOne({where: {id: userId}})
    .then(function(User){
      return next();
      }, function(err){
      return res.status(401).end();
      })
    });
}