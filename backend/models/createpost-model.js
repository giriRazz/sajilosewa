const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

let Register = require('../models/register-model');

var createpostSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'register-model',
        required: true,
    },
    company: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    objective: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    contact: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    address: {
        type: String ,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 800
    }

});


const CreatePost = mongoose.model('createpost', createpostSchema);
exports.CreatePost = CreatePost;