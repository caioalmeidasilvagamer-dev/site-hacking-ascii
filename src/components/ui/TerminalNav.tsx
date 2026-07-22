import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { SudoModal } from "./SudoModal";

// ── Configurações Globais ────────────────────────────────────────────────────
export const CONTACT_LINK = "#"; // Zion secure channel — not publicly exposed

export interface SectionItem {
  id: string;
  label: string;
}

interface TerminalNavProps {
  start: boolean;
  sections?: SectionItem[];
  onTruthTxt?: () => void;
}

interface HistoryEntry {
  type: "command" | "response" | "suggestion" | "system";
  content: string;
  suggestedCmd?: string;
}

const VALID_COMMANDS = [
  "help",
  "synopsis",
  "cast",
  "showtimes",
  "homemedia",
  "newsletter",
  "whoami",
  "clear",
  "cat truth.txt",
];

const PLACEHOLDERS = [
  "type 'help' to begin...",
  "try 'synopsis'...",
  "or 'cast'...",
  "discover 'showtimes'...",
  "try 'cat truth.txt'...",
];

// ── Utilitário: Distância de Levenshtein (sem lib externa) ───────────────────
function levenshteinDistance(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

// ── Componente Principal ─────────────────────────────────────────────────────
export function TerminalNav({
  start,
  sections = [
    { id: "synopsis",   label: "synopsis" },
    { id: "cast",       label: "characters" },
    { id: "showtimes",  label: "showtimes" },
    { id: "homemedia",  label: "vhs / dvd" },
    { id: "newsletter", label: "newsletter" },
  ],
  onTruthTxt,
}: TerminalNavProps) {

  // ── Estado ──────────────────────────────────────────────────────────────────
  const [welcomeText, setWelcomeText] = useState("");
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [showChips, setShowChips] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(-1);

  const [showSudoModal, setShowSudoModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const historyBoxRef = useRef<HTMLDivElement>(null);

  // ── 1. Typewriter de Boas-Vindas ─────────────────────────────────────────
  useEffect(() => {
    if (!start) return;

    const msg = "system::anomaly // type 'help' for movie portal commands_";
    let idx = 0;

    const timer = setInterval(() => {
      idx++;
      setWelcomeText(msg.slice(0, idx));
      if (idx >= msg.length) {
        clearInterval(timer);
        setWelcomeDone(true);
        setTimeout(() => setShowChips(true), 500);
      }
    }, 32);

    return () => clearInterval(timer);
  }, [start]);

  // ── 2. Placeholder Rotativo ──────────────────────────────────────────────
  useEffect(() => {
    if (!start || isFocused || inputValue.length > 0) return;

    const timer = setInterval(() => {
      setPlaceholderIdx((p) => (p + 1) % PLACEHOLDERS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [start, isFocused, inputValue]);

  // ── 3. Auto-scroll para o fim do histórico ───────────────────────────────
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // ── 4. Autocomplete Inline ───────────────────────────────────────────────
  const inlineSuggestion = useMemo(() => {
    const t = inputValue.trim().toLowerCase();
    if (!t) return "";
    const match = VALID_COMMANDS.find((c) => c.startsWith(t) && c !== t);
    return match ? match.slice(t.length) : "";
  }, [inputValue]);

  // ── 5. Execução de Comandos ──────────────────────────────────────────────
  const executeCommand = useCallback((rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const norm = cmd.toLowerCase();

    // Atualiza histórico de comandos digitados
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryPointer(-1);
    setInputValue("");

    const entries: HistoryEntry[] = [{ type: "command", content: `> ${cmd}` }];

    // A) Easter egg: cat truth.txt
    if (norm === "cat truth.txt" || norm === "cat truth" || norm === "truth.txt") {
      entries.push({
        type: "system",
        content: ">> DECRYPTING /root/truth.txt ... ACCESS GRANTED",
      });
      setHistory((prev) => [...prev, ...entries]);
      setTimeout(() => onTruthTxt?.(), 600);
      return;
    }

    // B) help
    if (norm === "help" || norm === "ajuda") {
      entries.push({
        type: "response",
        content:
          "MOVIE PORTAL COMMANDS:\n" +
          "  • synopsis    — theatrical story & technical specifications\n" +
          "  • cast        — featured characters & cast directory\n" +
          "  • showtimes   — advance tickets & theater listings\n" +
          "  • homemedia   — VHS & 2-disc collector's DVD release\n" +
          "  • newsletter  — join resistance mailing list\n" +
          "  • whoami      — identify current network operator\n" +
          "  • cat truth.txt — [CLASSIFIED FILE]\n" +
          "  • clear       — purge terminal output",
      });
    }

    // C) whoami
    else if (norm === "whoami") {
      entries.push({
        type: "response",
        content:
          "THEATRICAL NETWORK VISITOR // OPERATOR NODE\n" +
          "CLEARANCE: TICKET HOLDER // LEVEL 4\n" +
          "STATUS: CONFIRMED FOR OCTOBER 31 RELEASE\n" +
          "TIP: The question is not who you are. It is when.",
      });
    }

    // D) clear
    else if (norm === "clear" || norm === "limpar") {
      setHistory([]);
      return;
    }

    // E) Section navigation
    else if (sections.some((s) => s.id === norm) || ["synopsis", "about", "cast", "characters", "showtimes", "tickets", "homemedia", "vhs", "dvd", "newsletter"].includes(norm)) {
      const idMap: Record<string, string> = {
        about: "synopsis",
        characters: "cast",
        tickets: "showtimes",
        vhs: "homemedia",
        dvd: "homemedia",
      };
      const targetId = idMap[norm] ?? norm;
      const el = document.getElementById(targetId);
      if (el) {
        entries.push({ type: "response", content: `>> ROUTING TO PORTAL SECTION: ${norm.toUpperCase()}...` });
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        entries.push({
          type: "response",
          content: `>> PORTAL SECTION #${norm} — NOT FOUND`,
        });
      }
    }

    // G) Fuzzy match / friendly error
    else {
      let closest = "";
      let minDist = Infinity;
      for (const v of VALID_COMMANDS) {
        const d = levenshteinDistance(norm, v);
        if (d < minDist) { minDist = d; closest = v; }
      }

      if (minDist <= 3 && closest) {
        entries.push({
          type: "suggestion",
          content: `>> COMMAND NOT FOUND: "${cmd}" — did you mean "${closest}"?`,
          suggestedCmd: closest,
        });
      } else {
        entries.push({
          type: "response",
          content: `>> UNKNOWN COMMAND: "${cmd}" — type 'help' for valid commands.`,
        });
      }
    }

    setHistory((prev) => [...prev, ...entries]);
  }, [sections]);

  // ── 6. Teclado ──────────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputValue);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (inlineSuggestion) setInputValue((v) => v + inlineSuggestion);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const next = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(next);
      setInputValue(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === -1) return;
      const next = historyPointer + 1;
      if (next >= cmdHistory.length) {
        setHistoryPointer(-1);
        setInputValue("");
      } else {
        setHistoryPointer(next);
        setInputValue(cmdHistory[next]);
      }
    }
  };

  const handleSudoComplete = useCallback(() => {
    setShowSudoModal(false);
    window.open(CONTACT_LINK, "_blank");
  }, []);

  if (!start) return null;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Injeção de estilos CSS para placeholder e scrollbar customizada */}
      <style>{`
        .terminal-input::placeholder {
          color: rgba(0, 255, 65, 0.35);
          font-style: italic;
        }
        .terminal-history::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-history::-webkit-scrollbar-track {
          background: transparent;
        }
        .terminal-history::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 65, 0.25);
          border-radius: 2px;
        }
        .terminal-chip {
          transition: background 0.18s ease, border-color 0.18s ease, transform 0.15s ease;
        }
        .terminal-chip:hover {
          background: rgba(0, 255, 65, 0.16) !important;
          border-color: rgba(0, 255, 65, 0.55) !important;
          transform: translateY(-2px);
        }
        .terminal-suggest-btn {
          transition: background 0.18s ease;
        }
        .terminal-suggest-btn:hover {
          background: rgba(0, 255, 65, 0.22) !important;
        }
        @keyframes termFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .term-entry {
          animation: termFadeIn 0.2s ease forwards;
        }
        @keyframes chipsIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chips-wrapper {
          animation: chipsIn 0.45s ease forwards;
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .term-cursor {
          display: inline-block;
          width: 8px;
          height: 14px;
          background: #00ff41;
          vertical-align: middle;
          margin-left: 2px;
          animation: cursorBlink 0.9s step-end infinite;
        }
      `}</style>

      <div
        className="bevel-raised"
        style={{
          width: "100%",
          maxWidth: "560px",
          marginTop: "12px",
          backgroundColor: "#0c160c",
          padding: "16px 20px 14px",
          fontFamily: "'JetBrains Mono', monospace",
          textAlign: "left",
          boxSizing: "border-box",
          pointerEvents: "auto",
        }}
      >
        {/* ── Barra de título do terminal (Monochrome Win98) ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
            paddingBottom: "8px",
            borderBottom: "1px border-outline-variant",
          }}
        >
          <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/70 select-none">
            <span>[ − ]</span>
            <span>[ # ]</span>
            <span>[ × ]</span>
          </div>
          <span style={{ fontSize: "0.7rem", color: "rgba(0,255,102,0.6)", letterSpacing: "0.1em" }}>
            zion_mainframe — terminal v4.0.2
          </span>
        </div>

        {/* ── Linha de boas-vindas (typewriter) ── */}
        <div
          style={{
            fontSize: "0.83rem",
            color: "rgba(0, 255, 65, 0.9)",
            letterSpacing: "0.04em",
            marginBottom: "10px",
            minHeight: "1.4em",
          }}
        >
          {welcomeText}
          {!welcomeDone && <span className="term-cursor" />}
        </div>

        {/* ── Área de histórico (scrollável) ── */}
        {history.length > 0 && (
          <div
            ref={historyBoxRef}
            className="terminal-history"
            style={{
              maxHeight: "240px",
              overflowY: "auto",
              marginBottom: "10px",
              paddingRight: "4px",
            }}
          >
            {history.map((entry, idx) => (
              <div key={idx} className="term-entry" style={{ marginBottom: "6px", fontSize: "0.81rem", lineHeight: 1.65 }}>

                {entry.type === "command" && (
                  <div style={{ color: "#00ff41", fontWeight: "bold" }}>
                    {entry.content}
                  </div>
                )}

                {entry.type === "response" && (
                  <div
                    style={{
                      color: "rgba(0, 255, 65, 0.82)",
                      whiteSpace: "pre-wrap",
                      paddingLeft: "10px",
                      borderLeft: "2px solid rgba(0, 255, 65, 0.18)",
                    }}
                  >
                    {entry.content}
                  </div>
                )}

                {entry.type === "system" && (
                  <div
                    className="bevel-lowered"
                    style={{
                      color: "#00ff66",
                      padding: "5px 10px",
                      fontWeight: "bold",
                      fontSize: "0.79rem",
                    }}
                  >
                    {entry.content}
                  </div>
                )}

                {entry.type === "suggestion" && (
                  <div
                    style={{
                      color: "rgba(0, 255, 102, 0.85)",
                      paddingLeft: "10px",
                      borderLeft: "2px solid rgba(0, 255, 102, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    <span>{entry.content}</span>
                    <button
                      className="bevel-button terminal-suggest-btn"
                      onClick={() => executeCommand(entry.suggestedCmd!)}
                      style={{
                        color: "#00ff66",
                        padding: "2px 8px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      [ execute {entry.suggestedCmd} ]
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>
        )}

        {/* ── Linha de separação se houver histórico ── */}
        {history.length > 0 && welcomeDone && (
          <div style={{ borderTop: "1px dashed rgba(0,255,65,0.12)", marginBottom: "10px" }} />
        )}

        {/* ── Campo de Input CLI ── */}
        {welcomeDone && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              position: "relative",
            }}
            onClick={() => inputRef.current?.focus()}
          >
            <span style={{ color: "#00ff41", fontSize: "0.88rem", fontWeight: "bold", userSelect: "none" }}>
              &gt;
            </span>

            <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
              {/* Input real */}
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={isFocused || inputValue ? "" : PLACEHOLDERS[placeholderIdx]}
                autoComplete="off"
                spellCheck={false}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#00ff41",
                  fontFamily: "inherit",
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                  caretColor: "#00ff41",
                  position: "relative",
                  zIndex: 2,
                }}
              />

              {/* Sugestão inline em fantasma */}
              {inlineSuggestion && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    pointerEvents: "none",
                    fontSize: "0.85rem",
                    letterSpacing: "0.04em",
                    whiteSpace: "pre",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ opacity: 0 }}>{inputValue}</span>
                  <span style={{ color: "rgba(0,255,65,0.28)" }}>{inlineSuggestion}</span>
                  <span style={{ fontSize: "0.68rem", color: "rgba(0,255,65,0.22)", marginLeft: "5px" }}>⇥ Tab</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Chips de Navegação Rápida ── */}
        {showChips && (
          <div
            className="chips-wrapper"
            style={{
              marginTop: "14px",
              paddingTop: "10px",
              borderTop: "1px solid rgba(0,255,65,0.10)",
              display: "flex",
              flexWrap: "wrap",
              gap: "7px",
            }}
          >
            {sections.concat([{ id: "help", label: "help" }]).map((item) => (
              <button
                key={item.id}
                className="bevel-button terminal-chip"
                onClick={() => executeCommand(item.id)}
                style={{
                  color: "#00ff66",
                  padding: "4px 12px",
                  fontSize: "0.76rem",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  letterSpacing: "0.03em",
                }}
              >
                [ {item.label} ]
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Easter Egg Modal: sudo hire */}
      {showSudoModal && <SudoModal onComplete={handleSudoComplete} />}
    </>
  );
}
