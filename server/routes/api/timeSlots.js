const router = require("express").Router();

const controller = require("../../controllers/timeSlots");

router.get("/", controller.getAllTimeSlots);
router.post("/", controller.createTimeSlot);
router.get("/:id", controller.getTimeSlotById);
router.delete('/all/', controller.deleteAllTimeSlots);
router.delete("/:id", controller.deleteTimeSlot);
router.patch("/:id", controller.updateTimeSlot);
module.exports = router;