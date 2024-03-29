const { Sequelize, DataTypes, ValidationError } = require('sequelize');
function createPaymentModel(connection) {
    const Payment = connection.define('Payment', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

    }, {
        timestamps: false
    });
    return Payment;
}

module.exports = {
    createPaymentModel
}