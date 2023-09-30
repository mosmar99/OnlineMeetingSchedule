const router = require("express").Router();

const controller = require("../../controllers/meetings");

router.get('/', controller.getMeetings);
router.get('/:id', controller.getMeetingById);
router.post('/', controller.createMeeting);
router.delete('/:id', controller.deleteMeeting);
router.patch('/:id', controller.updateMeeting);

module.exports = router;