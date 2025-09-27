const { client, getQrCode } = require("../config/whatsapp");

// Retorna QR real do WhatsApp
async function getQr(req, res) {
  try {
    const qr = getQrCode();
    if (!qr) return res.status(404).json({ error: "QR Code ainda não gerado" });
    res.json({ qr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function send(req, res) {
  try {
    const { number, message } = req.body;
    if (!number || !message)
      return res.status(400).json({ error: "Número e mensagem obrigatórios" });

    const chatId = number.includes("@c.us") ? number : `${number}@c.us`;
    await client.sendMessage(chatId, message);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getQr, send };
