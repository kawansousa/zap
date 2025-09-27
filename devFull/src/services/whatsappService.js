const axios = require("axios");

class WhatsappService {
  static async sendMessage(to, message) {
    try {
      const response = await axios.post(process.env.WHATSAPP_API_URL, {
        to: to,
        message: message,
        token: process.env.WHATSAPP_TOKEN,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      throw new Error("Could not send WhatsApp message");
    }
  }
}

module.exports = WhatsappService;
