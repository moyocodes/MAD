import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCms } from "@/context/CmsContext";

const SECTION_LABELS = {
  nav: "Navigation",
  hero: "Hero",
  whatWeDo: "What We Do",
  servicesInMotion: "Services in Motion",
  experience: "Experience",
  beyond: "Beyond",
  contact: "Contact",
  footer: "Footer",
};

// ── Primitives ────────────────────────────────────────────────────────────────

function Label({ children }) {
  return (
    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,69,123,.5)", marginBottom: 5 }}>
      {children}
    </p>
  );
}

const inputBase = {
  width: "100%", boxSizing: "border-box",
  border: "1px solid rgba(11,69,123,.18)", borderRadius: 8,
  padding: "9px 11px", fontSize: 12, color: "#0c1a2e",
  background: "#f8fbff", outline: "none", fontFamily: "inherit",
  transition: "border-color .15s",
};

function TextField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <Label>{label}</Label>
      <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputBase} />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3, placeholder }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <Label>{label}</Label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        style={{ ...inputBase, resize: "vertical" }}
      />
    </div>
  );
}

function ImageField({ label, value, onChange }) {
  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <div style={{ marginBottom: 14 }}>
      <Label>{label}</Label>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://... or /local.png"
        style={{ ...inputBase, fontFamily: "monospace", fontSize: 10, marginBottom: 6 }}
      />
      <label
        style={{
          display: "flex", alignItems: "center", gap: 7, cursor: "pointer",
          background: "rgba(11,69,123,.07)", border: "1px dashed rgba(11,69,123,.22)",
          borderRadius: 8, padding: "7px 12px", marginBottom: value ? 6 : 0,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(11,69,123,.6)" strokeWidth="2" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(11,69,123,.6)" }}>Upload from device</span>
        <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      </label>
      {value && (
        <img
          src={value}
          alt=""
          style={{ width: "100%", height: 88, objectFit: "cover", borderRadius: 7, border: "1px solid rgba(11,69,123,.12)", background: "#e8f2fd" }}
        />
      )}
    </div>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px solid rgba(11,69,123,.1)", margin: "4px 0 16px" }} />;
}

function AddBtn({ onClick, label = "+ Add" }) {
  return (
    <button onClick={onClick} style={{ width: "100%", padding: "8px 0", borderRadius: 8, border: "1.5px dashed rgba(11,69,123,.28)", background: "transparent", color: "rgba(11,69,123,.6)", fontSize: 11, fontWeight: 700, cursor: "pointer", marginBottom: 14 }}>
      {label}
    </button>
  );
}

function DelBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ flexShrink: 0, width: 28, height: 28, border: "1px solid rgba(194,65,29,.3)", borderRadius: 6, background: "transparent", color: "rgba(194,65,29,.7)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
      ×
    </button>
  );
}

