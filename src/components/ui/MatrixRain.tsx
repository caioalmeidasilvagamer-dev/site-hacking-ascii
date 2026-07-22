import { useEffect, useRef } from "react";

interface MatrixRainProps {
  opacity?: number; // 0 a 1, densidade visual do efeito
  fontSize?: number;
  color?: string;
  headColor?: string;
}

const CHARS =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789";

export function MatrixRain({
  opacity = 0.15,
  fontSize = 16,
  color = "rgba(0, 255, 102, 0.65)",
  headColor = "#c8ffb0",
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let columns: number;
    let drops: number[];
    let animationId: number;
    let running = true;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }

    function draw() {
      if (!running || !canvas || !ctx) return;

      // rastro (fade do frame anterior) — 0.08 acalma a chuva visualmente
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Cabeça do rastro: verde limão brilhante
        ctx.fillStyle = headColor;
        ctx.fillText(char, x, y);

        // Corpo do rastro: verde Matrix vívido
        ctx.fillStyle = color;
        ctx.fillText(char, x, y - fontSize);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    if (prefersReducedMotion) {
      draw();
      running = false;
    } else {
      draw();
    }

    function handleResize() {
      resize();
    }

    function handleVisibility() {
      running = document.visibilityState === "visible" && !prefersReducedMotion;
      if (running) draw();
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fontSize, color, headColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity,
      }}
      aria-hidden="true"
    />
  );
}
