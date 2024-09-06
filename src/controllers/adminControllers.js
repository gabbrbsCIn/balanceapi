const HandlerError = require("../errors/handlerError");
const { checkDataFields, createCondominium} = require("../services/adminServices");
const { sendSucessResponse, sendMessageError } = require("../services/authServices");

const condominium = async (req, res) => {
  try {
    const { name } = req.body;
    checkDataFields(name);
    const residentAdminId = req.user.id;
    console.log(residentAdminId)
    const condominium = await createCondominium(name, residentAdminId);
    sendSucessResponse(res, condominium, "Condomínio criado com sucesso");
  } catch (error) {
    if (error instanceof HandlerError){
        sendMessageError(res, error);
    } else {
        res.send(error).status(500);
    }
  }
};

module.exports = {
  condominium,
};
