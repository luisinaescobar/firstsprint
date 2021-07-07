const validAdmin =[
    {"email": "admin@gmail.com","password": "holamundo", "id": 1, "admin": true}];
const validUsers = [{
    "usuario": "hola",
    "nombre": "luisina",
    "apellido": "escobar",
    "email": "123@gmail.com",
    "telefono": "123456",
    "direccion": "hola 123",
    "password": "987654",
    "repPasswrd": "987654",
    "id": 1,
    "admin": false
},{
    "usuario": "admin",
    "nombre": "hola",
    "apellido": "niidea",
    "email": "admin@gmail.com",
    "telefono": "123456",
    "direccion": "holamundo 123",
    "password": "987",
    "repPasswrd": "987",
    "id": 2,
    "admin": true
}];
const platos = [
    { 'id': 1, 'descripcion': 'Bagel de salmon', 'precio': 425},
    { 'id': 2, 'descripcion': 'Hamburguesa clasica', 'precio': 500 },
    { 'id': 3, 'descripcion': 'Ensalada Veggie', 'precio': 325 }];
const pagos = [
    { 'id': 1, 'descripcion': 'efectivo' },
    { 'id': 2, 'descripcion': 'tarjeta' },
    { 'id': 3, 'descripcion': 'bitcoin' }];
const nuevosPedidos = [];
const confPedidos = [];
const estados = [
    { 'id': 1, 'descripcion': 'Pendiente' },
    { 'id': 2, 'descripcion': 'Confirmado' },
    { 'id': 3, 'descripcion': 'En preparacion' },
    { 'id': 4, 'descripcion': 'Enviado' },
    { 'id': 5, 'descripcion': 'Entregado' }];

module.exports = {
    validAdmin,
    validUsers,
    platos,
    pagos,
    nuevosPedidos,
    confPedidos,
    estados
}