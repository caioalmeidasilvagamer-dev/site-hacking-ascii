// ─────────────────────────────────────────────────────────────────────────────
// FEATURED CAST & OPERATIVE ACCESS CARDS
// Split layout: LEFT = section header + intro text
//               RIGHT = 4 Agent-Style Operative Access Cards (2×2 grid)
// Original character names & abstract ASCII/geometric portraits — NO real photos/likenesses
// ─────────────────────────────────────────────────────────────────────────────

import digitalIdPortrait from "../../assets/images/optimized/digital-id-portrait.webp";

interface Character {
  id: string;
  avatarAscii: string[];
  name: string;
  role: string;
  actor: string;
  archetype: string;
  clearance: number;
  bio: string;
  quote: string;
  hueFilter: string;
}

const CHARACTERS: Character[] = [
  {
    id: "GHOST_7",
    avatarAscii: ["┌──┐", "│◈ ◈│", "└──┘"],
    name: "GHOST_7",
    role: "Lead Infiltrator",
    actor: "VANCE VANCE",
    archetype: "Rogue System Operator",
    clearance: 8,
    bio: "The first hacker to breach the Sector-9 firewall and witness the truth behind the simulation.",
    quote: "You think this room is real because your eyes tell you so.",
    hueFilter: "hue-rotate(0deg)",
  },
  {
    id: "NOVA_9",
    avatarAscii: ["╱──╲", "│◉ ◉│", "╲──╱"],
    name: "NOVA_9",
    role: "Vanguard Commander",
    actor: "KIRA SOLAR",
    archetype: "EMP & Tactical Specialist",
    clearance: 7,
    bio: "Battle-hardened field leader responsible for extracting unplugged humans from machine sentinels.",
    quote: "Hold the line until the EMP capacitor hits 100%.",
    hueFilter: "hue-rotate(110deg)",
  },
  {
    id: "CIPHER_X",
    avatarAscii: ["┌──┐", "│▣ ▣│", "└──┘"],
    name: "CIPHER_X",
    role: "Hovercraft Pilot",
    actor: "DARIUS VEX",
    archetype: "Dead-Zone Navigator",
    clearance: 6,
    bio: "Veteran pilot of the Driftwalker-7, capable of maneuvering through narrow sewer conduits.",
    quote: "Keep your harness buckled. The machine city is right above us.",
    hueFilter: "hue-rotate(210deg)",
  },
  {
    id: "REAPER_0",
    avatarAscii: ["◆──◆", "│▲ ▲│", "◆──◆"],
    name: "REAPER_0",
    role: "Resistance Architect",
    actor: "SOLOMON KANE",
    archetype: "Zion Network Founder",
    clearance: 9,
    bio: "Master strategist who designed the construct training modules for incoming operatives.",
    quote: "The system cannot fix what it cannot comprehend.",
    hueFilter: "hue-rotate(300deg)",
  },
];

function ClearanceBadge({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="inline-block w-1.5 h-1.5 border border-outline-variant/60"
            style={{ background: i < level ? "rgba(0,255,102,0.7)" : "transparent" }}
          />
        ))}
      </div>
      <span className="font-mono text-[9px] text-on-surface-variant/60">LVL {level}</span>
    </div>
  );
}

