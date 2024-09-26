const express = require("express");
require("dotenv").config();

const app = express();
const db = require("./models");
const PORT = process.env.PORT;

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { admin } = require("./middlewares/admin.middleware");
const { authenticateToken } = require("./middlewares/auth.middleware");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}...`);
});

app.use("/", authRoutes);
app.use("/admin/:condominiumId", authenticateToken, admin, adminRoutes);

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Conexão com o banco de dados estabilizada com sucesso");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados", error);
  }
})();

module.exports = app;
