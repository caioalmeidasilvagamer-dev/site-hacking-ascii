import { TerminalWindow } from "../ui/TerminalWindow";
import { TypedLine } from "../ui/TypedLine";

const SKILLS = ["React", "TypeScript", "Python", "Automação", "Tailwind CSS"];

export function Sobre() {
  return (
    <section
      id="sobre"
      className="scroll-mt-8 flex min-h-screen w-full items-center justify-center bg-transparent py-16 px-4 font-mono box-border"
    >
      <TerminalWindow title="SOBRE.SH // OPERATIVE_BIO">
        <TypedLine prompt="$">cat sobre.txt</TypedLine>

        <div className="mt-4 mb-0 pl-3.5 border-l-2 border-signal/30 flex flex-col gap-2.5">
          <p className="font-mono text-sm md:text-base leading-relaxed text-on-surface">
            Desenvolvedor freelancer focado em sites e automações pra
            pequenos negócios — de clínicas a empresas de energia solar.
          </p>
          <p className="font-mono text-sm md:text-base leading-relaxed text-on-surface-variant">
            Gosto de resolver problema real com código simples e bem feito,
            sem inventar complexidade onde não precisa.
          </p>
        </div>

        <TypedLine prompt="$" style={{ marginTop: "24px" }}>
          ls habilidades/
        </TypedLine>

        <ul className="mt-2.5 pl-3.5 list-none grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SKILLS.map((skill) => (
            <li
              key={skill}
              className="font-mono text-xs sm:text-sm text-on-surface flex items-center gap-2 border border-outline-variant bg-surface-container px-2.5 py-1.5 rounded-xs"
            >
              <span className="text-signal">–</span>
              {skill}
            </li>
          ))}
        </ul>
      </TerminalWindow>
    </section>
  );
}
