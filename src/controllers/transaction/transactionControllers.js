const { checkTransactionDataFields, createTransaction, updateTransaction, deleteTransactionById } = require("../../services/adminServices");
const { sendMessageError, sendSuccessResponse } = require("../../services/authServices");

const transaction = async (req, res) => {
    try {
        const { name, type, value, residentId, transactionData, paid } = req.body;
        const transaction = {
            name,
            type,
            value,
            residentId,
            transactionData,
            paid,
        };
        checkTransactionDataFields(transaction);
        const newTransaction = await createTransaction(transaction);
        sendSuccessResponse(
            res,
            newTransaction,
            "Transação adicionada ao balanço do condomínio"
        );
    } catch (error) {
        sendMessageError(res, error);
    }
};

const changeTransaction = async (req, res) => {
    try {
        const { name, type, value, residentId, transactionData, paid } = req.body;
        const transaction = {
            name,
            type,
            value,
            residentId,
            transactionData,
            paid,
        };
        checkTransactionDataFields(transaction);
        const transactionId = req.params.id;
        await updateTransaction(transaction, transactionId);
        sendSuccessResponse(
            res,
            { transactionId, transaction },
            "Transação atualizada"
        );
    } catch (error) {
        sendMessageError(res, error);
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        await deleteTransactionById(transactionId);
        sendSuccessResponse(res, transactionId, "Transação removida com sucesso");
    } catch (error) {
        sendMessageError(res, error);
    }
};


module.exports = {
    transaction,
    changeTransaction,
    deleteTransaction
}