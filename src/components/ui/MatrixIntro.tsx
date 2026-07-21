import { useEffect, useRef, useState } from "react";

const CHARS =
  "01" + // Binário
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" + // ASCII Standard
  "0123456789" + // Números
  "!@#$%^&*()_+-=[]{}|;':\",./<>?~`" + // Símbolos ASCII
  "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω" + // Grego
  "БГДЖИЙЛПФЦЧШЩЪЫЭЮЯбвгджзийклмнптфцчшщъыьэюя" + // Cirílico
  " ᚁᚂᚃᚄᚅᚆᚇᚈᚉᚊᚋᚌᚍᚎᚏᚐᚑᚒᚓᚔᚕᚖᚗᚘᚙᚚ" + // Ogham/Runas celitas
  "ᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛚᛜᛞᛟ" + // Runas Nórdicas
  "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじ" + // Hiragana para manter textura original misturada
  "∫∮∝∞≈≠≡≤≥∓±×÷√百分‰"; // Símbolos Matemáticos / Especializados

interface MatrixIntroProps {
  fontSize?: number;
  trailLength?: number;
  onComplete?: () => void;
}

export function MatrixIntro({
  fontSize = 18,
  trailLength = 25,
  onComplete,
}: MatrixIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [visible, setVisible] = useState(true);
  // Ref estável: nunca entra na lista de deps do useEffect
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let columns = 0;

    let headY: number[] = [];
    let speed: number[] = [];
    let trailLen: number[] = [];
    let finished: boolean[] = [];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columnWidth = fontSize * 0.65;
      columns = Math.ceil(width / columnWidth);

      // Gotas mais compridas e variadas (rastro de 25 a 55 caracteres)
      trailLen = Array.from(
        { length: columns },
        () => Math.floor(25 + Math.random() * 30)
      );

      // Começam completamente fora da tela (acima do topo Y=0)
      headY = Array.from(
        { length: columns },
        (_, idx) => -trailLen[idx] * fontSize - Math.random() * fontSize * 3
      );

      // Calcula a distância máxima total para percorrê-la em ~80 frames
      const maxStartOffset = 55 * fontSize * 2.2; // Usa 55 (máximo rastro)
      const totalDistance = height + maxStartOffset;
      const baseSpeed = totalDistance / 80;

      // Velocidade controlada: 0.8 a 1.2 do baseSpeed
      speed = Array.from(
        { length: columns },
        () => baseSpeed * (0.8 + Math.random() * 0.4)
      );
      finished = Array.from({ length: columns }, () => false);
    }

    function draw() {
      // ── 1. Inicia o frame com canvas limpo/transparente ──────────────────
      // Permite que o KernelBoot (montado atrás) seja visível onde a chuva ainda não passou
      ctx!.clearRect(0, 0, width, height);

      ctx!.font = `bold ${fontSize}px 'Courier New', monospace`;
      ctx!.textBaseline = "top";

      let allDone = true;
      const columnWidth = fontSize * 0.65;

      for (let i = 0; i < columns; i++) {
        const x = i * columnWidth;
        // Ponto mais baixo (ponta da gota) da coluna atual
        const dropTipY = Math.max(0, headY[i] + trailLen[i] * fontSize);

        // ── 2. Pinta de PRETO OPACO do topo até a ponta da gota ───────────
        // Garante que o KernelBoot seja 100% apagado/coberto por preto opaco por onde a gota passa
        if (dropTipY > 0) {
          ctx!.fillStyle = "#000000";
          ctx!.fillRect(Math.floor(x), 0, Math.ceil(columnWidth) + 1, dropTipY);
        }

        if (!finished[i]) {
          allDone = false;

          // ── 3. Rastro de caracteres na cabeça e logo abaixo ──────────
          const steps = trailLen[i];
          for (let s = 0; s < steps; s++) {
            const cy = headY[i] + s * fontSize; // cresce para BAIXO
            if (cy < 0 || cy > height) continue;

            const char = CHARS[Math.floor(Math.random() * CHARS.length)];

            // t = 0 → cauda (mais velha, acima), t = 1 → cabeça (mais nova, abaixo)
            const t = s / (steps - 1);
            // easing suave na ponta: concentra o verde claro só nos últimos 15%
            const headBlend = Math.max(0, (t - 0.85) / 0.15);

            // 3 paradas de cor — todas em verde:
            //   cauda  (t=0.00): verde escuro quase invisível  rgb(0, 80, 20)
            //   meio   (t=0.60): verde Matrix puro             rgb(0, 200, 60)
            //   cabeça (t=1.00): verde claro brilhante         rgb(60, 255, 100)
            const r = Math.round(t * 30 + headBlend * 30);          // 0 → 30 → 60
            const g = Math.round(80 + t * 140 + headBlend * 35);    // 80 → 220 → 255
            const b = Math.round(t * 30 + headBlend * 40);          // 0 → 30 → 70
            const alpha = 0.1 + t * 0.7 + headBlend * 0.2;         // 0.1 → 0.8 → 1.0

            ctx!.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha, 1)})`;
            ctx!.fillText(char, x, cy);
          }
          headY[i] += speed[i];

          // coluna finaliza quando a cabeça passou toda a tela
          if (headY[i] > height) {
            finished[i] = true;
          }
        } else {
          // Coluna concluída: mantém totalmente coberta de preto opaco
          ctx!.fillStyle = "#000000";
          ctx!.fillRect(Math.floor(x), 0, Math.ceil(columnWidth) + 1, height);
        }
      }

      if (allDone) {
        // 1. Para o loop de desenho
        cancelAnimationFrame(rafRef.current);
        // 2. Chama onComplete (que agora vai disparar o GlitchFlash no App.tsx)
        setVisible(false);
        onCompleteRef.current?.();
        return;
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [fontSize, trailLength]); // onComplete via ref — não entra nas deps

  if (!visible) return null;

  return (
    <>
      {/* Canvas principal da chuva */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 999999,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
