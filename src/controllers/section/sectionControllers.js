const {
  createSection,
  updateSection,
  deleteSectionById,
  checkDataFields
} = require("../../services/adminServices");
const {
  sendMessageError,
  sendSucessResponse,
} = require("../../services/authServices");
const HandlerError = require("../../errors/handlerError");

const section = async (req, res) => {
  try {
    const { sectionName } = req.body;
    const condominiumId = req.condominiumId;
    checkDataFields(sectionName);
    const section = await createSection(sectionName, condominiumId);
    sendSucessResponse(res, section, "Bloco criado com sucesso");
  } catch (error) {
    if (error instanceof HandlerError) {
      sendMessageError(res, error);
    } else {
      res.send(error).status(500);
    }
  }
};

const changeSection = async (req, res) => {
  try {
    const { sectionName } = req.body;
    checkDataFields(sectionName);
    const sectionId = req.params.id;
    await updateSection(sectionName, sectionId);
    sendSucessResponse(res, { sectionId, sectionName }, "Bloco atualizado");
  } catch (error) {
    sendMessageError(res, error);
  }
};

const deleteSection = async (req, res) => {
  try {
    const sectionId = req.params.id;
    await deleteSectionById(sectionId);
    sendSucessResponse(res, sectionId, "Bloco removido com sucesso");
  } catch (error) {
    sendMessageError(res, error);
  }
};
module.exports = {
  section,
  changeSection,
  deleteSection,
};
