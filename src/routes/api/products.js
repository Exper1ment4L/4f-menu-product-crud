const express = require('express');
const router = express.Router();

// Product Model
const Product  = require('../../models/Product');

// Route GETALL api/products

router.get('/',(req,res) => {
  const promise  = Product.find({});
  promise.then((products) => {
    res.json(products)
  }).catch((err)=> {
    res.json({Error:'No products found.'})
  })
});

// Route CREATE api/products

router.post('/',(req,res)=> {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description :req.body.description
  });

  newProduct.save().then(product=> res.json(product));
})
// Route DELETE api/products/id

router.delete('/:id',(req,res) => {
  Product.findById(req.params.id)
  .then(product => product.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
})





module.exports = router;