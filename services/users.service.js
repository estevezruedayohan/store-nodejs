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
    return data;
  }

  async find(){
    const rta = await models.User.findAll();

    // const rta = await this.pool.query(query);
    // if(rta.rowCount === 0){
    //   throw boom.notFound('LISTA VACIA - FIND ALL');
    // }
    return rta;
  }

  async findOne(id){
    const query = `SELECT * FROM task WHERE id = ${id}`;
    const rta = await this.pool.query(query);

    if(rta.rowCount === 0){
      throw boom.notFound('Usuario NO ENCONTRADO - FIND BY ID');
    }

    return rta.rows;
  }

  async update(id, changes){
    return{
      id,
      changes,
    };
  }

  async detele(id){
    return { id };
  }

}

module.exports = UserService;
