# Apuntes del curso

## 1 Parte

- Crear carpeta del proyecto
- Iniciar init 
- Iniciar git
- Crear archivos de configuracion
  - gitignore.io
  - eslintrc.json
  - editorconfig
  - prettier (opcional)
- instalar dependencias de desarrollo como dependencias de Desarrollo -D:
  - nodemon
  - eslint
  - eslint-config-prettier
  - eslint-plugin-prettier
  - prettier
- Crear el archivo de entrada de la aplicacion:
  - index.js
- Modificar package.json agregando scripts:
  - "dev": "nodemon index.js",
  - "start": "node index.js",
  - "lint": "eslint"
- Probar los scripts

## 2 Parte

- Instalar express
- Requerir express en el archivo de entrada y crear la lógica de crear el servidor
- Crear las rutas que queramos acceder desde el navegador
- tip: REST = Representational State Transfer
  - Métodos: 
    - GET ->
    - PUT <-
    - PATCH <- (Partial Updates)
    - POST <- 
    - DELETE X
- Utilizamos de ejemplo una libreria faker para generar datos ramdon faker (usar la version 5.5.3)
- Para evitar choque de rutas, los endpoints específicos deben ir antes de los endpoints dinámicos.
- Se crea la carpeta de ruotes y se construyen los archivos que separaran las funciones (separacion de responsabilidades)
- Se crea el punto de entrada de routes con index.js
- se separa el código de routing del punto de ingreso de la app a los archivos antes creados.
- Se utiliza insomnia para probar los metodos
- se agrega el middleware a express en el archivo de entrada de la app (app.use(express.json())) para que interprete el cuerpo en formato json que es generado en el server. 
- se separan los router por cada destino llevando las funciones a cada uno de ellos
- Se crea por cada router una clase/servicio que manejará la lógica del manejo de los datos.
- Se ajustan los métodos de las clases de tal forma que se puedan manejar los errores en cada una de ellas y ser capturados try catch y que los router brinden mensajes al servidor.
 - Se crean los middlewares para manejo de errores
 - Se importan en el archivo de entrada de la app index.js y se ejecutan en orden y despues del llamado al router(app)
 se ajusta en el archivo de routing para el manejo de los errores invocandolos en un tray catch y agregando un next en los parámetros de la función de entrada que se invoca
- Se instala la libreria boom npm i @hapi/boom
- se invoca boom en los servicios (clases) y se maneja con esta los errores
- Se instala la libreria Joi npm i joi para validación de datos
- Se crea una carpeta dónde vivirá estos esquemas, se crea el archivo para cada  clase que se va a usar en el app (products.schema.js....)
- Se importa en products.schema y se configura los parámetros de entrada
- Se crean los schemas para cada acción del crud por servicio
- Se crea un archivo validador en middleware y se crea el middleware en este.
- Se agregan estos middleware en el archivo de routers, como funciones callbacks de acuerdo a su función.
- Se configura el validador y los schemas para que validen adecuadamente las entradas a las clases
- Se instla libreria cors
- se empieza a usar en el indez js de la app
- Se configura la isntancia de cors con las opciones, se crea la lista de los dominios que tendrán acceso al backend

## Manejo de docker

- Se instala docker-compose
- Se agrega el archivo yml que será la configuración del contenedor - se especifica el path que indica la pagina hub.docker.com para esta imagen
- Se crea la carpeta dónde se alojará la data (bd - postgres)
- Se corre el servicio docker-compose up -d postgres
- Se abre el localhost dónde está corriendo pgadmin y se ingresan los datos de un nuevo servidor, la ip es el nombre del servicio de postgres ya que cuando se destruye el contenedor se cambia la ip
- Se hace una query de creación de una tabla de prueba
CREATE TABLE task(
   id serial PRIMARY KEY,
	title varchar(255) NOT NULL,
	completed boolean DEFAULT false
);
y se ingresaran datos manualmente a la tabla
- Se instala la librería de node-postgres npm i pg
- Se conecta docker a nodejs con la librería node-postgres
- Se crea una carpeta de libs y se crean los archivos de conexion el cual se exportará su función
- Se crea otro archivo de pool de conexiones y se empieza a usar en los servicios agregando el pool al constructor de la clase
- Se empieza a implementar en los métodos ej. en el de productos para que no haga un fake sino que haga un query

