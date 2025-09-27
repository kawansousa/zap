import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function QrCodeDisplay() {
  const [qr, setQr] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("qr", (qrCode) => {
      setQr(qrCode);
    });

    socket.on("ready", () => {
      setQr("");
      setReady(true);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h2>WhatsApp</h2>
      {ready ? (
        <p>✅ WhatsApp conectado!</p>
      ) : qr ? (
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qr}`}
          alt="QR Code"
        />
      ) : (
        <p>Aguardando QR...</p>
      )}
    </div>
  );
}
