const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

var registerSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        uniqe: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }

});


registerSchema.methods.generateAuthToken = function () {
    //  const token = jwt.sign({email: this.email , _id: this._id} ,
    //       config.get('jwtPrivateKey'), {expiresIn: "1h"});

    const token = jwt.sign({
        email: this.email,
        userId: this._id
    }, "iloveyou", {
        expiresIn: "10h"
    });

    return token;
}


const Register = mongoose.model('userregister', registerSchema);
exports.Register = Register;