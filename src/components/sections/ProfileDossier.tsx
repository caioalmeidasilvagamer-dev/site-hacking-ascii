import { useEffect, useRef, useState } from "react";
import {
  User,
  Search,
  X,
  Minus,
  Maximize2,
  UserPlus,
  Flag,
  Code2,
  Globe,
  Terminal,
  Share2,
  Monitor,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES DE CONTEÚDO — substitua os valores entre colchetes pelos seus dados
// ─────────────────────────────────────────────────────────────────────────────

const PROFILE = {
  handle: "@[seu_handle]",         // TODO: substituir pelo seu handle/nickname
  displayName: "[Nome de Exibição]", // TODO: nome principal
  tags: ["[tag1]", "[tag2]", "[tag3]"], // TODO: tags/pronomes/qualificadores
  bio1: "[TODO: primeira frase de efeito — algo que define você em uma linha]",
  bio2: "[TODO: segunda frase curta — estilo, filosofia ou área de atuação]",
};

const PROTOCOL = {
  before: {
    title: "PROTOCOLO DE ACESSO",
    text: "[TODO: descreva aqui quem é bem-vindo a acessar seu perfil / o que você posta]",
  },
  warning: {
    title: "SINAIS DE ANOMALIA",
    text: "[TODO: descreva aqui o que você NÃO tolera / o que indica incompatibilidade]",
  },
};

const INTERESTS = [
  "[TODO: interesse 1]",
  "[TODO: interesse 2]",
  "[TODO: interesse 3]",
  "[TODO: interesse 4]",
  "[TODO: interesse 5]",
  "[TODO: interesse 6]",
];

const SOCIALS = [
  { icon: Code2,    label: "GitHub",   href: "https://github.com/seuusuario" },
  { icon: Terminal, label: "Twitter",  href: "https://twitter.com/seuusuario" },
  { icon: Globe,    label: "YouTube",  href: "https://youtube.com/@seucanal"  },
  { icon: Share2,   label: "LinkedIn", href: "https://linkedin.com/in/seuusuario" },
];

const QUOTE = "[TODO: citação ou aviso final — algo provocador, engraçado ou filosófico]";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-componente: Mini chuva de Matrix em canvas (coluna decorativa direita)
// ─────────────────────────────────────────────────────────────────────────────

const MATRIX_CHARS = "01アイウエオカキクケコΑΒΓΔ#$%&*<>{}[]";

function MiniMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const FS = 11;
    const cols = Math.floor(W / FS);
    const drops = Array.from({ length: cols }, () => Math.random() * -H);

    let rafId: number;

    function draw() {
      ctx!.fillStyle = "rgba(0,0,0,0.12)";
      ctx!.fillRect(0, 0, W, H);
      ctx!.font = `${FS}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < cols; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const y = drops[i];
        const t = (y % H) / H;
        const alpha = 0.3 + t * 0.55;
        ctx!.fillStyle = `rgba(0, 255, 102, ${alpha})`;
        ctx!.fillText(char, i * FS, y);
        drops[i] += FS * (0.5 + Math.random() * 0.8);
        if (drops[i] > H) drops[i] = Math.random() * -H * 0.5;
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={90}
      height={220}
      className="block rounded-xs border border-outline-variant/40"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-componente: Placeholder de avatar genérico
// ─────────────────────────────────────────────────────────────────────────────

function AvatarPlaceholder({
  size = 120,
  label,
}: {
  size?: number;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* TODO: substituir este div pelo <img> do seu avatar/foto própria */}
      <div
        style={{ width: size, height: size }}
        className="rounded-xs bg-surface-container border border-outline-variant flex items-center justify-center shrink-0 relative overflow-hidden"
      >
        <User size={size * 0.45} className="text-signal/40" strokeWidth={1.5} />
        <div className="absolute inset-0 bg-signal/5 pointer-events-none" />
      </div>

      {label && (
        <span className="font-label text-[10px] text-on-surface-variant/60 tracking-wider italic">
          {label}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-componente: Mock de dispositivo retrô (sem marca real)
// ─────────────────────────────────────────────────────────────────────────────

function RetroDevice() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 600);
    return () => clearInterval(t);
  }, []);

  const lines = [
    ">> boot sequence",
    ">> loading...",
    ">> sys: OK",
    tick % 2 === 0 ? ">> _" : ">>  ",
  ];

  return (
    <div className="border border-outline-variant rounded-xs p-3 bg-void w-[150px] font-mono">
      {/* "Tela" do dispositivo retrô */}
      <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xs p-2 min-h-[85px]">
        {lines.map((line, i) => (
          <div key={i} className="text-[10px] text-signal/80 leading-relaxed">
            {line}
          </div>
        ))}
      </div>

      {/* Botões decorativos */}
      <div className="flex justify-between mt-2">
        {["[opt]", "[back]"].map((btn) => (
          <span key={btn} className="font-label text-[9px] text-on-surface-variant/50 tracking-wider">
            {btn}
          </span>
        ))}
      </div>

      <div className="mt-1 text-center font-label text-[9px] text-outline-variant tracking-widest uppercase">
        [DEVICE-001]
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente Principal: ProfileDossier (Stitch Matrix UI)
// ─────────────────────────────────────────────────────────────────────────────

export function ProfileDossier() {
  return (
    <section
      id="dossie"
      className="scroll-mt-8 flex min-h-screen w-full items-center justify-center bg-transparent py-16 px-4 font-mono text-on-surface box-border"
    >
      <div className="w-full max-w-[850px] border border-outline-variant rounded-xs overflow-hidden bg-void backdrop-blur-md shadow-[0_0_50px_rgba(0,255,102,0.06)]">
        
        {/* ════════════════════════════════════════════════════
            BLOCO 1 — CABEÇALHO DA JANELA STITCH
        ════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-outline-variant bg-surface-container">
          <div className="flex items-center gap-2 text-signal">
            <X size={12} className="text-red-400/80 cursor-pointer" />
            <Minus size={12} className="text-yellow-400/80 cursor-pointer" />
            <Maximize2 size={11} className="text-signal/70 cursor-pointer" />
          </div>

          <span className="font-headline text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
            SYS.SEC // AGENT_DOSSIER // {PROFILE.handle}
          </span>

          <div className="flex items-center gap-1.5 border border-outline-variant bg-void px-2 py-0.5 rounded-xs text-[11px] text-on-surface-variant/70">
            <Search size={11} />
            <span className="font-mono text-[10px] tracking-wider">buscar...</span>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            BLOCO 2 — PERFIL: Avatar | ID Badge | Chuva Matrix
        ════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-5 p-5 border-b border-outline-variant bg-surface">
          {/* Avatar principal */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-label text-[10px] text-on-surface-variant/60 tracking-wider">
              {PROFILE.handle}
            </span>
            <AvatarPlaceholder size={130} label="recebendo dados..." />
          </div>

          {/* Dados do agente (ID Badge estilo Stitch) */}
          <div className="flex flex-col gap-3 pt-1">
            <div>
              <div className="font-label text-[10px] text-signal/70 uppercase tracking-widest mb-1">
                OPERATIVE DOSSIER // LEVEL 4
              </div>
              <h2 className="font-headline text-2xl font-bold text-signal tracking-wide drop-shadow-[0_0_10px_rgba(0,255,102,0.4)]">
                {PROFILE.displayName}
              </h2>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {PROFILE.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-on-surface-variant bg-surface-container border border-outline-variant px-2 py-0.5 rounded-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-2">
              {[
                { icon: UserPlus, label: "conectar" },
                { icon: Flag,     label: "reportar" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex items-center gap-1.5 bg-surface-container border border-outline-variant hover:border-signal/60 hover:bg-signal-dim/30 px-3 py-1 rounded-xs font-mono text-xs text-on-surface transition-all cursor-pointer"
                >
                  <Icon size={12} className="text-signal" />
                  {label}
                </button>
              ))}
            </div>

            {/* Frases de Efeito */}
            <div className="flex flex-col gap-2 mt-1">
              {[PROFILE.bio1, PROFILE.bio2].map((text, i) => (
                <div
                  key={i}
                  className="border border-outline-variant bg-surface-container-lowest p-2.5 rounded-xs text-xs text-on-surface-variant leading-relaxed"
                >
                  <span className="text-signal/50 mr-2">{i === 0 ? ">>" : "::"}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Chuva Matrix lateral */}
          <div className="hidden md:flex items-start pt-1">
            <MiniMatrixRain />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            BLOCO 3 — PROTOCOLO DE ACESSO / SINAIS DE ANOMALIA
        ════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant border-b border-outline-variant">
          {[PROTOCOL.before, PROTOCOL.warning].map((block, i) => (
            <div key={i} className="p-4 bg-surface flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {i === 0 ? (
                  <ShieldCheck size={14} className="text-signal" />
                ) : (
                  <AlertTriangle size={14} className="text-red-400" />
                )}
                <span className="font-headline text-xs font-bold tracking-widest text-on-surface uppercase">
                  {block.title}
                </span>
              </div>
              <p className="font-mono text-xs text-on-surface-variant leading-relaxed">
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════
            BLOCO 4+5 — INTERESSES | ENCONTRE-ME EM
        ════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-px bg-outline-variant border-b border-outline-variant">
          {/* Lista de Interesses */}
          <div className="p-5 bg-surface flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-lg text-signal">⌬</span>
              <div>
                <div className="font-label text-[10px] text-on-surface-variant/60 tracking-wider">
                  STATUS: ONLINE
                </div>
                <div className="font-headline text-xs font-bold text-on-surface tracking-wider">
                  MEUS INTERESSES
                </div>
              </div>
            </div>

            <div className="border border-outline-variant bg-surface-container-high px-3 py-1.5 flex justify-between items-center rounded-xs">
              <span className="font-label text-[11px] text-on-surface-variant tracking-wider">
                MATRIZ DE CONHECIMENTO
              </span>
              <span className="font-mono text-[11px] text-signal">&lt;3</span>
            </div>

            <ul className="space-y-1">
              {INTERESTS.map((item) => (
                <li
                  key={item}
                  className="font-mono text-xs text-on-surface-variant hover:text-signal hover:pl-2 transition-all p-1.5 border-b border-outline-variant/30 flex items-center gap-2 cursor-default"
                >
                  <span className="text-signal/40">☐</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Avatar Secundário */}
          <div className="p-5 bg-surface flex flex-col gap-4 min-w-[180px]">
            <div className="border border-outline-variant bg-surface-container-high py-1 px-3 text-center rounded-xs">
              <span className="font-headline text-xs font-bold tracking-widest text-signal uppercase">
                CANAL DIRETO
              </span>
            </div>

            <div className="flex gap-3 justify-center">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  aria-label={label}
                  className="text-on-surface-variant hover:text-signal hover:-translate-y-0.5 transition-all p-1"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            <div className="flex justify-center pt-2">
              <AvatarPlaceholder size={85} />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            BLOCO 6 — DISPOSITIVO RETRÔ | CITAÇÃO FINAL
        ════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant">
          <div className="p-5 bg-surface flex justify-center items-center">
            <RetroDevice />
          </div>

          <div className="p-5 bg-surface flex flex-col justify-center gap-3">
            <div className="border border-outline-variant bg-surface-container-lowest p-3 rounded-xs flex items-start gap-3">
              <Monitor size={18} className="text-signal shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-on-surface-variant leading-relaxed italic">
                {QUOTE}
              </p>
            </div>

            <p className="text-center font-label text-[11px] text-on-surface-variant/50 tracking-widest">
              B4ll u l4t3r
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <div className="py-2 px-4 border-t border-outline-variant/40 bg-surface-container-lowest text-center">
          <span className="font-label text-[10px] text-on-surface-variant/40 tracking-widest">
            ( MATRIX OS // INTERFACE v4.0.2 )
          </span>
        </div>

      </div>
    </section>
  );
}
