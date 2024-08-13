const { Sequelize } = require("sequelize");
require("dotenv").config();

// const host = process.env.HOST;
// const database = process.env.DATABASE;
// const user = process.env.USER;
// const password = process.env.PASSWORD;

// console.log(host, database, user, password);

const sequelize = new Sequelize('postgresql://postgres.yocgxsulyvffdkcjrlxo:jm6O79FpQEvARGug@aws-0-sa-east-1.pooler.supabase.com:6543/postgres') 
module.exports = sequelize;
