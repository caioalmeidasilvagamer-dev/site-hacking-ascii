import { useEffect, useState, useRef } from "react";

const GLITCH_CHARS = "01#*+=-:.!@$%&?<>[]{}ΑΒΓΔΕΖΗΘΙΚΛ";

interface GlitchTextProps {
  text: string;
  start: boolean;
}

export function GlitchText({ text, start }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const isDecoding = useRef(false);

  // ── 1. Entrada Decodificando (Scramble-In) ──────────────────────────────────
  useEffect(() => {
    if (!start) {
      // Inicia preenchido com caracteres aleatórios antes da chuva terminar
      setDisplayText(
        text
          .split("")
          .map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
          .join("")
      );
      return;
    }

    isDecoding.current = true;
    let frame = 0;
    const durationFrames = 30; // ~600ms para decodificar
    const len = text.length;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / durationFrames;

      const scrambled = text
        .split("")
        .map((char, index) => {
          // Revela de esquerda para a direita
          if (index / len > progress) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          // Brilho/Glitch rápido antes de travar o caractere original
          if (index / len > progress - 0.15) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          return char;
        })
        .join("");

      setDisplayText(scrambled);

      if (frame >= durationFrames) {
        clearInterval(interval);
        setDisplayText(text);
        isDecoding.current = false;
      }
    }, 20);

    return () => clearInterval(interval);
  }, [text, start]);

  // ── 2. Glitch Ocioso Aleatório (Idle Scrambler) ──────────────────────────────
  useEffect(() => {
    if (!start) return;

    const triggerGlitch = () => {
      if (isDecoding.current) return;

      // Ativa efeito visual de sombra de cores divididas
      setIsGlitching(true);

      // Escolhe 1 ou 2 caracteres aleatórios para glitchar
      const numGlitches = Math.random() > 0.5 ? 2 : 1;
      const targetIndices: number[] = [];
      while (targetIndices.length < numGlitches) {
        const rIdx = Math.floor(Math.random() * text.length);
        if (!targetIndices.includes(rIdx)) {
          targetIndices.push(rIdx);
        }
      }

      let ticks = 0;
      const maxTicks = 6; // dura em torno de 120ms

      const glitchInterval = setInterval(() => {
        ticks++;

        const scrambled = text
          .split("")
          .map((char, idx) => {
            if (targetIndices.includes(idx)) {
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }
            return char;
          })
          .join("");

        setDisplayText(scrambled);

        if (ticks >= maxTicks) {
          clearInterval(glitchInterval);
          setDisplayText(text);
          setIsGlitching(false);
        }
      }, 20);
    };

    // Glitch aleatório entre 2.5s e 5s
    let timerId: ReturnType<typeof setTimeout>;

    const runGlitchLoop = () => {
      const nextTime = 2500 + Math.random() * 2500;
      timerId = setTimeout(() => {
        triggerGlitch();
        runGlitchLoop();
      }, nextTime);
    };

    runGlitchLoop();

    return () => {
      clearTimeout(timerId);
    };
  }, [text, start]);

  return (
    <span
      style={{
        display: "inline-block",
        transition: "text-shadow 0.05s ease",
        textShadow: isGlitching
          ? "3px -1px 0 rgba(0, 255, 65, 0.8), -3px 1px 0 rgba(140, 255, 175, 0.9), 0 0 12px rgba(0, 255, 65, 0.8)"
          : "0 0 12px rgba(0, 255, 65, 0.7)",
      }}
    >
      {displayText}
    </span>
  );
}
