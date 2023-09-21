const router = require("express").Router();

const controller = require("../../controllers/meetings");

router.get("/list", controller.listMeetings);
router.post("/add", controller.addMeeting);

module.exports = router;