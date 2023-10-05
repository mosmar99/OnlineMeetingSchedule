const router = require("express").Router();

const meetingAPI = require("./meetings");
const userAPI = require("./users");
const inviteAPI = require("./invites");
const timeSlotAPI = require("./timeSlots");

router.use("/meetings", meetingAPI);
router.use("/users", userAPI);
router.use("/invites", inviteAPI);
router.use("/timeSlots", timeSlotAPI);

module.exports = router;