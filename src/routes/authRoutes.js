const express = require("express");

const router = express.Router();

const authController = require("../controllers/authControllers");
const { authenticateToken } = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authenticateToken, authController.logout);



module.exports = router;
