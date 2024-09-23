const HandlerError = require("../errors/handlerError");
const {
  Condominium,
  Section,
  Apartment,
  Resident,
  FinantialTransactions,
} = require("../models");

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

const checkTransactionDataFields = async (transactionData) => {
  if (
    !transactionData.name ||
    !transactionData.type ||
    !transactionData.value ||
    !transactionData.residentId ||
    !transactionData.transactionData ||
    !transactionData.paid
  ) {
    throw new HandlerError("Há campos não preenchidos", 400);
  }
  return transactionData;
};

const createTransaction = async (transactionData) => {
  const transaction = await FinantialTransactions.create(transactionData);

  return transaction;
};

const updateTransaction = async (transactionData, transactionId) => {
  const transaction = await FinantialTransactions.update(transactionData, {
    where: {
      id: transactionId,
    },
  });

  if (transaction[0] == 0) {
    throw new HandlerError("ID da transação inválida", 400);
  }
  return transaction;
};

const updateSection = async (sectionName, sectionId) => {
  const section = await Section.update(
    {
      name: sectionName,
    },
    {
      where: {
        id: sectionId,
      },
    }
  );
  if (section[0] == 0) {
    throw new HandlerError("ID do bloco inválida", 400);
  }

  return section;
};
const updateCondominium = async (condominiumName, condominiumId) => {
  const condominium = await Condominium.update(
    {
      name: condominiumName,
    },
    {
      where: {
        id: condominiumId,
      },
    }
  );
  if (condominium[0] == 0) {
    throw new HandlerError("ID do condomínio inválido", 400);
  }

  return condominium;
};

const updateApartment = async (apartmentName, apartmentId) => {
  const apartment = await Apartment.update(
    {
      name: apartmentName,
    },
    {
      where: {
        id: apartmentId,
      },
    }
  );
  if (apartment[0] == 0) {
    throw new HandlerError("ID do apartamento inválido", 400);
  }

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
  checkTransactionDataFields,
  createTransaction,
  updateTransaction,
  updateSection,
  updateCondominium,
  updateApartment
};
