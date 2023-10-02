const router = require("express").Router();

const controller = require("../../controllers/invites");

router.get("/", controller.getAllInvites);
router.post("/", controller.createInvite);
router.get("/:id", controller.getInviteById);
router.delete("/:id", controller.deleteInvite);
router.patch("/:id", controller.updateInvite);

module.exports = router;