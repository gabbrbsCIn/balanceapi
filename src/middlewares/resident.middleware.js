const { sendMessageError } = require("../services/authServices");
const { findCondominiumByResidentId } = require("../services/residentServices");

const checkResidentInCondominium = async (req, res, next) => {
  try {
    const { condominiumId } = req.params;
    const residentId = req.user.id;
    
    await findCondominiumByResidentId(residentId, condominiumId);
    req.condominiumId = condominiumId;
    next();
  } catch (error) {
    sendMessageError(res, error);
  }
};

module.exports = {
  checkResidentInCondominium,
};
