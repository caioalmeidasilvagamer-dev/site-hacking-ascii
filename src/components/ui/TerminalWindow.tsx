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
      className="relative w-full max-w-[760px] bevel-raised bg-surface font-mono text-on-surface overflow-hidden"
    >
      {/* Header bar com controles monocromáticos estilo terminal 1999 */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
        <span className="font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">
          {title}
        </span>
        <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/60">
          <span className="cursor-pointer hover:text-on-surface">[ − ]</span>
          <span className="cursor-pointer hover:text-on-surface">[ # ]</span>
          <span className="cursor-pointer hover:text-on-surface">[ × ]</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-1 p-4 md:p-5">{children}</div>
    </div>
  );
}
