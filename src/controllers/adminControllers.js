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
  checkTransactionDataFields,
  createTransaction,
  updateTransaction,
  updateSection,
  updateCondominium,
  updateApartment,
} = require("../services/adminServices");
const {
  sendSucessResponse,
  sendMessageError,
} = require("../services/authServices");

const condominium = async (req, res) => {
  try {
    const { name } = req.body;
    checkDataFields(name);
    const residentAdminId = req.user.id;
    const condominium = await createCondominium(name, residentAdminId);
    sendSucessResponse(res, condominium, "Condomínio criado com sucesso");
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
    sendSucessResponse(res, section, "Bloco criado com sucesso");
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
    sendSucessResponse(res, apartment, "Apartamento criado com sucesso");
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

    sendSucessResponse(res, apartmentId, "Adicionado morador ao apartamento");
  } catch (error) {
    sendMessageError(res, error);
  }
};

const transaction = async (req, res) => {
  try {
    const { name, type, value, residentId, transactionData, paid } = req.body;
    const transaction = {
      name,
      type,
      value,
      residentId,
      transactionData,
      paid,
    };
    checkTransactionDataFields(transaction);
    const newTransaction = await createTransaction(transaction);
    sendSucessResponse(
      res,
      newTransaction,
      "Transação adicionada ao balanço do condomínio"
    );
  } catch (error) {
    sendMessageError(res, error);
  }
};

const changeTransaction = async (req, res) => {
  try {
    const { name, type, value, residentId, transactionData, paid } = req.body;
    const transaction = {
      name,
      type,
      value,
      residentId,
      transactionData,
      paid,
    };
    checkTransactionDataFields(transaction);
    const transactionId = req.params.id;
    await updateTransaction(transaction, transactionId);
    sendSucessResponse(
      res,
      { transactionId, transaction },
      "Transação atualizada"
    );
  } catch (error) {
    sendMessageError(res, error);
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

const changeCondominium = async (req, res) => {
  try {
    const { condominiumName } = req.body;
    checkDataFields(condominiumName);
    const condominiumId = req.params.id;
    await updateCondominium(condominiumName, condominiumId);
    sendSucessResponse(
      res,
      { condominiumId, condominiumName },
      "Condomínio atualizado"
    );
  } catch (error) {
    sendMessageError(res, error);
  }
};
const changeApartment = async (req, res) => {
  try {
    const { apartmentName } = req.body;
    checkDataFields(apartmentName);
    const apartmentId = req.params.id;
    await updateApartment(apartmentName, apartmentId);
    sendSucessResponse(
      res,
      { apartmentId, apartmentName },
      "Apartamento atualizado"
    );
  } catch (error) {
    sendMessageError(res, error);
  }
};

module.exports = {
  condominium,
  section,
  apartment,
  residentInAparment,
  transaction,
  changeTransaction,
  changeSection,
  changeCondominium,
  changeApartment,
};
