const HandlerError = require("../errors/handlerError");
const { checkResidentAdmin, checkDataFields } = require("../services/adminServices");
const { sendMessageError } = require("../services/authServices");
const admin = async (req, res, next) => {
  try {
    const residentId = req.user.id;
    const { condominiumId } = req.body;
    checkDataFields(condominiumId);
    await checkResidentAdmin(condominiumId, residentId);
    req.residentId = residentId;
    req.condominiumId = condominiumId;

    next();
  } catch (error) {
    if (error instanceof HandlerError) {
      sendMessageError(res, error);
    } else {
      console.log(error);
      res.send(error);
    }
  }
};
module.exports = {
  admin,
};
