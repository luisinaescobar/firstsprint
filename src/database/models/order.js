const { Sequelize, DataTypes, ValidationError } = require('sequelize');

function createOrderModel(connection) {
    const Order = connection.define('Order', {
        quantity: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING,
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        total: {
            type: DataTypes.INTEGER
        }
    });
    
    return Order;
}

module.exports = {
    createOrderModel
}