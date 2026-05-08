export default function CTASection() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36 bg-tangerine-50 text-center relative overflow-hidden text-dark-900">

      {/* Eyebrow */}
      <p className="mb-5 uppercase tracking-[.24em] font-mono text-[10px] text-tangerine-600/80">
        Ready when you are
      </p>

      {/* Headline */}
      <h2 className="mx-auto mb-5 max-w-[760px] leading-[0.96] font-semibold text-[clamp(42px,6vw,78px)] tracking-[-0.04em]">
        Let's build something
        <br />
        that works.
      </h2>

      {/* Subtext */}
      <p className="mx-auto mb-11 max-w-[500px] leading-relaxed text-[15px] text-dark-700/70">
        We design systems, not just visuals — built to convert,
        scale, and stand the test of time.
      </p>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 flex-wrap">

        <button className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-dark-900 text-white text-[13px] font-display font-semibold tracking-[.08em] transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 active:scale-[.98]">
          Get started

          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <div className="w-px h-10 bg-dark-900/10" />

        <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-dark-900/15 text-[13px] font-display font-semibold tracking-[.08em] text-dark-700/70 transition-all duration-200 hover:border-dark-900/40 hover:-translate-y-0.5 active:scale-[.98]">
          See our work
        </button>
      </div>

      {/* Trust Signals */}
      <div className="flex items-center justify-center gap-6 mt-14 flex-wrap">
        {[
          "No contracts",
          "Strategy call included",
          "Results in weeks, not months",
        ].map((t) => (
          <span
            key={t}
            className="flex items-center gap-1.5 uppercase tracking-[.1em] font-mono text-[10px] text-dark-700/40"
          >
            <span className="w-1 h-1 rounded-full bg-tangerine-500" />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
