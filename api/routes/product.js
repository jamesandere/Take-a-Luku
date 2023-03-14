const router = require("express").Router();
const Product = require("../models/product");
const cloudinary = require("../utils/cloudinary");

router.post("/", async (req, res) => {
  const {
    brand_id,
    title,
    desc,
    color,
    size,
    tags,
    price,
    images,
    gender,
    category,
  } = req.body;

  let imagesBuffer = [];

  try {
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const uploadRes = await cloudinary.uploader.upload(images[i], {
          upload_preset: "asos-clone",
        });

        imagesBuffer.push(uploadRes);
      }

      const newProduct = new Product({
        brand_id,
        title,
        desc,
        color,
        size,
        tags,
        price,
        images: imagesBuffer,
        gender,
        category,
      });

      const savedProduct = await newProduct.save();
      res.status(200).send(savedProduct);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  const brandId = req.query.brandId;
  const cat = req.query.cat;
  const tag = req.query.tag;
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            title: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            tags: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            size: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  try {
    // const products = await Product.find()
    //   .populate("brand_id")
    //   .populate("category");
    let products;

    if (brandId) {
      products = await Product.find({ brand_id: brandId })
        .populate("brand_id")
        .populate("category");
    } else if (cat) {
      products = await Product.find({ categories: cat })
        .populate("brand_id")
        .populate("category");
    } else {
      products = await Product.find({ ...keyword })
        .populate("brand_id")
        .populate("category");
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
