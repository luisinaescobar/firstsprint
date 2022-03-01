const { Sequelize, DataTypes, ValidationError } = require('sequelize');

function createOrderModel(connection) {
    const Order = connection.define('Order', {
        address: {
            type: DataTypes.STRING,
        },
    });

    return Order;
}

module.exports = {
    createOrderModel
}