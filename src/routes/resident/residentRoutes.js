const express = require("express");

const router = express.Router();

const residentControllers = require("../../controllers/resident/residentControllers");
const { checkResidentInCondominium } = require("../../middlewares/resident.middleware");

router.get("/:condominiumId/balance", checkResidentInCondominium, residentControllers.balance);
router.put("/:condominiumId/update", residentControllers.update);

module.exports = router;
