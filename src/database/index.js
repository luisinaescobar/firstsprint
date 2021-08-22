const Sequelize = require('sequelize');
const { createProductModel } = require('./models/products');
const { createPaymentModel } = require('./models/payments');
const { createUserModel } = require('./models/users');
const { createOrderModel } = require('./models/order');
const { createStatusModel } = require('./models/status');
const { createProductOrderModel } = require('./models/productorder');

const models = {};
async function connect(host, port, username, password, database) {
  const connection = new Sequelize({
    database,
    username,
    password,
    host,
    port,
    dialect: 'mariadb'
  });
  
  models.User = createUserModel(connection);
  models.Product = createProductModel(connection);
  models.Payment = createPaymentModel(connection);
  models.Order = createOrderModel(connection);
  models.Status = createStatusModel(connection);
  models.Productorder = createProductOrderModel(connection, models.Product, models.Order);
  ///Associations
  models.User.hasMany(models.Order);
  models.Order.belongsTo(models.User);

  models.Payment.hasOne(models.Order);
  models.Order.belongsTo(models.Payment);

  models.Product.hasOne(models.Order, { through: models.Productorder } );
  models.Order.belongsTo(models.Product, { through: models.Productorder });

  models.Status.hasOne(models.Order);
  models.Order.belongsTo(models.Status);

  models.Status.sync();
  models.User.sync();
  models.Product.sync();
  models.Payment.sync();
  models.Order.sync();
  models.Productorder.sync();
  try {
    await connection.authenticate();
    await connection.sync();

    console.log('connection has been established successfully');
    return true;
  } catch (error) {
    console.error('unable to connect to the database: ', error);
    return false;
  }
}

function getModel(name) {
  console.log(models)
  if (models[name]) {
    return models[name];
  } else {
    console.error('Model does not exist');
    return null
  }
}

module.exports = {
  connect, getModel
};
