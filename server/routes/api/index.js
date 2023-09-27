/**
 * Add all the api routers into one single router. 
 */
const router = require("express").Router();
const meetingAPI = require("./meetings");

router.use("/meetings", meetingAPI);

module.exports = router;