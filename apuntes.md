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

