const { createApartment, checkApartmentDataFields, findApartmentById, findResidentById, addResidentToApartment, updateApartment, deleteApartmentById } = require("../../services/adminServices")
const { sendMessageError, sendSucessResponse } = require("../../services/authServices");
const HandlerError = require("../../errors/handlerError");

const apartment = async (req, res) => {
    try {
        const { sectionId, name } = req.body;
        checkApartmentDataFields(sectionId, name);
        const apartment = await createApartment(name, sectionId);
        sendSucessResponse(res, apartment, "Apartamento criado com sucesso");
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

        sendSucessResponse(res, apartmentId, "Adicionado morador ao apartamento");
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
        sendSucessResponse(
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
        sendSucessResponse(res, apartamentId, "Apartmento removido com sucesso");
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