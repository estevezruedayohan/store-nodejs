const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000; // que asigne una variable de entorno

app.use(express.json()); // middleware

const whiteList = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://127.0.0.1:5500',
  'https://myapp.co',
];

const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin){ // para acepyar el mismo origin
      callback(null, true);
    }else{
      callback(new Error('Acceso no permitido'));
    }
  }
};

app.use(cors(options));

routerApi(app);

app.use(logErrors); // los middleware deben ir luego del routerApi
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ', port);
});

