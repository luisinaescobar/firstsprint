const { Sequelize, DataTypes, ValidationError } = require('sequelize');
function createStatusModel(connection) {
    const Status = connection.define('Status', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    },{
        timestamps: false
    });
    return Status;
}

module.exports = {
    createStatusModel
}