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
