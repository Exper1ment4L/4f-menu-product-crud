const redis = require('redis');
const client = redis.createClient();
const axios = require('axios');

module.exports = {
  setCache: (key, data) => {
    client.set(key, JSON.stringify(data));
  },
  checkCache: (req, res, next) => {
    const key = 'products';
    client.get(key, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      if (data != null) {
        const json = JSON.parse(data);
        res.json({
          length: json.length,
          success: true,
          from: 'Cache',
          products: json,
        });
      } else {
        next();
      }
    });
  },
  delCache: key => {
    client.del(key);
  },
  updateCache: () => {
    axios.get('http://localhost:5000/api/products/products');
  },
};
