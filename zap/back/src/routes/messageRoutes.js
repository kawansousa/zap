const express = require("express");
const router = express.Router();
const { getQr, send } = require("../controllers/messageController");

router.get("/qr", getQr);       // GET /whatsapp/qr
router.post("/send", send);     // POST /whatsapp/send

module.exports = router;
