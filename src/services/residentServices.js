const { Op } = require("sequelize");
const HandlerError = require("../errors/handlerError");
const {
  FinantialTransactions,
  Resident,
  Condominium,
  Section,
  Apartment,
} = require("../models");
const moment = require("moment");

const hasFilters = (req) => {
  let filterData = {};
  if (Object.keys(req.query).length === 0) {
    return false;
  }
  filterData = req.query;
  if (req.query.startDate || req.query.endDate) {
    filterData.transactionData = {};
    if (req.query.startDate) {
      filterData.transactionData[Op.gte] = req.query.startDate;
    }
    if (req.query.endDate) {
      filterData.transactionData[Op.lte] = req.query.endDate;
    }
    delete filterData.startDate;
    delete filterData.endDate;
  }
  return filterData;
};

const getTransactionsFromCurrentMonth = async (currentMonth, condominiumId) => {
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
    include: {
      model: Resident,
      required: true,
      attributes : [],
      include: {
        model: Apartment,
        required: true,
        attributes : [],
        include: {
          model: Section,
          required: true,
          attributes : [],
          include: {
            model: Condominium,
            where: { id: condominiumId },
            required: true,
            attributes : [],
          },
        },
      },
    },
  });
  if (transactions.length == 0) {
    throw new HandlerError("Nenhuma transação foi encontrada", 400);
  }
  return transactions;
};

const getTransactionsByFilter = async (filterData, condominiumId) => {
  const transactions = await FinantialTransactions.findAll({
    where: filterData,
    include: {
      model: Resident,
      required: true,
      attributes : [],
      include: {
        model: Apartment,
        required: true,
        attributes : [],
        include: {
          model: Section,
          required: true,
          attributes : [],
          include: {
            model: Condominium,
            where: { id: condominiumId },
            required: true,
            attributes : [],
          },
        },
      },
    },
  });
  if (transactions.length == 0) {
    throw new HandlerError("Nenhuma transação foi encontrada", 400);
  }
  return transactions;
};

const updateResidentById = async (data, residentId) => {
  console.log(data, residentId);
  const resident = await Resident.update(data, {
    where: {
      id: residentId,
    },
  });
  console.log(resident);
  return resident;
};

const findCondominiumByResidentId = async (residentId, condominiumId) => {
  const resident = await Resident.findByPk(residentId, {
    include: {
      model: Apartment,
      required: true,
      include: {
        model: Section,
        required: true,
        include: {
          model: Condominium,
          where: { id: condominiumId },
          required: true,
        },
      },
    },
  });

  if (!resident) {
    throw new HandlerError(
      "Morador não tem permissão para a operação neste condomínio"
    );
  }

  return resident;
};

module.exports = {
  hasFilters,
  getTransactionsFromCurrentMonth,
  getTransactionsByFilter,
  updateResidentById,
  findCondominiumByResidentId,
};
