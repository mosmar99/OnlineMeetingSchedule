const router = require("express").Router();

const controller = require("../../controllers/meetings");

router.patch('/vote/', controller.voteOnTimeSlot);
router.get('/pending/', controller.getPendingMeetings);
router.get('/hosted/', controller.getHostedMeetings);
router.get('/upcoming/', controller.getUpcomingMeetings);
router.get('/', controller.getMeetings);
router.get('/detailed/', controller.getMeetingsDetailed);
router.get('/detailed/:id', controller.getMeetingByIdDetailed);
router.get('/:id', controller.getMeetingById);
router.post('/', controller.createMeeting);
router.delete('/all/', controller.deleteAllMeetings);
router.delete('/:id', controller.deleteMeeting);
router.patch('/:id', controller.updateMeeting);

module.exports = router;