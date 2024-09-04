const {
  userAuthenticate,
  sendMessageError,
  sendSucessResponse,
  generateJWTToken,
  userRegister,
  checkDataFields,
  addTokenToBlackList,
  extractTokenFromHeader,
} = require("../services/authServices");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const data = {
      username,
      password,
      email,
    };
    console.log(data);
    checkDataFields(data, "register");
    const user = await userRegister(data);
    sendSucessResponse(res, user.email, "Usuário cadastrado!");
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
    checkDataFields(data, "login");
    const user = await userAuthenticate(email, password);
    const token = await generateJWTToken(user);
    sendSucessResponse(
      res,
      { id: user.id, email: user.email, acessToken: token },
      "Usuário logado"
    );
  } catch (error) {
    sendMessageError(res, error);
  }
};

const test = async (req, res) => {
  return res.send(req.user.name).status(200);
};

const logout = async (req, res) => {
  const token = extractTokenFromHeader(req.headers);

  if (token) {
    addTokenToBlackList(token);
    res.clearCookie("token");
  }

  return sendSucessResponse(res, "logout", "Usuário Deslogado!");
};

module.exports = {
  register,
  login,
  logout,
  test,
};
