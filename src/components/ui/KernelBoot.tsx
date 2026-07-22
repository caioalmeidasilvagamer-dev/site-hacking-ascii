import { useEffect, useState, useRef } from "react";

/**
 * KernelBoot — tela de boot estilo terminal que precede a chuva Matrix.
 * Exibe mensagens de log em sequência, barra de progresso e depois chama onComplete().
 */

const TOTAL_MS = 3800; // Duração total da sequência de boot

const BOOT_LINES = [
  { text: "NEBUCHADNEZZAR_OS v4.0.2 [build 19991031]", delay: 0,    bold: true,  dim: false },
  { text: "──────────────────────────────────────────────────────", delay: 200,  bold: false, dim: true  },
  { text: "[OK] ZION uplink established.....................",     delay: 500,  bold: false, dim: false, prefix: ">> " },
  { text: "[OK] Hull integrity check: 91%....................",    delay: 950,  bold: false, dim: false, prefix: ">> " },
  { text: "[OK] EMP charge: 74% — within safe threshold....",    delay: 1380, bold: false, dim: false, prefix: ">> " },
  { text: "[OK] Kernel cryptography: AES-256 active.........",   delay: 1800, bold: false, dim: false, prefix: ">> " },
  { text: "[OK] Agent sweep: sector 6 monitored.............",   delay: 2220, bold: false, dim: false, prefix: ">> " },
  { text: "[OK] Secure channel to Zion Mainframe: OPEN......",   delay: 2640, bold: false, dim: false, prefix: ">> " },
  { text: "──────────────────────────────────────────────────────", delay: 3050, bold: false, dim: true  },
  { text: "SYSTEM INITIALIZED — ACCESS GRANTED — WELCOME OPERATOR", delay: 3300, bold: true,  dim: false },
] as const;

const TOTAL_BLOCKS = 18;

interface KernelBootProps {
  onComplete: () => void;
}

export function KernelBoot({ onComplete }: KernelBootProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress]         = useState(0);

  const onCompleteRef  = useRef(onComplete);
  const startTimeRef   = useRef(Date.now());
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Agenda aparecimento de cada linha
    BOOT_LINES.forEach((line, idx) => {
      timers.push(
        setTimeout(() => setVisibleCount(idx + 1), line.delay)
      );
    });

    // Atualiza percentagem a cada 80ms com base no tempo real decorrido
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, Math.round((elapsed / TOTAL_MS) * 100));
      setProgress(pct);
    }, 80);

    // Dispara a fase da chuva Matrix sem fade-out (a chuva vai apagar a tela de boot)
    timers.push(
      setTimeout(() => {
        setProgress(100);
        onCompleteRef.current();
      }, TOTAL_MS + 100)
    );

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  const filled = Math.round((progress / 100) * TOTAL_BLOCKS);
  const bar    = "■".repeat(filled) + "□".repeat(TOTAL_BLOCKS - filled);

  return (
    <div
      style={{
        position:   "fixed",
        inset:      0,
        zIndex:     50, // Atrás do canvas do MatrixIntro (zIndex 99999)
        background: "#000",
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Scanline overlay sutil */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.07,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,255,65,0.4) 0px, rgba(0,255,65,0.4) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <div style={{ width: "min(580px, 88vw)", position: "relative" }}>

        {/* Linhas de log */}
        {BOOT_LINES.slice(0, visibleCount).map((line, idx) => (
          <div
            key={idx}
            style={{
              fontSize:      13,
              lineHeight:    1.75,
              letterSpacing: "0.04em",
              color: line.dim
                ? "rgba(0, 255, 65, 0.28)"
                : line.bold
                  ? "#00ff41"
                  : "rgba(0, 255, 65, 0.80)",
              fontWeight: line.bold ? "bold" : "normal",
            }}
          >
            {"prefix" in line && (
              <span style={{ color: "rgba(0,255,65,0.45)" }}>
                {line.prefix}
              </span>
            )}
            {line.text}
          </div>
        ))}

        {/* Barra de progresso — só aparece depois da 1ª linha */}
        {visibleCount > 0 && (
          <div style={{ marginTop: 24 }}>

            {/* Texto ASCII da barra */}
            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "rgba(0, 255, 65, 0.75)",
              }}
            >
              [{bar}] {String(progress).padStart(3, "\u00a0")}%
            </div>

            {/* Barra visual fina */}
            <div
              style={{
                marginTop: 8,
                height: 1,
                background: "rgba(0,255,65,0.10)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position:   "absolute",
                  top:        0,
                  left:       0,
                  height:     "100%",
                  width:      `${progress}%`,
                  background: "rgba(0,255,65,0.65)",
                  boxShadow:  "0 0 8px rgba(0,255,65,0.8)",
                  transition: "width 0.1s linear",
                }}
              />
            </div>

          </div>
        )}

        {/* Cursor piscante no final (só quando tudo visível) */}
        {visibleCount >= BOOT_LINES.length && (
          <div
            style={{
              marginTop: 12,
              fontSize: 13,
              color: "#00ff41",
              animation: "none",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 9,
                height: 14,
                background: "#00ff41",
                verticalAlign: "middle",
                animation: "bootCursorBlink 0.6s step-end infinite",
              }}
            />
            <style>{`
              @keyframes bootCursorBlink {
                0%, 100% { opacity: 1; }
                50%       { opacity: 0; }
              }
            `}</style>
          </div>
        )}

      </div>
    </div>
  );
}
