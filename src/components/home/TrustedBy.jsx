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
  return (
    <div
      className={`mad-trusted overflow-hidden dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 ${
        inHero
          ? "absolute bottom-0 left-0 right-0 z-50 px-4 py-5 "
          : "relative py-14"
      }`}
    >
      <p
        className={`font-bold uppercase tracking-[.25em] ${
          inHero
            ? "mb-4 text-[8px] sm:mb-5 sm:text-[9px] text-white/40"
            : "mb-9 text-[10px] text-[rgba(10,22,40,.45)] dark:text-white"
        }`}
      >
        Trusted by growing businesses, institutions & mission-driven
        organizations
      </p>

      <div className="relative w-full overflow-hidden">
        <div
          className={`flex w-max animate-marquee ${
            inHero ? "gap-10 px-8 sm:gap-14 sm:px-12" : "gap-20 px-14"
          }`}
        >
          {LOGOS.map((src, i) => (
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
