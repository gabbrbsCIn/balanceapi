const express = require("express");

const router = express.Router();

const residentControllers = require("../../controllers/resident/residentControllers");

router.get("/:condominiumId/balance", residentControllers.balance);
router.put("/:condominiumId/update", residentControllers.update);

module.exports = router;
