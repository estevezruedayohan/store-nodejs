const boom = require('@hapi/boom');
// const { json } = require('express');

const getConnection = require('../libs/postgres');

class UserService{
  constructor(){}

  async create(data){
    return data;
  }

  async find(){
    const client = await getConnection();
    console.log(client);
    const rta = await client.query('SELECT * FROM task');
    console.log('estoy en users service');
    // console.log('rta: ', Json(rta))
    // if(!rta){
    //   throw boom.notFound('NO HAY CLIENTES - FIND ALL');
    // }
    client.end();
    return rta.rows;
  }

  async findOne(id){
    return { id };
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
