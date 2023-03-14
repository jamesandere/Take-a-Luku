const router = require("express").Router();
const Brand = require("../models/brand");

router.post("/", async (req, res) => {
  const { name, desc } = req.body;

  try {
    const newBrand = new Brand({
      name,
      desc,
    });
    const savedBrand = await newBrand.save();
    res.status(200).send(savedBrand);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.status(200).send(brand);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).send(brands);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
