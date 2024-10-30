  const bcrypt = require("bcrypt");
  const { Resident } = require("../models");
  const jwt = require("jsonwebtoken");
  const HandlerError = require("../errors/handlerError");
  const client = require("../config/redisClient");
  require("dotenv").config();

  const checkAuthDataFields = (data, method) => {
    if (method == "register") {
      if (!data.username || !data.password || !data.email) {
        throw new HandlerError("Todos os campos são obrigatórios", 400);
      }
    } else if (method == "login") {
      if (!data.password || !data.email) {
        throw new HandlerError("Todos os campos são obrigatórios", 400);
      }
    }
    return data;
  };

const findUserByEmail = async (email) => {
  const user = await Resident.findOne({
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
  await Resident.create(userDataRegister);
  return userDataRegister;
};

const sendSuccessResponse = (res, data, message) => {
  return res.status(200).json({ message: message, data: data });
};

const sendMessageError = (res, error) => {
  console.log(error);
  return res.status(error.statusCode).json({ message: error.message });
};

const verifyPassword = async (inputPassword, rightPassword) => {
  const isPasswordValid = await bcrypt.compare(inputPassword, rightPassword);
  if (!isPasswordValid) {
    throw new HandlerError("Senha inválida", 401);
  }
  return isPasswordValid;
};

const userAuthenticate = async (email, inputPassword) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new HandlerError("E-mail inválido", 401);
  }
  await verifyPassword(inputPassword, user.password);
  return user;
};

const generateJWTToken = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.username,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    }
  );

  return token;
};

const getTokenRemainingTime = (token) => {
  const decoded = jwt.decode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp - currentTime;
};

const addTokenToBlackList = async (token) => {
  const tokenRemainingTime = getTokenRemainingTime(token);
  await client.set(token, "revoked", "EXP", tokenRemainingTime);
  return token;
};
const checkTokenInBlackList = async (token) => {
  const isTokenInBlackList = await client.get(token);
  if (isTokenInBlackList) {
    throw new HandlerError("Token não autorizado", 400);
  }
  return isTokenInBlackList;
};

const extractTokenFromBearer = (token) => {
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  return token;
};

const extractTokenFromHeader = (req) => {
  let token = req["authorization"];
  if (!token) {
    throw new HandlerError("Nenhum token foi inserido", 403);
  }
  token = extractTokenFromBearer(token);
  return token;
};

const verifyJWTToken = (token) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const decodedToken = jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      throw new HandlerError(error.message, 400);
    }
    return decoded;
  });
  return decodedToken;
};

module.exports = {
  userAuthenticate,
  generateJWTToken,
  findUserByEmail,
  verifyPassword,
  sendMessageError,
  sendSuccessResponse,
  userRegister,
  checkAuthDataFields,
  addTokenToBlackList,
  checkTokenInBlackList,
  extractTokenFromHeader,
  verifyJWTToken,
};
