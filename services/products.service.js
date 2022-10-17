const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err));
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
    const query = 'SELECT * FROM products';
    const rta = await this.pool.query(query);
    if(rta.rowCount === 0){
      throw boom.notFound('Lista de Productos VACIA - FIND ALL');
    }
    return rta.rows;
  }

  async findOne(id){
    const query = `SELECT * FROM products WHERE id=${id}`;
    const rta = await this.pool.query(query);
    if(rta.rowCount === 0){
      throw boom.notFound('Producto NO ENCONTRADO - FIND ONE BY ID');
    }
    if(rta.rows[0]['isblock'] === true){
      throw boom.conflict('Producto BLOQUEADO - FIND ONE BY ID');
    }
    return rta.rows;
  }

  async update(id, body){
    const { name, price, image, isBlock } = body;
    const query = `UPDATE products SET name = '${name}', price = ${price}, image = '${image}', isblock = ${isBlock} WHERE id = ${id};`;

    const rta = await this.pool.query(query);

    if(rta.rowCount === 0){
      throw boom.notFound('Producto NO ENCONTRADO - UPDATE');
    }
    return {
      id,
      message: 'Producto ACTUALIZADO CON EXITO',
      ...body,
    };
  }

  async delete(id){
    const query = `DELETE FROM products WHERE id = ${id}`;
    const rta = await this.pool.query(query);
    if(rta.rowCount === 0){
      throw boom.notFound('Producto NO ENCONTRADO - DELETE');
    }else{
      return {
        id: id,
        message: 'Producto BORRADO CON EXITO',
      }
    }
  }
}

module.exports = ProductsService;
