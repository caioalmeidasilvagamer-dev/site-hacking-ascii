import { type ReactNode } from "react";

interface RetroWindowProps {
  title?: string;
  children: ReactNode;
}

// RetroWindow: outer bevel-raised browser chrome wrapper.
// max-width expanded to 1000px to accommodate the new split-column sections.
export function RetroWindow({ title = "THE MATRIX // OFFICIAL MOVIE SITE CONCEPT (1999)", children }: RetroWindowProps) {
  return (
    <div className="relative mx-auto my-1 w-[calc(100%-1rem)] max-w-[1000px] md:my-2">
      {/* Win98-style 3D bevel raised frame */}
      <div className="bevel-raised bg-surface">
        {/* Topbar — monochrome, flat bracket window controls + fake Netscape chrome */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant bg-surface-container px-3 py-1.5 font-mono text-on-surface">
          {/* Flat monochrome window controls — no traffic lights */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/70">
            <span className="cursor-pointer hover:text-on-surface select-none">[ − ]</span>
            <span className="cursor-pointer hover:text-on-surface select-none">[ # ]</span>
            <span className="cursor-pointer hover:text-on-surface select-none">[ × ]</span>
          </div>

          {/* Window Title */}
          <span className="select-none font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase md:text-sm">
            {title}
          </span>

          {/* Fake Retro Browser Chrome Address Bar */}
          <div className="bevel-lowered px-2 py-0.5 font-mono text-[11px] text-signal/80 flex items-center gap-1 select-none">
            <span className="text-on-surface-variant/40 font-label text-[9px]">LOCATION:</span>
            <span className="tracking-wider">netscape://the.matrix/official/1999</span>
          </div>
        </div>

        {/* Content area — 20px gap between sections */}
        <div className="bg-surface font-mono text-on-surface p-4 md:p-5 flex flex-col gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
