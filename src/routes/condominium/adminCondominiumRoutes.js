const express = require("express");

const router = express.Router();

const adminControllers = require("../../controllers/adminControllers");

router.put("/update/:id", adminControllers.changeCondominium);

module.exports = router;
