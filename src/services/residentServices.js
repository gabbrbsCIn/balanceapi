const { Op } = require("sequelize");
const HandlerError = require("../errors/handlerError");
const { FinantialTransactions } = require("../models");
const moment = require("moment");

const hasFilters = (req) => {
  let filterData = {};
  if (Object.keys(req.query).length === 0) {
    return false;
  }
  if (req.query.startDate || req.query.endDate) {
    filterData.transactionData = {};
    if (req.query.startDate) {
      filterData.transactionData[Op.gte] = req.query.startDate;
    }
    if (req.query.endDate) {
      filterData.transactionData[Op.lte] = req.query.endDate;
    }
  }
  return filterData;
};

const getTransactionsFromCurrentMonth = async (currentMonth) => {
  const startOfMonth = moment(currentMonth)
    .startOf("month")
    .format("YYYY-MM-DD");
  const endOfMonth = moment(currentMonth).endOf("month").format("YYYY-MM-DD");

  const transactions = await FinantialTransactions.findAll({
    where: {
      transactionData: {
        [Op.between]: [startOfMonth, endOfMonth],
      },
    },
  });
  if (transactions.length == 0) {
    throw new HandlerError("Nenhuma transação foi encontrada", 400);
  }
  return transactions;
};

const getTransactionsByFilter = async (filterData) => {
  const transactions = await FinantialTransactions.findAll({
    where: filterData,
  });
  if (transactions.length == 0) {
    throw new HandlerError("Nenhuma transação foi encontrada", 400);
  }
  return transactions;
};

module.exports = {
  hasFilters,
  getTransactionsFromCurrentMonth,
  getTransactionsByFilter,
};