export function RebelDossiers() {
  return (
    <section
      id="cast"
      className="scroll-mt-4 w-full bg-transparent py-1 px-2 font-mono box-border"
    >
      <div className="w-full max-w-[960px] mx-auto bevel-raised bg-surface">

        {/* Panel title bar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
          <span className="font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">
            OPERATIVE_ACCESS_CARDS.EXE // THE MATRIX CAST DIRECTORY
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/60">
            <span>[ − ]</span><span>[ # ]</span><span>[ × ]</span>
          </div>
        </div>

        {/* ── SPLIT BODY ────────────────────────────────────────────────── */}
        <div
          className="cast-split"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 0 }}
        >
          {/* LEFT: Section header + description text */}
          <div className="p-5 flex flex-col gap-4 border-r border-outline-variant">
            <div>
              <span className="font-label text-[9px] text-on-surface-variant/50 uppercase tracking-[0.25em]">
                OPERATIVE DIRECTORY //
              </span>
              <h2
                style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(1.5rem, 4vw, 2.2rem)" }}
                className="text-signal font-bold uppercase leading-tight mt-1"
              >
                Meet the operatives.<br />Breach the system.
              </h2>
            </div>

            <p className="font-mono text-xs text-on-surface-variant leading-relaxed">
              Our comprehensive squad of resistance operatives is assembled to infiltrate,
              decrypt, and future-proof the free world from ever-evolving machine threats.
            </p>

            <div className="bevel-lowered p-3 font-mono text-[11px] text-on-surface-variant/80 leading-relaxed">
              <span className="text-signal font-bold">&gt;&gt;</span>&nbsp;
              Official character access cards for THE MATRIX concept site — in theaters October 31, 1999.
            </div>

            {/* Security Note */}
            <div className="bevel-raised p-2.5 bg-surface-container-lowest text-[10px] text-signal/80 flex flex-col gap-1">
              <span className="font-bold uppercase tracking-wider">🔒 SECURITY NOTICE</span>
              <span>All operative access cards issued by Zion High Command. Clearance verification required.</span>
            </div>

            <div className="font-mono text-[10px] text-on-surface-variant/40 border-t border-outline-variant/30 pt-2">
              OMEGA PICTURES // CAST DIRECTORY v4.0
            </div>
          </div>

          {/* RIGHT: 2×2 Agent-Style Operative Access Cards */}
          <div className="grid grid-cols-2 gap-px bg-outline-variant">
            {CHARACTERS.map((char) => (
              <div key={char.id} className="p-3 bg-surface flex flex-col gap-2 group hover:bg-surface-container transition-colors duration-150 relative border-t-2 border-t-signal/40">
                {/* Access Card Header */}
                <div className="flex items-center justify-between border-b border-outline-variant/40 pb-1">
                  <span className="font-label text-[7px] text-signal/80 uppercase tracking-widest font-bold">
                    OPERATIVE ACCESS CARD
                  </span>
                  <span className="font-mono text-[7px] text-on-surface-variant/40">
                    SEC-ID #{char.id}
                  </span>
                </div>

                {/* Abstract Avatar + Name row */}
                <div className="flex items-center gap-2">
                  {/* Digital ID Portrait Avatar Box */}
                  <div className="w-11 h-11 shrink-0 bevel-lowered bg-void relative overflow-hidden flex items-center justify-center select-none">
                    <img
                      src={digitalIdPortrait}
                      alt="abstract operative avatar digital portrait"
                      className="w-full h-full object-cover"
                      style={{ filter: char.hueFilter }}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-headline text-xs font-bold text-on-surface uppercase tracking-wider leading-tight truncate">
                      {char.name}
                    </h3>
                    <div className="font-mono text-[9px] text-signal/80 truncate mt-0.5">
                      {char.role}
                    </div>
                  </div>
                </div>

                {/* Archetype & Bio */}
                <div className="bevel-lowered p-1.5 text-[9px] text-on-surface-variant bg-surface-container-lowest">
                  <span className="text-on-surface-variant/50 block font-label text-[8px] uppercase">ARCHETYPE:</span>
                  <span className="text-on-surface font-bold">{char.archetype}</span>
                  <p className="mt-1 leading-snug text-on-surface-variant/80">
                    {char.bio}
                  </p>
                </div>

                {/* Clearance & Barcode strip */}
                <div className="flex items-center justify-between border-t border-outline-variant/30 pt-1.5 mt-auto">
                  <ClearanceBadge level={char.clearance} />
                  <span className="font-mono text-[8px] text-on-surface-variant/30 tracking-tighter select-none">
                    |||| | |||| ||
                  </span>
                </div>

                {/* Quote on hover */}
                <p className="font-mono text-[9px] text-signal/60 italic leading-snug line-clamp-2">
                  "{char.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-1.5 border-t border-outline-variant/40 bg-surface-container-lowest text-center select-none">
          <span className="font-label text-[9px] text-on-surface-variant/40 uppercase tracking-widest">
            THE MATRIX // ORIGINAL HOMAGE DESIGN — INVENTED CHARACTER DOSSIERS
          </span>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .cast-split {
            grid-template-columns: 1fr !important;
          }
          .cast-split > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
        }
      `}</style>
    </section>
  );
}
