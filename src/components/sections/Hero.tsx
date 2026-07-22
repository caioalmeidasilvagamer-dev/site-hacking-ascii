import { useState } from "react";
import { motion } from "motion/react";
import { AsciiGlobe } from "../ui/AsciiGlobe";
import { GlitchText } from "../ui/GlitchText";
import { TerminalNav } from "../ui/TerminalNav";

interface HeroProps {
  startGlobeIntro: boolean;
  onTruthTxt?: () => void;
}

const GLOBE_SIZE = 440;
const RADIUS_PX = GLOBE_SIZE * 0.44;

const SECTIONS = [
  { id: "synopsis",   label: "synopsis" },
  { id: "cast",       label: "characters" },
  { id: "access-card", label: "access card" },
  { id: "showtimes",  label: "showtimes" },
  { id: "homemedia",  label: "vhs / dvd" },
  { id: "newsletter", label: "newsletter" },
];

// Small floating review card — in-universe critic quote
function FloatingReviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className="absolute bottom-4 right-2 z-30 bevel-raised bg-surface max-w-[180px] pointer-events-none select-none"
    >
      <div className="px-2.5 py-2 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 border-b border-outline-variant/50 pb-1">
          {/* Square avatar — no circles */}
          <div className="w-6 h-6 shrink-0 bevel-lowered bg-surface-container-lowest flex items-center justify-center">
            <span className="font-mono text-[7px] text-signal/60">◈</span>
          </div>
          <div>
            <div className="font-headline text-[9px] font-bold text-on-surface uppercase tracking-wider leading-none">
              NEURAL_CRITIC
            </div>
            <div className="font-mono text-[8px] text-on-surface-variant/60 leading-none mt-0.5">
              Zion Film Review
            </div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => (
            <span key={i} className="text-signal text-[9px]">★</span>
          ))}
        </div>
        <p className="font-mono text-[8px] text-on-surface-variant leading-snug">
          "A CINEMATIC OVERRIDE. 5.0 / 5.0 — Based on 128 grid reviews."
        </p>
      </div>
    </motion.div>
  );
}

