const express = require('express');
const passport = require('passport');
const router = new express.Router();


router.post('/login', (req, res, next) => {
  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: {
        name: userData.name,
        email: req.body.email.toLowerCase()
       } 
    });
  })(req, res, next);
});


module.exports = router;