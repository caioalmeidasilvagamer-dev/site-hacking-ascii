import { motion } from "motion/react";
import { AsciiGlobe } from "../ui/AsciiGlobe";
import { GlitchText } from "../ui/GlitchText";
import { TerminalNav } from "../ui/TerminalNav";

interface HeroProps {
  startGlobeIntro: boolean;
}

const GLOBE_SIZE = 550;
const RADIUS_PX = GLOBE_SIZE * 0.44;

const SECTIONS = [
  { id: "sobre", label: "sobre" },
  { id: "projetos", label: "projetos" },
  { id: "contato", label: "contato" },
];

export function Hero({ startGlobeIntro }: HeroProps) {
  return (
    <section
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "transparent",
        fontFamily: "monospace",
        color: "#4ade80",
        boxSizing: "border-box",
        padding: "40px 0",
        overflow: "hidden",
      }}
    >
      {/* Fade suave na base do Hero para a transição com a RetroWindow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "180px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 100%)",
          pointerEvents: "none",
          zIndex: 25,
        }}
      />
      {/* Estilos CSS puros para animações de altíssima performance livres de conflitos de render do React */}
      <style>{`
        @keyframes globeZoomIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes pulseRing {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
        }
        @keyframes auraBreath {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.6;
          }
        }
        @keyframes titleGlowPulse {
          0%, 100% {
            text-shadow: 0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.2);
          }
          50% {
            text-shadow: 0 0 20px rgba(0, 255, 65, 0.9), 0 0 36px rgba(0, 255, 65, 0.45);
          }
        }

        .title-glow-pulse {
          animation: titleGlowPulse 2.8s ease-in-out infinite;
        }
        
        .globe-container-style {
          position: relative;
          display: flex;
          alignItems: center;
          justifyContent: center;
          transform: scale(0);
          opacity: 0;
        }
        .globe-container-style.animate-in {
          animation: globeZoomIn 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .pulse-ring-style {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1);
          width: ${RADIUS_PX * 2}px;
          height: ${RADIUS_PX * 2}px;
          border-radius: 50%;
          border: 1px solid rgba(0, 255, 65, 0.55);
          pointer-events: none;
          opacity: 0;
        }
        .pulse-ring-style.ring-1 {
          animation: pulseRing 3.5s ease-out infinite;
          animation-delay: 2.2s;
        }
        .pulse-ring-style.ring-2 {
          animation: pulseRing 3.5s ease-out infinite;
          animation-delay: 3.95s;
          border-color: rgba(0, 255, 65, 0.35);
        }

        .aura-glow-style {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.95);
          width: ${RADIUS_PX * 1.8}px;
          height: ${RADIUS_PX * 1.8}px;
          border-radius: 50%;
          background: rgba(0, 255, 65, 0.08);
          filter: blur(32px);
          pointer-events: none;
          opacity: 0;
        }
        .aura-glow-style.active {
          opacity: 1;
          animation: auraBreath 6s ease-in-out infinite;
          animation-delay: 2.2s;
          transition: opacity 0.5s ease-out 2.2s;
        }
      `}</style>

      {/* Scanline Overlay */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          zIndex: 30,
          opacity: 0.15,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Wrapper de posicionamento do Globo */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Container que gerencia a entrada Zoom-In e os pulsos */}
        <div className={`globe-container-style ${startGlobeIntro ? "animate-in" : ""}`}>
          
          {/* Anel de Pulso 1 */}
          <div className={`pulse-ring-style ring-1 ${startGlobeIntro ? "ring-1" : ""}`} />
          
          {/* Anel de Pulso 2 */}
          <div className={`pulse-ring-style ring-2 ${startGlobeIntro ? "ring-2" : ""}`} />

          {/* Aura Glow Neon de Fundo */}
          <div className={`aura-glow-style ${startGlobeIntro ? "active" : ""}`} />

          {/* Componente puro do Globo ASCII */}
          <AsciiGlobe size={GLOBE_SIZE} />
        </div>
      </div>

      {/* Conteúdo de Texto sobreposto no centro */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 16px",
          pointerEvents: "auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={startGlobeIntro ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Título Principal */}
          <h1
            className="title-glow-pulse"
            style={{
              fontSize: "clamp(2rem, 8vw, 3.5rem)",
              fontWeight: "bold",
              letterSpacing: "0.2em",
              margin: 0,
              color: "#00ff41",
            }}
          >
            <GlitchText text="CAIO_DEV" start={startGlobeIntro} />
          </h1>

          {/* Terminal Interativo Principall Nav */}
          <TerminalNav start={startGlobeIntro} sections={SECTIONS} />
        </motion.div>
      </div>
    </section>
  );
}
