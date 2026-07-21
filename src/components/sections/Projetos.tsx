import { useState } from "react";
import { TerminalWindow } from "../ui/TerminalWindow";
import { TypedLine } from "../ui/TypedLine";

interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    name: "landing-solar",
    description:
      "Landing page de alta conversão para empresa de energia solar. Formulário integrado ao WhatsApp, tempo de carregamento < 1.5s.",
    stack: ["React", "Tailwind CSS", "Vite"],
    link: "https://github.com/seuusuario/landing-solar",
  },
  {
    id: "02",
    name: "clinica-auto",
    description:
      "Sistema de agendamento automático para clínica odontológica via WhatsApp + Google Sheets.",
    stack: ["Python", "Make", "WhatsApp API"],
    link: "https://github.com/seuusuario/clinica-auto",
  },
  {
    id: "03",
    name: "portfolio-terminal",
    description:
      "Este próprio portfólio — interface de terminal ASCII com intro de Matrix, globe 3D e navegação por comandos.",
    stack: ["React", "TypeScript", "Framer Motion", "Vite"],
  },
];

export function Projetos() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="projetos"
      className="scroll-mt-8 flex min-h-screen w-full items-center justify-center bg-transparent py-16 px-4 font-mono box-border"
    >
      <TerminalWindow title="PROJETOS.SH // REPOSITORY_MODULES">
        <TypedLine prompt="$">ls -la projetos/</TypedLine>

        <div className="mt-4 flex flex-col gap-2">
          {PROJECTS.map((project) => {
            const isOpen = openId === project.id;
            return (
              <div
                key={project.id}
                className="border border-outline-variant rounded-xs overflow-hidden bg-surface-container-lowest"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : project.id)}
                  className="flex items-center gap-3 w-full border-none p-2.5 cursor-pointer text-left font-mono transition-colors hover:bg-surface-container-high"
                  style={{
                    background: isOpen ? "rgba(24, 34, 24, 0.9)" : "transparent",
                  }}
                >
                  <span className="hidden sm:inline text-xs text-on-surface-variant/40 shrink-0 font-label">
                    drwxr-xr-x
                  </span>
                  <span className="text-xs text-signal/70 shrink-0">
                    [{project.id}]
                  </span>
                  <span className="text-sm font-headline font-semibold text-on-surface flex-1">
                    {project.name}/
                  </span>
                  <span className="text-signal text-xs shrink-0 font-mono">
                    {isOpen ? "[ - ]" : "[ + ]"}
                  </span>
                </button>

                {isOpen && (
                  <div className="pl-4 pr-3 py-3 border-t border-outline-variant/40 bg-surface flex flex-col gap-2">
                    <p className="font-mono text-xs text-on-surface-variant leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <span className="font-label text-[10px] text-on-surface-variant/60 uppercase">
                        STACK:
                      </span>
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] text-signal bg-surface-container border border-outline-variant/60 px-2 py-0.5 rounded-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs text-signal underline underline-offset-4 hover:text-white transition-colors mt-1 inline-block"
                      >
                        → ACESSAR REPOSITÓRIO
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </TerminalWindow>
    </section>
  );
}
