const { Sequelize, DataTypes, ValidationError } = require('sequelize');

function createUserModel(connection) {
    const User = connection.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    },{
        timestamps: false
    });
    return User;
}

module.exports = {
    createUserModel
}