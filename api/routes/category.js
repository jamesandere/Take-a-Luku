const Category = require("../models/category");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new Category({
      name,
    });
    const savedCategory = await newCategory.save();
    res.status(200).send(savedCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
