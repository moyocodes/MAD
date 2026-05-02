import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    tag: "01",
    service: "Product & Digital",
    headline: ["Structure changes", "everything."],
    card: { title: "TruBilling Platform", sub: "Product Development",
      cardImg: "https://scontent-arn2-1.xx.fbcdn.net/o1/v/t0/f2/m340/AQPRLa6Un8apb7kwKGvOoTZtk9OaYItJ3Bqgr0-QKar_8_naiHf-zX_wYDaGFgkxbQyIjQHYGFv9ciTqPr6WOxxlEGlqRjG7UveUTQIX8SF24Lm3rlJJtQQmuLqH86jXqPa2YpOvIuUyGX-zYHbPKC3ol-OA.jpeg?_nc_ht=scontent-arn2-1.xx.fbcdn.net&_nc_gid=4QmXjNxQ_8-v9nPIiKJAcw&_nc_cat=110&_nc_oc=AdotQwYll5syP_f0ANHN6juJT5BUA6i2sS5VxbHmC-VlU2lf9N_8Y-lii02qIXF3dG8&ccb=9-4&oh=00_Af6dDue1pOUTZkxWX7FaEh9aUckyfS63jbUE2Ya7PqXp3g&oe=69F5C3CD&_nc_sid=5b3566",
    },
    leftImg: "https://scontent-arn2-1.xx.fbcdn.net/o1/v/t0/f2/m257/AQMRVmdv9fSPZxRQyBWLlr0g9MpME9W4y-l5sK_U8EXOCABXjOrDfozafrDM94Ag5hfkeiqdvPoy3L6mDAg0nhPFmiZ24MR39idThOgR7gHuoh7FVDZob_H5uHgNGuEt.jpeg?_nc_ht=scontent-arn2-1.xx.fbcdn.net&_nc_gid=2cZfAHZNNKUM9oA_FZPp2g&_nc_cat=110&_nc_oc=Adp7SeSsfwrEXpcvkwkX1g2AbuXxiLg35YAEr89MO-aYQYZ3QeqLrAthV17gn2GIk_k&ccb=9-4&oh=00_Af4r_OB3_My5byjVkH5y-C9OaEnwxK6mUX1RbNyHphn9kA&oe=69F5D1DF&_nc_sid=5b3566",
    rightImg: "https://lh4.googleusercontent.com/proxy/MH1lSaxdtqyDUwFZ7mZcH2r54q5JdmLVIn9yMqrwwoi7i_PSKDEAcN28YHYvi-dSMDUlfoC6-3UYYlitW7cA",
  },
  {
    tag: "02",
    service: "Marketing & Communication",
    headline: ["Your brand,", "finally heard."],
    card: { title: "Brand Campaign", sub: "Marketing & Communication",
      cardImg: "https://scontent-arn2-1.xx.fbcdn.net/o1/v/t0/f2/m421/AQMTxK3hJZGpS6Zfa3wQxfmjBEPvLqTb5d7uDaDAfi1-g-XZc6-xLyfgiqen1mk-81EkXBexhi0OowlSvdsa7neCK0sQQPPyxiYBi_suj5fm1DxxNNYZW-Dq6-lA1Kjp.jpeg?_nc_ht=scontent-arn2-1.xx.fbcdn.net&_nc_gid=QISnkdZLMWff8bnXHd7-sA&_nc_cat=102&_nc_oc=AdrW7dCQegG8UsSEz-lAQzm7Q89iS_X1eiWevnPZO-C4eFS5LbRqWm_sJTgz5C3SDpo&ccb=9-4&oh=00_Af7qlpD1ss0Hce-Ug6bLSiUr6cywVToY1XvrfXh68j5MmA&oe=69F5D317&_nc_sid=5b3566",
    },
    leftImg: "https://scontent-arn2-1.xx.fbcdn.net/o1/v/t0/f2/m256/AQMs4Qq3jUZleSiDkMnokuypUSracJk3Kqv1W-tyP1t0R0JBF8mPlT1LyeLrpGIhcesrHHrdbWfv3aUbpl1gjPu7DZqkdYMpczPcKOoOTXiOdRo9O6Ejv6XyUeVRSFrD.jpeg?_nc_ht=scontent-arn2-1.xx.fbcdn.net&_nc_gid=A0B4ySuOi41tzYm_uLIURw&_nc_cat=100&_nc_oc=AdpsOS9UN3MjqPpJ057n87M8h0-YqRo-vpJ0h3e-18H6bZnXKtOJbtcFYRLVGcpbBjo&ccb=9-4&oh=00_Af70SJ5wgfhzk0oQH8uNQnQD1ZLIOqHPYeJ_x1VDBniokQ&oe=69F5BCB9&_nc_sid=5b3566",
    rightImg: "/soc.png",
  },
  {
    tag: "03",
    service: "Brand & Design Systems",
    headline: ["Design that", "speaks first."],
    card: { title: "Identity System", sub: "Brand & Design",
      cardImg: "https://scontent-arn2-1.xx.fbcdn.net/o1/v/t0/f2/m421/AQOJYIovi7rQ4u634vqALkWtWN4YXtyOuXoL4MmWcRk7Zzflf435Jpn-OpyKTFbYD7Gy9m7lA6DZ253CufN4V0I07BNQMeMm993BCEwgyTNtDf_rOmrpY2ZsJoD5Am5Wc3uqExvkC3e88IGDCTR2sGFAVPoB.jpeg?_nc_ht=scontent-arn2-1.xx.fbcdn.net&_nc_gid=Cwb6AgdHRjpPk_Grw6lUoA&_nc_cat=109&_nc_oc=AdqFR8G6B-PqOGBO8aM9CwMx32AgNLAhfToeeYYk5Nej7328g4AUPnB6yW9uIeQ2u3Y&ccb=9-4&oh=00_Af771Q2AJuW5FWPGr8PkpPQDyU5AnL14q_e6ixap13CVpA&oe=69F5B64C&_nc_sid=5b3566",
    },
    rightImg: "/brand.png",
    leftImg: "https://scontent-arn2-1.xx.fbcdn.net/o1/v/t0/f2/m260/AQNkUicrBycwziD_baanfjTUbQSTV5caAiQA710cFSozfsBE0Sqv_nNn17W0sh2ISkoNUZu1cIP2Pd8yJNcdK_kHnSeAXpB5LfXbyegV86p2CZaRYl8OWmyP-TUHce4.jpeg?_nc_ht=scontent-arn2-1.xx.fbcdn.net&_nc_gid=WJvTKL_lXMIJ34JAdg5Jgg&_nc_cat=101&_nc_oc=Adqllybaz8F0UeeOYmXPSDpPHNAC3Cw3PjtabtzsxzT5RLHq0OefHtkhaY5GLrWuB8o&ccb=9-4&oh=00_Af6uQypWhqoREvpCFE-gRq7CAyHEboFHjBCb0IDLrLU_jA&oe=69F5C9AD&_nc_sid=5b3566",
  },
];

