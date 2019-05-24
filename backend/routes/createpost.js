const lodash = require('lodash');
//const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {
     CreatePost
} = require('../models/createpost-model');

const Joi = require('joi');
//const config = require('config');

function verifyUser(req, res, next) {
     let token = req.headers['token'];
     if (!token) {
          return res.status(401).send({
               error: ['You are not logged in.']
          });
     }

     jwt.verify(token, 'iloveyou', {
          expiresIn: "10h"
     }, (err, decodedToken) => {
          if (err) {
               return res.status(403).send({
                    error: ['You are not logged in.']
               });
          }
          res.locals.userId = decodedToken.userId;
          next();
     });

}

function validateRegister(Register) {
     const schema = {
         // userId: Joi.string().min(25).max(255).required(),
          company: Joi.string().min(5).max(255).required(),
          objective: Joi.string().min(5).max(255).required(),
          contact: Joi.string().min(5).max(255).required(),
          address: Joi.string().min(5).max(255).required(),
          category: Joi.string().min(5).max(255).required(),
          description: Joi.string().min(5).max(800).required(),

     };
     return Joi.validate(Register, schema);

}



router.post('/', verifyUser ,async (req, res, next) => {

     const {
          error
     } = validateRegister(req.body);
     if (error) return res.status(400).send(error.details[0].message);


     var register = new CreatePost({
          userId: mongoose.Types.ObjectId(res.locals.userId),
          company: req.body.company,
          objective: req.body.objective,
          contact: req.body.contact,
          address: req.body.address,
          category: req.body.category,
          description: req.body.description,

     });
     // const salt = await bcrypt.genSalt(10);
     // register.password = await bcrypt.hash(register.password, salt);

     await register.save();

     // const tokenn = register.generateAuthToken();
    // res.send(lodash.pick(register, ['_id', 'company', 'objective', 'contact', 'address', 'description']));
   
    const tokenn = jwt.sign({
     email: this.email,
     userId: this._id
     }, "iloveyou", {
     expiresIn: "10h"
     });

    res.status(200).json({
     token: tokenn,
     expiresIn: 3600,
});


});



router.delete('/delete',verifyUser, async (req, res) => {


     CreatePost.deleteOne({
         // _id: req.params.id,
          //  creator: req.userData.userId
          userId: res.locals.userId
     })
          .then(result => {
               console.log(result);
               if (result.n > 0) {
                    res.status(200).json({
                         message: 'deletion sucessfully'
                    });
               } else {
                    res.status(401).json({
                         message: 'not authorized'
                    });

               }
          }).catch(err => {
               res.status(400).json({
                    message: 'error found'
               });

          });
});

function validateCreate(CreatePost) {
     const schema = {
          company: Joi.string().min(5).max(255).required(),
          objective: Joi.string().min(5).max(255).required(),
          contact: Joi.string().min(5).max(255).required(),
          address: Joi.string().min(5).max(255).required(),
          category: Joi.string().min(5).max(255).required(),
          description: Joi.string().min(5).max(800).required(),
     };
     return Joi.validate(CreatePost, schema);

}


 router.put('/update',verifyUser,  async (req, res) => {
//      const {
//           error
//      } = validateCreate({
//           userId: mongoose.Types.ObjectId(res.locals.userId),
//           company: req.body.company,
//           objective: req.body.objective,
//           contact: req.body.contact,
//           address: req.body.address,
//           category: req.body.category,
//           description: req.body.description,
//      });
//      if (error) return res.status(400).send(error.details[0].message);

     const updatepost = new CreatePost({
          userId: mongoose.Types.ObjectId(res.locals.userId),
          company: req.body.company,
          objective: req.body.objective,
          conatct: req.body.contact,
          address: req.body.address,
          category: req.body.category,
          description: req.body.description,
          // creator: req.userData.userId

     }, {
               new: true
          });
     console.log(res.locals.userId);
     CreatePost.updateOne({
          userId: res.locals.userId,
          // creator: req.userData.userId
     }, updatepost)
          .then(result => {
               console.log('result modified: ', result.nModified)
               if (result.nModified > 0) {
                    res.status(200).json({
                         message: 'update sucessfully'
                    });
               } else {
                    res.status(401).json({
                         message: 'not authorized'
                    });


               }
          })

     // if (!contact) return res.status(404).send('The customer with the given ID was not found.');

     // contact.save()
     // .then(result=>{
     // })
     // .catch(err=>{
     //      res.status(500).json({message: err+ '  update failed'});
     // })
     //res.send(lodash.pick(contact , ['_id','name' , 'email' , 'phone','address']));


});




router.get("/get", (req, res, next) => {
     return CreatePost.find({}, (err, create) => {
          if (err)
               res.status(500).json({
                    errmsg: err
               });
          res.status(200).json({
               msg: create
          });
     });
     // .select({
     //    name: 1,
     //    count: 1,
     //    _id: 0
     //  });

});


router.get("/getdetail", verifyUser, async (req, res, next) => {

     CreatePost.find({userId: res.locals.userId}, (err, create) => {
          console.log(res.locals.userId);
          if (err)
               res.status(500).json({
                    errmsg: err
               });
          res.status(200).json({
               msg: create
          });
     }).select({
          company: 1,
          objective: 1,
          contact: 1,
          address: 1,
          category: 1,
          description: 1,
          _id: 1
     });

});




router.get("/specificCategory", async (req, res, next) => {

     let createpost = await CreatePost.findOne({
          _id: req._id
     });

     return CreatePost.find({}, (err, create) => {
          if (err)
               res.status(500).json({
                    errmsg: err
               });
          res.status(200).json({
               msg: create
          });
     }).select({
          company: 1,
          objective: 1,
          contact: 1,
          address: 1,
          category: 1,
          description: 1,
          _id: 1
     });

});

module.exports = router;