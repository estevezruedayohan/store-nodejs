const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size, offSet } = req.query;
  const limit = size || 100;
  // const offset = offSet || 1 ; // aqui no se verá el resultado del offset
  // debido a que products viene de una array vacio

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      images: faker.image.imageUrl(),
    });

  }
  res.json(products)
});

router.get('/filter', (req, res) => {
  res.send('Esto es un filtro');
}); // esto es un endpoint especifico

router.get('/:id', (req, res) =>{
  const productId = req.params.id;
  res.json(
    {
      productId,
      name: 'Product 2',
      price: 800,
      images: [
        'https://youtub.com',
        'https://loci.com'
      ]
    }
    );
  });// esto es un endopoint dinámico

  router.post('/', (req, res) => {
    const body = req.body;
    res.json({
      message: 'Created',
      data: body
    }
    );
  });

  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({
      message: 'Updated partial',
      data: body,
      id: id,
    }
    );
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
      message: 'Deleted',
      id: id,
    }
    );
  });

  module.exports = router;
