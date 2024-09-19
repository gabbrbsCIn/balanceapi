const HandlerError = require("../errors/handlerError");
const {
  checkDataFields,
  checkApartmentDataFields,
  createCondominium,
  createSection,
  createApartment,
  findApartmentById,
  findResidentById,
  addResidentToApartment,
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
    checkDataFields(sectionName);
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

const apartment = async (req, res) => {
  try {
    const { sectionId, name } = req.body;
    checkApartmentDataFields(sectionId, name);
    const apartment = await createApartment(name, sectionId);
    sendSuccessResponse(res, apartment, "Apartamento criado com sucesso");
  } catch (error) {
    if (error instanceof HandlerError) {
      sendMessageError(res, error);
    } else {
      res.send(error).status(500);
    }
  }
};

const residentInAparment = async (req, res) => {
  try {
    const { residentId, apartmentId } = req.body;
    checkApartmentDataFields(residentId, apartmentId);
    await findResidentById(residentId);
    await findApartmentById(apartmentId);
    await addResidentToApartment(residentId, apartmentId);

    sendSuccessResponse(res, apartmentId, "Adicionado morador ao apartamento");
  } catch (error) {
    sendMessageError(res, error);
  }
};

module.exports = {
  condominium,
  section,
  apartment,
  residentInAparment,
};
