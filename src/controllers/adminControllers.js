const HandlerError = require("../errors/handlerError");
const {
  checkDataFields,
  createCondominium,
  createSection,
} = require("../services/adminServices");
const {
  sendSuccessResponse,
  sendMessageError,
} = require("../services/authServices");

const condominium = async (req, res) => {
  try {
    const { name } = req.body;
    checkDataFields(name);
    const residentAdminId = req.user.id;
    const condominium = await createCondominium(name, residentAdminId);
    sendSuccessResponse(res, condominium, "Condomínio criado com sucesso");
  } catch (error) {
    if (error instanceof HandlerError) {
      sendMessageError(res, error);
    } else {
      res.send(error).status(500);
    }
  }
};

const section = async (req, res) => {
  try {
    const { condominiumId, sectionName } = req.body;
    console.log(checkDataFields(sectionName));
    const section = await createSection(sectionName, condominiumId);
    sendSuccessResponse(res, section, "Bloco criado com sucesso");
  } catch (error) {
    if (error instanceof HandlerError) {
      sendMessageError(res, error);
    } else {
      res.send(error).status(500);
    }
  }
};

module.exports = {
  condominium,
  section,
};
