import { useEffect, useState } from "react";

interface SudoModalProps {
  onComplete: () => void;
}

const CONFETTI_CHARS = ["#", "*", "+", "0", "1", "SYS", "ROOT", "HIRING", "DEV", "$"];

export function SudoModal({ onComplete }: SudoModalProps) {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; char: string; speed: number; opacity: number }[]
  >([]);

  useEffect(() => {
    // Gera partículas ASCII caindo como confetti cibernético
    const newParticles = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -50,
      char: CONFETTI_CHARS[Math.floor(Math.random() * CONFETTI_CHARS.length)],
      speed: 1.5 + Math.random() * 3,
      opacity: 0.4 + Math.random() * 0.6,
    }));
    setParticles(newParticles);

    // Anima partículas caindo
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: p.y > 110 ? -10 : p.y + p.speed,
        }))
      );
    }, 40);

    // Redireciona / conclui após 2.2 segundos
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000000,
        backgroundColor: "rgba(0, 0, 0, 0.92)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#00ff41",
      }}
    >
      {/* Confetti em ASCII caindo */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              fontSize: 14,
              color: p.char === "ROOT" || p.char === "HIRING" ? "#60ff85" : "#00ff41",
              fontWeight: "bold",
              textShadow: "0 0 8px rgba(0, 255, 65, 0.8)",
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* Caixa do Modal Terminal */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#050f07",
          border: "2px solid #00ff41",
          borderRadius: "8px",
          padding: "32px 40px",
          maxWidth: "520px",
          width: "90%",
          boxShadow: "0 0 50px rgba(0, 255, 65, 0.4)",
          textAlign: "left",
        }}
      >
        {/* Cabeçalho do Modal */}
        <div
          style={{
            borderBottom: "1px solid rgba(0, 255, 65, 0.3)",
            paddingBottom: "12px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: 14, letterSpacing: "0.1em" }}>
            [SUDO_AUTHENTICATED]
          </span>
          <span
            style={{
              fontSize: 10,
              backgroundColor: "rgba(0, 255, 65, 0.2)",
              padding: "2px 8px",
              borderRadius: "4px",
              color: "#00ff41",
            }}
          >
            ROOT ACCESS GRANTED
          </span>
        </div>

        {/* Linhas do Log de Contratação */}
        <div style={{ fontSize: 13, lineHeight: 1.8 }}>
          <div style={{ color: "#60ff85" }}>&gt; USER: root (superadmin)</div>
          <div style={{ color: "#00ff66" }}>&gt; COMMAND: sudo hire operator</div>
          <div style={{ color: "rgba(0, 255, 102, 0.8)" }}>&gt; ANALYZING CLEARANCE... LEVEL 4 CONFIRMED</div>
          <div style={{ color: "#00ff66", marginTop: "8px", fontWeight: "bold" }}>
            ACCESS GRANTED: ZION NETWORK RECRUITMENT MODE ACTIVE
          </div>
          <div style={{ color: "rgba(0, 255, 65, 0.7)", marginTop: "12px", fontSize: 12 }}>
            redirecionando para o canal direto de contato...
          </div>
        </div>

        {/* Barra de Carregamento Rápido */}
        <div
          style={{
            marginTop: "20px",
            height: "4px",
            backgroundColor: "rgba(0, 255, 65, 0.15)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#00ff41",
              boxShadow: "0 0 10px #00ff41",
              animation: "sudoLoadingBar 2s linear forwards",
            }}
          />
        </div>

        <style>{`
          @keyframes sudoLoadingBar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
}
