const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json()); // middleware

routerApi(app);

app.use(logErrors); // los middleware deben ir luego del routerApi
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ', port);
});

