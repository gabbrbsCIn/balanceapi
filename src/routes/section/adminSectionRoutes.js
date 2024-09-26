const express = require("express");

const router = express.Router();

const adminControllers = require("../../controllers/adminControllers");

router.post("/", adminControllers.section);
router.put("/update/:id", adminControllers.changeSection);
router.delete("/delete/:id", adminControllers.deleteSection);
module.exports = router;
