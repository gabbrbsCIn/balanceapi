const HandlerError = require("../errors/handlerError");
const { Condominium } = require("../models");

const checkDataFields = (name) => {
  if (!name) {
    throw new HandlerError("Os campos são obrigatórios");
  }
  return name;
};

const createCondominium = async (name, residentAdminId) => {
  const condominium = await Condominium.create({ name: name, residentAdminId: residentAdminId });
  return condominium;
};

module.exports = {
  checkDataFields,
  createCondominium,
};
