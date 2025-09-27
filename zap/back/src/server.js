const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const { client } = require("./config/whatsapp");

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

client.on("qr", (qr) => {
  console.log("QR gerado:", qr);
  io.emit("qr", qr); // envia QR em tempo real para o frontend
});

client.on("ready", () => {
  console.log("WhatsApp conectado!");
  io.emit("ready"); // avisa frontend que WhatsApp está pronto
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
