# Sprint Project 4

## Recursos y tecnologias aplicadas en Node

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

## Recursos y tecnologias aplicadas en Amazon Web Services

 - Load Balancer
 - Elasticache
 - RDS
 - Auto Scaling 
 - S3
 - CloudFront
 - EC2
 - NGINX
 - PM2
 - CI
 - Route53

## Documentación de la API
Abrir el archivo `spec.yml` y copiar su contenido en [Swagger](https://editor.swagger.io/) o dirigirse a (http://localhost:5000/api-docs/) en su navegador una vez que halla iniciado el servidor y clonado el proyecto.

### 1  - API 
El repositorio de la API se puede encontrar en el [siguiente link](https://github.com/luisinaescobar/firstsprint.git).
O puede ser clonado desde la consola con el siguiente link:

`gh repo clone luisinaescobar/firstsprint`

### 2  - Ingreso a la consola de AWS

Dentro de la carpeta ZIP encontraras un archivo con las credenciales del usuario del tech reviewer.

### 3  - Inicializar la instancia

 - Conectarse a la instancia.

 - Pegar el comando de ssh para conectarse a la misma desde una consola, utilizando el archivo miclave.pem para poder ingresar.

 - Una vez en la consola escribir los siguientes comandos para inicializar NGINX.

 ```
sudo su
```
```
nginx
```
 - Luego salir con Crl D

 - Luego dar inicio a la API dirigiendose a api/firstsprint-master

```
cd api/firstsprint-master/
```
y corriendolo en PM2

```
 pm2 start ecosystem.config.js --env dev
```
- Luego podra visualizar la pagina de inicio dirigiendose a el dominio https://www.madariaga.tk

- Para tener contacto con la API puede dirigirse a el endpoint https://www.madariaga.tk/api/v1/products o puede probarlo en Postman si asi lo desea.

### 4  - Cuestiones a tener en cuenta

Si desea probar la API estas son las cedenciales de el admin.

Administrador:
    username: admin
    Email: admin@admin.com
    Contraseña: admin

PayPal:

Los pagos se realizan haciendo click en el segundo enlace con el nombre "aproved".

Cuentas en PayPal

Administrador:
    Email: admin@adminmail.com
    Contrasena: Admin123.

Usuario de prueba:
    email: user123@examplemail.com
    Contrasena: User123.

### 5  - Listo para usar.

Testear los endpoints desde Postman.
