const { DataTypes, Model } = require('sequelize');
const { bcrypt } = require('bcrypt');
const dbClient = require('../connect');

class Product extends Model { };

Product.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    price: {type: DataTypes.FLOAT,
        allowNull: false

    },
    scopes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: ["me:read", "me:write"]
    }

}, {
    sequelize: dbClient,
    tableName: "products",
})

module.exports = Product;