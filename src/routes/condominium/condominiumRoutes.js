const express = require("express");

const router = express.Router();

const adminControllers = require("../../controllers/adminControllers");

const { authenticateToken } = require("../../middlewares/auth.middleware");

router.post("/", authenticateToken, adminControllers.condominium);

module.exports = router;
