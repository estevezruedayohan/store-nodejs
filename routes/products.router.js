const express = require('express');
const ProductsService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validatorHandle');
const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } = require('./../schemas/products.schema');

const router = express.Router();
const service = new ProductsService();

/** Método LISTAR todos los productos */
router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/** Método FILTRAR productos - no implementado aún */
router.get('/filter', (req, res) => {
  res.send('Esto es un filtro');
}); // esto es un endpoint especifico

/** Método MOSTRAR UN PRODUCTO */
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) =>{
    try {
      const { id } = req.params;
      console.log('id: ',id)
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);// esto es un endopoint dinámico

/** Método CREAR UN PRODUCTO todos los productos */
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const respuesta = await service.create(body);
      res.json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

/** Método ACTUALIZAR un producto */
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

/** Método BORRAR un producto */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await service.delete(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
});

  module.exports = router;
