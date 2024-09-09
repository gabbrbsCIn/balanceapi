const express = require("express");

const router = express.Router();

const adminControllers = require("../controllers/adminControllers");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { admin } = require("../middlewares/admin.middleware");

router.post("/condominium", authenticateToken, adminControllers.condominium);
router.post("/section", authenticateToken, admin, adminControllers.section);

module.exports = router;
