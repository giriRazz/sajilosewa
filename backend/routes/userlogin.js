const lodash = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {CreatePost} = require('../models/createpost-model')

const {
   Register
} = require('../models/userregister-model');
const Joi = require('joi');
//const jwt = require('jsonwebtoken');
//const config = require('config');

function validateRegister(Register) {
   const schema = {
      
      email: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(255).required(),
   };
   return Joi.validate(Register, schema);

}

router.post('/', async (req, res, next) =>{

   const {
      error
   } = validateRegister(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let user = await Register.findOne({
      email: req.body.email
   })
   if (!user) return res.status(400).send('invalid email');

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send('invalid password');


//    let already = await CreatePost.findOne({
//       userId: req.body.userId
//    })
//    if (already) return res.status(400).send('User already registered');

   
   
   var login = new Register({
      email: req.body.email,
      password: req.body.password

   });

   
 

   const token = login.generateAuthToken();

  // res.send(lodash.pick(login, ['token', 'expiresIn', 'email', 'password']));

   res.status(200).json({
        token: token,
        expiresIn: 3600,
   });

});

module.exports = router;