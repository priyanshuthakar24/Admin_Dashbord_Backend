const eventcontroller = require('../controllers/event')
const AuthController = require('../controllers/AuthController');
const UserLocation = require('../controllers/UserLocation');
const router = require('express').Router();

router.post('/map/timeline', UserLocation.saveUserLocation);
router.get('/map/timeline/:userId', UserLocation.getlocationtimeline);
router.post('/auth/signup', AuthController.PostSignup);
router.post('/auth/login', AuthController.PostLogin);
router.post('/getData', eventcontroller.getData);
router.post('/crudActions', eventcontroller.crudActions);
module.exports = router;
