require("dotenv").config();
const {
  extractTokenFromHeader,
  sendMessageError,
  verifyJWTToken,
  checkTokenInBlackList,
} = require("../services/authServices");

const authenticateToken = (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    checkTokenInBlackList(token);
    verifyJWTToken(req, token, next);
  } catch (error) {
    sendMessageError(res, error);
  }
};

module.exports = {
  authenticateToken,
};
