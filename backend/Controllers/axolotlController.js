const router = require("express").Router();
const db = require("../Modles/Axolotl");

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
  const Axolotl = await Axolotl.create(req.body);
  res.json(Axolotl);
});

router.get("/Axolotlall", async (req, res) => {
  const Axolotls = await Axolotl.findAll();
  res.json(Axolotls);
});

router.get("/:AxolotlId", async (req, res) => {
  let AxolotlId = Number(req.params.AxolotlId);
  if (isNaN(AxolotlId)) {
    res.status(404).json({ message: `Invalid id "${AxolotlId}"` });
  } else {
    const Axolotl = await Axolotl.findOne({
      where: { AxolotlId: AxolotlId },
    });
    if (!Axolotl) {
      res
        .status(404)
        .json({ message: `Could not find Axolotl with id "${AxolotlId}"` });
    } else {
      res.json(Axolotl);
    }
  }
});

router.put("/:AxolotlId", async (req, res) => {
  let AxolotlId = Number(req.params.AxolotlId);
  if (isNaN(AxolotlId)) {
    res.status(404).json({ message: `Invalid id "${AxolotlId}"` });
  } else {
    const Axolotl = await Axolotl.findOne({
      where: { AxolotlId: AxolotlId },
    });
    if (!Axolotl) {
      res
        .status(404)
        .json({ message: `Could not find Axolotl with id "${AxolotlId}"` });
    } else {
      Object.assign(Axolotl, req.body);
      await Axolotl.save();
      res.json(Axolotl);
    }
  }
});

module.exports = router;