export function Hero({ startGlobeIntro, onTruthTxt }: HeroProps) {
  const [trailerModal, setTrailerModal] = useState(false);

  const scrollToTickets = () => {
    const el = document.getElementById("showtimes");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "transparent",
        fontFamily: "monospace",
        color: "#00ff66",
        boxSizing: "border-box",
        padding: "20px 12px 12px",
        overflow: "hidden",
      }}
    >
      {/* Keyframes for globe */}
      <style>{`
        @keyframes globeZoomIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes pulseRing {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; }
        }
        .globe-container-style {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0);
          opacity: 0;
        }
        .globe-container-style.animate-in {
          animation: globeZoomIn 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .pulse-ring-style {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(1);
          width: ${RADIUS_PX * 2}px;
          height: ${RADIUS_PX * 2}px;
          border: 1px solid rgba(0, 255, 102, 0.4);
          pointer-events: none;
          opacity: 0;
        }
        .pulse-ring-style.ring-1 {
          animation: pulseRing 3.5s ease-out infinite;
          animation-delay: 1.8s;
        }
      `}</style>

      {/* ── SPLIT HERO GRID ────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          alignItems: "center",
          maxWidth: "960px",
          margin: "0 auto",
          position: "relative",
          zIndex: 20,
        }}
        className="hero-split"
      >
        {/* ── LEFT COLUMN: Headline + CTAs + Terminal ──────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={startGlobeIntro ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {/* Studio byline */}
          <div className="font-label text-[10px] text-on-surface-variant/60 uppercase tracking-[0.22em] select-none">
            OMEGA PICTURES ENTERTAINMENT PRESENTS
          </div>

          {/* Oversized title — pixel/bitmap font */}
          <h1
            style={{
              fontFamily: "'VT323', 'Press Start 2P', monospace",
              fontSize: "clamp(2.4rem, 8vw, 4.4rem)",
              fontWeight: "bold",
              letterSpacing: "0.08em",
              margin: 0,
              color: "#00ff66",
              lineHeight: 1.05,
            }}
          >
            <GlitchText text="THE" start={startGlobeIntro} />
            <br />
            <GlitchText text="MATRIX" start={startGlobeIntro} />
          </h1>

          {/* Tagline */}
          <p className="font-mono text-xs text-on-surface-variant tracking-widest uppercase select-none leading-relaxed" style={{ maxWidth: "340px" }}>
            What if the world you know<br />is only code?
          </p>

          {/* CTA buttons — bevel-button style */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTrailerModal(true)}
              className="bevel-button text-signal font-mono text-xs px-4 py-2 font-bold cursor-pointer hover:bg-surface-container uppercase tracking-wider"
            >
              ▶ WATCH TRAILER
            </button>
            <button
              onClick={scrollToTickets}
              className="bevel-button text-on-surface font-mono text-xs px-4 py-2 font-bold cursor-pointer hover:bg-surface-container uppercase tracking-wider"
            >
              🎟 GET TICKETS
            </button>
          </div>

          {/* Interactive Terminal Nav */}
          <TerminalNav start={startGlobeIntro} sections={SECTIONS} onTruthTxt={onTruthTxt} />
        </motion.div>

        {/* ── RIGHT COLUMN: AsciiGlobe visual + floating review card ─── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={startGlobeIntro ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Large background text "MATRIX"-style oversized type */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(5rem, 18vw, 11rem)",
              fontWeight: "bold",
              color: "rgba(0,255,102,0.04)",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            MATRIX
          </div>

          {/* Globe */}
          <div className={`globe-container-style ${startGlobeIntro ? "animate-in" : ""}`} style={{ zIndex: 10 }}>
            <div className={`pulse-ring-style ring-1 ${startGlobeIntro ? "ring-1" : ""}`} />
            <AsciiGlobe size={GLOBE_SIZE} />
          </div>

          {/* Floating bevel-bordered in-universe critic card */}
          {startGlobeIntro && <FloatingReviewCard />}
        </motion.div>
      </div>

      {/* Responsive: stack columns on mobile */}
      <style>{`
        @media (max-width: 680px) {
          .hero-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Fake QuickTime Trailer Modal */}
      {trailerModal && (
        <div
          className="fixed inset-0 z-[8500] flex items-center justify-center bg-void/90"
          onClick={() => setTrailerModal(false)}
        >
          <div
            className="bevel-raised bg-surface max-w-md w-[90%] p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
              <span className="font-headline text-xs font-bold tracking-widest text-signal uppercase">
                QUICKTIME_PLAYER // THE_MATRIX_TRAILER.MOV
              </span>
              <button
                onClick={() => setTrailerModal(false)}
                className="font-mono text-xs text-on-surface-variant/60 hover:text-on-surface cursor-pointer border-none bg-transparent"
              >
                [ × ]
              </button>
            </div>
            <div className="p-4 bg-void text-center flex flex-col items-center gap-3">
              <div className="bevel-lowered w-full h-44 bg-surface-container-lowest flex flex-col items-center justify-center gap-2">
                <span className="font-label text-xs text-signal">▶ PREVIEW STREAMING (300 KBPS)</span>
                <span className="font-mono text-[10px] text-on-surface-variant/50">
                  [ SIMULATED 1999 QUICKTIME VIDEO STREAM ]
                </span>
                <span className="font-mono text-xs text-on-surface font-bold animate-pulse">
                  THE MATRIX — THEATRICAL TEASER #1
                </span>
              </div>
              <p className="font-mono text-[11px] text-on-surface-variant">
                IN THEATERS OCTOBER 31, 1999 // EXPERIENCE IT IN DOLBY DIGITAL &amp; IMAX 2D
              </p>
              <button
                onClick={() => setTrailerModal(false)}
                className="bevel-button text-signal font-mono text-xs px-4 py-1 cursor-pointer"
              >
                [ CLOSE PLAYER ]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
