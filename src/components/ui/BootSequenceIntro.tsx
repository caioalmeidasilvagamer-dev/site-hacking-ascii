import { useEffect, useState, useRef } from "react";

/**
 * BootSequenceIntro — brief boot screen before KernelBoot.
 * Full black, centered blinking cursor, typewriter lines (~300ms each),
 * then completes. Stored in sessionStorage so it only plays once per session.
 */

const BOOTSEQ_LINES = [
  "INITIALIZING REALITY OVERRIDE...",
  "ESTABLISHING UPLINK TO ZION MAINFRAME...",
  "SIGNAL LOCK: CONFIRMED",
  "> ACCESS GRANTED_",
];

const STORAGE_KEY = "matrix-bootseq-seen";

interface BootSequenceIntroProps {
  onComplete: () => void;
}

export function BootSequenceIntro({ onComplete }: BootSequenceIntroProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (sessionStorage.getItem(STORAGE_KEY)) {
      onCompleteRef.current();
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOTSEQ_LINES.forEach((line, idx) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) setVisibleLines((prev) => [...prev, line]);
        }, idx * 300)
      );
    });

    timers.push(
      setTimeout(() => {
        if (!cancelled) {
          sessionStorage.setItem(STORAGE_KEY, "1");
          onCompleteRef.current();
        }
      }, BOOTSEQ_LINES.length * 300 + 250)
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Scanline overlay */}
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

      <div style={{ width: "min(580px, 88vw)" }}>
        {visibleLines.map((line, idx) => (
          <div
            key={idx}
            style={{
              fontSize: 14,
              lineHeight: 2,
              letterSpacing: "0.04em",
              color:
                idx === visibleLines.length - 1
                  ? "#00ff41"
                  : "rgba(0, 255, 65, 0.80)",
              fontWeight: idx === visibleLines.length - 1 ? "bold" : "normal",
            }}
          >
            {line}
          </div>
        ))}

        {visibleLines.length > 0 && visibleLines.length < BOOTSEQ_LINES.length && (
          <span
            style={{
              display: "inline-block",
              width: 9,
              height: 14,
              background: "#00ff41",
              verticalAlign: "middle",
              animation: "bootSeqCursorBlink 0.6s step-end infinite",
            }}
          />
        )}

        <style>{`
          @keyframes bootSeqCursorBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </div>

      {/* SKIP button */}
      <button
        onClick={() => {
          sessionStorage.setItem(STORAGE_KEY, "1");
          window.scrollTo(0, 0);
          onCompleteRef.current();
        }}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          background: "none",
          border: "none",
          color: "rgba(0,255,65,0.3)",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 11,
          cursor: "pointer",
          letterSpacing: "0.1em",
          padding: "4px 8px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgba(0,255,65,0.7)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(0,255,65,0.3)";
        }}
      >
        [ SKIP ▸ ]
      </button>
    </div>
  );
}
