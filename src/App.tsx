import { useCallback, useState, useEffect } from "react";
import { Hero } from "./components/sections/Hero";
import { Sobre } from "./components/sections/Sobre.tsx";
import { ProfileDossier } from "./components/sections/ProfileDossier";
import { Projetos } from "./components/sections/Projetos";
import { Contato } from "./components/sections/Contato.tsx";
import { MatrixIntro } from "./components/ui/MatrixIntro";
import { KernelBoot } from "./components/ui/KernelBoot";
import { GlitchFlash } from "./components/ui/GlitchFlash";
import { MatrixRain } from "./components/ui/MatrixRain";
import { RetroWindow } from "./components/layout/RetroWindow";

/**
 * Sequência de intro de 3 fases:
 *   1. boot   — KernelBoot: log de terminal centralizado (~4.5s)
 *   2. matrix — MatrixIntro: chuva de caracteres cobrindo a tela (~2s)
 *   3. hero   — Hero: globo ASCII aparece com zoom-in + pulsos
 */
type IntroPhase = "boot" | "matrix" | "glitch" | "hero";

function App() {
  const [phase, setPhase] = useState<IntroPhase>("boot");

  const handleBootDone = useCallback(() => setPhase("matrix"), []);
  const handleMatrixDone = useCallback(() => setPhase("glitch"), []);
  const handleGlitchDone = useCallback(() => setPhase("hero"), []);

  // Bloqueia o scroll do navegador até a intro terminar (fase "hero")
  useEffect(() => {
    if (phase !== "hero") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Limpeza por precaução
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase]);

  return (
    <main style={{ background: "#000", minHeight: "100vh", position: "relative" }}>
      {/* Background Matrix rain contínuo fixo atrás de tudo */}
      <MatrixRain opacity={0.12} />

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero fora da moldura — full-screen, porta de entrada */}
        <Hero startGlobeIntro={phase === "hero" || phase === "glitch"} />

        {/* Seções dentro da janela retrô com borda tracejada */}
        <RetroWindow title="caio_dev — terminal v2.4">
          <Sobre />
          <ProfileDossier />
          <Projetos />
          <Contato />
        </RetroWindow>
      </div>

      {/* Fase 1 & 2: Boot do kernel permanece visível para a chuva Matrix apagar por cima */}
      {(phase === "boot" || phase === "matrix") && (
        <KernelBoot onComplete={handleBootDone} />
      )}

      {/* Fase 2: Chuva Matrix — passa por cima do KernelBoot apagando ele */}
      {phase === "matrix" && (
        <MatrixIntro
          fontSize={18}
          onComplete={handleMatrixDone}
        />
      )}

      {/* Fase 3: Glitch Flash rápido antes de liberar tudo */}
      {phase === "glitch" && (
        <GlitchFlash onDone={handleGlitchDone} />
      )}
    </main>
  );
}

export default App;
