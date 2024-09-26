const express = require("express");

const router = express.Router();

const adminControllers = require("../../controllers/adminControllers");

router.post("/", adminControllers.apartment);
router.patch("/resident", adminControllers.residentInAparment);
router.put("/update/:id", adminControllers.changeApartment);
router.delete("/delete/:id", adminControllers.deleteApartment);

module.exports = router;
