const SchedulerEvents = require('../models/calendar')

exports.getData = (req, res) => {
    SchedulerEvents.find()
        .then(data => {
            console.log('Call');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
            });
        });
};



exports.crudActions = async (req, res) => {
    try {
        let addedResults = [];
        let changedResults = [];
        let deletedResults = [];

        // Handle added events
        if (req.body.added && req.body.added.length > 0) {
            const addedPromises = req.body.added.map(event => SchedulerEvents.create(event));
            addedResults = await Promise.all(addedPromises);
        }

        // Handle changed events
        if (req.body.changed && req.body.changed.length > 0) {
            console.log(req.body)
            const changedPromises = req.body.changed.map(event =>
                SchedulerEvents.findByIdAndUpdate(event._id, event, { new: true })
            );
            changedResults = await Promise.all(changedPromises);
        }

        // Handle deleted events
        if (req.body.deleted && req.body.deleted.length > 0) {
            const deletedPromises = req.body.deleted.map(event =>
                SchedulerEvents.findByIdAndDelete(event._id)
            );
            deletedResults = await Promise.all(deletedPromises);
        }

        res.status(200).send({
            added: addedResults,
            changed: changedResults,
            deleted: deletedResults
        });
    } catch (err) {
        console.error("Error during CRUD actions:", err);
        res.status(500).send({
            message: err.message || "Some error occurred while processing the events."
        });
    }
};
