import type { ReactNode } from "react";

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  style?: React.CSSProperties;
  id?: string;
}

export function TerminalWindow({ title, children, style, id }: TerminalWindowProps) {
  return (
    <div
      id={id}
      style={style}
      className="relative w-full max-w-[760px] rounded-xs border border-outline-variant bg-void/90 backdrop-blur-md font-mono text-on-surface shadow-[0_0_30px_rgba(0,255,102,0.06)] overflow-hidden"
    >
      {/* Scanline overlay sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,255,102,0.35) 0px, rgba(0,255,102,0.35) 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* Header bar estilo Stitch terminal */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-outline-variant bg-surface-container">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 inline-block" />
        <span className="w-2.5 h-2.5 rounded-full bg-signal/60 inline-block" />
        <span className="ml-3 font-headline text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
          {title}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="relative z-1 p-6 md:p-8">{children}</div>
    </div>
  );
}
