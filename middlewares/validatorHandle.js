const boom = require('@hapi/boom');

function validatorHandler(schema, property){
  return (req, res, next) => {
    const data = req[property]; // un request dinámico
    const { error } = schema.validate(data, { abortEarly: false});// segundo parametro para que me arroje todos los errores de una vez
    if(error){
      next(boom.badRequest(error)); // para que se advierta y maneje como un error de boom
    }
    next();
  };
}

module.exports = validatorHandler;
