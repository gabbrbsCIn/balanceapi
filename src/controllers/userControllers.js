const bcrypt = require("bcrypt");
const { User } = require("../models");


const register = async (req, res) => {
  const { username, password, email } = req.body;
  const userRegisterData = { username, password: '', email };

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    userRegisterData.password = hashedPassword;
    await User.create(userRegisterData);
    res.status(200).send({ message: "Usuário Registrado!" });

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Erro ao registrar usuário" });
  }
};

module.exports = {
  register,
};
