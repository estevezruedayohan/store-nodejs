const express = require('express');
const ProductsService = require('../services/products.service');

const router = express.Router();
const service = new ProductsService();

/** Método LISTAR todos los productos */
router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

/** Método FILTRAR productos - no implementado aún */
router.get('/filter', (req, res) => {
  res.send('Esto es un filtro');
}); // esto es un endpoint especifico

/** Método MOSTRAR UN PRODUCTO */
router.get('/:id', async (req, res, next) =>{
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
    // res.status(404).json({
    // message: error.message
    // });
  }
});// esto es un endopoint dinámico

/** Método CREAR UN PRODUCTO todos los productos */
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const respuesta = await service.create(body);
    res.json(respuesta);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

/** Método ACTUALIZAR un producto */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

/** Método BORRAR un producto */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await service.delete(id);
    res.json(message);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

  module.exports = router;
