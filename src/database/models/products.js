const { Sequelize, DataTypes, ValidationError } = require('sequelize');
function createProductModel(connection) {
    const Product = connection.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },{
        timestamps: false
    });
    return Product;
}

module.exports = {
    createProductModel
}