const DURATION = 6000;

const ALL_IMGS = [
  SLIDES[0].card.cardImg,
  SLIDES[1].card.cardImg,
  SLIDES[2].card.cardImg,
  SLIDES[0].leftImg,
  SLIDES[1].leftImg,
  SLIDES[2].leftImg,
  SLIDES[0].rightImg,
];

// ─── Shared sub-component ────────────────────────────────────────────────────

function LightFlier({ src, style, rotate, delay, duration, dy = 10, aspectRatio = "3/4" }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.07)",
        border: "3px solid #fff",
        rotate,
        ...style,
      }}
      animate={{ y: [0, -dy, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <img src={src} alt="" style={{ width: "100%", aspectRatio, objectFit: "cover", display: "block" }} />
    </motion.div>
  );
}

// ─── Phase 1: Dark cycling hero ──────────────────────────────────────────────

function PhaseHero({ slide, current, progress, playing, setPlaying, goTo, leftY, rightY }) {
  return (
    <>
      {/* Left panel */}
      <div className="absolute inset-0 right-[60%] lg:right-[58%] overflow-hidden">
        <motion.div style={{ y: leftY }} className="w-full h-full">
          <AnimatePresence mode="sync">
            <motion.img
              key={`left-${current}`}
              src={slide.leftImg}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${current}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="absolute bottom-[12%] left-[6%] w-[80%] max-w-[180px] bg-white p-3 z-10"
          >
            <img src={slide.card.cardImg} alt={slide.card.title} className="w-full aspect-[4/3] object-cover block mb-3" />
            <p className="font-montserrat font-extrabold text-[12px] text-dark leading-tight tracking-tight mb-1">{slide.card.title}</p>
            <p className="font-montserrat font-semibold text-[9px] text-azure tracking-[0.1em] uppercase">{slide.card.sub}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right panel */}
      <div className="absolute inset-0 left-[40%] lg:left-[42%] overflow-hidden">
        <motion.div style={{ y: rightY }} className="w-full h-full">
          <AnimatePresence mode="sync">
            <motion.img
              key={`right-${current}`}
              src={slide.rightImg}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[13%] right-[4%] text-right z-10 max-w-[220px] lg:max-w-[460px]"
          >
            <p className="font-montserrat font-semibold text-[10px] text-azure tracking-[0.14em] uppercase mb-3">{slide.service}</p>
            <h1 className="font-montserrat font-black text-white leading-[1.04] tracking-[-0.03em] text-[clamp(1.2rem,3.5vw,3.6rem)] mb-4">
              {slide.headline[0]}<br />
              <span className="text-azure">{slide.headline[1]}</span>
            </h1>
            <div className="flex gap-2.5 justify-end flex-wrap">
              <Link to="/contact" className="bg-white text-[#181817] font-montserrat font-bold text-[11px] tracking-[0.06em] uppercase px-5 py-3 rounded-full no-underline hover:bg-white/90 transition-opacity">Let's talk</Link>
              <Link to="/work" className="border border-white/25 text-white font-montserrat font-bold text-[11px] tracking-[0.06em] uppercase px-5 py-3 rounded-full no-underline transition-colors">See our work</Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-0 bottom-0 left-[40%] lg:left-[42%] w-px bg-white/10 z-20" />

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-4 px-4 lg:px-8 h-11 lg:h-[52px]"
        style={{ background: "rgba(4,8,16,0.75)", backdropFilter: "blur(14px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2.5 flex-1 justify-center">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="border-0 bg-transparent cursor-pointer py-1 flex items-center">
              <div
                className="relative h-0.5 rounded overflow-hidden transition-all duration-300"
                style={{ width: i === current ? "48px" : "24px", background: "rgba(255,255,255,0.14)" }}
              >
                {i === current && (
                  <div className="absolute inset-0 bg-azure rounded" style={{ width: `${progress}%`, transition: "width 0.1s linear" }} />
                )}
                {i < current && <div className="absolute inset-0 bg-white/45 rounded" />}
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => setPlaying(p => !p)}
          className="w-8 h-8 rounded-full border border-white/20 bg-transparent cursor-pointer flex items-center justify-center shrink-0"
        >
          {playing ? (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
              <rect x="0" y="0" width="3" height="12" rx="1" fill="white" />
              <rect x="7" y="0" width="3" height="12" rx="1" fill="white" />
            </svg>
          ) : (
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
              <path d="M1 1.5l9 5-9 5V1.5z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

// ─── Phase 2: White "Designed for every screen" ───────────────────────────────

// Two straight vertical columns of images, evenly spaced top-to-bottom
const LEFT_COL  = [ALL_IMGS[0], ALL_IMGS[2], ALL_IMGS[4], ALL_IMGS[6], ALL_IMGS[1]];
const RIGHT_COL = [ALL_IMGS[3], ALL_IMGS[5], ALL_IMGS[1], ALL_IMGS[0], ALL_IMGS[4]];

function PhaseDevices({ slide }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#f8f7f4", overflow: "hidden" }}>

      {/* Left column — 5 images evenly spaced */}
      {LEFT_COL.map((src, i) => (
        <LightFlier
          key={`l${i}`}
          src={src}
          style={{ top: `${i * 22}%`, left: "1%", width: "clamp(80px,8vw,108px)" }}
          rotate="0deg"
          delay={i * 0.3}
          duration={4.5 + i * 0.4}
          dy={8}
          aspectRatio="3/4"
        />
      ))}

      {/* Right column — 5 images offset by half a slot */}
      {RIGHT_COL.map((src, i) => (
        <LightFlier
          key={`r${i}`}
          src={src}
          style={{ top: `${i * 22 + 11}%`, right: "1%", width: "clamp(80px,8vw,108px)" }}
          rotate="0deg"
          delay={i * 0.3 + 0.15}
          duration={4.8 + i * 0.35}
          dy={8}
          aspectRatio="3/4"
        />
      ))}

      {/* Center: headline + devices */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "18px", padding: "0 18%" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: "10px", letterSpacing: "0.20em", textTransform: "uppercase", color: "#1980c2", marginBottom: "8px" }}>In context</p>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.2rem,2.4vw,2rem)", color: "#181817", lineHeight: 1.06, letterSpacing: "-0.03em" }}>Designed for every screen.</h2>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "clamp(8px,1.5vw,18px)", width: "100%" }}>
          {/* Phone */}
          <div style={{ width: "clamp(52px,5.5vw,72px)", aspectRatio: "9/19.5", background: "#ffffff", borderRadius: "clamp(12px,2vw,22px)", border: "4px solid #e5e5e3", overflow: "hidden", flexShrink: 0, boxShadow: "0 12px 40px rgba(0,0,0,0.10)", position: "relative" }}>
            <div style={{ position: "absolute", right: "-5px", top: "22%", width: "3px", height: "14%", background: "#d4d4d2", borderRadius: "2px" }} />
            <div style={{ position: "absolute", left: "-5px", top: "20%", width: "3px", height: "8%", background: "#d4d4d2", borderRadius: "2px" }} />
            <div style={{ position: "absolute", left: "-5px", top: "31%", width: "3px", height: "8%", background: "#d4d4d2", borderRadius: "2px" }} />
            <div style={{ position: "absolute", top: "5px", left: "50%", transform: "translateX(-50%)", width: "26px", height: "7px", background: "#1a1a1a", borderRadius: "99px", zIndex: 3 }} />
            <img src={SLIDES[0].rightImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Laptop — shows the same slide content as the hero, creating visual continuity */}
          <div style={{ flexShrink: 0, maxWidth: "clamp(180px,30vw,340px)", width: "100%" }}>
            <div style={{ background: "#e8e8e6", borderRadius: "12px 12px 0 0", padding: "7px 7px 0", boxShadow: "0 -2px 0 #d0d0ce, 0 12px 40px rgba(0,0,0,0.10)", border: "1px solid #ddddd8", borderBottom: "none" }}>
              <div style={{ background: "#fff", borderRadius: "6px 6px 0 0", overflow: "hidden", aspectRatio: "16/10", position: "relative", border: "1px solid #ebebea", borderBottom: "none" }}>
                <div style={{ height: "18px", background: "#f5f5f3", display: "flex", alignItems: "center", padding: "0 8px", gap: "4px", borderBottom: "1px solid #ebebea" }}>
                  {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => (
                    <div key={c} style={{ width: "7px", height: "7px", borderRadius: "99px", background: c }} />
                  ))}
                  <div style={{ flex: 1, background: "#e8e8e6", borderRadius: "4px", height: "9px", marginLeft: "6px", maxWidth: "140px" }} />
                  <div style={{ width: "48px", height: "9px", background: "#e8e8e6", borderRadius: "4px" }} />
                </div>
                {/* Uses the active hero slide's right image for visual continuity */}
                <img src={slide.rightImg} alt="" style={{ width: "100%", height: "calc(100% - 18px)", objectFit: "cover", display: "block" }} />
              </div>
            </div>
            <div style={{ height: "3px", background: "#c8c8c6" }} />
            <div style={{ height: "clamp(10px,1.4vw,18px)", background: "linear-gradient(to bottom, #dcdcda, #c8c8c6)", borderRadius: "0 0 6px 6px", border: "1px solid #c0c0be", borderTop: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "28%", height: "40%", background: "rgba(0,0,0,0.06)", borderRadius: "3px" }} />
            </div>
            <div style={{ height: "2px", background: "#b0b0ae", borderRadius: "0 0 4px 4px", margin: "0 4px" }} />
          </div>

          {/* Tablet */}
          <div style={{ width: "clamp(50px,6vw,80px)", aspectRatio: "3/4", background: "#ffffff", borderRadius: "10px", border: "4px solid #e5e5e3", overflow: "hidden", flexShrink: 0, boxShadow: "0 12px 40px rgba(0,0,0,0.10)", position: "relative" }}>
            <div style={{ position: "absolute", bottom: "5px", left: "50%", transform: "translateX(-50%)", width: "30%", height: "3px", background: "#d4d4d2", borderRadius: "99px", zIndex: 3 }} />
            <div style={{ position: "absolute", right: "-5px", top: "15%", width: "3px", height: "12%", background: "#d4d4d2", borderRadius: "2px" }} />
            <img src={SLIDES[2].rightImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        <p style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 500, fontSize: "11px", color: "#9b9b98", letterSpacing: "0.02em", textAlign: "center" }}>Every project. Every device. Pixel-perfect.</p>
      </div>
    </div>
  );
}

