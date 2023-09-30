const router = require("express").Router();

const meetingAPI = require("./meetings");
const userAPI = require("./users");

router.use("/meetings", meetingAPI);
router.use("/users", userAPI);

module.exports = router;