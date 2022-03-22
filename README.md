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
Los usuarios con acceso a la consola de administración de AWS pueden iniciar sesión en: https://190608036798.signin.aws.amazon.com/console

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

- Para tener contacto con la API puede dirigirse a el endpoint https://www.madariaga.tk/api/products o puede probarlo en Postman si asi lo desea.

### 4  - Cuestiones a tener en cuenta

Si desea probar la API estas son las cedenciales de el admin.

Administrador:
    username: admin
    Email: admin@admin.com
    Contraseña: admin

PayPal:

Los pagos se realizan haciendo click en el segundo enlace con el nombre "approve".

Cuentas en PayPal

Administrador:
    Email: admin@adminmail.com
    Contrasena: Admin123.

Usuario de prueba:
    email: user123@examplemail.com
    Contrasena: User123.

### 5  - Pruebas locales

Se deben actualizar las variables de entorno y ejecutar los siguientes comandos:
 ```
docker-compose build
```
y 

 ```
docker-compose up
```
### 6  - Listo para usar.

Pasos para testear los endpoints desde Postman.

1)   Hacer el login en https://www.madariaga.tk/api/login/auth0

2) Elegir un IDP de preferencia

3) Copiar el token que recibira luego de escribir sus credenciales.

4) Ver los productos en https://www.madariaga.tk/api/products

5) Hacer un pedido en https://www.madariaga.tk/api/orders(recordar usar siempre el token en Authorization con la palabra Bearer).

Por ejemplo: 
{
  "address": "string22",
  "PaymentId": 1,
  "products": [
    {
      "id": 1,
      "quantity": 2
    }
  ]
}

6) Ver el estado del pedido en https://www.madariaga.tk/api/history (recordar usar siempre el token en Authorization con la palabra Bearer).

7) Hacer el pago del pedido en https://www.madariaga.tk/api/paynow usando el id de la orden realizada previamente (recordar usar siempre el token en Authorization con la palabra Bearer).

Por ejemplo:

{
  "OrderId": 1
}

Recibiras como respuesta algo asi:
{
    "id": "38066724361326408",
    "status": "CREATED",
    "links": [
        {
            "href": "https://api.sandbox.paypal.com/v2/checkout/orders/38066724361326408",
            "rel": "self",
            "method": "GET"
        },
        {
            "href": "https://www.sandbox.paypal.com/checkoutnow?token=38066724361326408",
            "rel": "approve",
            "method": "GET"
        },
        {
            "href": "https://api.sandbox.paypal.com/v2/checkout/orders/38066724361326408",
            "rel": "update",
            "method": "PATCH"
        },
        {
            "href": "https://api.sandbox.paypal.com/v2/checkout/orders/38066724361326408/capture",
            "rel": "capture",
            "method": "POST"
        }
    ]
}

Hacer click en el link que dice:  "rel": "approve",

8) El acceso a Paypal se realizara con las siguientes credenciales:

Usuario de prueba:
    email: user123@examplemail.com
    Contrasena: User123.

9) Pagar el pedido.

10) Ver el estado del pedido en https://www.madariaga.tk/api/history (recordar usar siempre el token en Authorization con la palabra Bearer).

11) Se podra ver el resultado de la transaccion en https://www.sandbox.paypal.com/ con las credenciales del administrador:

Administrador:
    Email: admin@adminmail.com
    Contrasena: Admin123.