const express = require("express");

const router = express.Router();

const transactionControllers = require("../../controllers/transaction/transactionControllers")


router.post("/", transactionControllers.transaction);
router.put("/update/:id", transactionControllers.changeTransaction);
router.delete("/delete/:id", transactionControllers.deleteTransaction);

module.exports = router;