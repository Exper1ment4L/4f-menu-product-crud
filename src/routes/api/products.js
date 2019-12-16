const express = require('express');
const router = express.Router();
const redis = require('../../middleware/redis');
const axios = require('axios');

// Product Model
const Product = require('../../models/Product');

router.get('/', redis.checkCache, (req, res) => {
  const promise = Product.find({});
  promise
    .then(products =>
      res.json({
        length: products.length,
        success: true,
        from: 'Database',
        products,
      })
    )
    .catch(() => res.json({ success: false, message: 'Kayıtlı ürün yok' }));
    axios.get('http://localhost:5000/api/products/products');
});

router.get('/products', (req, res) => {
  const promise = Product.find({});
  promise
    .then(products =>
      res.json({
        length: products.length,
        success: true,
        from: 'Database',
        products,
      })
    )
    .catch(() => res.json({ success: false, message: 'Kayıtlı ürün yok' }));
  promise.then(products => redis.setCache('products', products));
});

router.put('/update/:id', (req, res) => {
  Product.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  )
    .then(product => res.json({ success: true, product }))
    .catch(() => res.json({ success: false, message: 'Ürün güncellenemedi' }));

  axios.get('http://localhost:5000/api/products/products');
});

router.post('/add/', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  newProduct
    .save()
    .then(product => res.json({ success: true, product }))
    .catch(() => res.json({ success: false, message: 'Ürün eklenemedi' }));

  axios.get('http://localhost:5000/api/products/products');
});

router.delete('/delete/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product =>
      product.remove().then(res.json({ success: true, message: 'Silindi' }))
    )
    .catch(() => res.json({ success: false, message: 'Ürün silinemedi' }));

  axios.get('http://localhost:5000/api/products/products');
});

module.exports = router;
