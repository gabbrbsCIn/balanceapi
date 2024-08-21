const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const HandlerError = require("../errors/handlerError");
require("dotenv").config();

const verifyPassword = async (rightPassword, inputPassword) => {
  const passwordIsValid = await bcrypt.compare(inputPassword, rightPassword);
  if (!passwordIsValid) {
    throw new HandlerError("Senha inválida", 401);
  }
  return passwordIsValid;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  console.log(user)

  return user;
};

const userAuthenticate = async (email, inputPassword) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new HandlerError("E-mail inválido", 401);
  }
  await verifyPassword(user.password, inputPassword);
  console.log
  return user;
};

const generateJWTToken = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    }
  );

  return token;
};

const sendSucessResponse = (res, data) => {
  return res.status(200).json({ message: "Usuário logado", data: data });
};

const sendMessageError = (res, error) => {
  console.log(error.statusCode);
  return res.status(error.statusCode).json({ message: error.message });
};

const generateHashPassword = async (password) => {
  hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const userRegister = async (data) => {
  await findUserByEmail(data.email);
  if (findUserByEmail) {
    throw new HandlerError("Usuário já cadastrado", 400);
  }
  const hashedPassword = await generateHashPassword(data.password);
  const userDataRegister = {
    username: data.username,
    password: hashedPassword,
    email: data.email,
  };
  const user = await User.create(userDataRegister);
  return user;
};

const verifyDataFields = (data) => {
  if (!data.username || !data.password || !data.email) {
    throw new HandlerError("Todos os campos são obrigatórios", 400);
  }
};

module.exports = {
  userAuthenticate,
  generateJWTToken,
  findUserByEmail,
  verifyPassword,
  sendMessageError,
  sendSucessResponse,
  userRegister,
  verifyDataFields,
};