// ─── Phase 3: Dark "Ready to grow" CTA ───────────────────────────────────────

function PhaseCTA() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img src={SLIDES[1].leftImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(4,8,16,0.92)", backdropFilter: "blur(12px)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 6%" }}>
        <p style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: "10px", letterSpacing: "0.20em", textTransform: "uppercase", color: "#1980c2", marginBottom: "16px" }}>
          Ready to grow?
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(3rem,7.5vw,6rem)", color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.04, marginBottom: "28px" }}>
          Let's build<br />something real.
        </h2>
        <p style={{ fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: "360px", marginBottom: "36px" }}>
          Strategy, design, delivery — all under one roof.
        </p>
        <Link
          to="/contact"
          style={{ display: "inline-block", background: "#1980c2", color: "#fff", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.10em", textTransform: "uppercase", padding: "14px 38px", borderRadius: "999px", textDecoration: "none" }}
        >
          Let's talk
        </Link>
      </div>
    </div>
  );
}

// ─── Root Hero ────────────────────────────────────────────────────────────────

export default function Hero() {
  const scrollZoneRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollZoneRef,
    offset: ["start start", "end end"],
  });

  const leftY = useTransform(scrollYProgress, [0, 0.2], ["0%", "12%"]);
  const rightY = useTransform(scrollYProgress, [0, 0.2], ["0%", "7%"]);

  // Hero collapses to ~25% — small enough to read as "laptop-sized" at center
  const heroScale = useTransform(scrollYProgress, [0.06, 0.30], [1, 0.25]);
  const heroRadius = useTransform(scrollYProgress, [0.06, 0.30], [16, 6]);

  // Phase 1 — hero: full until 0.14, gone by 0.26
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.14, 0.26], [1, 1, 0]);

  // Phase 2 — white devices: starts early (0.18) so laptop emerges *while* hero is still sinking
  const phase2Opacity = useTransform(scrollYProgress, [0.18, 0.28, 0.52, 0.60], [0, 1, 1, 0]);

  // Phase 3 — dark CTA: in 0.60→0.68, stays full to end
  const phase3Opacity = useTransform(scrollYProgress, [0.60, 0.68, 1.0, 1.0], [0, 1, 1, 1]);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const start = performance.now();
    let rafId;
    const tick = (now) => {
      const pct = Math.min(((now - start) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    const timer = setTimeout(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
      setProgress(0);
    }, DURATION);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [playing, current]);

  const slide = SLIDES[current];

  return (
    <div ref={scrollZoneRef} style={{ height: "300vh", background: "#060c14" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          minHeight: "580px",
          margin: "0 12px",
          width: "calc(100% - 24px)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "radial-gradient(ellipse at 50% 35%, #0d1e38 0%, #060c14 100%)",
        }}
      >
        {/* Phase 1 — dark hero, collapses on scroll */}
        <motion.div
          style={{
            opacity: phase1Opacity,
            scale: heroScale,
            borderRadius: heroRadius,
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.75)",
            transformOrigin: "center center",
          }}
        >
          <PhaseHero
            slide={slide}
            current={current}
            progress={progress}
            playing={playing}
            setPlaying={setPlaying}
            goTo={goTo}
            leftY={leftY}
            rightY={rightY}
          />
        </motion.div>

        {/* Phase 2 — white "Designed for every screen" */}
        <motion.div style={{ opacity: phase2Opacity, position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
          <PhaseDevices slide={slide} />
        </motion.div>

        {/* Phase 3 — dark "Ready to grow" CTA */}
        <motion.div style={{ opacity: phase3Opacity, position: "absolute", inset: 0, zIndex: 30, pointerEvents: "none" }}>
          <PhaseCTA />
        </motion.div>
      </div>
    </div>
  );
}
