const router = require("express").Router();
const Axolotl = require("../Models/Axolotl");

// Routes...

// POST: Create a new Axolotl
router.post("/", async (req, res) => {
  try {
    // Set default values if not provided
    if (!req.body.pic) {
      req.body.pic = "http://kitten.com/400/400";
    }
    if (!req.body.city) {
      req.body.city = "Anytown";
    }
    if (!req.body.state) {
      req.body.state = "USA";
    }

    const newAxolotl = await Axolotl.create(req.body);
    res.json(newAxolotl);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create Axolotl", error: error.message });
  }
});

// GET: Get all Axolotls
router.get("/all", async (req, res) => {
  try {
    const axolotls = await Axolotl.find();
    res.json(axolotls);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get Axolotls", error: error.message });
  }
});

// GET: Get a single Axolotl by ID
router.get("/:AxolotlId", async (req, res) => {
  try {
    const AxolotlId = req.params.AxolotlId;
    const foundAxolotl = await Axolotl.findById(AxolotlId);

    if (!foundAxolotl) {
      return res
        .status(404)
        .json({ message: `Could not find Axolotl with id "${AxolotlId}"` });
    }

    res.json(foundAxolotl);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get Axolotl", error: error.message });
  }
});

// PUT: Update a single Axolotl by ID
router.put("/:AxolotlId", async (req, res) => {
  try {
    const AxolotlId = req.params.AxolotlId;
    const updatedAxolotl = await Axolotl.findByIdAndUpdate(
      AxolotlId,
      req.body,
      { new: true }
    );

    if (!updatedAxolotl) {
      return res
        .status(404)
        .json({ message: `Could not find Axolotl with id "${AxolotlId}"` });
    }

    res.json(updatedAxolotl);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update Axolotl", error: error.message });
  }
});

module.exports = router;
