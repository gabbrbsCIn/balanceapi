const { Sequelize } = require("sequelize");
require("dotenv").config();

// const host = process.env.HOST;
// const database = process.env.DATABASE;
// const user = process.env.USER;
// const password = process.env.PASSWORD;
const databaseUrl = process.env.DB_URL

// console.log(host, database, user, password);

const sequelize = new Sequelize(databaseUrl) 
module.exports = sequelize;
