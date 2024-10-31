const express = require("express");
require("dotenv").config();

const app = express();
const client = require("./config/redisClient");
const db = require("./models");
const PORT = process.env.PORT;

const authRoutes = require("./routes/auth/authRoutes");

const adminTransactionRoutes = require("./routes/transaction/adminTransactionRoutes");
const adminApartmentRoutes = require("./routes/apartment/adminApartmentRoutes");
const adminCondominiumRoutes = require("./routes/condominium/adminCondominiumRoutes");
const condominiumRoutes = require("./routes/condominium/condominiumRoutes");
const adminSectionRoutes = require("./routes/section/adminSectionRoutes");
const residentRoutes = require("./routes/resident/residentRoutes");

const { admin } = require("./middlewares/admin.middleware");
const { authenticateToken } = require("./middlewares/auth.middleware");

app.use(express.json());

app.use("/", authRoutes);
app.use(
  "/admin/:condominiumId/transaction",
  authenticateToken,
  admin,
  adminTransactionRoutes
);
app.use(
  "/admin/:condominiumId/apartment",
  authenticateToken,
  admin,
  adminApartmentRoutes
);
app.use(
  "/admin/:condominiumId/condominium",
  authenticateToken,
  admin,
  adminCondominiumRoutes
);
app.use("/condominium", condominiumRoutes);
app.use("/resident", authenticateToken, residentRoutes);
app.use(
  "/admin/:condominiumId/section",
  authenticateToken,
  admin,
  adminSectionRoutes
);


module.exports = app;
