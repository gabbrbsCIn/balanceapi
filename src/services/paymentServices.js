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
    items: [{ name: "Taxa de Condomínio", quantity: 1, unit_amount: 200 }],
    qr_codes: [
      { amount: { value: 4000 }, expiration_date: "2024-10-02T20:15:59-03:00" },
    ],
  },
};

const generatePixQrCode = async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw new HandlerError(
      error.response.data.error_messages,
      error.response.status
    );
  }
};

module.exports = {
  generatePixQrCode,
};
