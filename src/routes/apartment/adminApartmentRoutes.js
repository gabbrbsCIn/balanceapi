const express = require("express");

const router = express.Router();


const apartmentControllers = require("../../controllers/apartment/apartmentControllers");

router.post("/", apartmentControllers.apartment);
router.patch("/resident", apartmentControllers.residentInAparment);
router.put("/update/:id", apartmentControllers.changeApartment);
router.delete("/delete/:id", apartmentControllers.deleteApartment);


module.exports = router;
