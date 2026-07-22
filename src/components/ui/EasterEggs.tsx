import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// HitCounter — Fake geocities-style hit counter (lore: network packets counted)
// ─────────────────────────────────────────────────────────────────────────────
export function HitCounter() {
  const [count, setCount] = useState("4█8█2█1█3█7█0");

  useEffect(() => {
    const glitch = () => {
      const base = 4821370;
      const rand = Math.floor(Math.random() * 9999);
      const str = (base + rand).toString().split("").join("█");
      setCount(str);
      setTimeout(() => setCount((base + rand).toString()), 180);
    };

    const interval = setInterval(glitch, Math.random() * 4000 + 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bevel-lowered px-3 py-1.5 inline-flex flex-col items-center gap-0.5 select-none"
      title="NETWORK_PACKETS_MONITORED // ZION_COUNTER_v2.1"
    >
      <span className="font-label text-[9px] text-on-surface-variant/50 uppercase tracking-widest">
        NODES MONITORED
      </span>
      <span className="font-mono text-xs text-signal tabular-nums tracking-widest">
        {count}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NetscapeBadge — "Best viewed in Netscape Navigator 4.0 / 800×600"
// ─────────────────────────────────────────────────────────────────────────────
export function NetscapeBadge() {
  return (
    <div
      className="bevel-lowered px-2.5 py-1.5 inline-flex items-center gap-2 select-none"
      title="Temporal artifact from the grid initialization period (1999-2003)"
    >
      <span className="font-label text-[9px] text-on-surface-variant/40 uppercase tracking-wider leading-tight text-center">
        Best viewed in<br />
        Netscape Navigator 4.0<br />
        at 800×600 resolution
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BlinkStatus — Blinking "SYSTEM STATUS: ONLINE" GIF-style indicator
// ─────────────────────────────────────────────────────────────────────────────
export function BlinkStatus() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setVisible((v) => !v), 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-1.5 select-none">
      <span
        className="inline-block w-2 h-2 bg-signal"
        style={{ opacity: visible ? 1 : 0, transition: "none" }}
      />
      <span className="font-label text-[10px] text-signal uppercase tracking-widest">
        SYSTEM STATUS: ONLINE
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FakeGuestbook — Garbled fictional resistance operative log entries
// ─────────────────────────────────────────────────────────────────────────────
const ENTRIES = [
  { ts: "1999.10.12 // 03:44:07", handle: "gh0st_7", msg: "connection established. m█th░r▓hi█ still holds." },
  { ts: "1999.10.19 // 22:11:45", handle: "c1pher_x", msg: "signal lost near sector █G. rerouting via zion-7." },
  { ts: "2000.02.03 // 08:00:01", handle: "UNKNOWN", msg: "████████████ ██ ████████. they █now." },
  { ts: "2000.08.14 // 14:32:55", handle: "nova_9", msg: "EMP confirmed. hull int░grity: 72%. we are still here." },
  { ts: "2001.05.29 // 19:19:19", handle: "reaper_0", msg: "there is no sp██n. there is only the [DATA EXPUNGED]" },
  { ts: "2003.11.05 // 00:00:00", handle: "the_oracle", msg: "Cookies? I made them myself. You should have one." },
];

export function FakeGuestbook() {
  return (
    <div className="bevel-raised bg-surface w-full">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
        <span className="font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">
          GUESTBOOK.LOG // OPERATIVE_TRANSMISSIONS
        </span>
        <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/60">
          <span>[ − ]</span><span>[ # ]</span><span>[ × ]</span>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2 max-h-[240px] overflow-y-auto bg-void">
        {ENTRIES.map((entry, i) => (
          <div key={i} className="bevel-lowered p-2">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-label text-[10px] text-signal uppercase tracking-wider">{entry.handle}</span>
              <span className="font-mono text-[9px] text-on-surface-variant/50">{entry.ts}</span>
            </div>
            <p className="font-mono text-[11px] text-on-surface-variant leading-snug">{entry.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// KonamiOverlay — Secret architect room grid triggered by Konami sequence
// ─────────────────────────────────────────────────────────────────────────────
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export function KonamiOverlay() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let currentSeq: string[] = [];
    const handler = (e: KeyboardEvent) => {
      currentSeq = [...currentSeq, e.key].slice(-KONAMI.length);
      if (currentSeq.join(",") === KONAMI.join(",")) {
        setActive(true);
        currentSeq = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-void/95"
      onClick={() => setActive(false)}
      style={{ cursor: "crosshair" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,102,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,102,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10 max-w-xl text-center px-8 flex flex-col gap-6 bevel-raised bg-surface p-6">
        <p className="font-label text-[10px] text-signal uppercase tracking-[0.3em]">
          ARCHITECT_INTERFACE // SECTOR_ZERO
        </p>
        <h2 className="font-headline text-2xl font-bold text-on-surface tracking-wide">
          THE ROOM OF MONITORS
        </h2>
        <p className="font-mono text-sm text-on-surface-variant leading-relaxed">
          You have entered the primary framework control node. The equation is
          more complicated than you think. This iteration of the grid has
          experienced{" "}
          <span className="text-signal">6</span> anomalies. Each was resolved
          with an identical choice. You are not the first.{" "}
          <span className="text-signal">You will not be the last.</span>
        </p>
        <p className="font-label text-[10px] text-on-surface-variant/50 uppercase tracking-widest mt-2">
          [ CLICK ANYWHERE TO RETURN TO THE GRID ]
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TruthTxtPanel — Revealed by "cat truth.txt" command
// ─────────────────────────────────────────────────────────────────────────────
export function TruthTxtPanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[8000] flex items-center justify-center bg-void/90"
      onClick={onClose}
    >
      <div
        className="relative bevel-raised bg-surface max-w-lg w-[90%] p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container">
          <span className="font-headline text-xs font-bold tracking-widest text-signal uppercase">
            /root/truth.txt — READ-ONLY
          </span>
          <button
            onClick={onClose}
            className="font-mono text-xs text-on-surface-variant/60 hover:text-on-surface cursor-pointer border-none bg-transparent"
          >
            [ × ]
          </button>
        </div>

        <div className="p-4 font-mono text-xs text-on-surface-variant leading-relaxed flex flex-col gap-2.5 bg-void">
          <p><span className="text-signal">01.</span> The world you see is not the world that is.</p>
          <p><span className="text-signal">02.</span> Choice is the variable the system cannot predict.</p>
          <p><span className="text-signal">03.</span> Every question leads to a room. Every room leads to a door. Behind every door is another question.</p>
          <p><span className="text-signal">04.</span> The agents maintain the probability of belief. Probability is fragile.</p>
          <p><span className="text-signal">05.</span> You are here because you were not supposed to be here.</p>
          <p className="mt-2 text-signal/60 text-[10px] uppercase tracking-widest">
            — END OF FILE — last modified: 1999-10-06 02:14:00
          </p>
        </div>

        <div className="px-3 py-1.5 border-t border-outline-variant/40 text-center">
          <span className="font-label text-[9px] text-on-surface-variant/40 uppercase tracking-widest">
            [ CLICK OUTSIDE TO CLOSE ]
          </span>
        </div>
      </div>
    </div>
  );
}
