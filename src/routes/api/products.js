const express = require("express");
const router = express.Router();

// Product Model
const Product = require("../../models/Product");

router.get("/", (req, res) => {
  const promise = Product.find({});
  promise
    .then(products => {
      res.json(products);
      console.log("GET");
    })
    .catch(err => {
      res.json({ Error: "No products found." });
    });
});

router.put("/:id", (req, res, next) => {
  Product.findByIdAndUpdate(
    {
      _id: req.params.id
    },
    req.body,
    { new: true }
  ).then(function(product) {
    res.send(product);
  });
  console.log("PUT");
});

router.post("/", (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  });
  console.log("POST");
  newProduct.save().then(product => res.json(product));
});

router.delete("/:id", (req, res) => {
  console.log("DELETE");
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
