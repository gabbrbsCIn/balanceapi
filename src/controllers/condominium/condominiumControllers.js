const { createCondominium, updateCondominium, checkDataFields } = require("../../services/adminServices");
const { sendMessageError, sendSuccessResponse } = require("../../services/authServices");
const HandlerError = require("../../errors/handlerError");

const condominium = async (req, res) => {
    try {
        const { name } = req.body;
        checkDataFields(name);
        const residentAdminId = req.user.id;
        const condominium = await createCondominium(name, residentAdminId);
        sendSuccessResponse(res, condominium, "Condomínio criado com sucesso");
    } catch (error) {
        if (error instanceof HandlerError) {
            sendMessageError(res, error);
        } else {
            res.send(error).status(500);
        }
    }
};

const changeCondominium = async (req, res) => {
    try {
        const { condominiumName } = req.body;
        checkDataFields(condominiumName);
        const condominiumId = req.params.id;
        await updateCondominium(condominiumName, condominiumId);
        sendSuccessResponse(
            res,
            { condominiumId, condominiumName },
            "Condomínio atualizado"
        );
    } catch (error) {
        sendMessageError(res, error);
    }
};



module.exports = {
    condominium,
    changeCondominium
}