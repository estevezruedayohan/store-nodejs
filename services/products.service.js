const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        images: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data){
    const { name, price, image } = data;
    if (!name || !price || !image
      || name === '' || price === '' || image === ''){
      throw boom.forbidden('Producto NO FUE CREADO - FALTAN PARAMETROS');
    }
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    const products = this.products;
    if(!products){
      throw boom.notFound('Productos NO ENCONTRADOS - FIND ALL');
    }
    return products;
  }

  async findOne(id){
    const product = this.products.find(element => element.id === id);
    if(!product){
      throw boom.notFound('Producto NO ENCONTRADO - FIND ONE BY ID');
    }
    if(product.isBlock){
      throw boom.conflict('Producto BLOQUEADO - FIND ONE BY ID');
    }
    return product;
  }

  async update(id, body){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Producto NO ENCONTRADO - UPDATE');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...body
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Producto NO ENCONTRADO - DELETE');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
