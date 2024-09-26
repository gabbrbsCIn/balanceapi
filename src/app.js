const express = require("express");
require("dotenv").config();

const app = express();
const db = require("./models");
const PORT = process.env.PORT;

const authRoutes = require("./routes/auth/authRoutes");

const adminTransactionRoutes = require("./routes/transaction/adminTransactionRoutes");
const adminApartmentRoutes = require("./routes/apartment/adminApartmentRoutes");
const adminCondominiumRoutes = require("./routes/condominium/adminCondominiumRoutes");
const condominiumRoutes = require("./routes/condominium/condominiumRoutes");
const adminSectionRoutes = require("./routes/section/adminSectionRoutes");

const { admin } = require("./middlewares/admin.middleware");
const { authenticateToken } = require("./middlewares/auth.middleware");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}...`);
});

app.use("/", authRoutes);

app.use("/admin/:condominiumId/transaction", authenticateToken, admin, adminTransactionRoutes);
app.use("/admin/:condominiumId/apartment", authenticateToken, admin, adminApartmentRoutes);
app.use("/admin/:condominiumId/condominium", authenticateToken, admin, adminCondominiumRoutes);
app.use("/condominium", condominiumRoutes);
app.use("/admin/:condominiumId/section", authenticateToken, admin, adminSectionRoutes);

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Conexão com o banco de dados estabilizada com sucesso");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados", error);
  }
})();

module.exports = app;
