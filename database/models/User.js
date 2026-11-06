const { DataTypes, Model } = require('sequelize');
const  bcrypt = require('bcrypt');
const dbClient = require('../connect');

class User extends Model {};

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue("password",bcrypt.hashSync(val,10));
        }
    },
    scopes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: ["me:read","me:write"]
    }
        
},{
    sequelize: dbClient,
    tableName: "users",
})

module.exports = User;