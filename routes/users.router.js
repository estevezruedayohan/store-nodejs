const express = require('express');
const UserService = require('./../services/users.service');
const validatorHandler = require('./../middlewares/validatorHandle');
const { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema } = require('./../schemas/users.schema');

const router = express.Router();
const service = new UserService();

/** Método CONSULTA TODOS LOS USUARIOS */
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/** Método CONSULTA UN USUARIO POR ID */
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error)
    }
  });

/** Método CREAR UN USUARIO */
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const respuesta = await service.create(body);
      res.status(201).json(respuesta);
      res.json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

/** Método ACTUALIZAR un usuario */
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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
router.delete('/:id',
  validatorHandler(deleteUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await service.delete(id);
      res.json(message);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
