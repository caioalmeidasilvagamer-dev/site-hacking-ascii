import { BlinkStatus, HitCounter, NetscapeBadge } from "../ui/EasterEggs";
import { triggerGlitch } from "../../lib/glitch";
import phoneBoothIcon from "../../assets/images/optimized/phone-booth-icon.webp";
import webringBanner from "../../assets/images/optimized/webring-banner.webp";

// ─────────────────────────────────────────────────────────────────────────────
// OFFICIAL MOVIE SITE FOOTER (1999 STUDIO PROMO ARCHITECTURE)
// Reframed for "THE MATRIX" concept redesign series
// Includes signature visual generative art footnote & Phone Booth exit point motif
// ─────────────────────────────────────────────────────────────────────────────

interface MovieFooterProps {
  onReturnToPills?: () => void;
}

export function MovieFooter({ onReturnToPills }: MovieFooterProps) {
  const handleExitPoint = () => {
    triggerGlitch(400);
    if (onReturnToPills) {
      onReturnToPills();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full flex items-center justify-center py-4 px-2 font-mono box-border select-none">
      <div className="w-full max-w-[760px] bevel-raised bg-surface-container p-4 flex flex-col gap-4">
        {/* Badges & Indicators Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/50 pb-3">
          <BlinkStatus />
          <HitCounter />
          <NetscapeBadge />
        </div>

        {/* Webring / Affiliate Banner Row */}
        <div className="bevel-lowered bg-void p-3 flex flex-col items-center gap-2">
          <span className="font-label text-[8px] text-signal/60 uppercase tracking-widest">
            OFFICIAL WEBRING AFFILIATE NETWORK // 1999
          </span>
          <div className="w-full px-2">
            <img
              src={webringBanner}
              alt="dark green webring affiliate banner"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* MOTIF 9: Phone Booth / Exit Point Button */}
        <div className="flex justify-center">
          <button
            onClick={handleExitPoint}
            className="bevel-button text-signal border-signal font-mono text-xs px-4 py-2 font-bold cursor-pointer hover:bg-surface-container-high uppercase tracking-wider flex items-center gap-2"
          >
            <img
              src={phoneBoothIcon}
              alt="rotary phone exit point icon"
              className="w-4 h-4 object-contain"
            />
            [ EXIT_POINT // RETURN TO REALITY ]
          </button>
        </div>

        {/* Requirements & Rating Badges Strip */}
        <div className="flex flex-wrap items-center justify-around gap-2 text-center">
          <div className="bevel-lowered px-2.5 py-1 text-[9px] text-on-surface-variant/70 uppercase">
            ⚡ REQUIRES FLASH PLAYER 4.0
          </div>
          <div className="bevel-lowered px-2.5 py-1 text-[9px] text-on-surface-variant/70 uppercase">
            🎬 QUICKTIME 4.0 AUDIO / VIDEO
          </div>
          <div className="bevel-lowered px-3 py-1 text-[9px] text-signal font-bold uppercase border-l-2 border-signal">
            RATED R — RESTRICTED (CYBERNETIC VIOLENCE & INTENSE TERMINAL ACTION)
          </div>
        </div>

        {/* MOTIF 2: Code Rain Signature Visual Footnote Label */}
        <div className="bevel-lowered p-2 bg-void text-center flex flex-col gap-1">
          <span className="font-headline text-[10px] font-bold text-signal tracking-widest uppercase">
            SIGNATURE VISUAL: CASCADE CODE RENDER — ORIGINAL GENERATIVE TECHNIQUE
          </span>
          <span className="font-mono text-[9px] text-on-surface-variant/50">
            Framed as an original generative web art homage to the iconic green rain motif.
          </span>
        </div>

        {/* Fictional Studio Copyright & Disclaimer */}
        <div className="flex flex-col items-center justify-center text-center gap-1">
          <p className="font-headline text-xs font-bold text-on-surface tracking-wider uppercase">
            THE MATRIX © 1999 OMEGA PICTURES ENTERTAINMENT (CONCEPT REDESIGN SERIES)
          </p>
          <p className="font-mono text-[9px] text-on-surface-variant/50 leading-relaxed max-w-lg">
            CONCEPT REDESIGN PIECE FOR THE "WHAT IF [FILM] HAD A WEBSITE?" SERIES.
            ALL TRADEMARKS BELONG TO THEIR RESPECTIVE OWNERS. NO OFFICIAL FILM STILLS OR COPYRIGHTED ASSETS REPRODUCED.
          </p>
        </div>

        {/* Legal / Social Link Placeholders */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-t border-outline-variant/40 pt-3">
          {["PRIVACY POLICY", "TERMS OF ACCESS", "PRESS KIT (PDF)", "SYSTEM MAP", "CONTACT STUDIO"].map((item) => (
            <button
              key={item}
              onClick={() => {
                triggerGlitch(200);
                alert(`Accessing legal node: ${item}`);
              }}
              className="bevel-button text-on-surface-variant hover:text-signal text-[9px] font-mono px-2 py-0.5 cursor-pointer uppercase"
            >
              [ {item} ]
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
