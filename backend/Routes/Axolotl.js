const router = require("express").Router();
const {
  getAllAxolotls,
  getAxolotlById,
} = require("../Controllers/axolotlController");

router.get("/Axolotlall", getAllAxolotls);
router.get("/:id", getAxolotlById);

module.exports = router;
