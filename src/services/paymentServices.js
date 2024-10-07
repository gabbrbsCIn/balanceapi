const axios = require("axios");
const HandlerError = require("../errors/handlerError");
require("dotenv").config();
const options = {
  method: "POST",
  url: process.env.PAGSEGURO_REQ_URL,
  headers: {
    accept: "*/*",
    Authorization: process.env.PAGSEGURO_TOKEN,
    "content-type": "application/json",
  },
  data: {
    customer: {
      name: "Usuario",
      email: "usuario@email.com",
      tax_id: "12345678909",
    },
    reference_id: "1",
    items: [{ name: "Taxa de Condomínio", unit_amount: 200, quantity: 1 }],
    qr_codes: [
      { amount: { value: 4000 }, expiration_date: "2024-10-02T20:15:59-03:00" },
    ],
  },
};

const generatePixQrCode = async (transactionData, residentData) => {
  try {
    options.data.customer.name = residentData.username;
    options.data.customer.email = residentData.email;
    options.data.reference_id = transactionData.id;

    options.data.items[0].name = transactionData.name;
    options.data.qr_codes[0].amount.value = transactionData.value;
    let expirationDate = new Date();

    expirationDate.setHours(expirationDate.getHours() + 1);
    options.data.qr_codes[0].expiration_date = expirationDate;
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log(error);
    console.log(error.response.data.error_messages);
    throw new HandlerError(
      error.response.data.error_messages,
      error.response.status
    );
  }
};

module.exports = {
  generatePixQrCode,
};
