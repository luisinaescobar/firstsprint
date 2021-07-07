const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const { crearUsuario, verUsers, adminLog, adminValidate, loginValidation,login,validateUser, showPlatos, midBuscarId, crearplato, showPlato, eliminar, modificar, pedidos, hacerNuevoPedido, hacerPedido, historial, payment, modifEstado } = require('./funciones');
const moment = require('moment');
const { validUsers } = require('./arrays');

function loadSwaggerinfo(app) {
  try {
    const doc = yaml.load(fs.readFileSync('./src/spec.yml', 'utf8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
  } catch (e) {
    console.log(e);
  }
};
function createRoutes(app) {
  
  app.use(express.json());
  //registro
  app.post('/signup', crearUsuario);
  //ver usuarios
  app.get('/signup', verUsers);
  //logeo
  app.post('/loginad', adminLog )
  app.post('/login', loginValidation);
  //ver menu
  app.use('/menu', validateUser);//middleware para login
  //ver menu(users)
  app.get('/menu', showPlatos);
  //ver menu(admin)
  app.get('/platos', showPlatos);
  ///agregar plato
  app.post('/platos', adminValidate, crearplato);
  //ver un plato
  app.use('/platos/:idPlato', midBuscarId, adminValidate);
  app.get('/platos/:idPlato', showPlato);
  // borrar un plato
  app.delete('/platos/:idPlato', eliminar);
  //modificar plato
  app.put('/platos/:idPlato', modificar);
  //ver todos los pedidos
  app.get('/pedidos', pedidos);
  //realizar pedido
  app.post('/pedir/:idPlato', validateUser, hacerNuevoPedido);
  ///confirmar pedido
  app.post('/confirm/:idPago', hacerPedido);
  //ver historial
  app.get('/history', historial);
  //ver medios de pago
  app.get('/pago', payment);
  //modificar estado de pedidos
  app.put('/pedidos/:idPedido', adminValidate, modifEstado);
};

function main() {
  const app = express();
 // moment(app);
  loadSwaggerinfo(app);
  createRoutes(app);
  app.listen(9091, () => console.log("listening on 9091"))
};
main();