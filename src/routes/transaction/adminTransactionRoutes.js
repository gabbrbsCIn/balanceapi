const express = require("express");

const router = express.Router();

const adminControllers = require("../../controllers/adminControllers")


router.post("/", adminControllers.transaction);
router.put("/update/:id", adminControllers.changeTransaction);
router.delete("/delete/:id", adminControllers.deleteTransaction);

module.exports = router;