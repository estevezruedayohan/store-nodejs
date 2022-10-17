const express = require('express');
const UserService = require('./../services/users.service');
const validatorHandler = require('./../middlewares/validatorHandle');
// const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } = require('./../schemas/products.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  if(userId){
    res.json({
      userId: userId,
      name: 'JHON DOE'
    });
  }else{
    res.send('Debe especificar un usuario');
  }
});

module.exports = router;
