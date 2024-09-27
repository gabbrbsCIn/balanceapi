const {
  sendSucessResponse,
  sendMessageError,
} = require("../../services/authServices");
const {
  hasFilters,
  getTransactionsFromCurrentMonth,
  getTransactionsByFilter,
} = require("../../services/residentServices");

const balance = async (req, res) => {
  try {
    const filterData = hasFilters(req);
    if (!filterData) {
      const today = new Date();
      const currentMonth = today.toISOString().slice(0, 7);
      const balance = await getTransactionsFromCurrentMonth(currentMonth);
      sendSucessResponse(res, balance, "Transações Coletadas");
      return balance;
    }
    const balance = await getTransactionsByFilter(filterData);
    sendSucessResponse(res, balance, "Transações Coletadas");
  } catch (error) {
    sendMessageError(res, error);
  }
};

module.exports = {
  balance,
};
