const { Schema, model }  = require('mongoose');

const userChema = new Schema({
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


module.exports = model('User', userChema);