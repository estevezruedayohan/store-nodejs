const { User, UserSchema} = require('./user.model');
// const { User, UserSchema} = require('./user.model');
// const { User, UserSchema} = require('./user.model');
// const { User, UserSchema} = require('./user.model');

function setupModels(sequialize){ // configuracion inicial de cada modelo
  User.init(UserSchema, User.config(sequialize));
  // User.init(UserSchema, User.config(sequialize));
  // User.init(UserSchema, User.config(sequialize));
  // User.init(UserSchema, User.config(sequialize));
}

module.exports = setupModels;
