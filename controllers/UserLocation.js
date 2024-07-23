const UserLocation = require('../models/timeline'); // Adjust the path as needed
const User = require('../models/user');
// Function to save a new location entry
exports.saveUserLocation = async (req, res, next) => {
    console.log(req.body);
    const { userId, latitude, longitude } = req.body;

    if (!userId || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'Invalid data' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.locations.push({ latitude, longitude });
        await user.save();

        res.status(201).json({ message: 'Location saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }





    const newLocation = new UserLocation({
        userId,
        lat,
        lng
    });

    try {
        await newLocation.save();
        res.send('done');
        console.log('Location saved successfully');
    } catch (error) {
        console.error('Error saving location:', error);
    }
};


exports.getlocationtimeline = async (req, res, next) => {
    const { userId } = req.params;
    try {
        console.log(locations);
        const locations = await UserLocation.find({ userId }).sort({ timestamp: 1 });
        res.json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Example usage

