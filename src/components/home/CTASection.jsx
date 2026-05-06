export default function CTASection() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Let’s Build Something That Works
        </h2>

        <p className="text-base md:text-lg opacity-70 mb-10">
          We design systems, not just visuals — built to convert and scale.
        </p>

        <button className="px-8 py-4 text-sm font-semibold tracking-wide border border-black dark:border-white hover:scale-105 transition">
          Get Started
        </button>
      </div>
    </section>
  );
}