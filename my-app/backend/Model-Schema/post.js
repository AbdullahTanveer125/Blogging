const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    content: {
        type: String,
        required: true,
    },

    image: {
        type: String, // URL or filename if stored on server
        default: '',
    },

    category: {
        type: String,
        enum: ['Tech', 'Health', 'Education', 'News', 'Other'], // Customize as needed
        default: 'Other'
    },

    tags: {
        type: [String], // e.g. ['mongodb', 'mern', 'react']
        default: []
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER', // Reference to the User collection
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    likes: {
        type: Number,
        default: 0
    },

    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USER'
        },
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});



module.exports = mongoose.model('POST', postSchema);
