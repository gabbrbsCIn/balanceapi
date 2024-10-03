const HandlerError = require("../../errors/handlerError");
const {
  checkDataFields,
  checkResidentDataFields,
} = require("../../services/adminServices");
const {
  sendSucessResponse,
  sendMessageError,
  checkAuthDataFields,
} = require("../../services/authServices");
const { generatePixQrCode } = require("../../services/paymentServices");
const {
  hasFilters,
  getTransactionsFromCurrentMonth,
  getTransactionsByFilter,
  updateResidentById,
} = require("../../services/residentServices");

const balance = async (req, res) => {
  try {
    const condominiumId = req.condominiumId;
    const filterData = hasFilters(req);
    if (!filterData) {
      const today = new Date();
      const currentMonth = today.toISOString().slice(0, 7);
      const transaction = await getTransactionsFromCurrentMonth(
        currentMonth,
        condominiumId
      );
      sendSucessResponse(res, transaction, "Transações Coletadas");
      return transaction;
    }
    const transaction = await getTransactionsByFilter(
      filterData,
      condominiumId
    );
    sendSucessResponse(res, transaction, "Transações Coletadas");
  } catch (error) {
    sendMessageError(res, error.message);
  }
};

const update = async (req, res) => {
  try {
    const { username, email } = req.body;
    const data = {
      username,
      email,
    };
    checkResidentDataFields(email, username);
    const residentId = req.user.id;
    await updateResidentById(data, residentId);
    sendSucessResponse(res, residentId, "Usuário atualizado!");
  } catch (error) {
    sendMessageError(res, error);
  }
};

const residentDebits = async (req, res) => {
  try {
    const condominiumId = req.condominiumId;
    const residentId = req.user.id;
    const filterData = { residentId: residentId, paid: false };
    const transaction = await getTransactionsByFilter(
      filterData,
      condominiumId
    );
    sendSucessResponse(res, transaction, "Débitos coletados");
  } catch (error) {
    if (error instanceof HandlerError) {
      sendMessageError(res, error);
    } else {
      res.status(500).send(error);
    }
  }
};

const payDebits = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const response = await generatePixQrCode();
    sendSucessResponse(res, response.qr_codes, "QR-Code gerado");
  } catch (error) {
    sendMessageError(res, error);
  }
};

module.exports = {
  balance,
  update,
  payDebits,
  residentDebits,
};
