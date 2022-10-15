const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(30);
const price = Joi.number().integer().min(10);
const images = Joi.link().alphanum().min(10);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  images: images.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  images: images,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
};
