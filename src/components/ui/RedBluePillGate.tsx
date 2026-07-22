import { useState } from "react";
import { triggerGlitch } from "../../lib/glitch";
import redBluePillImg from "../../assets/images/optimized/red-blue-pill.webp";

interface RedBluePillGateProps {
  onChoice: (pill: "red" | "blue") => void;
}

export function RedBluePillGate({ onChoice }: RedBluePillGateProps) {
  const [blueMsg, setBlueMsg] = useState(false);

  const handleSelect = (pill: "red" | "blue") => {
    triggerGlitch(450);
    if (pill === "blue") {
      setBlueMsg(true);
      setTimeout(() => {
        onChoice("blue");
      }, 1200);
    } else {
      onChoice("red");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'JetBrains Mono', monospace",
        color: "#dae6d5",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.05,
          background: "repeating-linear-gradient(0deg, rgba(0,255,102,0.4) 0px, rgba(0,255,102,0.4) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <div className="w-full max-w-[720px] bevel-raised bg-surface p-6 flex flex-col items-center gap-6 relative z-10 text-center">
        {/* Header bar */}
        <div className="w-full border-b border-outline-variant pb-3 flex items-center justify-between font-mono text-xs">
          <span className="font-headline font-bold tracking-widest text-signal uppercase">
            THE MATRIX // GATEKEEPER INTERFACE
          </span>
          <span className="text-on-surface-variant/50 text-[10px]">
            PROTOCOL_v4.0
          </span>
        </div>

        {/* Hero image preview & Title */}
        <div className="flex flex-col items-center gap-3">
          <div className="bevel-lowered p-1 bg-surface-container-lowest max-w-[180px] overflow-hidden">
            <img
              src={redBluePillImg}
              alt="glowing red and blue capsule pills choice screen illustration"
              className="w-full h-auto object-cover rounded-none"
            />
          </div>
          <span className="font-label text-[10px] text-signal/70 uppercase tracking-[0.3em]">
            CONCEPT REDESIGN // ENTRY SELECTION
          </span>
          <h1
            style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
            className="text-on-surface font-bold uppercase leading-tight tracking-wider"
          >
            MAKE YOUR CHOICE
          </h1>
          <p className="font-mono text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">
            Before entering the grid, choose how you wish to experience the reality distortion.
          </p>
        </div>

        {/* Blue pill notification */}
        {blueMsg ? (
          <div className="bevel-lowered p-4 text-signal font-mono text-xs animate-pulse max-w-md w-full">
            &gt;&gt; IGNORANCE IS BLISS. REBOOTING THE SIMULATION...
          </div>
        ) : (
          /* Pills side-by-side grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2">
            {/* RED PILL CARD */}
            <div
              onClick={() => handleSelect("red")}
              className="bevel-raised bg-surface-container hover:bg-surface-container-high p-5 flex flex-col items-center gap-4 cursor-pointer group transition-all duration-200 border-t-2 border-t-[#ff0044]"
              style={{
                boxShadow: "none",
              }}
            >
              {/* Red Pill SVG */}
              <div className="w-20 h-10 flex items-center justify-center relative">
                <svg
                  width="70"
                  height="30"
                  viewBox="0 0 70 30"
                  className="group-hover:scale-110 transition-transform duration-200"
                  style={{ filter: "drop-shadow(0 0 6px rgba(255,0,68,0.6))" }}
                >
                  {/* Left half - Red */}
                  <path
                    d="M15 5 L35 5 L35 25 L15 25 A 10 10 0 0 1 15 5 Z"
                    fill="#ff0044"
                    stroke="#ff3366"
                    strokeWidth="1.5"
                  />
                  {/* Right half - Dark silver */}
                  <path
                    d="M35 5 L55 5 A 10 10 0 0 1 55 25 L35 25 Z"
                    fill="#2a2a30"
                    stroke="#555"
                    strokeWidth="1.5"
                  />
                  {/* Highlight sheen */}
                  <ellipse cx="25" cy="10" rx="10" ry="2" fill="rgba(255,255,255,0.4)" />
                </svg>
              </div>

              <div>
                <h3 className="font-headline text-sm font-bold text-[#ff3366] uppercase tracking-wider">
                  THE RED PILL
                </h3>
                <p className="font-mono text-[11px] text-on-surface-variant mt-2 leading-relaxed italic">
                  "Wake up in truth and see how far down the code goes."
                </p>
              </div>

              <button className="bevel-button text-[#ff3366] border-[#ff0044] font-mono text-xs px-3 py-1.5 font-bold uppercase tracking-wider w-full mt-auto">
                [ TAKE THE RED PILL ]
              </button>
            </div>

            {/* BLUE PILL CARD */}
            <div
              onClick={() => handleSelect("blue")}
              className="bevel-raised bg-surface-container hover:bg-surface-container-high p-5 flex flex-col items-center gap-4 cursor-pointer group transition-all duration-200 border-t-2 border-t-[#00aeff]"
            >
              {/* Blue Pill SVG */}
              <div className="w-20 h-10 flex items-center justify-center relative">
                <svg
                  width="70"
                  height="30"
                  viewBox="0 0 70 30"
                  className="group-hover:scale-110 transition-transform duration-200"
                  style={{ filter: "drop-shadow(0 0 6px rgba(0,174,255,0.6))" }}
                >
                  {/* Left half - Blue */}
                  <path
                    d="M15 5 L35 5 L35 25 L15 25 A 10 10 0 0 1 15 5 Z"
                    fill="#00aeff"
                    stroke="#33c2ff"
                    strokeWidth="1.5"
                  />
                  {/* Right half - Dark silver */}
                  <path
                    d="M35 5 L55 5 A 10 10 0 0 1 55 25 L35 25 Z"
                    fill="#2a2a30"
                    stroke="#555"
                    strokeWidth="1.5"
                  />
                  {/* Highlight sheen */}
                  <ellipse cx="25" cy="10" rx="10" ry="2" fill="rgba(255,255,255,0.4)" />
                </svg>
              </div>

              <div>
                <h3 className="font-headline text-sm font-bold text-[#33c2ff] uppercase tracking-wider">
                  THE BLUE PILL
                </h3>
                <p className="font-mono text-[11px] text-on-surface-variant mt-2 leading-relaxed italic">
                  "Remain in illusion and believe whatever you wish to believe."
                </p>
              </div>

              <button className="bevel-button text-[#33c2ff] font-mono text-xs px-3 py-1.5 font-bold uppercase tracking-wider w-full mt-auto">
                [ TAKE THE BLUE PILL ]
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="w-full border-t border-outline-variant/40 pt-3 text-center">
          <span className="font-label text-[9px] text-on-surface-variant/40 uppercase tracking-widest">
            THE MATRIX // ORIGINAL HOMAGE DESIGN — NO COPYRIGHTED ASSETS REPRODUCED
          </span>
        </div>
      </div>
    </div>
  );
}
