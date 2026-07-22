import type { ReactNode } from "react";

interface TypedLineProps {
  prompt?: string;
  children: ReactNode;
  style?: React.CSSProperties;
  dim?: boolean;
}

export function TypedLine({ prompt = "$", children, style, dim = false }: TypedLineProps) {
  return (
    <p
      style={style}
      className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed my-0 font-mono"
    >
      <span className="text-signal select-none shrink-0 font-bold font-label">
        {prompt}
      </span>
      <span className={dim ? "text-on-surface-variant/70" : "text-on-surface"}>
        {children}
      </span>
    </p>
  );
}
