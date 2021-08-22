const { Sequelize, DataTypes, ValidationError } = require('sequelize');

function createOrderModel(connection) {
    const Order = connection.define('Order', {
        description: {
            type: DataTypes.TEXT
        },
        address: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    });
    return Order;
}

module.exports = {
    createOrderModel
}