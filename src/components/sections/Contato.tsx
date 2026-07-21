import { TerminalWindow } from "../ui/TerminalWindow";
import { TypedLine } from "../ui/TypedLine";

const CONTACT_LINKS = [
  { label: "whatsapp", href: "https://wa.me/SEUNUMERO" },
  { label: "email", href: "mailto:seu@email.com" },
  { label: "github", href: "https://github.com/seuusuario" },
];

export function Contato() {
  return (
    <section
      id="contato"
      className="scroll-mt-8 flex min-h-screen w-full items-center justify-center bg-transparent py-16 px-4 font-mono box-border"
    >
      <TerminalWindow title="CONTATO.SH // SECURE_TRANSMISSION">
        <TypedLine prompt="$">cat contato.txt</TypedLine>

        <div className="mt-4 pl-3.5 border-l-2 border-signal/30 flex flex-col gap-2.5">
          {CONTACT_LINKS.map((link) => (
            <p key={link.label} className="m-0 flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-signal/50">–</span>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-on-surface underline underline-offset-4 decoration-signal/40 hover:text-signal hover:decoration-signal transition-colors font-mono"
              >
                {link.label}
              </a>
            </p>
          ))}
        </div>

        <TypedLine prompt="$" style={{ marginTop: "24px" }}>
          echo "vamos conversar"
          <span className="ml-1 animate-pulse text-signal">▊</span>
        </TypedLine>
      </TerminalWindow>
    </section>
  );
}
