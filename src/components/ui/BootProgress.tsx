/**
 * BootProgress — log de boot estilo terminal, discreto sobre a chuva Matrix.
 * Recebe progresso de 0 a 100 e exibe barra ASCII + mensagem temática.
 */

interface BootProgressProps {
  progress: number; // 0 – 100
}

const TOTAL_BLOCKS = 12;

const BOOT_MESSAGES: { threshold: number; text: string }[] = [
  { threshold: 0,  text: "inicializando kernel........" },
  { threshold: 12, text: "carregando módulos.........."},
  { threshold: 28, text: "verificando integridade....." },
  { threshold: 45, text: "alocando memória............" },
  { threshold: 60, text: "criptografando canal........." },
  { threshold: 75, text: "estabelecendo conexão......." },
  { threshold: 90, text: "acesso concedido............" },
];

function getMessage(progress: number): string {
  let msg = BOOT_MESSAGES[0].text;
  for (const entry of BOOT_MESSAGES) {
    if (progress >= entry.threshold) msg = entry.text;
    else break;
  }
  return msg;
}

export function BootProgress({ progress }: BootProgressProps) {
  const clamped = Math.max(0, Math.min(100, progress));
  const filled = Math.round((clamped / 100) * TOTAL_BLOCKS);
  const empty = TOTAL_BLOCKS - filled;
  const bar = "■".repeat(filled) + "□".repeat(empty);
  const pct = String(clamped).padStart(3, " ");
  const message = getMessage(clamped);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: 28,
        zIndex: 1000000, // acima do canvas Matrix (999999) mas abaixo do GlitchFlash (1000001)
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: 13,
        lineHeight: 1.6,
        color: "rgba(0, 255, 65, 0.80)",
        pointerEvents: "none",
        userSelect: "none",
        letterSpacing: "0.04em",
      }}
    >
      {/* Linha 1: barra + porcentagem */}
      <div>[{bar}] {pct}%</div>
      {/* Linha 2: mensagem de status */}
      <div style={{ color: "rgba(0, 255, 65, 0.50)", fontSize: 11 }}>
        &gt; {message}
      </div>
    </div>
  );
}
