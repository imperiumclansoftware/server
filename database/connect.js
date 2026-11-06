const { Sequelize } = require('sequelize');

const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config({
    path: path.join(__dirname, process.env.NODE_ENV == "prod" ? '../.env.prod' : '../.env.local')
});

const dbClient = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT
});

// async function connectDb() {
//     try {
//         dbClient.authenticate();
//         console.log('Database', 'Database connected !');
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// connectDb();

module.exports = dbClient 