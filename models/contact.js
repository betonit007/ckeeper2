const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    //user will be part of schema
    //we must create a relationship between contacts and user with next line
    user: {
        type: mongoose.Schema.Types.ObjectId, //this is the type
        ref: 'users' // this will reference the user schema
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('contact', ContactSchema);