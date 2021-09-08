# Sprint Project 2

## Recursos y tecnologias aplicadas

 - Nodemon
 - Express
 - Moment
 - Postman 
 - Swagger para documentación
 - Jsonwebtoken para autorizaciones
 - Crypto para codificar las contraseñas
 - Sequelize/Mariadb para base de datos relacional
 - Helmet para seguridad
 - Dotenv para variables de entorno

## Documentación de la API
Abrir el archivo `spec.yml` y copiar su contenido en [Swagger](https://editor.swagger.io/) o dirigirse a (http://localhost:5000/api-docs/) en su navegador una vez que halla iniciado el servidor y clonado el proyecto.

### 1  - Clonar el proyecto 
Clonar el repositorio en el [siguiente link](https://github.com/luisinaescobar/firstsprint.git).
Desde la consola con el siguiente link:
`gh repo clone luisinaescobar/firstsprint`

### 2  - Instalacion de dependencias
```
npm install
```

### 3  - Inicializar la base de datos
 - Iniciar una base de datos con MYsql o Mariadb.
 - Agregar a las variables de entorno las variables expecificadas a continuacion:   
    * PORT: numero de puerto usado para arrancar el servidor
    * DB_USERNAME: nombre de usuario de la base de datos
    * DB_PASSWORD: contraseña de base de datos
    * DB_NAME: nombre de la base de datos
    * DB_PORT: puerto usado por la base de datos
    * DB_HOST: host en el cual se encuentra la base de datos
    * JWT_SECRET: password para encriptar datos de JWT


### 4  - Inicializar el servidor
Abrir el archivo en `/src/index.js` desde node
`node index`

### 5  - Importante!

Dentro de este archivo se crean objetos de prueba para todas las tablas. El más relevante es el siguiente:

Administrador:
username: admin
Email: admin@admin.com
Contraseña: admin

### 6  - Testing
```
npm test
```

### 7  - Listo para usar.

Testear los endpoints desde Postman o Swagger para hacer uso de la API.
