import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const countries = [
  { code: "+55", name: "Brasil", flag: "🇧🇷" },
  { code: "+1", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "+44", name: "Reino Unido", flag: "🇬🇧" },
  { code: "+34", name: "Espanha", flag: "🇪🇸" },
  { code: "+33", name: "França", flag: "🇫🇷" },
  { code: "+49", name: "Alemanha", flag: "🇩🇪" },
  { code: "+39", name: "Itália", flag: "🇮🇹" },
  { code: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "+52", name: "México", flag: "🇲🇽" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
];

export default function QrCodeDisplay() {
  const [qr, setQr] = useState("");
  const [ready, setReady] = useState(false);
  const [connected, setConnected] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("🔌 Conectando ao Socket.IO...");
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("✅ Conectado ao Socket.IO:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Desconectado do Socket.IO");
      setConnected(false);
    });

    socket.on("qr", (qrCode) => {
      console.log("🔲 QR recebido via Socket:", qrCode.substring(0, 50) + "...");
      setQr(qrCode);
      setReady(false);
    });

    socket.on("ready", () => {
      console.log("✅ WhatsApp ready recebido via Socket");
      setQr("");
      setReady(true);
    });

    return () => {
      console.log("🔌 Desconectando Socket.IO...");
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (!phoneNumber || !message) {
      alert("Por favor, preencha o número e a mensagem");
      return;
    }
    
    const fullNumber = selectedCountry.code + phoneNumber;
    console.log("Enviando mensagem para:", fullNumber);
    console.log("Mensagem:", message);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #065f46 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    headerIcon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      borderRadius: '50%',
      marginBottom: '1.5rem',
      fontSize: '2rem'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #34d399, #10b981)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#cbd5e1',
      marginBottom: '0'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '1.5rem',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    cardTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    statusGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem'
    },
    statusCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statusLabel: {
      color: '#cbd5e1',
      fontSize: '1.1rem',
      marginBottom: '0.5rem'
    },
    statusValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: '0'
    },
    statusDot: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    qrContainer: {
      textAlign: 'center',
      padding: '2rem 0'
    },
    qrTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem'
    },
    successContainer: {
      padding: '3rem 0'
    },
    successIcon: {
      width: '120px',
      height: '120px',
      background: 'linear-gradient(135deg, #34d399, #10b981)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 2rem',
      fontSize: '3rem',
      color: 'white',
      animation: 'pulse 2s infinite'
    },
    successTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#34d399',
      marginBottom: '1rem'
    },
    successSubtitle: {
      fontSize: '1.2rem',
      color: '#cbd5e1'
    },
    qrImageContainer: {
      display: 'inline-block',
      background: 'white',
      padding: '2rem',
      borderRadius: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
    },
    qrImage: {
      width: '300px',
      height: '300px',
      borderRadius: '0.5rem'
    },
    qrCode: {
      marginTop: '1rem',
      padding: '1rem',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '0.5rem',
      maxWidth: '400px',
      margin: '1rem auto 0',
      fontSize: '0.875rem',
      fontFamily: 'monospace',
      color: '#9ca3af',
      wordBreak: 'break-all'
    },
    loadingContainer: {
      padding: '3rem 0'
    },
    spinner: {
      width: '80px',
      height: '80px',
      border: '4px solid #34d399',
      borderTop: '4px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 2rem'
    },
    loadingTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#cbd5e1',
      marginBottom: '1rem'
    },
    loadingSubtitle: {
      color: '#9ca3af'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '2rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr'
      }
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '0.75rem'
    },
    select: {
      width: '100%',
      padding: '1rem',
      fontSize: '1.1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '1rem',
      color: 'white',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    phoneContainer: {
      display: 'flex',
      borderRadius: '1rem',
      overflow: 'hidden'
    },
    phonePrefix: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.5rem',
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRight: 'none',
      fontSize: '1.2rem',
      color: 'white'
    },
    phoneInput: {
      flex: 1,
      padding: '1rem',
      fontSize: '1.1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    phonePreview: {
      color: '#34d399',
      marginTop: '0.5rem',
      fontSize: '1.1rem',
      fontWeight: '600'
    },
    textarea: {
      width: '100%',
      padding: '1rem',
      fontSize: '1.1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '1rem',
      color: 'white',
      outline: 'none',
      resize: 'none',
      minHeight: '150px',
      transition: 'all 0.3s ease'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      fontWeight: 'bold',
      padding: '1rem 2rem',
      borderRadius: '1rem',
      border: 'none',
      fontSize: '1.2rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transform: 'scale(1)'
    },
    buttonDisabled: {
      background: 'linear-gradient(135deg, #6b7280, #4b5563)',
      cursor: 'not-allowed',
      transform: 'none'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          input::placeholder, textarea::placeholder {
            color: #9ca3af;
          }
          select option {
            background: #1f2937;
            color: white;
          }
          button:hover:not(:disabled) {
            transform: scale(1.05);
          }
          input:focus, textarea:focus, select:focus {
            border-color: #34d399;
            box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.1);
          }
        `}
      </style>

      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>📱</div>
          <h1 style={styles.title}>WhatsApp Manager</h1>
          <p style={styles.subtitle}>Conecte-se e gerencie suas mensagens com facilidade</p>
        </div>

        {/* Status Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            📊 Status da Conexão
          </h2>
          <div style={styles.statusGrid}>
            <div style={styles.statusCard}>
              <div>
                <p style={styles.statusLabel}>Socket Status</p>
                <p style={{...styles.statusValue, color: connected ? '#34d399' : '#f87171'}}>
                  {connected ? 'Conectado' : 'Desconectado'}
                </p>
              </div>
              <div style={{...styles.statusDot, background: connected ? '#10b981' : '#ef4444'}}></div>
            </div>

            <div style={styles.statusCard}>
              <div>
                <p style={styles.statusLabel}>WhatsApp Status</p>
                <p style={{...styles.statusValue, color: ready ? '#34d399' : '#fbbf24'}}>
                  {ready ? 'Pronto' : 'Aguardando'}
                </p>
              </div>
              <div style={{...styles.statusDot, background: ready ? '#10b981' : '#f59e0b'}}></div>
            </div>
          </div>
        </div>

        {/* QR Code Card */}
        <div style={styles.card}>
          <div style={styles.qrContainer}>
            <h2 style={styles.qrTitle}>
              🔐 Autenticação WhatsApp
            </h2>

            {ready ? (
              <div style={styles.successContainer}>
                <div style={styles.successIcon}>✓</div>
                <h3 style={styles.successTitle}>Conectado com Sucesso!</h3>
                <p style={styles.successSubtitle}>Sua conta WhatsApp está pronta para uso</p>
              </div>
            ) : qr ? (
              <div>
                <p style={{...styles.subtitle, marginBottom: '2rem'}}>Escaneie o QR Code com seu WhatsApp</p>
                <div style={styles.qrImageContainer}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}`}
                    alt="QR Code"
                    style={styles.qrImage}
                  />
                </div>
                <div style={styles.qrCode}>
                  {qr.substring(0, 50)}...
                </div>
              </div>
            ) : (
              <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <h3 style={styles.loadingTitle}>Aguardando QR Code</h3>
                <p style={styles.loadingSubtitle}>Preparando conexão com WhatsApp...</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Sender */}
        {ready && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              📤 Enviar Mensagem
            </h2>

            <div style={styles.formGrid}>
              <div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Selecione o País</label>
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const country = countries.find(c => c.code === e.target.value);
                      setSelectedCountry(country);
                    }}
                    style={styles.select}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Número de Telefone</label>
                  <div style={styles.phoneContainer}>
                    <div style={styles.phonePrefix}>
                      <span style={{marginRight: '0.5rem'}}>{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="11999999999"
                      style={styles.phoneInput}
                    />
                  </div>
                  {phoneNumber && (
                    <p style={styles.phonePreview}>
                      📞 Número completo: {selectedCountry.code}{phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Mensagem</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem aqui..."
                    style={styles.textarea}
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!phoneNumber || !message}
                  style={{
                    ...styles.button,
                    ...(!phoneNumber || !message ? styles.buttonDisabled : {})
                  }}
                >
                  📤 Enviar Mensagem
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}