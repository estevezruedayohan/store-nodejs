const boom = require('@hapi/boom');

function validatorHandler(schema, property){
  return (req, res, next) => {
    const data = req[property]; // un request dinámico
    const { error } = schema.validate(data);
    if(error){
      next(boom.badRequest(error)); // para que se advierta y maneje como un error de boom
    }
    next();
  };
}

module.exports = validatorHandler;
