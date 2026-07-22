// ─────────────────────────────────────────────────────────────────────────────
// HOME MEDIA SECTION — "Own It On VHS & DVD"
// Alternating split: LEFT = format cards stack, RIGHT = VHS visual + CTA
// Opposite of Showtimes (ticket stub LEFT) → creates alternating left/right rhythm
// ─────────────────────────────────────────────────────────────────────────────

import vhsBoxArt1 from "../../assets/images/optimized/vhs-box-art-1.webp";
import vhsBoxArt2 from "../../assets/images/optimized/vhs-box-art-2.webp";
import vhsBoxArt3 from "../../assets/images/optimized/vhs-box-art-3.webp";
import codeRainTexture from "../../assets/images/optimized/code-rain-texture.webp";

interface MediaFormat {
  id: string;
  format: string;
  badge: string;
  tagline: string;
  features: string[];
  price: string;
  boxArt: string;
}

const HOME_FORMATS: MediaFormat[] = [
  {
    id: "vhs",
    format: "SPECIAL EDITION VHS",
    badge: "HI-FI STEREO",
    tagline: "Collector's Green Tape Shell + Holographic Sleeve",
    features: [
      "Digitally remastered Hi-Fi Surround Sound",
      "Includes exclusive 10-min behind-the-scenes featurette",
      "Collector's holographic outer slipcase",
    ],
    price: "$19.98",
    boxArt: vhsBoxArt1,
  },
  {
    id: "dvd",
    format: "2-DISC COLLECTOR'S DVD",
    badge: "DOLBY 5.1 & COMMENTARY",
    tagline: "Widescreen Anamorphic 16:9 Transfer",
    features: [
      "Director & Visual Effects Crew Audio Commentary",
      "Interactive 3D Matrix Construct Menu Navigation",
      "Behind-The-Scenes documentary: 'Hacking The Grid'",
    ],
    price: "$24.98",
    boxArt: vhsBoxArt2,
  },
  {
    id: "laserdisc",
    format: "LASERDISC MASTER EDITION",
    badge: "UNCOMPRESSED PCM",
    tagline: "12-Inch Dual-Sided Collector's Disc",
    features: [
      "Uncompressed 16-bit 44.1kHz PCM Digital Audio",
      "THX Certified Video Transfer with Isolated Score Track",
      "Limited edition 8-page archival production booklet",
    ],
    price: "$39.98",
    boxArt: vhsBoxArt3,
  },
];

export function HomeMedia() {
  return (
    <section
      id="homemedia"
      className="scroll-mt-4 w-full bg-transparent py-1 px-2 font-mono box-border"
    >
      <div className="w-full max-w-[960px] mx-auto bevel-raised bg-surface">

        {/* Panel Header */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
          <span className="font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">
            HOME_MEDIA.DAT // OWN_IT_ON_VHS_AND_DVD
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/60">
            <span>[ − ]</span><span>[ # ]</span><span>[ × ]</span>
          </div>
        </div>

        {/* ── ALTERNATING SPLIT — LEFT cards, RIGHT graphic ─────────── */}
        <div
          className="homemedia-split"
          style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 0 }}
        >
          {/* LEFT: Format cards — 3 rows stacked vertically */}
          <div className="flex flex-col divide-y divide-outline-variant/40 border-r border-outline-variant">
            {HOME_FORMATS.map((item) => (
              <div key={item.id} className="p-4 bg-surface flex gap-4 hover:bg-surface-container transition-colors duration-150">
                {/* Mini box-art thumbnail */}
                <div className="bevel-lowered w-16 h-22 shrink-0 bg-surface-container-lowest overflow-hidden flex flex-col items-center justify-center p-0.5 text-center relative">
                  <img
                    src={item.boxArt}
                    alt="retro home video box art edition"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Format info */}
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-headline text-xs font-bold text-on-surface uppercase tracking-wider leading-tight">
                      {item.format}
                    </h4>
                    <span className="font-label text-[8px] text-on-surface-variant/80 bevel-lowered px-1.5 py-0.5 bg-surface-container shrink-0 uppercase">
                      {item.badge.split(" ")[0]}
                    </span>
                  </div>

                  <p className="font-mono text-[10px] text-signal/80 leading-snug">
                    {item.tagline}
                  </p>

                  <ul className="flex flex-col gap-0.5 text-[10px] text-on-surface-variant list-none pl-0">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-signal/60 select-none shrink-0">&gt;</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between border-t border-outline-variant/30 pt-1.5 mt-auto">
                    <span className="font-mono text-xs font-bold text-on-surface">{item.price}</span>
                    <button
                      onClick={() => alert(`Pre-order initiated for ${item.format}`)}
                      className="bevel-button text-signal font-mono text-[10px] px-2.5 py-1 font-bold cursor-pointer hover:bg-surface-container"
                    >
                      [ ORDER NOW ]
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Visual + section header + CTA */}
          <div
            className="flex flex-col items-center justify-center p-6 gap-5 relative overflow-hidden bg-void"
            style={{ minHeight: "340px" }}
          >
            {/* Background digital code rain texture */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
              <img
                src={codeRainTexture}
                alt="digital code rain background texture"
                className="w-full h-full object-cover mix-blend-screen"
              />
            </div>

            {/* VHS box-art graphic card */}
            <div className="bevel-raised bg-surface p-2 flex flex-col items-center gap-2 w-full max-w-[200px] relative z-10">
              <div className="w-full h-48 bevel-lowered overflow-hidden bg-surface-container-lowest">
                <img
                  src={vhsBoxArt1}
                  alt="retro home video box art design"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="font-label text-[8px] text-signal/70 uppercase tracking-widest mt-1">
                OMEGA HOME VIDEO
              </div>
              <div className="flex gap-2 w-full justify-center">
                {["VHS", "DVD", "LD"].map((fmt) => (
                  <span key={fmt} className="bevel-lowered px-1.5 py-0.5 font-mono text-[8px] text-signal/70">
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* Section header */}
            <div className="text-center relative z-10">
              <span className="font-label text-[9px] text-on-surface-variant/50 uppercase tracking-[0.25em]">
                HOME RELEASE //
              </span>
              <h2
                style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(1.2rem, 3vw, 1.7rem)" }}
                className="text-signal font-bold uppercase leading-tight mt-0.5"
              >
                Own it.<br />Replay the grid.
              </h2>
              <p className="font-mono text-[10px] text-on-surface-variant/60 mt-1">
                AVAILABLE AT MAJOR VIDEO RETAILERS
              </p>
            </div>
          </div>
        </div>

        <div className="px-3 py-1.5 border-t border-outline-variant/40 bg-surface-container-lowest text-center select-none">
          <span className="font-label text-[9px] text-on-surface-variant/40 uppercase tracking-widest">
            VHS HI-FI STEREO // DOLBY DIGITAL // LASERDISC PCM DIGITAL AUDIO
          </span>
        </div>
      </div>

      {/* Responsive: stack in content-first order on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .homemedia-split {
            grid-template-columns: 1fr !important;
          }
          .homemedia-split > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .homemedia-split > div:last-child {
            min-height: 260px !important;
          }
        }
      `}</style>
    </section>
  );
}
