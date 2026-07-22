import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TICKETS / SHOWTIMES SECTION — Asymmetric split layout
// LEFT: Large typographic movie-ticket visual / format poster
// RIGHT: Theater listings with bevel-button showtimes grid
// ─────────────────────────────────────────────────────────────────────────────

interface Theater {
  id: string;
  name: string;
  location: string;
  format: string;
  times: string[];
}

const THEATERS: Theater[] = [
  {
    id: "t1",
    name: "ZION MAINFRAME IMAX",
    location: "Sector 0 // Central Metro",
    format: "70MM IMAX 2D",
    times: ["12:30 PM", "03:45 PM", "07:15 PM", "10:30 PM"],
  },
  {
    id: "t2",
    name: "SECTOR 7 CYBERPLEX",
    location: "Sector 7 // West Concourse",
    format: "DOLBY DIGITAL 5.1",
    times: ["01:00 PM", "04:15 PM", "08:00 PM", "11:15 PM"],
  },
  {
    id: "t3",
    name: "NEO-TOKYO METRO DOME",
    location: "District 9 // Upper Tier",
    format: "35MM ANAMORPHIC",
    times: ["02:00 PM", "05:30 PM", "09:00 PM"],
  },
  {
    id: "t4",
    name: "ORBIT CITY CINEMAS",
    location: "Plaza Deck // Level 3",
    format: "SDDS 8-CHANNEL",
    times: ["11:45 AM", "03:15 PM", "06:45 PM", "10:00 PM"],
  },
];

export function Showtimes() {
  const [selectedTicket, setSelectedTicket] = useState<{ theater: string; time: string } | null>(null);

  return (
    <section
      id="showtimes"
      className="scroll-mt-4 w-full bg-transparent py-1 px-2 font-mono box-border"
    >
      <div className="w-full max-w-[960px] mx-auto bevel-raised bg-surface">

        {/* Panel Header */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
          <span className="font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">
            SHOWTIMES.EXE // THEATRICAL_TICKETING_PORTAL
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/60">
            <span>[ − ]</span><span>[ # ]</span><span>[ × ]</span>
          </div>
        </div>

        {/* ── ASYMMETRIC SPLIT BODY ─────────────────────────────────────── */}
        <div
          className="showtimes-split"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 0 }}
        >
          {/* LEFT: Large typographic ticket-stub / format-poster visual */}
          <div
            className="border-r border-outline-variant flex flex-col items-center justify-center p-6 gap-5 relative overflow-hidden bg-void"
            style={{ minHeight: "380px" }}
          >
            {/* Background oversized text texture */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                fontFamily: "'VT323', monospace",
                fontSize: "7rem",
                color: "rgba(0,255,102,0.04)",
                fontWeight: "bold",
                userSelect: "none",
                pointerEvents: "none",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(-15deg)",
                whiteSpace: "nowrap",
              }}
            >
              ADMIT
            </div>

            {/* Typographic ticket-stub card */}
            <div className="bevel-raised bg-surface p-4 flex flex-col items-center gap-3 w-full max-w-[200px] relative z-10">
              {/* Perforated dashes top */}
              <div className="w-full font-mono text-[9px] text-on-surface-variant/30 text-center tracking-widest border-b border-dashed border-outline-variant/50 pb-2 select-none">
                - - - - ADMIT ONE - - - -
              </div>

              <div className="text-center">
                <div className="font-label text-[8px] text-signal/50 uppercase tracking-widest">OMEGA PICTURES</div>
                <div
                  style={{ fontFamily: "'VT323', monospace", fontSize: "1.8rem" }}
                  className="text-signal font-bold uppercase leading-tight"
                >
                  THE<br />MATRIX
                </div>
              </div>

              <div className="w-full flex flex-col gap-1 text-center">
                <div className="font-mono text-[10px] text-on-surface-variant/80">
                  <span className="text-on-surface-variant/50">DATE:</span> OCT 31, 1999
                </div>
                <div className="font-mono text-[10px] text-on-surface-variant/80">
                  <span className="text-on-surface-variant/50">FORMAT:</span> IMAX / 35MM
                </div>
              </div>

              {/* Perforated dashes bottom */}
              <div className="w-full font-mono text-[9px] text-on-surface-variant/30 text-center tracking-widest border-t border-dashed border-outline-variant/50 pt-2 select-none">
                - - - SECTOR ZERO - - -
              </div>
            </div>

            {/* Section header label below card */}
            <div className="text-center relative z-10">
              <h2
                style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(1.2rem, 3vw, 1.7rem)" }}
                className="text-signal font-bold uppercase leading-tight"
              >
                Advance tickets.<br />Real showtimes.
              </h2>
              <p className="font-mono text-[10px] text-on-surface-variant/60 mt-1">
                SELECT THEATER & SHOWTIME BELOW
              </p>
            </div>
          </div>

          {/* RIGHT: Theater listings */}
          <div className="flex flex-col">
            <div className="font-mono text-[10px] text-on-surface-variant/50 px-3 py-1.5 border-b border-outline-variant/30 bg-void/60 select-none">
              SELECT THEATER AND SHOWTIME TO RESERVE ADVANCE SEATING
            </div>

            <div className="p-3 flex flex-col gap-3 flex-1">
              {THEATERS.map((theater) => (
                <div key={theater.id} className="bevel-lowered p-3 bg-surface-container-lowest flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-1 border-b border-outline-variant/40 pb-1.5">
                    <div>
                      <h4 className="font-headline text-xs font-bold text-signal uppercase tracking-wider">
                        {theater.name}
                      </h4>
                      <span className="font-mono text-[10px] text-on-surface-variant/60">
                        {theater.location}
                      </span>
                    </div>
                    <span className="font-label text-[9px] text-on-surface-variant/80 bg-surface-container px-2 py-0.5 border border-outline-variant/50 uppercase">
                      {theater.format}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="font-label text-[9px] text-on-surface-variant/50 uppercase">SHOWTIMES:</span>
                    {theater.times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTicket({ theater: theater.name, time })}
                        className="bevel-button text-signal font-mono text-xs px-2.5 py-1 cursor-pointer hover:bg-surface-container-high font-bold"
                      >
                        [ {time} ]
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Confirmation Toast */}
            {selectedTicket && (
              <div className="p-3 bg-void border-t border-outline-variant flex items-center justify-between gap-2">
                <div className="font-mono text-xs text-signal">
                  ✓ RESERVATION DISPATCHED: {selectedTicket.theater} @ {selectedTicket.time} (RESERVED)
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="bevel-button text-on-surface text-[10px] px-2 py-0.5 cursor-pointer"
                >
                  [ DISMISS ]
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-3 py-1.5 border-t border-outline-variant/40 bg-surface-container-lowest text-center select-none">
          <span className="font-label text-[9px] text-on-surface-variant/40 uppercase tracking-widest">
            ADVANCE TICKETING SYSTEM // ALL SHOWTIMES IN LOCAL ZION STANDARD TIME
          </span>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          .showtimes-split {
            grid-template-columns: 1fr !important;
          }
          .showtimes-split > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            min-height: 260px !important;
          }
        }
      `}</style>
    </section>
  );
}
