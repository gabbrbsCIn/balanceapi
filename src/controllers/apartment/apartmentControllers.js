const { createApartment, checkApartmentDataFields, findApartmentById, findResidentById, addResidentToApartment, updateApartment, deleteApartmentById } = require("../../services/adminServices")
const { sendMessageError, sendSuccessResponse } = require("../../services/authServices");
const HandlerError = require("../../errors/handlerError");

const apartment = async (req, res) => {
    try {
        const { sectionId, name } = req.body;
        checkApartmentDataFields(sectionId, name);
        const apartment = await createApartment(name, sectionId);
        sendSuccessResponse(res, apartment, "Apartamento criado com sucesso");
    } catch (error) {
        if (error instanceof HandlerError) {
            sendMessageError(res, error);
        } else {
            res.send(error).status(500);
        }
    }
};

const residentInAparment = async (req, res) => {
    try {
        const { residentId, apartmentId } = req.body;
        checkApartmentDataFields(residentId, apartmentId);
        await findResidentById(residentId);
        await findApartmentById(apartmentId);
        await addResidentToApartment(residentId, apartmentId);

        sendSuccessResponse(res, apartmentId, "Adicionado morador ao apartamento");
    } catch (error) {
        sendMessageError(res, error);
    }
};

const changeApartment = async (req, res) => {
    try {
        const { apartmentName } = req.body;
        checkDataFields(apartmentName);
        const apartmentId = req.params.id;
        await updateApartment(apartmentName, apartmentId);
        sendSuccessResponse(
            res,
            { apartmentId, apartmentName },
            "Apartamento atualizado"
        );
    } catch (error) {
        sendMessageError(res, error);
    }
};

const deleteApartment = async (req, res) => {
    try {
        const apartamentId = req.params.id;
        await deleteApartmentById(apartamentId);
        sendSuccessResponse(res, apartamentId, "Apartmento removido com sucesso");
    } catch (error) {
        sendMessageError(res, error);
    }
};

module.exports = {
    apartment,
    residentInAparment,
    changeApartment,
    deleteApartment
};