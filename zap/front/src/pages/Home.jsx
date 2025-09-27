import QrCodeDisplay from "../components/QrCodeDisplay";
import MessageForm from "../components/MessageForm";

export default function Home() {
  return (
    <div>
      <h1>WhatsApp Integration</h1>
      <QrCodeDisplay />
      <MessageForm />
    </div>
  );
}
