const mongoose = require('mongoose');

// Define the schema for user location data
const userLocationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Create the model from the schema
module.exports = mongoose.model('UserLocation', userLocationSchema);

