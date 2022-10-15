const faker = require('faker');

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
      });
    }
  }

  async create(data){
    const { name, price, image } = data;
    if (name === undefined || price === undefined || image === undefined
      || name === '' || price === '' || image === ''){
      throw new Error('Producto no fue posible crearlo, falta un parametro');
    }
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return this.products;
  }

  async findOne(id){
    // const name = this.getTotal();
    return this.products.find(element => element.id === id);
    // const content = this.products.find(element => element.id === id);
    // if(content === undefined){
    //   throw new Error('Producto no se encuentra en la base de datos');
    // }
    // return content;
  }

  async update(id, body){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Producto no encontrado');
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
      throw new Error('Producto no encontrado, no fue posible su borrado');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
