const HandlerError = require("../../errors/handlerError");
const {
  checkDataFields,
  checkResidentDataFields,
  findResidentById,
  updateTransaction,
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
  getBalanceValueFromTransactions,
} = require("../../services/residentServices");

const balance = async (req, res) => {
  try {
    const condominiumId = req.condominiumId;
    const filterData = hasFilters(req);
    if (!filterData) {
      const today = new Date();
      const currentMonth = today.toISOString().slice(0, 7);
      let transactions = await getTransactionsFromCurrentMonth(
        currentMonth,
        condominiumId
      );
      const balanceValue = await getBalanceValueFromTransactions(transactions);
      transactions.push({ balanceValue: balanceValue });
      sendSucessResponse(res, transactions, "Transações Coletadas");
      return transactions;
    }
    let transactions = await getTransactionsByFilter(filterData, condominiumId);
    const balanceValue = await getBalanceValueFromTransactions(transactions);
    transactions.push({ balanceValue: balanceValue });
    sendSucessResponse(res, transactions, "Transações Coletadas");
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

const createOrder = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const { condominiumId } = req.params;
    const residentId = req.user.id;
    const filterData = { id: transactionId };
    const transaction = await getTransactionsByFilter(
      filterData,
      condominiumId
    );
    const resident = await findResidentById(residentId);
    const response = await generatePixQrCode(transaction[0], resident);
    sendSucessResponse(res, response.data, "QR-Code gerado");
  } catch (error) {
    if (error instanceof HandlerError) {
      sendMessageError(res, error);
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  }
};

const completePayment = async (req, res) => {
  try {
    const { charges, reference_id } = req.body;
    console.log(charges);
    const paymentStatus = charges[0].status;
    const transactionId = reference_id;
    if (paymentStatus === "PAID") {
      await updateTransaction({ paid: true }, transactionId);
      sendSucessResponse(res, transactionId, "Pagamento computado!");
    } else {
      res.send("Pagamento não foi realizado corretamente").status(500);
    }
  } catch (error) {
    console.log(error);
    sendMessageError(res, error);
  }
};

module.exports = {
  balance,
  update,
  createOrder,
  residentDebits,
  completePayment,
};
