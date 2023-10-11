const router = require("express").Router();

const controller = require("../../controllers/meetings");

router.get('/pending/', controller.getPendingMeetings);
router.get('/hosted/', controller.getHostedMeetings);
router.get('/upcoming/', controller.getUpcomingMeetings);
router.get('/', controller.getMeetings);
router.get('/detailed/', controller.getMeetingsDetailed);
router.get('/:id', controller.getMeetingById);
router.post('/', controller.createMeeting);
router.delete('/:id', controller.deleteMeeting);
router.patch('/:id', controller.updateMeeting);

module.exports = router;