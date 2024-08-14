const express = require("express");
const app = express();
const connection = require('./config/database');
const User = require("./models/userModel");
require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT;

(async () => {
  try {
    await connection.authenticate();
    console.log('Conexão com o banco de dados estabilizada com sucesso');

    await connection.sync();
    console.log("Models sincronizados com o banco de dados");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}...`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados', error);
  }
})();

