const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(), // salva sessão localmente
  puppeteer: { headless: true }
});

let qrCode = null;

client.on("qr", (qr) => {
  qrCode = qr; // QR que o frontend vai buscar
  qrcode.generate(qr, { small: true }); // mostra no terminal também
});

client.on("ready", () => {
  console.log("WhatsApp conectado ✅");
});

client.initialize();

function getQrCode() {
  return qrCode;
}

module.exports = { client, getQrCode };
