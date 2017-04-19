const jwt = require('jsonwebtoken');
const express = require('express');
const router = new express.Router();
const passport = require('passport');
const MODE_RUN = process.env.MODE_RUN || "development"
const email = require('../../config/config.json')[MODE_RUN].email;
const nodemailer = require('nodemailer');


//Incializamos sequelize
const sequelize = require('../db').sequelize;

//Cargamos los modelos
const models = require('../models')(sequelize);

/**
 * Validate the create user form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result
 *                   and a global message for the whole form.
 */
function validateCreateOrgForm(payload) {
  let isFormValid = true;
  let message = '';
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    message = 'Please provide the organization name ';
  }

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    message = message != "" ? message + 'and please provide a organization email address ' : "Please provide a organization email address ";

  }

  return {
    success: isFormValid,
    message
  };
}


/**
 * Validate the create user form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result
 *                   and a global message for the whole form.
 */
function validateCreateUserForm(payload) {
  let isFormValid = true;
  let message = '';
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    message = 'Please provide your name ';
  }

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    message = message != "" ? message + 'and please provide your email address ' : "Please provide your email address ";

  }

  if (!(payload.confir_password.trim()===payload.password.trim())){
    isFormValid = false;
    message = message != "" ? message + 'and new passwords must be the same ' : 'New passwords must be the same ';
  }

  if ((typeof payload.password !== 'string' || payload.password.trim().length < 8) ||
   (typeof payload.confir_password !== 'string' || payload.confir_password.trim().length < 8)) {
    isFormValid = false;
    message = message != "" ? message + 'and new password should be between 8 and 15 alphanumeric characters ' : 'New password should be between 8 and 15 alphanumeric characters ';
  }

  return {
    success: isFormValid,
    message
  };
}

/**
 * Validate the change profile form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result
 *                   and a global message for the whole form.
 */
function validateChangeProfileForm(payload) {
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    message = 'Please provide your name ';
  }

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    message = message != "" ? message + 'and please provide your email address ' : "Please provide your email address ";

  }

  if (payload.new_password && payload.confir_new_password && 
    !(payload.confir_new_password.trim()===payload.new_password.trim())){
    isFormValid = false;
    message = message != "" ? message + 'and new passwords must be the same ' : 'New passwords must be the same ';
  }

  if (payload.new_password && (typeof payload.new_password !== 'string' || payload.new_password.trim().length < 8) ||
   payload.confir_new_password && (typeof payload.confir_new_password !== 'string' || payload.confir_new_password.trim().length < 8)) {
    isFormValid = false;
    message = message != "" ? message + 'and new password should be between 8 and 15 alphanumeric characters ' : 'New password should be between 8 and 15 alphanumeric characters ';
  }

  if(!payload.password){
    isFormValid = false;
    message = message != "" ? message + "and password couldn't be empty " : "Password couldn't be empty ";
  }

  return {
    success: isFormValid,
    message
  };
}

router.post('/changeProfile', (req, res) => {
  const validationResult = validateChangeProfileForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
    });
  }
  models.User.findOne({
        where: {
            id: req.userId
        }
    }).then(function(user){
      if(!user.verifyPassword(req.body.password)){
        return res.status(401).json({
            success: false,
            message: "Current password is not correct.",
          });
      }
      if(req.body.new_password) 
        user.password = req.body.new_password;
        user.email = req.body.email.trim().toLowerCase();
        user.name = req.body.name;
        user.save().then(function(){
          return res.status(200).json({
            success: true,
            message: "You have changed your profile correctly!",
            user
          });
        }, function(){
          return res.status(400).json({
            success: false,
            message: "Error changing user profile. This email alredy exist"
          });
        })
      }, function(err){
        return res.status(400).json({
        success: false,
        message: "Error. User not found.",
        });
      })
});

router.post('/createUser', (req, res, next) => {
  const validationResult = validateCreateUserForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
    });
  }
  models.User.findOne({
        where: {
            id: req.userId
        }
    }).then(function(user){
      if(user.role != "admin"){
        return res.status(401).json({
            success: false,
            message: "You don't have permissions",
          });
      }
      else
      {
        return passport.authenticate('local-signup', (err) => {
          if(err){
            if (err.message=="Validation error") {
                return res.status(409).json({
                  success: false,
                  message: "This email is already registered"
                });
              }
            else {
                  return res.status(409).json({
                  success: false,
                  message: err.message
                });
              }
          }
            const smtpTransport = nodemailer.createTransport({
              service: process.env.EMAIL_SERVER || email.server,
              auth: {
                user: process.env.EMAIL_USER || email.email,
                pass: process.env.EMAIL_PASSWORD || email.password
              }
            });
            const mailOptions = {
              to: req.body.email.toLowerCase(),
              from: 'userCreate@demo.com',
              subject: 'Your email has been registered in RedBorder licenses',
              text: 'Hello,\n\n' +
                'You have been registered RedBorder. Your email is ' + req.body.email.toLowerCase() + ' and your password ' + req.body.password + '.\n'
                 + "Please, log in and change your password"
            };
            smtpTransport.sendMail(mailOptions,function(err) {
              res.status(200).json({
              success: true,
              message: 'User registered successfully. A email has been send to ' + req.body.email.trim() + ' with the password'
              });
            });

        })(req, res, next);
      }
    })
});

