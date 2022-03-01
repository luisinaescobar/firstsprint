const { Sequelize, DataTypes } = require('sequelize');


function createProductOrderModel(connection, Product, Order) {
    const Productorder = connection.define('Productorder', {
        ProductId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: 'id'
            }
        },
        OrderId: {
            type: DataTypes.INTEGER,
            references: {
                model: Order,
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        total:{
            type: DataTypes.INTEGER,
        },
    }, {
        // Other model options go here
        modelName: 'productorder',
        tableName: 'productorder'
    });
    return Productorder;
}

module.exports = {
    createProductOrderModel
}