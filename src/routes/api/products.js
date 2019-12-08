const express = require('express');
const router = express.Router();

// Product Model
const Product = require('../../models/Product');

router.get('/', (req, res) => {
  const promise = Product.find({});
  promise
    .then(products => res.json({ success: true, products }))
    .catch(() => res.json({ success: false, message: 'Kayıtlı ürün yok' }));
});

router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  )
    .then(product => res.json({ success: true, product }))
    .catch(() => res.json({ success: false, message: 'Ürün güncellenemedi' }));
});

router.post('/', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  newProduct
    .save()
    .then(product =>
      res.json({ success: true, message: 'Ürün eklendi', product })
    )
    .catch(() => res.json({ success: false, message: 'Ürün eklenemedi' }));
});

router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ success: true })))
    .catch(() => res.json({ success: false, message: 'Ürün silinemedi' }));
});

module.exports = router;
