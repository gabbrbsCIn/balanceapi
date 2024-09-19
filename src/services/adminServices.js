const HandlerError = require("../errors/handlerError");
const { Condominium, Section, Apartment, Resident } = require("../models");

const checkDataFields = (name) => {
  if (!name) {
    throw new HandlerError("Os campos são obrigatórios");
  }
  return name;
};

const checkApartmentDataFields = (sectionId, name) => {
  if (!sectionId || !name) {
    throw new HandlerError("Os campos são obrigatórios");
  }
  return name;
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

const createCondominium = async (name, residentAdminId) => {
  const condominium = await Condominium.create({
    name: name,
    residentAdminId: residentAdminId,
  });
  return condominium;
};

const createSection = async (name, condominiumId) => {
  const section = await Section.create({
    name: name,
    condominiumId: condominiumId,
  });
  return section;
};

const createApartment = async (name, sectionId) => {
  const apartment = await Apartment.create({
    name: name,
    sectionId: sectionId,
  });
  return apartment;
};

const findResidentById = async (residentId) => {
  const resident = await Resident.findOne({
    where: {
      id: residentId,
    },
  });

  if (!resident) {
    throw new HandlerError("Morador não encontrado", 404);
  }
};

const findApartmentById = async (apartmentId) => {
  const apartment = await Apartment.findOne({
    where: {
      id: apartmentId,
    },
  });
  if (!apartment) {
    throw new HandlerError("Apartamento não encontrado", 404);
  }
};

const addResidentToApartment = async (residentId, apartmentId) => {
  const apartment = await Resident.update(
    {
      apartmentId: apartmentId,
    },
    {
      where: {
        id: residentId,
      },
    }
  );

  return apartment;
};

module.exports = {
  checkDataFields,
  createCondominium,
  checkResidentAdmin,
  createSection,
  checkApartmentDataFields,
  createApartment,
  findResidentById,
  findApartmentById,
  addResidentToApartment,
};