router.post('/listUsers/:page', (req, res) => {
  models.User.findOne({
        where: {
            id: req.userId
        }
    }).then(function(user){
      if(user.role != "admin"){
        return res.status(401).json({
            success: false,
            message: "You don't have permissions",
          });
      }
      else
      {
          models.User.findAll({
            limit: 10,
            offset: 10*(req.params.page-1),
            order: 'name'
        }).then(function(list_users){
            models.User.count()
            .then(function(number_users){
              return res.status(200).json({
                success: true,
                users: list_users,
                number_users: number_users
              })
            })
          })
      }
    })
  });

router.post('/removeUser/:id', (req, res) => {
  models.User.findOne({
        where: {
            id: req.userId
        }
    }).then(function(user){
      if(user.role != "admin"){
        return res.status(401).json({
            success: false,
            message: "You don't have permissions",
          });
      }
      else
      {
          models.User.findOne({
            where: {
              id: req.params.id
            }
          }).then(function(user_delete){
            if(!user_delete)
              return res.status(400).json({
                success: false,
                message: "User doesn't exists"
              })
            const name = user_delete.name;
            const email = user_delete.email;
            models.User.destroy({
            where: {id: req.params.id} 
           }).then(function(affectedRows){
            if(affectedRows==1)
              return res.status(200).json({
              success: true,
              message: "User " + name + " (" + email + ") delete correctly"
            })
            else
              return res.status(400).json({
              success: false,
              message: "Error removing user " + name 
            })
          })
        })
      }
    })
  });


router.post('/editUsersAdmin/:id', (req, res) => {
  models.User.findOne({
        where: {
            id: req.userId
        }
    }).then(function(user){
      if(user.role != "admin"){
        return res.status(401).json({
            success: false,
            message: "You don't have permissions",
          });
      }
      else
      {
          models.User.findOne({
            where: {
              id: req.params.id
            }
          }).then(function(user_edit){
            if(!user_edit)
              return res.status(400).json({
                success: false,
                message: "User doesn't exists"
              })
            user_edit.name=req.body.name;
            user_edit.email=req.body.email;
            user_edit.role=req.body.role;
            user_edit.OrganizationId=req.body.organization == "" ? null: req.body.organization;
            user_edit.save()
            .then(function(user_save){
              return res.status(200).json({
              success: true,
              message: "User " + user_save.name + " edited correctly",
              user: user_save
              }) 
            }).catch(function (err) {
              return res.status(400).json({
              success: false,
              message: "Error editing user" 
              })
            });
          })
      }
    })
  });

router.post('/createOrg', (req, res, next) => {
  const validationResult = validateCreateOrgForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
    });
  }
  models.User.findOne({
        where: {
            id: req.userId
        }
    }).then(function(user){
      if(user.role != "admin"){
        return res.status(401).json({
            success: false,
            message: "You don't have permissions",
          });
      }
      else
      {
          const NewOrganization = models.Organization.build({
            name: req.body.name.trim(),
            email: req.body.email.trim()
          });
          NewOrganization.save().then(function(NewOrganization) {
            return res.status(200).json({
              success: true,
              message: 'Organization ' + NewOrganization.name + ' created correctly'
            });
          }, function(err){ 
            return res.status(400).json({
              success: false,
              message: 'Error saving organization ' + req.body.name + '. Email already exists.'
            });
        });
      }
    })
});

//Si la pagina solicitada es la 0 se le devolverán todas las organizaciones (para la creacion de usuarios)
router.post('/listOrgs/:page', (req, res) => {
  models.User.findOne({
        where: {
            id: req.userId
        }
    }).then(function(user){
      if(user.role != "admin"){
        return res.status(401).json({
            success: false,
            message: "You don't have permissions",
          });
      }
      else
      {
          models.Organization.findAll({
          limit: req.params.page != 0 ? 10 : null,
          offset: req.params.page != 0 ? 10*(req.params.page-1) : 0,
          order: 'name'
        }).then(function(list_orgs){
          models.Organization.count()
            .then(function(number_orgs){
              return res.status(200).json({
                success: true,
                orgs: list_orgs,
                number_orgs: number_orgs
              })
            })
          })
      }
    })
  });


router.post('/removeOrg/:id', (req, res) => {
  models.User.findOne({
        where: {
            id: req.userId
        }
    }).then(function(user){
      if(user.role != "admin"){
        return res.status(401).json({
            success: false,
            message: "You don't have permissions",
          });
      }
      else
      {
          models.Organization.findOne({
            where: {
              id: req.params.id
            }
          }).then(function(org_delete){
            if(!org_delete)
              return res.status(400).json({
                success: false,
                message: "Org doesn't exists"
              })
            const name = org_delete.name;
            const email = org_delete.email;
            models.Organization.destroy({
            where: {id: req.params.id} 
           }).then(function(affectedRows){
            if(affectedRows==1)
              return res.status(200).json({
              success: true,
              message: "organization " + name + " (" + email + ") delete correctly"
            })
            else
              return res.status(400).json({
              success: false,
              message: "Error removing organization " + name 
            })
          })
        })
      }
    })
  });


module.exports = router;