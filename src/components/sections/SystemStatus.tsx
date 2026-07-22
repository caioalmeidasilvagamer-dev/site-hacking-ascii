import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// FILM SYNOPSIS & DRIFTWALKER-7 SHIP DASHBOARD (MOTIF 8)
// Split layout: LEFT = section header + synopsis text + Hovercraft ASCII diagram
//               RIGHT = film facts grid + scrolling production log
// ─────────────────────────────────────────────────────────────────────────────

const FILM_FACTS = [
  { label: "RELEASE_DATE", value: "OCT 31, 1999", warn: false },
  { label: "RUNTIME",      value: "136 MIN",      warn: false },
  { label: "MPAA_RATING",  value: "RATED R",      warn: false },
  { label: "AUDIO_FORMAT", value: "DOLBY 5.1",    warn: false },
  { label: "ASPECT_RATIO", value: "2.35:1 SCOPE", warn: false },
  { label: "EXPERIENCE",   value: "IMAX 2D",      warn: true  },
];

const PROMO_LOGS = [
  ">> INITIALIZING THEATRICAL MEDIA KITS ................. OK",
  "0x00A1: Dolby Digital 5.1 surround mix ............... PASSED",
  "0x00A2: 35mm Anamorphic print verification .......... PASSED",
  "0x00A3: Soundstage soundtrack recording .............. COMPLETED",
  "0x00A4: Worldwide theatrical distribution .......... CONFIRMED",
  "0x00A5: Advance tickets online portal .............. ONLINE",
  "0x00A6: Driftwalker-7 telemetry link ................ ACTIVE",
  ">> SPECIAL ADVANCE PREVIEW SCREENING // SECTOR-7 IMAX",
  "  NOTICE: Midnight screenings starting October 30th",
  "  STATUS: Reserved seating filling fast in 42 markets",
  "0x00A7: QuickTime 4.0 web trailer online",
  "0x00A8: Official soundtrack featuring industrial synth score",
  ">> SEE IT ONLY IN THEATERS THIS OCTOBER_",
];

export function SystemStatus() {
  const [log, setLog] = useState(PROMO_LOGS);

  useEffect(() => {
    const t = setInterval(() => {
      setLog((prev) => {
        const next = Math.floor(Math.random() * PROMO_LOGS.length);
        return [...prev.slice(-20), PROMO_LOGS[next]];
      });
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="synopsis"
      className="scroll-mt-4 w-full bg-transparent py-1 px-2 font-mono box-border"
    >
      <div className="w-full max-w-[960px] mx-auto bevel-raised bg-surface">

        {/* Panel title bar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
          <span className="font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">
            SYNOPSIS.DAT // THE MATRIX — STORY & DRIFTWALKER-7 DASHBOARD
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/60">
            <span>[ − ]</span><span>[ # ]</span><span>[ × ]</span>
          </div>
        </div>

        {/* ── SPLIT BODY ────────────────────────────────────────────────── */}
        <div
          className="synopsis-split"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
          }}
        >
          {/* LEFT: Section header label + synopsis text + Hovercraft diagram */}
          <div className="p-5 flex flex-col gap-4 border-r border-outline-variant">
            {/* Section label */}
            <div>
              <span className="font-label text-[9px] text-on-surface-variant/50 uppercase tracking-[0.25em]">
                OFFICIAL SYNOPSIS //
              </span>
              <h2
                style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
                className="text-signal font-bold uppercase leading-tight mt-1"
              >
                Free your mind.<br />Override the code.
              </h2>
            </div>

            <p className="font-mono text-xs text-on-surface leading-relaxed">
              In the year 2199, an unauthorized cybernetic intrusion breaches humanity's primary mainframe.
              A computer programmer uncovers a terrifying truth: reality itself is an engineered neural
              simulation maintained by artificial intelligence.
            </p>
            <p className="font-mono text-xs text-on-surface-variant leading-relaxed">
              Joined by an underground squad of freedom fighters operating aboard heavy hovercrafts, he must execute the ultimate override
              command before sector wipeout is executed forever.
            </p>

            {/* MOTIF 8: Original Hovercraft ASCII Diagram */}
            <div className="bevel-lowered p-3 bg-void flex flex-col gap-2">
              <div className="flex items-center justify-between text-[9px] text-signal font-bold border-b border-outline-variant/40 pb-1">
                <span>VESSEL: DRIFTWALKER-7</span>
                <span className="text-on-surface-variant/50">PATROL CLASS #07</span>
              </div>
              <pre className="font-mono text-[9px] text-signal/80 leading-none overflow-x-auto py-1 select-none">
{`   [=]==============================================[=]
    \\   ___/|______________\\|___   HEAVY HOVERCRAFT   /
     \\ /    (o) DRIFTWALKER-7 (o) \\  SECTOR PATROL    /
      \\____________________________/================='
         (O)    [=== EMP ===]    (O)    STATUS: ONLINE`}
              </pre>
              <div className="text-[8px] text-on-surface-variant/50 text-right">
                ORIGINAL HOVERCRAFT SCHEMATIC DIAGRAM
              </div>
            </div>

            {/* Inline CTA */}
            <div className="flex gap-2 flex-wrap mt-1">
              <button
                onClick={() => document.getElementById("showtimes")?.scrollIntoView({ behavior: "smooth" })}
                className="bevel-button text-signal font-mono text-[11px] px-3 py-1.5 font-bold cursor-pointer hover:bg-surface-container uppercase tracking-wider"
              >
                [ GET ADVANCE TICKETS ]
              </button>
            </div>
          </div>

          {/* RIGHT: Film facts grid + production log */}
          <div className="flex flex-col">
            {/* Film facts grid */}
            <div className="grid grid-cols-2 gap-px bg-outline-variant border-b border-outline-variant">
              {FILM_FACTS.map((fact) => (
                <div key={fact.label} className="p-2.5 bg-surface flex flex-col gap-0.5">
                  <span className="font-label text-[10px] text-on-surface-variant/60 uppercase tracking-wider">
                    {fact.label}
                  </span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      fact.warn ? "text-signal animate-pulse" : "text-on-surface"
                    }`}
                  >
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Production log */}
            <div>
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container">
                <span className="font-label text-[10px] text-on-surface-variant/70 uppercase tracking-wider">
                  PRODUCTION_NOTES // THEATRICAL_LOG
                </span>
                <span className="font-mono text-[10px] text-signal">● 35MM CINEMASCOPE</span>
              </div>
              <div className="p-3 bg-void font-mono text-[11px] text-on-surface-variant leading-relaxed h-[160px] overflow-y-auto">
                {log.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.includes("NOTICE") || line.includes("SPECIAL")
                        ? "text-signal/80"
                        : line.startsWith(">>")
                        ? "text-on-surface"
                        : "text-on-surface-variant"
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Studio footer strip */}
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-outline-variant/40 bg-surface-container-lowest select-none">
          <span className="font-label text-[9px] text-on-surface-variant/40 uppercase tracking-wider">
            STUDIO: OMEGA PICTURES // DISTRIBUTOR: AETHERIA CINEMA
          </span>
          <span className="font-label text-[9px] text-on-surface-variant/40 uppercase tracking-wider">
            THE MATRIX COPYRIGHT © 1999
          </span>
        </div>
      </div>

      {/* Responsive: stack columns on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .synopsis-split {
            grid-template-columns: 1fr !important;
          }
          .synopsis-split > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
        }
      `}</style>
    </section>
  );
}
