const express = require('express');
const ProductsService = require('../services/products.service');

const router = express.Router();
const service = new ProductsService();

/** Método LISTAR todos los productos */
router.get('/', (req, res) => {
  const products = service.find();
  res.json(products)
});

/** Método FILTRAR productos - no implementado aún */
router.get('/filter', (req, res) => {
  res.send('Esto es un filtro');
}); // esto es un endpoint especifico

/** Método MOSTRAR UN PRODUCTO */
router.get('/:id', (req, res) =>{
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});// esto es un endopoint dinámico

/** Método CREAR UN PRODUCTO todos los productos */
router.post('/', (req, res) => {
  const body = req.body;
  const respuesta = service.create(body);
  res.json(respuesta);
});

/** Método ACTUALIZAR un producto */
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body
  const product = service.update(id, body);
  res.json(product);
});

/** Método BORRAR un producto */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const message = service.delete(id);
  res.json(message);
});

  module.exports = router;
