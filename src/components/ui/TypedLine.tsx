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
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        fontSize: "0.85rem",
        lineHeight: 1.7,
        margin: 0,
        ...style,
      }}
    >
      <span
        style={{
          color: "rgba(0, 255, 65, 0.45)",
          userSelect: "none",
          flexShrink: 0,
          fontWeight: "bold",
        }}
      >
        {prompt}
      </span>
      <span style={{ color: dim ? "rgba(0, 255, 65, 0.55)" : "rgba(0, 255, 65, 0.90)" }}>
        {children}
      </span>
    </p>
  );
}
