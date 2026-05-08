import { useScrollY } from "../../hooks/homeHooks";
import { useTheme } from "../../context/ThemeContext";

export default function Nav() {
  const y = useScrollY();
  const { dark, toggle } = useTheme();
  const scrolled = y > 20;

  return (
    <div className="fixed left-0 right-0 top-2 z-[300] px-2 sm:top-3 sm:px-4">
      <nav
        className={`flex h-14 items-center justify-between rounded-2xl px-4 sm:h-[60px] sm:px-8 transition-all duration-300 backdrop-blur-xl ${
          scrolled
            ? dark
              ? "bg-dark-900/94 border border-white/[.07] shadow-[0_12px_32px_rgba(0,0,0,.3)]"
              : "bg-white/94 border border-dark-100/70 shadow-[0_12px_32px_rgba(10,22,40,.10)]"
            : dark
              ? "bg-dark-900/80 border border-white/[.06] shadow-[0_8px_24px_rgba(0,0,0,.22)]"
              : "bg-white/80 border border-dark-100/50 shadow-[0_8px_24px_rgba(10,22,40,.08)]"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src="ma.png" alt="MAD logo" className="h-20 w-20 sm:h-32 sm:w-32" />
        </div>

        {/* Nav links */}
        <ul className="mad-nav-ul flex gap-8 list-none m-0 p-0">
          {["Work", "Services", "About"].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={`text-[10px] font-bold uppercase tracking-[.22em] no-underline transition-colors duration-200 ${
                  dark ? "text-white/52 hover:text-white" : "text-dark-700/55 hover:text-dark-900"
                }`}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={`relative h-5 w-9 cursor-pointer rounded-full border p-0 transition-colors duration-300 ${
              dark
                ? "border-azure-500 bg-azure-500"
                : "border-dark-200/60 bg-dark-100/80"
            }`}
          >
            <div
              className="absolute w-3.5 h-3.5 rounded-full top-[3px] shadow-sm transition-all duration-300"
              style={{
                left: dark ? 18 : 2,
                background: dark ? "#fff" : "#fff",
              }}
            />
          </button>

          {/* Contact text */}
          <span
            className={`hidden cursor-pointer text-[10px] font-semibold tracking-wide transition-colors duration-200 sm:inline ${
              dark ? "text-white/45 hover:text-white/85" : "text-dark-700/50 hover:text-dark-900"
            }`}
          >
            Contact
          </span>

          {/* CTA */}
          <button className="hidden cursor-pointer rounded-full border-none bg-azure-500 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_2px_16px_rgba(25,128,194,.28)] transition-all duration-200 hover:bg-azure-400 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(25,128,194,.38)] active:scale-[.97] sm:block">
            Work With Us
          </button>
        </div>
      </nav>
    </div>
  );
}
