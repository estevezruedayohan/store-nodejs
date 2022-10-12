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
  res.status(302).json(products)
});

router.get('/filter', (req, res) => {
  res.send('Esto es un filtro');
}); // esto es un endpoint especifico

router.get('/:id', (req, res) =>{
  const { id } = req.params;
  if( id === '100' ){
    res.status(404).json({
      message: 'NoT fOuNd 8) ¡¡'
    });
  }else{
    res.status(302).json(
      {
        id,
        name: 'Product 2',
        price: 800,
        images: [
          'https://youtub.com',
          'https://loci.com'
        ]
      }
      );
  }
  });// esto es un endopoint dinámico

  router.post('/', (req, res) => {
    const body = req.body;
    res.status(201).json({
      message: 'Created',
      data: body
    }
    );
  });

  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if(id === '100'){
      res.status(304).json({
        message: 'Not modified',
        id,
      });
    }else{
      res.status(202).json({
        message: 'Updated partial accepted',
        data: body,
        id,
      });
    }

  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;

    if(id === '100'){
      res.status(404).json({
        message: 'Product Not found',
        id,
      });
    }else{
      res.status(202).json({
        message: 'Product Deleted permanently',
        id,
      });
    }

  });

  module.exports = router;
