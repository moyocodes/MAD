// ─── TRUSTED BY ───────────────────────────────────────────────────────────────
const LOGOS = [
  "/log1.png",
  "/log2.png",
  "/log3.png",
  "/log4.png",
  "/log5.png",
  "/log6.png",
  "/log7.png",
];

export default function TrustedBy({ inHero = false }) {
  // duplicate for seamless loop
  const loopLogos = [...LOGOS, ...LOGOS];

  return (
    <div
      className={`mad-trusted overflow-hidden border-y border-dark-100 bg-gradient-to-b from-dark-900 via-azure-100 to-white-soft dark:border-white/[.08] dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 ${
        inHero
          ? "absolute bottom-0 left-0 right-0 z-50 px-4 py-5 sm:py-7"
          : "relative py-14"
      }`}
    >
      <p
        className={`text-center font-bold uppercase tracking-[.25em] text-white/70 dark:text-white/55 ${
          inHero ? "mb-4 text-[8px] sm:mb-5 sm:text-[9px]" : "mb-9 text-[10px]"
        }`}
      >
        Trusted by growing businesses, institutions & mission-driven organizations
      </p>

      <div className="relative w-full overflow-hidden">
        <div
          className={`flex w-max animate-marquee ${
            inHero ? "gap-10 px-8 sm:gap-14 sm:px-12" : "gap-20 px-14"
          }`}
        >
          {loopLogos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Client logo ${i}`}
              className={`object-contain opacity-90 transition duration-300 hover:opacity-100 ${
                inHero ? "h-8 sm:h-10" : "h-12"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
