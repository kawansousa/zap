const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// teste de rota
app.get("/", (req, res) => res.send("API funcionando 🚀"));

// rota WhatsApp
const messageRoutes = require("./routes/messageRoutes");
app.use("/whatsapp", messageRoutes);

module.exports = app;
