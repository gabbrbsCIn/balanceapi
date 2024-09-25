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
router.put("/transaction/update/:id", authenticateToken, admin, adminControllers.changeTransaction);
router.put("/section/update/:id", authenticateToken, admin, adminControllers.changeSection);
router.put("/condominium/update/:id", authenticateToken, admin, adminControllers.changeCondominium);
router.put("/apartment/update/:id", authenticateToken, admin, adminControllers.changeApartment);
router.delete("/transaction/delete/:id", authenticateToken, admin, adminControllers.deleteTransaction);

module.exports = router;
