const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const aboutRouter = require('./about.router');
const homeRouter = require('./home.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', homeRouter);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/about', aboutRouter);
}

module.exports = routerApi;
