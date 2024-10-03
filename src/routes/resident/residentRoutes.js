const express = require("express");

const router = express.Router();

const residentControllers = require("../../controllers/resident/residentControllers");
const {
  checkResidentInCondominium,
} = require("../../middlewares/resident.middleware");

router.get(
  "/:condominiumId/balance",
  checkResidentInCondominium,
  residentControllers.balance
);
router.get(
  "/:condominiumId/debits",
  checkResidentInCondominium,
  residentControllers.residentDebits
);
router.put("/:condominiumId/update", residentControllers.update);
router.post("/:condominiumId/payment", residentControllers.payDebits);

module.exports = router;
