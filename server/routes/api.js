const jwt = require('jsonwebtoken');
const config_json = require('../../config/config.json');
const express = require('express');

const router = new express.Router();
const config = config_json[process.env.MODE_RUN]

/**
 * Validate the change profile form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateChangeProfileForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!(payload.confir_password.trim()===payload.password.trim())){
    isFormValid = false;
    errors.password = 'Password must be the same.';
    errors.confir_password = 'Password must be the same.';
  }

  if (payload.password && (typeof payload.password !== 'string' || payload.password.trim().length < 8)) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (payload.confir_password && (typeof payload.confir_password !== 'string' || payload.confir_password.trim().length < 8)) {
    isFormValid = false;
    errors.confir_password = 'Password must have at least 8 characters.';
  }

  if(!payload.old_password){
    isFormValid = false;
    errors.old_password = 'Please, provive your current password';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}


router.get('/dashboard', (req, res) => {

   // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      res.status(200).json({
    	message: user.name + " is authorized to see this secret message."
  		});
    });
  }); 	
});

router.get('/remove', (req, res) => {

     // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];
    // decode the token using a secret key-phrase
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      // the 401 code is for unauthorized status
      if (err) { return res.status(401).end(); }
  
      const userId = decoded.sub;
      // check if a user exists and take his user name
      const UserObject = User.findById(userId, (userErr, user) => {
        if (userErr || !user) {
          return res.status(401).end();
        }
  
      const name = user.name;
      // check if a user exists
      return User.remove(UserObject, (userErr) => {
        if (userErr) {
          return res.status(401).end();
        }
  
        res.status(200).json({
        message: name + " has been deleted."
        });
      });
    });   
  });
});  

router.get('/users', (req, res) => {

    return User.find(function(usersErr, users){
      if (usersErr || !users) {
        return res.status(500,err.message).end();
      }
      res.status(200).json({
    	users: users
  		});
  	});
});
 	
router.post('/changeProfile', (req, res) => {
  const validationResult = validateChangeProfileForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

   // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      if(req.body.password) user.password = req.body.password;
      user.email = req.body.email.trim().toLowerCase();
      user.name = req.body.name;

      user.save(function(err) {
        if(err)
        {
          if (err.name === 'MongoError' && err.code === 11000) {
          // the 11000 Mongo code is for a duplication email error
          // the 409 HTTP status code is for conflict error
          return res.status(400).json({
              success: false,
              message: 'Check the form for errors.',
              errors: { email: 'This email is already taken.'}
              });
            }
        }
        else  
        {
          return res.status(200).json({
          message: "You have changed your profile correctly!",
          user
          });
        }
     });
   });   
  });
});

module.exports = router;