const mongoose = require('mongoose');
const Schema = mongoose.Schema

const calenderschema = new Schema({

    starttime: {
        type: Date,
        required: true
    },
    endtime: {
        type: Date,
        required: true
    },
    subject: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    isallday: {
        type: Boolean
    },
    starttimezone: {
        type: String
    },
    endtimezone: {
        type: String
    },
    recurrencerule: {
        type: String
    },
    recurrenceid: {
        type: Number
    },
    recurrenceexception: {
        type: String
    },
    followingid: {
        type: Number
    },guests: {
        type: [String], // Array of guest email addresses
        default: []
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = mongoose.model('Calendar', calenderschema);