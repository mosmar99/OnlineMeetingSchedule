const router = require("express").Router();

const controller = require("../../controllers/meetings");

router.get('/', controller.getMeetings);
router.get('/detailed/', controller.getMeetingsDetailed);
router.get('/:id', controller.getMeetingById);
router.post('/', controller.createMeeting);
router.delete('/:id', controller.deleteMeeting);
router.patch('/:id', controller.updateMeeting);
router.get('/pending', controller.getPendingMeetings);

module.exports = router;