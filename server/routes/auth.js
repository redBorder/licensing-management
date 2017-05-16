const express = require('express');
const passport = require('passport');
const router = new express.Router();
const nodemailer = require('nodemailer');
const mockTransport = require('nodemailer-mock-transport');
const async = require('async');
const crypto = require('crypto');
const MODE_RUN = process.env.MODE_RUN || "development"
const email = require('../../config/config.json')[MODE_RUN].email;

//Incializamos sequelize
const sequelize = require('../db').sequelize;

//Cargamos los modelos
const models = require('../models')(sequelize);

//Configuramos el envío de emails
const transportMock = mockTransport({ //Configuramos el mock para el envío de correos
              service: process.env.EMAIL_SERVER || email.server,
              auth: {
                user: process.env.EMAIL_USER || email.email,
                pass: process.env.EMAIL_PASSWORD || email.password
              }
            }); 
const smtpTransport = MODE_RUN=="test" ? //Si estamos en modo test utilizamos el mock
            nodemailer.createTransport(transportMock) 
            :
            nodemailer.createTransport({
              service: process.env.EMAIL_SERVER || email.server,
              auth: {
                user: process.env.EMAIL_USER || email.email,
                pass: process.env.EMAIL_PASSWORD || email.password
              }
            });
       
/**
 * Validate the NewPassword form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateNewPasswordForm(payload) {
  let isFormValid = true;
  let message = '';


  if (!(payload.confir_password.trim()===payload.password.trim())){
    isFormValid = false;
    message = "Password must be equal"
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8 || payload.password.trim().length > 15 
    || typeof payload.confir_password !== 'string' || payload.confir_password.trim().length < 8 || payload.confir_password.trim().length > 15 ) {
    isFormValid = false;
    message = 'Password should be between 8 and 15 alphanumeric characters.';
  }

  return {
    success: isFormValid,
    message
  };
}

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
        role: userData.role,
        id: userData.id,
        OrganizationId: userData.OrganizationId,
        email: req.body.email.toLowerCase()
       } 
    });
  })(req, res, next);
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      models.User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
        .then(function(user, err){
          if (!user) {
            return res.status(400).json({
            success: false,
            message: "No user registered with this email!"
            });
          }

          //Se ha creado anteriormente un token aleatorio
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour 

          user.save().then(function(user) {
            done(err, token, user);
            }, function(err){
               done(err, token, user);
          });
       });
    },
    function(token, user, done) {
      var mailOptions = {
        to: user.email.toLowerCase(),
        from: 'passwordreset@demo.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link before one hour, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/#/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions,function(err) {
        res.status(200).json({
          success: true,
          message: "An e-mail has been sent to " + user.email.toLowerCase() + " with further instructions."
        });
        done(err, 'done');
      });
      
    }
  ], function(err) {
    if (err) return next(err);
  });
});

router.post('/reset/:token', function(req, res) {
  const validationResult = validateNewPasswordForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
    });
  }
  async.waterfall([
    function(done) {
      models.User.findOne({
                    where: {
                        resetPasswordToken: req.params.token,
                        resetPasswordExpires: {$gt: Date.now()}
                    }
                })
      .then(function(user, err){
        if (!user) {
          return res.status(400).json({
          success: false,
          message: "Password reset token is invalid or has expired."
          });
        }

        user.password = req.body.password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        user.save().then(function(user, err) {
            done(err, user);
          });
        });
    },
    function(user, done) {
      var mailOptions = {
        to: user.email.toLowerCase(),
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email.toLowerCase() + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions,function(err) {
        res.status(200).json({
        success: true,
        message: "An e-mail has been sent to " + user.email.toLowerCase() + " with confirmation. The password has been changed"
        });
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
  });
});


module.exports = router;