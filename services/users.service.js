const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');


const getConnection = require('../libs/postgres');

class UserService{
  constructor(){
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err));
  }

  async create(data){
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find(){
    const rta = await models.User.findAll();
    if(!rta){
      throw boom.notFound('LISTA VACIA - FIND ALL');
    }
    return rta;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('USER NOT FOUND');
    }
    return user;
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id){
    const user = await this.findOne(id);
    await user.destroy(id);
    return { id };
  }

}

module.exports = UserService;
