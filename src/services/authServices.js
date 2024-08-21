const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const HandlerError = require("../errors/handlerError");
require("dotenv").config();

const verifyDataFields = (data) => {
  if (!data.username || !data.password || !data.email) {
    throw new HandlerError("Todos os campos são obrigatórios", 400);
  }
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  return user;
};

const generateHashPassword = async (password) => {
  hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const userRegister = async (data) => {
  const user = await findUserByEmail(data.email);
  if (user) {
    throw new HandlerError("Esse usuário já existe!", 400);
  }
  const hashedPassword = await generateHashPassword(data.password);
  const userDataRegister = {
    username: data.username,
    password: hashedPassword,
    email: data.email,
  };
  await User.create(userDataRegister);
  return userDataRegister;
};

const sendSucessResponse = (res, data, message) => {
  return res.status(200).json({ message: message, data: data });
};

const sendMessageError = (res, error) => {
  console.log(error.statusCode);
  return res.status(error.statusCode).json({ message: error.message });
};

const verifyPassword = async (inputPassword, rightPassword) => {
  const passwordIsValid = await bcrypt.compare(inputPassword, rightPassword);
  if (!passwordIsValid) {
    throw new HandlerError("Senha inválida", 401);
  }
  return passwordIsValid;
};

const userAuthenticate = async (email, inputPassword) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new HandlerError("E-mail inválido", 401);
  }
  await verifyPassword(inputPassword, user.password);
  console.log;
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
