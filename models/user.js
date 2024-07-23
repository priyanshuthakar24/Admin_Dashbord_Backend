const mongose = require('mongoose');

const Schema = mongose.Schema;

const locationSchema = new Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['Employee', 'Manager'],
        default: 'Employee',
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    locations: [locationSchema]
});

module.exports = mongose.model('User', userSchema);