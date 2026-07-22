// ─────────────────────────────────────────────────────────────────────────────
// TRUST STRIP — In-universe "As Seen In / Affiliated With" horizontal bar
// Monochrome green, muted opacity, single row of wordmarks/logotypes
// Mimics "Trusted by Clients & Partners" strips from 1999-era agency sites
// ─────────────────────────────────────────────────────────────────────────────

const AFFILIATIONS = [
  { id: "zion",     mark: "⊞ ZION_CHRONICLE",  sub: "PRESS" },
  { id: "neural",   mark: "◈ NEURAL_WEEKLY",    sub: "MEDIA" },
  { id: "sector9",  mark: "▣ SECTOR-9 IMAX",    sub: "VENUE" },
  { id: "aetheria", mark: "◆ AETHERIA CINEMA",  sub: "STUDIO" },
  { id: "reel",     mark: "◉ METRO_REEL",       sub: "REVIEWS" },
  { id: "dolby",    mark: "▤ DOLBY_DIGITAL",    sub: "AUDIO" },
];

export function TrustStrip() {
  return (
    <div
      className="w-full border-y border-outline-variant/30 bg-surface-container-lowest py-3 px-4 overflow-hidden select-none"
      aria-label="Press affiliations and partners"
    >
      {/* Label */}
      <div className="text-center font-label text-[9px] text-on-surface-variant/30 uppercase tracking-[0.3em] mb-2">
        AS SEEN IN &amp; CERTIFIED BY
      </div>

      {/* Marks row */}
      <div
        className="flex items-center justify-center flex-wrap gap-x-8 gap-y-2"
      >
        {AFFILIATIONS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-0.5 opacity-35 hover:opacity-60 transition-opacity duration-300"
          >
            <span
              className="font-headline text-[11px] font-bold text-on-surface-variant uppercase tracking-widest"
            >
              {item.mark}
            </span>
            <span className="font-label text-[8px] text-on-surface-variant/50 uppercase tracking-[0.2em]">
              {item.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
