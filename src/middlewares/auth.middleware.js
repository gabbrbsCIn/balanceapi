require("dotenv").config();
const {
  extractTokenFromHeader,
  sendMessageError,
  verifyJWTToken,
  checkTokenInBlackList,
} = require("../services/authServices");

const authenticateToken = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    checkTokenInBlackList(token);
    const decodedToken = verifyJWTToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    sendMessageError(res, error);
  }
};

module.exports = {
  authenticateToken,
};
