const express = require("express");

const router = express.Router();

const authController = require("../controllers/authControllers");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/test",verifyToken, authController.test);
router.post("/logout", verifyToken, authController.logout);



module.exports = router;