### Practica en pgadmin
- Creamos la tabla productos
CREATE TABLE products(
	id serial PRIMARY KEY,
	name varchar(100) not null,
	price integer not null,
	image varchar(250) not null,
  isBlock boolean not null
);
- Hacemos pruebas con tabla vacia y con productos a través de insomnia
  - {
	"statusCode": 404,
	"error": "Not Found",
	"message": "Lista de Productos VACIA - FIND ALL"
  }
  - [
	{
		"id": 1,
		"name": "Awesome shoes",
		"price": 150,
		"image": "http://milocal.com"
	},
	{
		"id": 2,
		"name": "Beaty roses",
		"price": 15,
		"image": "http://local.ar"
	}
  ]  

- Modificar los servicios por cada tabla (pendiente users, facturas, etc)
- Creamos las variables de ambiente para no exponer nuestras credenciales
  - creamos la carpeta config
  - creamos el archivo config.js
- Creamos el archivo .env y .env.example para crear las variables de entorno
- instalamos libreria dotenv que carga las variables de env y las carga en el entorno de node npm i dotenv
- requerimos dotenv en config.js para que cargue las variables de entorno.
- Probamos con insomnia que la aplicación funcione con las varaibles de entorno haciendo un get products

### ORM
- Instalar la libreria sequilize para manejo de orm
- Instalar las librerías de postgres (ya que es la bd que vamos a usar) - ver documentacion sequilize.org
- Crear en la carpeta libs un archivo de sequalize dónde se inice la conexión, nos ayudmos con el código que escribimos en la librería de postgres.pool
- Probamos la librería sequilize en product.services
- cambiamos las consultas query por sequilize (invocar la librería)
- Desestructuramos la data
- Probamos en insomnia
- Creamos una carpeta de db/models dónde se construiran las clases de las tablas para el uso en los orm
- En los archivos de los modelos se requiere la libresería secualize {Model, DataTypes, Sequelize}, se crea  el esquema de los campos que tendrán cada tabla y se crea la clase extendida de Models, se exporta las variables y clase
- se crea un archivo index.js que será el punto de partida para enviar los modelos
- Una vez guardado los cambios revisamos pgadmin para ver que se creó la tabla tal y como se planteó en el modelo

### Incorporar orm en los endpoints o services
- Se incorpora models en users.services.js y se empieza a cambiar con los métodos que posee finAll
- Se prueba con insomnia
- crear el crud para cada servicio - ej user

## Practica de cambio de bd a Mysql
- modificamos el docker-compose para que lea la imagen de Mysql:8 y phpmyadmin, recordar que el password es para el usuario root, por lo que la variable MYSQL_USER debe ser root. 
- instalamos el driver de mysql para que lo lea node npm i --save mysql2
- Se cambia termporalmente el DB_PORT variable de entorno en .env para que se conecte a mysql (el puerto que se configuró en docker-compose para este servicio), y el usuario DB_USER a root
- cambiar en sequelize.js el dialecto a mysql y la URI de conexion
- se prueba en insomnia el crud

### Migraciones de bases de datos con sequelize orm
- La migración se asemeja a un control de versiones
- Se instala la libreria sequelize-cli como dependencia de desarrollo npm i sequelize-cli --save-dev
- Agregamos un archivo en la raíz del proyecto que será la configuración de sequelize denominado .sequelizerc, este nos permitirá correr un sistema de migraciones, se ocnfigura dónde están los sets de datos, dónde serán guardadas todas las migraciones que se van a generar.
- Creamos en db dos carpetas seeders y migrations y un archivo config.js cuya configuración se reutilizará algnas lineas de sequelize , se exporta por modulo las dos configuraciones para desarrollo y la otra para producción(aún no terminada).
- 


#### tareas por hacer 
[] Hacer los esquemas de validacion para las otras tablas
[] Construir los servicios para las otras tablas
[] Construir los router para las otras tablas
[] Modificar los archivos que usen el getconection()
[] Cambiar los servicios por sequialize
[] Crear los modelos para las tablas productos, ordenes de compra, usuarios, clientes, categorias, marcas.
[] Buscar manejo de errores con boom

