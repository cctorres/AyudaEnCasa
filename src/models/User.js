const { Schema, model }  = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        Math: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        Math: [
            /^\d{10}$/,
            'Please add a valid phone number',
        ],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    displayName: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});


module.exports = model('User', userSchema);