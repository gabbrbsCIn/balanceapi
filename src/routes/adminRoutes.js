const express = require("express");

const router = express.Router();

const adminControllers = require("../controllers/adminControllers");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { admin } = require("../middlewares/admin.middleware");

router.post("/condominium", authenticateToken, adminControllers.condominium);
router.post("/section", authenticateToken, admin, adminControllers.section);
router.post("/apartment", authenticateToken, admin, adminControllers.apartment);
router.patch("/apartment/resident", authenticateToken, admin, adminControllers.residentInAparment);
router.post("/transaction", authenticateToken, admin, adminControllers.transaction);

module.exports = router;
