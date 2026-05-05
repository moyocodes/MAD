import { useScrollY } from "../../hooks/homeHooks";
import { useTheme } from "../../context/ThemeContext";

// ─── NAV ─────────────────────────────────────────────────────────────────────
export default function Nav() {
  const y = useScrollY();
  const { dark, toggle } = useTheme();
  const scrolled = y > 20;

  return (
    <div className="fixed left-0 right-0 top-2 z-[300] px-2 sm:top-3 sm:px-4">
      <nav
        className={`flex h-14 items-center justify-between rounded-2xl border border-azure-200 bg-azure-100 px-4 shadow-[0_10px_30px_rgba(24,24,23,.12)] backdrop-blur-xl transition-all duration-300 dark:border-white/[.08] dark:bg-dark-800 sm:h-[60px] sm:px-8 ${
          scrolled
            ? dark
              ? "shadow-[0_1px_0_rgba(255,255,255,.06),0_14px_34px_rgba(0,0,0,.25)]"
              : "shadow-[0_1px_0_rgba(0,0,0,.08),0_14px_34px_rgba(24,24,23,.16)]"
            : dark
              ? "shadow-[0_12px_30px_rgba(0,0,0,.22)]"
              : "shadow-[0_10px_30px_rgba(24,24,23,.12)]"
        }`}
      >
        <div
          className={`text-sm font-black tracking-widest ${dark ? "text-white/90" : "text-dark-900"}`}
        >
          <img src="ma.png" alt="ma logo" className="h-20 w-20 sm:h-32 sm:w-32" />
        </div>
        <ul className="mad-nav-ul flex gap-8 list-none m-0 p-0">
          {["Work", "Services", "About"].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={`text-[10px] font-bold uppercase tracking-[.2em] no-underline opacity-70 transition-opacity duration-200 hover:opacity-100 ${
                  dark ? "text-white/70" : "text-dark-900"
                }`}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className={`relative h-5 w-9 cursor-pointer rounded-full border p-0 transition-colors duration-300 ${
              dark ? "border-azure-500 bg-azure-500" : "border-dark-100 bg-dark-100"
            }`}
          >
            <div
              className="absolute w-3.5 h-3.5 bg-white rounded-full top-[3px] shadow-sm transition-all duration-300"
              style={{ left: dark ? 18 : 2 }}
            />
          </button>
          <span
            className={`hidden cursor-pointer text-[10px] font-semibold tracking-wide sm:inline ${
              dark ? "text-white/65" : "text-dark-900/65"
            }`}
          >
            Contact
          </span>
          <button
            className="hidden cursor-pointer rounded-full border-none bg-azure-500 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_2px_16px_rgba(25,128,194,.25)] transition-all duration-200 hover:bg-azure-600 sm:block"
          >
            Work With Us
          </button>
        </div>
      </nav>
    </div>
  );
}
