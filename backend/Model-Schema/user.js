// models/User.js
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, { timestamps: true });

// Hash password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

module.exports = mongoose.model('user', userSchema);
