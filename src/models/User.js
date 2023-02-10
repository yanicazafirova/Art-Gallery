const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [4, 'Username is too short!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [3, 'Password is too short!']
    },
    address: {
        type: String,
        required: [true, 'Address is required!'],
        maxLength: [20, 'Address should be a maximum of 20 characters long!'],
    },
    myPublications: [{
        type: mongoose.Types.ObjectId,
        ref: 'Publication'
    }],
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hash => {
            this.password = hash;

            next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;