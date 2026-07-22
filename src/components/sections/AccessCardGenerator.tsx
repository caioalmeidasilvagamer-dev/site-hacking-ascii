// ─────────────────────────────────────────────────────────────────────────────
// PERSONALIZED ACCESS CARD GENERATOR
// Split layout: LEFT = codename input + generate button
//               RIGHT = generated card preview + download/share buttons
// Uses same visual system as RebelDossiers operative cards.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import digitalIdPortrait from "../../assets/images/optimized/digital-id-portrait.webp";

const ROLES = [
  "Rogue System Operator",
  "EMP & Tactical Specialist",
  "Hoverdeck Navigator",
  "Resistance Architect",
  "Signal Interceptor",
  "Dead-Zone Cartographer",
];

const SITE_URL = "https://the-matrix-concept-site.netlify.app";

function generateIdCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segment = () =>
    Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${segment()}-${segment()}-${segment()}`;
}

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

interface GeneratedCard {
  codename: string;
  role: string;
  clearance: number;
  id: string;
}

export function AccessCardGenerator() {
  const [codename, setCodename] = useState("");
  const [generatedCard, setGeneratedCard] = useState<GeneratedCard | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (!codename.trim()) return;
    setGeneratedCard({
      codename: codename.trim().toUpperCase().replace(/\s+/g, "_"),
      role: ROLES[Math.floor(Math.random() * ROLES.length)],
      clearance: Math.floor(Math.random() * 9) + 1,
      id: generateIdCode(),
    });
  };

  const handleDownload = async () => {
    if (!cardRef.current || !generatedCard) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#000000",
        scale: 3,
      });
      const link = document.createElement("a");
      link.download = `matrix-access-card-${generatedCard.codename}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to generate card image:", err);
    }
  };

  const handleShare = () => {
    if (!generatedCard) return;
    const text = `My access level: ${generatedCard.role} // Clearance LVL ${generatedCard.clearance} // ${SITE_URL}`;

    if (navigator.share) {
      navigator.share({ title: "THE MATRIX — Access Card", text }).catch(() => {});
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    }
  };

  return (
    <section
      id="access-card"
      className="scroll-mt-4 w-full bg-transparent py-1 px-2 font-mono box-border"
    >
      <div className="w-full max-w-[960px] mx-auto bevel-raised bg-surface">

        {/* Panel title bar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
          <span className="font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">
            OPERATIVE_REGISTRATION.EXE // GENERATE YOUR ACCESS CARD
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/60">
            <span>[ − ]</span><span>[ # ]</span><span>[ × ]</span>
          </div>
        </div>

        {/* ── SPLIT BODY ────────────────────────────────────────────────── */}
        <div
          className="accesscard-split"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 0 }}
        >
          {/* LEFT: Input form */}
          <div className="p-5 flex flex-col gap-4 border-r border-outline-variant">
            <div>
              <span className="font-label text-[9px] text-on-surface-variant/50 uppercase tracking-[0.25em]">
                ZION PERSONNEL //
              </span>
              <h2
                style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(1.5rem, 4vw, 2.2rem)" }}
                className="text-signal font-bold uppercase leading-tight mt-1"
              >
                Register as operative.<br />Get your card.
              </h2>
            </div>

            <p className="font-mono text-xs text-on-surface-variant leading-relaxed">
              Enter your codename below. Zion Mainframe will assign your role,
              clearance level, and unique operative ID.
            </p>

            {/* Codename input */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="codename-input"
                className="font-label text-[9px] text-on-surface-variant/60 uppercase tracking-[0.2em]"
              >
                ENTER CODENAME:
              </label>
              <input
                id="codename-input"
                type="text"
                maxLength={20}
                placeholder="GHOST_7"
                className="bevel-lowered bg-void text-signal font-mono text-xs px-3 py-2 outline-none placeholder:text-on-surface-variant/30 w-full"
                value={codename}
                onChange={(e) => setCodename(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerate();
                }}
              />
              <span className="font-mono text-[9px] text-on-surface-variant/40">
                {codename.length}/20 characters
              </span>
            </div>

            {/* GENERATE CARD button */}
            <button
              onClick={handleGenerate}
              disabled={!codename.trim()}
              className="bevel-button text-signal font-mono text-xs px-4 py-2 font-bold cursor-pointer hover:bg-surface-container uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ▶ GENERATE CARD
            </button>

            {/* Security notice */}
            <div className="bevel-raised p-2.5 bg-surface-container-lowest text-[10px] text-signal/80 flex flex-col gap-1">
              <span className="font-bold uppercase tracking-wider">🔒 SECURITY NOTICE</span>
              <span>Access cards are randomly assigned by Zion Mainframe. All credentials are final.</span>
            </div>

            <div className="font-mono text-[10px] text-on-surface-variant/40 border-t border-outline-variant/30 pt-2">
              OMEGA PICTURES // PERSONNEL REGISTRATION v1.0
            </div>
          </div>

          {/* RIGHT: Generated card preview + action buttons */}
          <div className="p-4 flex flex-col gap-3 items-center justify-center min-h-[300px]">
            {generatedCard ? (
              <>
                {/* Card visual — matches operative card style */}
                <div
                  ref={cardRef}
                  className="w-full max-w-[340px] p-3 bg-surface flex flex-col gap-2 border-t-2 border-t-signal/40"
                  style={{ background: "#0c160c" }}
                >
                  {/* Access Card Header */}
                  <div className="flex items-center justify-between border-b border-outline-variant/40 pb-1">
                    <span className="font-label text-[7px] text-signal/80 uppercase tracking-widest font-bold">
                      OPERATIVE ACCESS CARD
                    </span>
                    <span className="font-mono text-[7px] text-on-surface-variant/40">
                      SEC-ID #{generatedCard.id}
                    </span>
                  </div>

                  {/* Avatar + Name */}
                  <div className="flex items-center gap-2">
                    <div className="w-11 h-11 shrink-0 bevel-lowered bg-void relative overflow-hidden flex items-center justify-center select-none">
                      <img
                        src={digitalIdPortrait}
                        alt="operative avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-headline text-xs font-bold text-on-surface uppercase tracking-wider leading-tight truncate">
                        {generatedCard.codename}
                      </h3>
                      <div className="font-mono text-[9px] text-signal/80 truncate mt-0.5">
                        {generatedCard.role}
                      </div>
                    </div>
                  </div>

                  {/* Archetype */}
                  <div className="bevel-lowered p-1.5 text-[9px] text-on-surface-variant bg-surface-container-lowest">
                    <span className="text-on-surface-variant/50 block font-label text-[8px] uppercase">
                      ARCHETYPE:
                    </span>
                    <span className="text-on-surface font-bold">{generatedCard.role}</span>
                  </div>

                  {/* Clearance + Barcode */}
                  <div className="flex items-center justify-between border-t border-outline-variant/30 pt-1.5">
                    <ClearanceBadge level={generatedCard.clearance} />
                    <span className="font-mono text-[8px] text-on-surface-variant/30 tracking-tighter select-none">
                      |||| | |||| ||
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={handleDownload}
                    className="bevel-button text-signal font-mono text-xs px-4 py-2 font-bold cursor-pointer hover:bg-surface-container uppercase tracking-wider"
                  >
                    ⬇ DOWNLOAD CARD
                  </button>
                  <button
                    onClick={handleShare}
                    className="bevel-button text-on-surface font-mono text-xs px-4 py-2 font-bold cursor-pointer hover:bg-surface-container uppercase tracking-wider"
                  >
                    ↗ SHARE
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-on-surface-variant/40 font-mono text-xs flex flex-col items-center gap-2">
                <span style={{ fontFamily: "'VT323', monospace", fontSize: "1.5rem", color: "rgba(0,255,102,0.2)" }}>
                  [ AWAITING CODENAME INPUT... ]
                </span>
                <span className="text-[10px]">Type a codename and click GENERATE CARD</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-1.5 border-t border-outline-variant/40 bg-surface-container-lowest text-center select-none">
          <span className="font-label text-[9px] text-on-surface-variant/40 uppercase tracking-widest">
            THE MATRIX // ZION HIGH COMMAND — PERSONNEL REGISTRATION
          </span>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .accesscard-split {
            grid-template-columns: 1fr !important;
          }
          .accesscard-split > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
        }
      `}</style>
    </section>
  );
}
