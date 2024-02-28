const router = require("express").Router();
const db = require("../Models/Axolotl.js");

const { Axolotl } = db;

router.post("/", async (req, res) => {
  if (!req.body.pic) {
    req.body.pic = "http://Axolotlkitten.com/400/400";
  }
  if (!req.body.city) {
    req.body.city = "Anytown";
  }
  if (!req.body.state) {
    req.body.state = "USA";
  }
  try {
    const newAxolotl = await Axolotl.create(req.body);
    res.json(newAxolotl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const axolotls = await Axolotl.findAll();
    res.json(axolotls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:axolotlId", async (req, res) => {
  let axolotlId = Number(req.params.axolotlId);
  if (isNaN(axolotlId)) {
    res.status(404).json({ message: `Invalid id "${axolotlId}"` });
  } else {
    try {
      const axolotl = await Axolotl.findOne({
        where: { axolotlId: axolotlId },
        include: {
          association: "comments",
          include: "author",
        },
      });
      if (!axolotl) {
        res
          .status(404)
          .json({ message: `Could not find Axolotl with id "${axolotlId}"` });
      } else {
        res.json(axolotl);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

router.put("/:axolotlId", async (req, res) => {
  let axolotlId = Number(req.params.axolotlId);
  if (isNaN(axolotlId)) {
    res.status(404).json({ message: `Invalid id "${axolotlId}"` });
  } else {
    try {
      const axolotl = await Axolotl.findOne({
        where: { axolotlId: axolotlId },
      });
      if (!axolotl) {
        res
          .status(404)
          .json({ message: `Could not find Axolotl with id "${axolotlId}"` });
      } else {
        Object.assign(axolotl, req.body);
        await axolotl.save();
        res.json(axolotl);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
