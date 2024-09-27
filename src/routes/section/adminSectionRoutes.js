const express = require("express");

const router = express.Router();

const sectionControllers = require("../../controllers/section/sectionControllers");

router.post("/", sectionControllers.section);
router.put("/update/:id", sectionControllers.changeSection);
router.delete("/delete/:id", sectionControllers.deleteSection);

module.exports = router;
