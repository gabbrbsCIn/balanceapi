const {
  userAuthenticate,
  sendMessageError,
  sendSucessResponse,
  generateJWTToken,
  userRegister,
  verifyDataFields,
} = require("../services/authServices");
const HandlerError = require("../errors/handlerError");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const data = {
      username,
      password,
      email,
    };
    verifyDataFields(data);
    const user = await userRegister(data);
    sendSucessResponse(res, user);
  } catch (error) {
    sendMessageError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userAuthenticate(email, password);

    const token = await generateJWTToken(user);

    sendSucessResponse(res, token);
  } catch (error) {
    sendMessageError(res, error);
  }
};

module.exports = {
  register,
  login,
};
