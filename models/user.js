const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    // Define Attributes
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Get User By ID
module.exports.getUserById = function ( id, callback ) {
    User.findById(id, callback);
};

// Get User By Username
module.exports.getUserByUsername = function ( username, callback ) {
    const query = { username: username };
    User.findOne(query, callback);    
};

// Add User
module.exports.addUser = function ( newUser, callback ) {
    // Hash the password
    bcrypt.genSalt(10, ( error, salt ) => {
        bcrypt.hash(newUser.password, salt, ( error, hash ) => {
            if ( error ) throw error;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function ( candidatePassword, hash, callBack ) {
    bcrypt.compare( candidatePassword, hash, ( error, isMatch ) => {
        if ( error ) throw error;
        callBack ( null, callBack );
    });
};