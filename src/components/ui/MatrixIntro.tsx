import { useEffect, useRef } from "react";

const CHARS =
  "01" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" +
  "0123456789" +
  "!@#$%^&*()_+-=[]{}|;':\",./<>?~`" +
  "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω" +
  "БГДЖИЙЛПФЦЧШЩЪЫЭЮЯбвгджзийклмнптфцчшщъыьэюя" +
  " ᚁᚂᚃᚄᚅᚆᚇᚈᚉᚊᚋᚌᚍᚎᚏᚐᚑᚒᚓᚔᚕᚖᚗᚘᚙᚚ" +
  "ᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛚᛜᛞᛟ" +
  "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじ" +
  "∫∮∝∞≈≠≡≤≥∓±×÷√百分‰";

const FRAME_INTERVAL = 50; // ~20fps for intro rain
const CHAR_CACHE_SIZE = 256;

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
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      onCompleteRef.current?.();
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let columns = 0;
    const columnWidth = fontSize * 0.65;

    let headY: number[] = [];
    let speed: number[] = [];
    let trailLen: number[] = [];
    let finished: boolean[] = [];

    const colorCache = new Uint8Array(CHAR_CACHE_SIZE * 4);
    const colorStrings: string[] = new Array(CHAR_CACHE_SIZE);
    let cacheCount = 0;

    function getCachedColor(r: number, g: number, b: number, alpha: number): string {
      const a = Math.min(alpha, 1);
      const qr = Math.round(r / 4) * 4;
      const qg = Math.round(g / 4) * 4;
      const qb = Math.round(b / 4) * 4;
      const qa = Math.round(a * 20) / 20;
      const key = (qr << 24) | (qg << 16) | (qb << 8) | Math.round(qa * 255);
      const idx = Math.abs(key) % CHAR_CACHE_SIZE;

      const base = idx * 4;
      if (cacheCount > idx && colorCache[base] === qr && colorCache[base + 1] === qg &&
          colorCache[base + 2] === qb && colorCache[base + 3] === Math.round(qa * 255)) {
        return colorStrings[idx];
      }

      colorCache[base] = qr;
      colorCache[base + 1] = qg;
      colorCache[base + 2] = qb;
      colorCache[base + 3] = Math.round(qa * 255);
      const str = `rgba(${qr},${qg},${qb},${qa})`;
      colorStrings[idx] = str;
      if (cacheCount <= idx) cacheCount = idx + 1;
      return str;
    }

    let running = true;
    let lastTime = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.ceil(width / columnWidth);

      trailLen = Array.from(
        { length: columns },
        () => Math.floor(25 + Math.random() * 30)
      );

      headY = Array.from(
        { length: columns },
        (_, idx) => -trailLen[idx] * fontSize - Math.random() * fontSize * 3
      );

      const maxStartOffset = 55 * fontSize * 2.2;
      const totalDistance = height + maxStartOffset;
      // ~2 seconds total regardless of fps
      const baseSpeed = totalDistance / 2500;

      speed = Array.from(
        { length: columns },
        () => baseSpeed * (0.8 + Math.random() * 0.4)
      );
      finished = Array.from({ length: columns }, () => false);
    }

    function draw(time: number) {
      if (!running) return;

      const delta = time - lastTime;
      if (delta < FRAME_INTERVAL) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      // Clamp delta to avoid huge jumps after tab-switch or GC pause
      const clampedDelta = Math.min(delta, FRAME_INTERVAL * 3);
      lastTime = time - (delta % FRAME_INTERVAL);

      // Check if ALL columns are already finished BEFORE clearing
      let allDone = true;
      for (let i = 0; i < columns; i++) {
        if (!finished[i]) { allDone = false; break; }
      }

      if (allDone) {
        // Fill ENTIRE canvas black so KernelBoot is completely hidden
        ctx!.fillStyle = "#000000";
        ctx!.fillRect(0, 0, width, height);
        cancelAnimationFrame(rafRef.current);
        // Delay onComplete by one frame so React paints the black canvas before unmounting it
        rafRef.current = requestAnimationFrame(() => {
          onCompleteRef.current?.();
        });
        return;
      }

      // Only clear and draw if there are active columns
      ctx!.clearRect(0, 0, width, height);
      ctx!.font = `bold ${fontSize}px 'Courier New', monospace`;
      ctx!.textBaseline = "top";

      for (let i = 0; i < columns; i++) {
        const x = i * columnWidth;

        if (finished[i]) {
          // Always repaint black — canvas is cleared every frame
          ctx!.fillStyle = "#000000";
          ctx!.fillRect(Math.floor(x), 0, Math.ceil(columnWidth) + 1, height);
          continue;
        }

        const dropTipY = Math.max(0, headY[i] + trailLen[i] * fontSize);

        if (dropTipY > 0) {
          ctx!.fillStyle = "#000000";
          ctx!.fillRect(Math.floor(x), 0, Math.ceil(columnWidth) + 1, dropTipY);
        }

        const steps = trailLen[i];
        for (let s = 0; s < steps; s++) {
          const cy = headY[i] + s * fontSize;
          if (cy < 0 || cy > height) continue;

          const char = CHARS[Math.floor(Math.random() * CHARS.length)];

          const t = s / (steps - 1);
          const headBlend = Math.max(0, (t - 0.85) / 0.15);

          const r = Math.round(t * 30 + headBlend * 30);
          const g = Math.round(80 + t * 140 + headBlend * 35);
          const b = Math.round(t * 30 + headBlend * 40);
          const alpha = 0.1 + t * 0.7 + headBlend * 0.2;

          ctx!.fillStyle = getCachedColor(r, g, b, alpha);
          ctx!.fillText(char, x, cy);
        }

        headY[i] += speed[i] * clampedDelta;

        if (headY[i] > height) {
          finished[i] = true;
          ctx!.fillStyle = "#000000";
          ctx!.fillRect(Math.floor(x), 0, Math.ceil(columnWidth) + 1, height);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    lastTime = performance.now();
    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => resize();

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        running = false;
      } else {
        running = true;
        lastTime = performance.now();
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [fontSize, trailLength]);

  return (
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
  );
}
