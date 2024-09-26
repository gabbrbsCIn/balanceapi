const express = require("express");

const router = express.Router();

const condominiumControllers = require("../../controllers/condominium/condominiumControllers");

const { authenticateToken } = require("../../middlewares/auth.middleware");

router.post("/", authenticateToken, condominiumControllers.condominium);

module.exports = router;
