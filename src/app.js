const express = require("express");
require("dotenv").config();

const app = express();
const db = require("./models");

const userRoutes = require("./routes/user");

app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}...`);
});

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Conexão com o banco de dados estabilizada com sucesso");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados", error);
  }
})();

app.use("/user", userRoutes);

module.exports = app;