function Tabs({ tabs, active, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
      {tabs.map((t, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            padding: "5px 11px", borderRadius: 7, border: "none", cursor: "pointer",
            background: active === i ? "#0b457b" : "rgba(11,69,123,.08)",
            color: active === i ? "#fff" : "rgba(11,69,123,.6)",
            fontSize: 10, fontWeight: 700,
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ── Section forms ─────────────────────────────────────────────────────────────

function NavForm({ cmsData, updateCms }) {
  const b = cmsData.brand;
  const n = cmsData.nav;
  return (
    <>
      <ImageField label="Logo" value={b.logo} onChange={(v) => updateCms("brand.logo", v)} />
      <TextField label="Brand Name" value={b.name} onChange={(v) => updateCms("brand.name", v)} />
      <TextField label="Email" value={b.email} onChange={(v) => updateCms("brand.email", v)} />
      <Divider />
      <Label>Nav Links</Label>
      {(n.links ?? []).map((link, i) => (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
          <input type="text" value={link} onChange={(e) => { const next=[...n.links]; next[i]=e.target.value; updateCms("nav.links",next); }} style={{ ...inputBase, flex: 1 }} />
          <DelBtn onClick={() => updateCms("nav.links", n.links.filter((_,j)=>j!==i))} />
        </div>
      ))}
      <AddBtn label="+ Add Link" onClick={() => updateCms("nav.links", [...(n.links??[]), "New Link"])} />
      <TextField label="CTA Button Text" value={n.cta} onChange={(v) => updateCms("nav.cta", v)} />
    </>
  );
}

function HeroForm({ cmsData, updateCms }) {
  const [tab, setTab] = useState(0);
  const h = cmsData.hero;
  const slides = h.slides ?? [];
  const logos = h.trustedBy?.logos ?? [];
  const slideCount = slides.length;
  const TABS = [...slides.map((_, i) => `Slide ${i + 1}`), "General"];

  const addSlide = () => {
    const next = [...slides, { left: "", right: "", cardImg: "", card: "New", h1: "Headline", sub: "Subtext" }];
    updateCms("hero.slides", next);
    setTab(next.length - 1);
  };
  const removeSlide = (i) => {
    updateCms("hero.slides", slides.filter((_,j)=>j!==i));
    setTab(Math.max(0, i - 1));
  };

  if (tab < slideCount) {
    const s = slides[tab];
    const base = `hero.slides.${tab}`;
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <ImageField label="Left Image" value={s.left} onChange={(v) => updateCms(`${base}.left`, v)} />
        <ImageField label="Right Image" value={s.right} onChange={(v) => updateCms(`${base}.right`, v)} />
        <ImageField label="Card Image" value={s.cardImg} onChange={(v) => updateCms(`${base}.cardImg`, v)} />
        <TextField label="Card Label" value={s.card} onChange={(v) => updateCms(`${base}.card`, v)} />
        <TextArea label="Heading (\\n = line break)" value={s.h1} onChange={(v) => updateCms(`${base}.h1`, v)} rows={2} />
        <TextField label="Subtext" value={s.sub} onChange={(v) => updateCms(`${base}.sub`, v)} />
        <Divider />
        <AddBtn label="+ Add Slide" onClick={addSlide} />
        {slides.length > 1 && (
          <button onClick={() => removeSlide(tab)} style={{ width:"100%",padding:"8px 0",borderRadius:8,border:"1.5px solid rgba(194,65,29,.3)",background:"transparent",color:"rgba(194,65,29,.7)",fontSize:11,fontWeight:700,cursor:"pointer" }}>
            Remove this slide
          </button>
        )}
      </>
    );
  }

  return (
    <>
      <Tabs tabs={TABS} active={tab} onSelect={setTab} />
      <TextField label="CTA Button" value={h.cta} onChange={(v) => updateCms("hero.cta", v)} />
      <div style={{ marginBottom: 14 }}>
        <Label>Notifications (one per line)</Label>
        <textarea value={(h.notifications ?? []).join("\n")} onChange={(e) => updateCms("hero.notifications", e.target.value.split("\n"))} rows={5} style={{ ...inputBase, resize: "vertical", fontFamily: "monospace", fontSize: 10 }} />
      </div>
      <Divider />
      <Label>Trusted By</Label>
      <TextField label="Label" value={h.trustedBy?.label ?? ""} onChange={(v) => updateCms("hero.trustedBy.label", v)} />
      {logos.map((src, i) => (
        <div key={i} style={{ position: "relative" }}>
          <ImageField label={`Logo ${i + 1}`} value={src} onChange={(v) => { const next=[...logos]; next[i]=v; updateCms("hero.trustedBy.logos",next); }} />
          <DelBtn onClick={() => updateCms("hero.trustedBy.logos", logos.filter((_,j)=>j!==i))} />
        </div>
      ))}
      <AddBtn label="+ Add Logo" onClick={() => updateCms("hero.trustedBy.logos", [...logos, ""])} />
    </>
  );
}

function WhatWeDoForm({ cmsData, updateCms }) {
  const [tab, setTab] = useState(0);
  const w = cmsData.whatWeDo;
  const services = w.services ?? [];
  const TABS = ["General", ...services.map((_, i) => `Service ${i + 1}`)];

  const addService = () => {
    const next = [...services, { tag: `0${services.length + 1}`, label: "New Service", tagline: "", wide: "", top: "" }];
    updateCms("whatWeDo.services", next);
    setTab(next.length);
  };
  const removeService = (i) => {
    updateCms("whatWeDo.services", services.filter((_,j)=>j!==i));
    setTab(Math.max(1, i));
  };

  if (tab === 0) {
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <TextField label="Eyebrow" value={w.eyebrow} onChange={(v) => updateCms("whatWeDo.eyebrow", v)} />
        <TextArea label="Headline" value={w.headline} onChange={(v) => updateCms("whatWeDo.headline", v)} rows={2} />
        <TextArea label="Body" value={w.body} onChange={(v) => updateCms("whatWeDo.body", v)} rows={3} />
        <TextField label="CTA" value={w.cta} onChange={(v) => updateCms("whatWeDo.cta", v)} />
        <Divider />
        <AddBtn label="+ Add Service" onClick={addService} />
      </>
    );
  }

  const idx = tab - 1;
  const s = services[idx];
  const base = `whatWeDo.services.${idx}`;
  return (
    <>
      <Tabs tabs={TABS} active={tab} onSelect={setTab} />
      <TextField label="Label" value={s.label} onChange={(v) => updateCms(`${base}.label`, v)} />
      <TextArea label="Tagline" value={s.tagline} onChange={(v) => updateCms(`${base}.tagline`, v)} rows={2} />
      <ImageField label="Wide Image" value={s.wide} onChange={(v) => updateCms(`${base}.wide`, v)} />
      <ImageField label="Top Image" value={s.top} onChange={(v) => updateCms(`${base}.top`, v)} />
      <Divider />
      <AddBtn label="+ Add Service" onClick={addService} />
      {services.length > 1 && (
        <button onClick={() => removeService(idx)} style={{ width:"100%",padding:"8px 0",borderRadius:8,border:"1.5px solid rgba(194,65,29,.3)",background:"transparent",color:"rgba(194,65,29,.7)",fontSize:11,fontWeight:700,cursor:"pointer" }}>
          Remove this service
        </button>
      )}
    </>
  );
}

function ServicesInMotionForm({ cmsData, updateCms }) {
  const [tab, setTab] = useState(0);
  const s = cmsData.servicesInMotion;
  const cards = s.cards ?? [];
  const TABS = ["General", ...cards.map((_, i) => `Card ${i + 1}`)];

  const addCard = () => {
    const newCard = {
      id: `c${Date.now()}`,
      title: "New Card",
      sub: "Card subtitle.",
      request: "",
      wide: "",
      top: "",
    };
    const next = [...cards, newCard];
    updateCms("servicesInMotion.cards", next);
    setTab(next.length); // jump to new card tab
  };

  const removeCard = (idx) => {
    const next = cards.filter((_, i) => i !== idx);
    updateCms("servicesInMotion.cards", next);
    setTab(Math.max(1, idx)); // stay near same position
  };

  if (tab === 0) {
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <TextField label="Eyebrow" value={s.eyebrow} onChange={(v) => updateCms("servicesInMotion.eyebrow", v)} />
        <TextField label="Title" value={s.title} onChange={(v) => updateCms("servicesInMotion.title", v)} />
        <TextField label="Title Accent Word" value={s.titleAccent ?? ""} onChange={(v) => updateCms("servicesInMotion.titleAccent", v)} />
        <TextField label="CTA Button" value={s.cta} onChange={(v) => updateCms("servicesInMotion.cta", v)} />
        <Divider />
        <button
          onClick={addCard}
          style={{
            width: "100%", padding: "9px 0", borderRadius: 8, border: "1.5px dashed rgba(11,69,123,.3)",
            background: "transparent", color: "rgba(11,69,123,.6)", fontSize: 11,
            fontWeight: 700, cursor: "pointer",
          }}
        >
          + Add Card
        </button>
      </>
    );
  }

  const cIdx = tab - 1;
  const card = cards[cIdx] ?? {};
  const base = `servicesInMotion.cards.${cIdx}`;
  return (
    <>
      <Tabs tabs={TABS} active={tab} onSelect={setTab} />
      <TextField label="Title" value={card.title} onChange={(v) => updateCms(`${base}.title`, v)} />
      <TextArea label="Subtitle" value={card.sub} onChange={(v) => updateCms(`${base}.sub`, v)} rows={2} />
      <TextArea label="Speech-bubble text (stage 1)" value={card.request ?? ""} onChange={(v) => updateCms(`${base}.request`, v)} rows={2} />
      <ImageField label="Wide Image (stage 1 background)" value={card.wide ?? ""} onChange={(v) => updateCms(`${base}.wide`, v)} />
      <ImageField label="Top Image (stage 3 showcase)" value={card.top ?? ""} onChange={(v) => updateCms(`${base}.top`, v)} />
      <Divider />
      <button
        onClick={() => removeCard(cIdx)}
        style={{
          width: "100%", padding: "9px 0", borderRadius: 8, border: "1.5px solid rgba(194,65,29,.3)",
          background: "transparent", color: "rgba(194,65,29,.7)", fontSize: 11,
          fontWeight: 700, cursor: "pointer",
        }}
      >
        Remove this card
      </button>
    </>
  );
}

const ICON_KEYS = ["alertCircle","search","eyeOff","tool","zap","sparkles","trendUp","target","fileText","clock","database","barChart","checkCircle","layers","users"];

function IconItemList({ label, items, cmsPath, updateCms }) {
  const safe = (items ?? []).map(it => typeof it === "string" ? { icon: "alertCircle", text: it } : it);
  const upd = (next) => updateCms(cmsPath, next);
  return (
    <div style={{ marginBottom: 18 }}>
      <Label>{label}</Label>
      {safe.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center" }}>
          <select
            value={item.icon ?? "alertCircle"}
            onChange={(e) => { const n=[...safe]; n[i]={...item,icon:e.target.value}; upd(n); }}
            style={{ ...inputBase, width: 118, flexShrink: 0, fontFamily: "monospace", fontSize: 9, padding: "9px 5px" }}
          >
            {ICON_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <input
            type="text"
            value={item.text ?? ""}
            onChange={(e) => { const n=[...safe]; n[i]={...item,text:e.target.value}; upd(n); }}
            style={{ ...inputBase, flex: 1 }}
          />
          <DelBtn onClick={() => upd(safe.filter((_,j)=>j!==i))} />
        </div>
      ))}
      <AddBtn label="+ Add Item" onClick={() => upd([...safe, { icon: "alertCircle", text: "" }])} />
    </div>
  );
}

function ExperienceForm({ cmsData, updateCms }) {
  const [tab, setTab] = useState(0);
  const e = cmsData.experience;
  const TABS = ["General", "Lists"];

  if (tab === 0) {
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <TextField label="Eyebrow" value={e.eyebrow} onChange={(v) => updateCms("experience.eyebrow", v)} />
        <Divider />
        <Label>Product Name</Label>
        <TextField label="Prefix (coloured)" value={e.productPrefix} onChange={(v) => updateCms("experience.productPrefix", v)} />
        <div style={{ marginBottom: 14 }}>
          <Label>Typed Words (one per line)</Label>
          <textarea
            value={(e.productTyped ?? []).join("\n")}
            onChange={(ev) => updateCms("experience.productTyped", ev.target.value.split("\n"))}
            rows={3}
            style={{ ...inputBase, resize: "vertical", fontFamily: "monospace", fontSize: 10 }}
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <Label>Sub-heading (one per line)</Label>
          <textarea
            value={(e.productTypedsub ?? []).join("\n")}
            onChange={(ev) => updateCms("experience.productTypedsub", ev.target.value.split("\n"))}
            rows={3}
            style={{ ...inputBase, resize: "vertical", fontFamily: "monospace", fontSize: 10 }}
          />
        </div>
        <TextField label="Dashboard URL (shown in UI)" value={e.dashboardUrl ?? ""} onChange={(v) => updateCms("experience.dashboardUrl", v)} />
        <Divider />
        <TextField label="CTA Button" value={e.cta} onChange={(v) => updateCms("experience.cta", v)} />
        <TextField label="Badge Text" value={e.badge} onChange={(v) => updateCms("experience.badge", v)} />
        <TextArea label="Outcome" value={e.outcome} onChange={(v) => updateCms("experience.outcome", v)} rows={2} />
      </>
    );
  }

  return (
    <>
      <Tabs tabs={TABS} active={tab} onSelect={setTab} />
      <IconItemList label="The Need" items={e.needs} cmsPath="experience.needs" updateCms={updateCms} />
      <IconItemList label="Our Approach" items={e.approach} cmsPath="experience.approach" updateCms={updateCms} />
      <IconItemList label="The Solution" items={e.solutions} cmsPath="experience.solutions" updateCms={updateCms} />
    </>
  );
}

