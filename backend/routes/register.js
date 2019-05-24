const lodash = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {
   Register
} = require('../models/register-model');
const Joi = require('joi');
//const jwt = require('jsonwebtoken');
//const config = require('config');

function validateRegister(Register) {
   const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(255).required(),
   };
   return Joi.validate(Register, schema);

}



router.post('/', async (req, res, next) => {

   const {
      error
   } = validateRegister(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let user = await Register.findOne({
      email: req.body.email
   })
   if (user) return res.status(400).send('User already registered');

   var register = new Register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password

   });
   const salt = await bcrypt.genSalt(10);
   register.password = await bcrypt.hash(register.password, salt);

   await register.save();

   // const token = register.generateAuthToken();
   res.send(lodash.pick(register, ['_id', 'name', 'email', 'password', ]));


   //OR
   //  res.send({
   //     name: register.name,
   //     email: register.email,
   //     password: register.password
   //  });

});

module.exports = router;