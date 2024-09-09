const HandlerError = require("../errors/handlerError");
const { checkResidentAdmin } = require("../services/adminServices");
const { sendMessageError } = require("../services/authServices");
const admin = async (req, res, next) => {
  try {
    const residentId = req.user.id;
    const { condominiumId } = req.body;
    await checkResidentAdmin(condominiumId, residentId);

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
