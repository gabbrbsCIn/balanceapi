const HandlerError = require("../errors/handlerError");
const { Condominium, Section } = require("../models");

const checkDataFields = (name) => {
  if (!name) {
    throw new HandlerError("Os campos são obrigatórios");
  }
  return name;
};

const createCondominium = async (name, residentAdminId) => {
  const condominium = await Condominium.create({
    name: name,
    residentAdminId: residentAdminId,
  });
  return condominium;
};

const createSection = async (name, condominiumId) => {
  console.log(name, condominiumId)
  const section = await Section.create({
    name: name,
    condominiumId: condominiumId,
  });
  return section;
};

const checkResidentAdmin = async (condominiumId, residentId) => {
  const condominium = await Condominium.findOne({
    where: {
      id: condominiumId,
      residentAdminId: residentId,
    },
    attributes: ["id", "name", "residentAdminId"],
  });

  if (!condominium) {
    throw new HandlerError(
      "Você não tem permissão para realizar essa operação nesse condomínio",
      403
    );
  }
  return condominium;
};

module.exports = {
  checkDataFields,
  createCondominium,
  checkResidentAdmin,
  createSection,
};