function BeyondForm({ cmsData, updateCms }) {
  const b = cmsData.beyond;
  return (
    <>
      <TextField label="Eyebrow" value={b.eyebrow} onChange={(v) => updateCms("beyond.eyebrow", v)} />
      <TextArea label="Title (\\n = line break)" value={b.title} onChange={(v) => updateCms("beyond.title", v)} rows={3} />
      <TextArea label="Body" value={b.body} onChange={(v) => updateCms("beyond.body", v)} rows={3} />
      <TextField label="Emphasis Line" value={b.emphasis} onChange={(v) => updateCms("beyond.emphasis", v)} />
      <TextField label="Primary CTA" value={b.primaryCta} onChange={(v) => updateCms("beyond.primaryCta", v)} />
    </>
  );
}

function ContactForm({ cmsData, updateCms }) {
  const [tab, setTab] = useState(0);
  const c = cmsData.contact;
  const principles = c.principles ?? [];
  const TABS = ["General", "Fields", "Principles"];

  if (tab === 0) {
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <TextField label="Eyebrow" value={c.eyebrow ?? ""} onChange={(v) => updateCms("contact.eyebrow", v)} />
        <TextArea label="Title (\\n = line break)" value={c.title} onChange={(v) => updateCms("contact.title", v)} rows={2} />
        <TextArea label="Body" value={c.body} onChange={(v) => updateCms("contact.body", v)} rows={3} />
        <TextArea label="Sub-body" value={c.subbody ?? ""} onChange={(v) => updateCms("contact.subbody", v)} rows={2} />
        <TextField label="Submit Button" value={c.submit} onChange={(v) => updateCms("contact.submit", v)} />
        <TextField label="Contact email" value={c.email ?? ""} onChange={(v) => updateCms("contact.email", v)} />
        <Divider />
        <Label>Google Form (prefill POST)</Label>
        <TextArea label="Form URL" value={c.gform?.url ?? ""} onChange={(v) => updateCms("contact.gform.url", v)} rows={2} placeholder="https://docs.google.com/forms/d/e/…/formResponse" />
        <TextField label="Entry — Name" value={c.gform?.entryName ?? ""} onChange={(v) => updateCms("contact.gform.entryName", v)} placeholder="entry.000000001" />
        <TextField label="Entry — Email" value={c.gform?.entryEmail ?? ""} onChange={(v) => updateCms("contact.gform.entryEmail", v)} placeholder="entry.000000002" />
        <TextField label="Entry — Message" value={c.gform?.entryMsg ?? ""} onChange={(v) => updateCms("contact.gform.entryMsg", v)} placeholder="entry.000000003" />
      </>
    );
  }

  if (tab === 1) {
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <TextField label="Name placeholder" value={c.fields?.name ?? ""} onChange={(v) => updateCms("contact.fields.name", v)} />
        <TextField label="Email placeholder" value={c.fields?.email ?? ""} onChange={(v) => updateCms("contact.fields.email", v)} />
        <TextField label="Message placeholder" value={c.fields?.message ?? ""} onChange={(v) => updateCms("contact.fields.message", v)} />
      </>
    );
  }

  return (
    <>
      <Tabs tabs={TABS} active={tab} onSelect={setTab} />
      <Label>Principles (number · title · description)</Label>
      {principles.map(([num, title, sub], i) => (
        <div key={i} style={{ marginBottom: 14, padding: "10px 12px", background: "rgba(11,69,123,.05)", borderRadius: 8, position: "relative" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
            <input type="text" value={num} onChange={(e) => { const n=principles.map((p,j)=>j===i?[e.target.value,p[1],p[2]]:p); updateCms("contact.principles",n); }} placeholder="#" style={{ ...inputBase, flex:1 }} />
            <input type="text" value={title} onChange={(e) => { const n=principles.map((p,j)=>j===i?[p[0],e.target.value,p[2]]:p); updateCms("contact.principles",n); }} placeholder="Title" style={{ ...inputBase, flex:3 }} />
            <DelBtn onClick={() => updateCms("contact.principles", principles.filter((_,j)=>j!==i))} />
          </div>
          <textarea value={sub} onChange={(e) => { const n=principles.map((p,j)=>j===i?[p[0],p[1],e.target.value]:p); updateCms("contact.principles",n); }} rows={2} placeholder="Description" style={{ ...inputBase, resize:"vertical" }} />
        </div>
      ))}
      <AddBtn label="+ Add Principle" onClick={() => updateCms("contact.principles", [...principles, [`0${principles.length+1}`, "New Principle", "Description here."]])} />
    </>
  );
}

function FooterForm({ cmsData, updateCms }) {
  const [tab, setTab] = useState(0);
  const f = cmsData.footer;
  const cols = f.columns ?? [];
  const social = f.social ?? [];
  const TABS = ["General", ...cols.map((c) => c.title || "Column")];

  const addColumn = () => {
    const next = [...cols, { title: "New Column", links: [] }];
    updateCms("footer.columns", next);
    setTab(next.length);
  };
  const removeColumn = (i) => {
    updateCms("footer.columns", cols.filter((_,j)=>j!==i));
    setTab(Math.max(1, i));
  };

  if (tab === 0) {
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <TextArea label="Description" value={f.description} onChange={(v) => updateCms("footer.description", v)} rows={3} />
        <TextField label="Copyright" value={f.copyright} onChange={(v) => updateCms("footer.copyright", v)} />
        <Divider />
        <Label>Social Links</Label>
        {social.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center" }}>
            <input type="text" value={s.label} onChange={(e) => { const n=[...social]; n[i]={...s,label:e.target.value}; updateCms("footer.social",n); }} placeholder="Label" style={{ ...inputBase, flex:2 }} />
            <input type="text" value={s.href} onChange={(e) => { const n=[...social]; n[i]={...s,href:e.target.value}; updateCms("footer.social",n); }} placeholder="URL" style={{ ...inputBase, flex:3, fontFamily:"monospace", fontSize:10 }} />
            <DelBtn onClick={() => updateCms("footer.social", social.filter((_,j)=>j!==i))} />
          </div>
        ))}
        <AddBtn label="+ Add Social" onClick={() => updateCms("footer.social", [...social, { label: "Platform", href: "#", iconClass: "fa fa-link" }])} />
        <Divider />
        <AddBtn label="+ Add Column" onClick={addColumn} />
      </>
    );
  }

  const cIdx = tab - 1;
  const col = cols[cIdx] ?? { title: "", links: [] };
  const base = `footer.columns.${cIdx}`;
  const links = col.links ?? [];
  return (
    <>
      <Tabs tabs={TABS} active={tab} onSelect={setTab} />
      <TextField label="Column Title" value={col.title} onChange={(v) => updateCms(`${base}.title`, v)} />
      <Divider />
      <Label>Links (label + URL)</Label>
      {links.map(([label, href], i) => (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center" }}>
          <input type="text" value={label} onChange={(e) => { const next=links.map((lk,j)=>j===i?[e.target.value,lk[1]]:lk); updateCms(`${base}.links`,next); }} placeholder="Label" style={{ ...inputBase, flex:2 }} />
          <input type="text" value={href} onChange={(e) => { const next=links.map((lk,j)=>j===i?[lk[0],e.target.value]:lk); updateCms(`${base}.links`,next); }} placeholder="URL" style={{ ...inputBase, flex:3, fontFamily:"monospace", fontSize:10 }} />
          <DelBtn onClick={() => updateCms(`${base}.links`, links.filter((_,j)=>j!==i))} />
        </div>
      ))}
      <AddBtn label="+ Add Link" onClick={() => updateCms(`${base}.links`, [...links, ["New Link", "#"]])} />
      <Divider />
      <AddBtn label="+ Add Column" onClick={addColumn} />
      {cols.length > 1 && (
        <button onClick={() => removeColumn(cIdx)} style={{ width:"100%",padding:"8px 0",borderRadius:8,border:"1.5px solid rgba(194,65,29,.3)",background:"transparent",color:"rgba(194,65,29,.7)",fontSize:11,fontWeight:700,cursor:"pointer" }}>
          Remove this column
        </button>
      )}
    </>
  );
}

