const jwt = require("jsonwebtoken");
require("dotenv").config();
const { checkTokenInBlackList } = require("../services/authServices");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .send({ message: "Nenhum token válido foi fornecido!" });
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    const isTokenInBlackList = checkTokenInBlackList(token);
    if (err || isTokenInBlackList) {
      return res.status(401).send({ message: "Token não autorizado!" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
