import { useState } from "react";
import { FakeGuestbook } from "../ui/EasterEggs";

// ─────────────────────────────────────────────────────────────────────────────
// MAILING LIST & RESISTANCE NEWSLETTER SECTION
// Reframed guestbook into movie promo mailing list with scrolling log flavor
// ─────────────────────────────────────────────────────────────────────────────

export function MailingList() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section
      id="newsletter"
      className="scroll-mt-4 flex w-full items-center justify-center bg-transparent py-1 px-2 font-mono box-border"
    >
      <div className="w-full max-w-[760px] flex flex-col gap-5">
        {/* Mailing List Signup Panel */}
        <div className="bevel-raised bg-surface">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
            <span className="font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">
              MAILING_LIST.DAT // JOIN_THE_RESISTANCE_NETWORK
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/60">
              <span>[ − ]</span><span>[ # ]</span><span>[ × ]</span>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-3">
            <p className="font-mono text-xs text-on-surface leading-relaxed">
              Subscribe to the official <span className="text-signal font-bold">THE MATRIX</span> concept mailing list to receive advance theatrical preview passes, exclusive desktop wallpaper packs, and secret terminal unlock codes.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@zion.net"
                className="bevel-lowered bg-void text-signal placeholder:text-on-surface-variant/40 px-3 py-1.5 font-mono text-xs flex-1 min-w-[200px] focus:outline-none"
              />
              <button
                type="submit"
                className="bevel-button text-signal font-mono text-xs px-4 py-1.5 font-bold cursor-pointer hover:bg-surface-container uppercase tracking-wider"
              >
                [ JOIN NETWORK ]
              </button>
            </form>

            {subscribed && (
              <div className="p-2 bg-surface-container border border-signal/40 text-signal font-mono text-xs">
                ✓ DISPATCH SUCCESSFUL: You have been entered into the Zion Resistance Network directory.
              </div>
            )}
          </div>
        </div>

        {/* Scrolling Log Entries below as flavor / easter-egg content */}
        <FakeGuestbook />
      </div>
    </section>
  );
}