const FORM_MAP = {
  nav: NavForm,
  hero: HeroForm,
  whatWeDo: WhatWeDoForm,
  servicesInMotion: ServicesInMotionForm,
  experience: ExperienceForm,
  beyond: BeyondForm,
  contact: ContactForm,
  footer: FooterForm,
};

// ── Main panel ────────────────────────────────────────────────────────────────

export default function CmsPanel() {
  const { cmsData, updateCms, activePanel, closePanel } = useCms();
  const Form = activePanel ? FORM_MAP[activePanel] : null;

  return (
    <AnimatePresence>
      {activePanel && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePanel}
            style={{ position: "fixed", inset: 0, background: "rgba(4,10,22,1)", zIndex: 9990 }}
          />
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, width: 380,
              background: "#f4f8fc",
              borderLeft: "1px solid rgba(11,69,123,.13)",
              zIndex: 9991, display: "flex", flexDirection: "column",
              boxShadow: "-20px 0 60px rgba(0,0,0,.14)",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "18px 20px", borderBottom: "1px solid rgba(11,69,123,.1)",
              background: "#fff", display: "flex", alignItems: "center",
              justifyContent: "space-between", flexShrink: 0,
            }}>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(11,69,123,.4)", marginBottom: 3 }}>
                  Editing Section
                </p>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0c1a2e", margin: 0 }}>
                  {SECTION_LABELS[activePanel] ?? activePanel}
                </h3>
              </div>
              <button
                onClick={closePanel}
                style={{
                  width: 32, height: 32, border: "1px solid rgba(11,69,123,.18)",
                  borderRadius: 8, background: "transparent",
                  color: "rgba(11,69,123,.55)", fontSize: 18,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {/* Scrollable form body */}
            <div style={{ flex: 1, overflowY: "auto", padding: 20, scrollbarWidth: "thin" }}>
              {Form && <Form cmsData={cmsData} updateCms={updateCms} />}
            </div>

            {/* Footer note */}
            <div style={{
              padding: "12px 20px", borderTop: "1px solid rgba(11,69,123,.1)",
              background: "#fff", flexShrink: 0,
            }}>
              <p style={{ fontSize: 9, color: "rgba(11,69,123,.35)", textAlign: "center", margin: 0 }}>
                Changes save automatically to local storage
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
