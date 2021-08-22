const { Sequelize, DataTypes } = require('sequelize');

function createProductOrderModel(connection, Product, Order) {
    const Productorder = connection.define('Productorder', {
        ProductId: {
            type: DataTypes.INTEGER,
            references: {

                model: Product,

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        OrderId: {
            type: DataTypes.INTEGER,
            references: {
                // This is a reference to another model
                model: Order,

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.INTEGER,
          
        }
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