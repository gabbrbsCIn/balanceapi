const express = require("express");

const router = express.Router();

const condominiumControllers = require("../../controllers/condominium/condominiumControllers");

router.put("/update/:id", condominiumControllers.changeCondominium);

module.exports = router;
