const {
  checkDataFields,
  checkResidentDataFields,
} = require("../../services/adminServices");
const {
  sendSucessResponse,
  sendMessageError,
  checkAuthDataFields,
} = require("../../services/authServices");
const {
  hasFilters,
  getTransactionsFromCurrentMonth,
  getTransactionsByFilter,
  updateResident,
  updateResidentById,
} = require("../../services/residentServices");

const balance = async (req, res) => {
  try {
    const filterData = hasFilters(req);
    if (!filterData) {
      const today = new Date();
      const currentMonth = today.toISOString().slice(0, 7);
      const transaction = await getTransactionsFromCurrentMonth(currentMonth);
      sendSucessResponse(res, transaction, "Transações Coletadas");
      return transaction;
    }
    const transaction = await getTransactionsByFilter(filterData);
    sendSucessResponse(res, transaction, "Transações Coletadas");
  } catch (error) {
    sendMessageError(res, error);
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

module.exports = {
  balance,
  update,
};
