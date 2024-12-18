const {
  userAuthenticate,
  sendMessageError,
  sendSuccessResponse,
  generateJWTToken,
  userRegister,
  checkAuthDataFields,
  addTokenToBlackList,
  extractTokenFromHeader,
} = require("../../services/authServices");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const data = {
      username,
      password,
      email,
    };
    checkAuthDataFields(data, "register");
    const user = await userRegister(data);
    sendSuccessResponse(res, user.email, "Usuário cadastrado!");
  } catch (error) {
    sendMessageError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = {
      password,
      email,
    };
    checkAuthDataFields(data, "login");
    const user = await userAuthenticate(email, password);
    const token = await generateJWTToken(user);
    sendSuccessResponse(
      res,
      { id: user.id, email: user.email, accessToken: token },
      "Usuário logado"
    );
  } catch (error) {
    sendMessageError(res, error);
  }
};

const logout = async (req, res) => {
  const token = extractTokenFromHeader(req.headers);
  if (token) {
    await addTokenToBlackList(token);
  }
  return sendSuccessResponse(res, "logout", "Usuário Deslogado!");
};

module.exports = {
  register,
  login,
  logout,
};
