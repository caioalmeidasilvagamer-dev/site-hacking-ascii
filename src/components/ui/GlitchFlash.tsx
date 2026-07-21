import { useEffect, useRef } from "react";

interface GlitchFlashProps {
  onDone: () => void;
}

/**
 * GlitchFlash — sobreposição de glitch RGB estilo cyberpunk.
 * Renderiza ~8 frames (~133ms a 60fps) de ruído cromático sobre a tela
 * e depois chama onDone() para que o MatrixIntro se desmonte.
 *
 * Deve ser montado com zIndex acima do canvas do MatrixIntro.
 */
export function GlitchFlash({ onDone }: GlitchFlashProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Ref estável: evita re-disparar o useEffect se o pai re-renderizar
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let frame = 0;
    const TOTAL_FRAMES = 12; // ~200ms a 60fps para um impacto visual nítido
    let rafId: number;

    function drawGlitch() {
      ctx!.clearRect(0, 0, w, h);

      // ── Fatias horizontais deslocadas com separação de canal de cor ──────
      const numSlices = 6 + Math.floor(Math.random() * 8);
      for (let i = 0; i < numSlices; i++) {
        const y = Math.random() * h;
        const sliceH = 1 + Math.random() * 14;
        const shiftR = (Math.random() - 0.5) * 24;
        const shiftB = (Math.random() - 0.5) * 24;

        // Canal vermelho (shift positivo — para a direita)
        ctx!.fillStyle = `rgba(255, 10, 60, ${0.25 + Math.random() * 0.35})`;
        ctx!.fillRect(shiftR, y, w, sliceH * 0.6);

        // Canal ciano/azul (shift negativo — para a esquerda)
        ctx!.fillStyle = `rgba(0, 220, 255, ${0.2 + Math.random() * 0.3})`;
        ctx!.fillRect(shiftB, y + sliceH * 0.4, w, sliceH * 0.6);

        // Scanline verde Matrix fina
        ctx!.fillStyle = `rgba(0, 255, 65, ${0.12 + Math.random() * 0.18})`;
        ctx!.fillRect(0, y + sliceH * 0.2, w, 1);
      }

      // ── Flicker geral de baixa intensidade sobre toda a tela ────────────
      ctx!.fillStyle = `rgba(0, 255, 65, ${0.04 + Math.random() * 0.06})`;
      ctx!.fillRect(0, 0, w, h);

      // ── Barra de ruído densa (posição aleatória) ─────────────────────────
      const barY = Math.random() * h;
      const barH = 2 + Math.random() * 4;
      const barAlpha = 0.5 + Math.random() * 0.4;
      ctx!.fillStyle = `rgba(0, 255, 65, ${barAlpha})`;
      ctx!.fillRect(0, barY, w, barH);

      frame++;
      if (frame < TOTAL_FRAMES) {
        rafId = requestAnimationFrame(drawGlitch);
      } else {
        onDoneRef.current();
      }
    }

    rafId = requestAnimationFrame(drawGlitch);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []); // Executa uma única vez — o componente é montado e imediatamente começa

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        // Acima do canvas do MatrixIntro (zIndex: 999999) para sobrepor o flash
        zIndex: 1000000,
        pointerEvents: "none",
      }}
    />
  );
}
