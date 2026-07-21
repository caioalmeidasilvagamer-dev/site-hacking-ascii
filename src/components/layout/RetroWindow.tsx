import { type ReactNode, useState } from "react";
import { Search, X, Minus, Plus } from "lucide-react";

interface RetroWindowProps {
  title?: string;
  children: ReactNode;
}

export function RetroWindow({ title = "caio_dev", children }: RetroWindowProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="relative mx-auto my-4 w-[calc(100%-1.5rem)] max-w-5xl md:my-8">
      {/* Moldura tracejada com tokens do Stitch */}
      <div className="rounded-sm border-2 border-dashed border-[rgba(0,255,102,0.45)] bg-void shadow-[0_0_40px_rgba(0,255,102,0.08)]">
        {/* Topbar */}
        <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-[rgba(0,255,102,0.35)] bg-[rgba(24,34,24,0.92)] px-3 py-2 font-mono text-on-surface">
          <div className="flex items-center gap-2 text-signal">
            <button
              aria-label="fechar"
              className="cursor-pointer rounded-sm p-0.5 transition-colors hover:bg-signal-dim"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
            <button
              aria-label="minimizar"
              className="cursor-pointer rounded-sm p-0.5 transition-colors hover:bg-signal-dim"
            >
              <Minus size={14} strokeWidth={2.5} />
            </button>
            <button
              aria-label="maximizar"
              className="cursor-pointer rounded-sm p-0.5 transition-colors hover:bg-signal-dim"
            >
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>

          <span className="select-none font-headline text-xs font-semibold tracking-widest text-on-surface-variant md:text-sm">
            {title}
          </span>

          <div className="hidden items-center gap-1.5 rounded-sm border border-outline-variant bg-void px-2 py-1 text-xs text-on-surface-variant sm:flex">
            <Search size={12} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search..."
              className="w-20 bg-transparent font-mono placeholder:text-outline focus:outline-none md:w-32"
            />
          </div>
        </div>

        {/* Conteúdo real do site */}
        <div className="bg-[rgba(12,22,12,0.60)] font-mono text-on-surface backdrop-blur-xs">
          {children}
        </div>
      </div>
    </div>
  );
}
