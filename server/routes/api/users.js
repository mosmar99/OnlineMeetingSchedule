const router = require("express").Router();

const controller = require("../../controllers/users");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/list", controller.list);

module.exports = router;