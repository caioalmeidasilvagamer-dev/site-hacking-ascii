// Global Mirror/Glitch transition utility
// Triggers a brief chromatic aberration + horizontal glitch flicker on the viewport.

export function triggerGlitch(durationMs = 400) {
  const root = document.documentElement;
  root.classList.add("viewport-mirror-glitch");
  setTimeout(() => {
    root.classList.remove("viewport-mirror-glitch");
  }, durationMs);
}
