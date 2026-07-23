import { useCallback, useState, useEffect } from "react";
import { Hero } from "./components/sections/Hero";
import { TrustStrip } from "./components/sections/TrustStrip";
import { SystemStatus } from "./components/sections/SystemStatus";
import { RebelDossiers } from "./components/sections/RebelDossiers";
import { AccessCardGenerator } from "./components/sections/AccessCardGenerator";
import { OraclePanel } from "./components/sections/OraclePanel";
import { Showtimes } from "./components/sections/Showtimes";
import { HomeMedia } from "./components/sections/HomeMedia";
import { MailingList } from "./components/sections/MailingList";
import { MovieFooter } from "./components/sections/MovieFooter";
import { MatrixIntro } from "./components/ui/MatrixIntro";
import { KernelBoot } from "./components/ui/KernelBoot";
import { GlitchFlash } from "./components/ui/GlitchFlash";
import { MatrixRain } from "./components/ui/MatrixRain";
import { BootSequenceIntro } from "./components/ui/BootSequenceIntro";
import { RetroWindow } from "./components/layout/RetroWindow";
import { KonamiOverlay, TruthTxtPanel } from "./components/ui/EasterEggs";

/**
 * SYSTEM::ANOMALY // OFFICIAL 1999 MOVIE PROMOTIONAL SITE
 * Layout: Modern split-column landing-page structure skinned in retro-terminal aesthetic.
 *
 * Section order:
 *   Hero (split 2-col) → TrustStrip → Synopsis (split) → Cast (split, icon-cards)
 *   → Reviews (full-bleed + globe) → Showtimes (split, ticket-graphic LEFT)
 *   → HomeMedia (split, VHS visual LEFT) → MailingList → MovieFooter
 *
 * Intro Sequence:
 *   1. boot   — NEBUCHADNEZZAR_OS boot log (~4.5s)
 *   2. matrix — Matrix rain intro covering screen (~2s)
 *   3. glitch — Flash transition
 *   4. hero   — main site
 */
type IntroPhase = "bootseq" | "boot" | "matrix" | "glitch" | "hero";

function App() {
  const [phase, setPhase] = useState<IntroPhase>("bootseq");
  const [showTruth, setShowTruth] = useState(false);

  const handleBootSeqDone = useCallback(() => setPhase("boot"), []);
  const handleBootDone = useCallback(() => setPhase("matrix"), []);
  const handleMatrixDone = useCallback(() => setPhase("glitch"), []);
  const handleGlitchDone = useCallback(() => setPhase("hero"), []);

  // Skip bootseq if already seen in this session
  useEffect(() => {
    if (sessionStorage.getItem("matrix-bootseq-seen")) {
      setPhase("boot");
    }
  }, []);

  // Lock scroll during intro sequence
  useEffect(() => {
    if (phase !== "hero") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [phase]);

  return (
    <main
      style={{
        background: "#000000",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Matrix rain: fixed background texture at subtle 0.15 opacity — only during hero to avoid duplicate canvas during intro */}
      {phase === "hero" && <MatrixRain opacity={0.15} />}

      {/* Konami code easter egg overlay */}
      <KonamiOverlay />

      {/* cat truth.txt panel */}
      {showTruth && <TruthTxtPanel onClose={() => setShowTruth(false)} />}

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* 1. HERO — 2-col split: LEFT headline/CTAs/terminal, RIGHT globe + review card */}
        <Hero startGlobeIntro={phase === "hero" || phase === "glitch"} onTruthTxt={() => setShowTruth(true)} />

        {/* 2. TRUST STRIP — in-universe affiliations / "as seen in" press logos */}
        <TrustStrip />

        {/* 3-8. Main site sections inside retro bevel browser-window chrome */}
        <RetroWindow title="SYSTEM::ANOMALY // OFFICIAL MOVIE SITE (1999)">

          {/* 3. SYNOPSIS — split: LEFT header+text+CTA, RIGHT facts+log */}
          <SystemStatus />

          {/* 4. CAST — split: LEFT header+desc, RIGHT 2×2 icon-cards */}
          <RebelDossiers />

          {/* 4b. ACCESS CARD GENERATOR — split: LEFT input form, RIGHT card preview */}
          <AccessCardGenerator />

          {/* 5. REVIEWS — full-bleed: ASCII Globe background + centered bold text */}
          <OraclePanel />

          {/* 6. SHOWTIMES — asymmetric split: LEFT ticket-stub visual, RIGHT theater listings */}
          <Showtimes />

          {/* 7. HOME MEDIA — alternating split: LEFT VHS visual, RIGHT format cards */}
          <HomeMedia />

          {/* 8. MAILING LIST + Guestbook easter egg */}
          <MailingList />

        </RetroWindow>

        {/* 9. FOOTER — studio copyright, MPAA rating, badges, legal links */}
        <MovieFooter />
      </div>

      {/* Intro phase overlays */}
      {phase === "bootseq" && (
        <BootSequenceIntro onComplete={handleBootSeqDone} />
      )}

      {(phase === "boot" || phase === "matrix") && (
        <KernelBoot onComplete={handleBootDone} />
      )}

      {phase === "matrix" && (
        <MatrixIntro
          fontSize={18}
          onComplete={handleMatrixDone}
        />
      )}

      {phase === "glitch" && (
        <GlitchFlash onDone={handleGlitchDone} />
      )}
    </main>
  );
}

export default App;
