const app = require("../src/app");
require("dotenv").config();
const client = require("./config/redisClient");
const db = require("./models");
const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}...`);
});

(async () => {
  try {
    await db.sequelize.authenticate();
    await client.connect();
    console.log("Conexão com o banco de dados estabilizada com sucesso");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados", error);
  }
})();
