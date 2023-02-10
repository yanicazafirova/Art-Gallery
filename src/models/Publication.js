const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [6, 'Title should be a minimum 6 characters long!'],
    },
    paintingTechnique: {
        type: String,
        required: [true, 'Painting technique is required!'],
        maxLength: [15, 'Painting technique should be a maximum 15 characters long!'],
    },
    artPicture: {
        type: String,
        required: [true, 'Art picture is required!'],
        validate: [/^https?:\/\//i, 'Image URL should start with http/https!'],
    },
    certificate: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    usersShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

const Publicaton = mongoose.model('Publicaton', publicationSchema);

module.exports = Publicaton;