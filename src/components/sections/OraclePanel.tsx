import { useState } from "react";
import { AsciiGlobe } from "../ui/AsciiGlobe";
import { triggerGlitch } from "../../lib/glitch";

// ─────────────────────────────────────────────────────────────────────────────
// FULL-BLEED FEATURE SECTION — Critics Pull-Quote + ASCII Globe background
// + Oracle-style Fortune Cookie Quote Widget (Original Proverb Generator)
// Breaks the column grid entirely — centered large text over globe ASCII art
// ─────────────────────────────────────────────────────────────────────────────

const PRESS_QUOTES = [
  {
    quote: "AN UNPRECEDENTED CINEMATIC SYSTEM BREACH. THE VISUAL EFFECTS SPECTACLE OF THE DECADE.",
    source: "CYBER-FILM WEEKLY (1999)",
  },
  {
    quote: "A MIND-BENDING RIDE THROUGH THE NEURAL GRID. YOU WILL NEVER LOOK AT A MONITOR THE SAME WAY AGAIN.",
    source: "ZION CHRONICLE & TIMES",
  },
  {
    quote: "VISUALLY REVOLUTIONARY. AN ABSOLUTE MASTERCLASS IN INDUSTRIAL CYBER-ACTION.",
    source: "METRO REEL REVIEWS ★★★★★",
  },
];

const ORACLE_PROVERBS = [
  "The answer changes the moment you stop asking the question.",
  "A doorway is only real if you choose to step through it.",
  "You didn't come here to make the choice; you came to understand why you made it.",
  "The path is already under your feet; you are only learning to walk it.",
  "Control is an illusion created by those who fear the void.",
  "The code can show you the reflection, but only you can open your eyes.",
  "Fate is simply a name given to the choices you haven't understood yet.",
  "What you know is less important than what you are ready to unlearn.",
];

export function OraclePanel() {
  const [proverbIdx, setProverbIdx] = useState(0);
  const [baked, setBaked] = useState(false);
  const item = PRESS_QUOTES[Math.floor(Date.now() / (1000 * 60 * 60)) % PRESS_QUOTES.length];

  const handleNextProverb = () => {
    triggerGlitch(250);
    setBaked(true);
    setProverbIdx((prev) => (prev + 1) % ORACLE_PROVERBS.length);
  };

  return (
    <section
      id="reviews"
      className="scroll-mt-4 w-full bg-transparent py-1 px-2 font-mono box-border"
    >
      {/* Full-bleed bevel panel — breaks column max-width constraint */}
      <div className="w-full max-w-[960px] mx-auto bevel-raised bg-surface overflow-hidden">

        {/* Panel title bar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
          <span className="font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">
            THE MATRIX // PRESS_RECEPTION & ORACLE_PROVERBS
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/60">
            <span>[ ▶ PLAY ]</span><span>[ − ]</span><span>[ × ]</span>
          </div>
        </div>

        {/* Full-bleed body: Globe as background, bold text centered over it */}
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden"
          style={{ minHeight: "340px" }}
        >
          {/* ASCII Globe — background layer, pointer-events none */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.18,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <AsciiGlobe size={560} />
          </div>

          {/* Scan-line vignette overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.0) 70%, rgba(0,0,0,0.55) 100%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Centered headline content — foreground */}
          <div
            style={{ position: "relative", zIndex: 10 }}
            className="flex flex-col items-center justify-center gap-5 px-6 py-10 text-center"
          >
            {/* Section eyebrow */}
            <div className="font-label text-[9px] text-signal/60 uppercase tracking-[0.3em] select-none">
              ADVANCE PRESS RECEPTION //
            </div>

            {/* Large bold centered headline */}
            <h2
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: "clamp(2rem, 7vw, 4rem)",
                lineHeight: 1.1,
                color: "#00ff66",
                maxWidth: "600px",
              }}
              className="font-bold uppercase"
            >
              Advance Critical Acclaim.<br />Real-Time Neural Defense_
            </h2>

            {/* Pull-quote */}
            <div className="bevel-raised bg-surface/80 max-w-lg p-4 flex flex-col gap-2">
              <p className="font-mono text-sm text-on-surface leading-relaxed italic font-bold">
                "{item.quote}"
              </p>
              <p className="font-label text-[10px] text-signal uppercase tracking-widest">
                — {item.source}
              </p>
            </div>

            {/* ORACLE COOKIE QUOTE PANEL WIDGET */}
            <div className="bevel-raised bg-surface-container-high/90 max-w-lg w-full p-4 flex flex-col items-center gap-3 border-t-2 border-t-signal">
              <div className="flex items-center gap-2">
                <span className="text-signal text-sm font-bold">🥠</span>
                <span className="font-label text-[10px] text-signal uppercase tracking-widest">
                  ORACLE_COOKIE.EXE // SYSTEM PROVERB GENERATOR
                </span>
              </div>

              <div className="bevel-lowered p-3 bg-void w-full text-center min-h-[50px] flex items-center justify-center">
                <p className="font-mono text-xs text-signal font-bold leading-relaxed">
                  "{ORACLE_PROVERBS[proverbIdx]}"
                </p>
              </div>

              <button
                onClick={handleNextProverb}
                className="bevel-button text-signal font-mono text-xs px-4 py-1.5 font-bold cursor-pointer hover:bg-surface-container uppercase tracking-wider"
              >
                [ {baked ? "BREAK ANOTHER COOKIE" : "CONSULT THE ORACLE"} ]
              </button>

              <span className="font-mono text-[9px] text-on-surface-variant/40">
                ORIGINAL CRYPTIC PROVERBS — GENERATIVE WISDOM NODE
              </span>
            </div>

            {/* All-reviews row */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
              {PRESS_QUOTES.map((q, i) => (
                <div key={i} className="bevel-lowered px-3 py-1.5 font-mono text-[10px] text-on-surface-variant max-w-[220px] text-center">
                  <span className="text-signal/70">★★★★★</span>
                  <span className="block text-[9px] text-on-surface-variant/60 mt-0.5">{q.source}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <p className="font-label text-[10px] text-on-surface-variant/40 uppercase tracking-widest select-none mt-2">
              THE MATRIX — IN THEATERS OCTOBER 31 // TICKETS ON SALE NOW
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
