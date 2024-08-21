const {
  userAuthenticate,
  sendMessageError,
  sendSucessResponse,
  generateJWTToken,
  userRegister,
  verifyDataFields,
} = require("../services/authServices");

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
    sendSucessResponse(res, user.email, "Usuário cadastrado!");
  } catch (error) {
    sendMessageError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userAuthenticate(email, password);
    const token = await generateJWTToken(user);
    sendSucessResponse(res, {id: user.id, email: user.email, acessToken: token}, "Usuário logado");
  } catch (error) {
    sendMessageError(res, error);
  }
};

module.exports = {
  register,
  login,
};
