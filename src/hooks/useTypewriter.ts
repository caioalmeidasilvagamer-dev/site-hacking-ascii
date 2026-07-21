import { useEffect, useState } from "react";

export function useTypewriter(lines: string[], speed = 40, lineDelay = 400, enabled = true) {
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    if (!enabled) {
      setOutput([]);
      return;
    }
    let cancelled = false;

    async function type() {
      for (const line of lines) {
        if (cancelled) return;
        let current = "";
        for (const char of line) {
          if (cancelled) return;
          current += char;
          setOutput((prev) => [...prev.slice(0, -1), current]);
          await new Promise((r) => setTimeout(r, speed));
        }
        setOutput((prev) => [...prev, ""]);
        await new Promise((r) => setTimeout(r, lineDelay));
      }
    }

    setOutput([""]);
    type();
    return () => {
      cancelled = true;
    };
  }, [lines, speed, lineDelay, enabled]);

  return output.filter((l, i) => i < output.length - 1 || l !== "");
}
