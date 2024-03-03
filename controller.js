const express = require("express");
const router = express.Router();
const Product = require("./ProductModel.js");

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length == 0) return res.json({ message: "No Products found" });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//add a product
router.post("/add", async (req, res) => {
  console.log("hi");
  const prod = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  try {
    const newProd = await prod.save();
    return res.json(newProd);
  } catch (err) {
    return res.json({ message: "Internal Server Error" });
  }
});

//update a product
router.put("/update", async (req, res) => {
  const id = req.body.id;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `No Product with id: ${id} found` });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete a product
router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  const prod = await Product.findById(id);

  if (!prod) {
    return res.status(400);
    throw new Error("Product not found");
  }

  await Product.deleteOne({ _id: id });

  return res
    .status(200)
    .json({ id: req.params.id, message: "Product removed Successfully" });
});

module.exports = router;
