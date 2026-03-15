import { useState, useEffect, useRef } from "react";

const PhoneIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" fill="none" stroke="#2B7A5F" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
);

const FloatingCard = ({ top, right, bottom, left, delay, icon, iconBg, title, sub, className }) => (
  <div className={className} style={{
    position: "absolute", top, right, bottom, left,
    background: "#fff", border: "1px solid #E8E5DF", borderRadius: 10,
    padding: "10px 14px", fontSize: 12,
    boxShadow: "0 4px 16px rgba(26,35,50,0.06)",
    display: "flex", alignItems: "center", gap: 10,
    animation: `floatCard 5s ${delay} ease-in-out infinite`,
    whiteSpace: "nowrap", zIndex: 5,
  }}>
    <div style={{ width: 30, height: 30, borderRadius: 8, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{icon}</div>
    <div style={{ lineHeight: 1.3 }}>
      <strong style={{ display: "block", color: "#1A2332", fontWeight: 600, fontSize: 12 }}>{title}</strong>
      <span style={{ color: "#8E96A3", fontSize: 11 }}>{sub}</span>
    </div>
  </div>
);

const VoiceOrb = () => (
  <div style={{ position: "relative", width: "100%", maxWidth: 280, aspectRatio: "1/1", margin: "0 auto" }}>
    {[70, 45].map((inset, i) => (
      <div key={i} style={{ position: "absolute", inset: -inset, borderRadius: "50%", border: `1px solid rgba(43,122,95,${0.06 + i * 0.06})`, animation: `orbRing 4s ${i * 0.5}s ease-in-out infinite` }}/>
    ))}
    <div style={{
      position: "absolute", inset: 0, borderRadius: "50%",
      background: "radial-gradient(circle at 40% 35%, #34D399, #2B7A5F 60%, #1A5C47)",
      boxShadow: "0 0 60px rgba(52,211,153,0.2), 0 0 120px rgba(43,122,95,0.1)",
      animation: "orbFloat 6s ease-in-out infinite",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center", height: 50 }}>
        {[0, 0.1, 0.2, 0.3, 0.4, 0.3, 0.2].map((d, i) => (
          <div key={i} style={{ width: 3.5, borderRadius: 4, background: "rgba(255,255,255,0.85)", animation: `barWave 1.2s ${d}s ease-in-out infinite` }}/>
        ))}
      </div>
    </div>
    <div style={{
      position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
      background: "#fff", border: "1px solid #E8E5DF", borderRadius: 50,
      padding: "7px 16px", fontSize: 12, fontWeight: 500, color: "#5A6677",
      whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(26,35,50,0.06)",
      display: "flex", alignItems: "center", gap: 7,
    }}>
      <span style={{ width: 7, height: 7, background: "#34D399", borderRadius: "50%", animation: "dotPulse 1.5s ease-in-out infinite" }}/>
      Listening…
    </div>
    <FloatingCard className="fc-hide" top={10} right={-45} delay="0s" icon="📅" iconBg="#E8F5EE" title="Appt. Booked" sub="Dr. Patel — 2:30 PM"/>
    <FloatingCard className="fc-hide" bottom={40} left={-55} delay="1.5s" icon="🔔" iconBg="#FFF0ED" title="Urgent Triage" sub="Routed to nurse"/>
    <FloatingCard className="fc-hide" top={50} left={-35} delay="0.8s" icon="💊" iconBg="#FFF8E7" title="Rx Refill" sub="Pharmacy queue"/>
  </div>
);

const transcriptData = [
  { role: "ai", text: "Good morning! You've reached Family Medicine Associates. I can help with scheduling, refills, or connect you with a nurse." },
  { role: "caller", text: "Hi, I need to see Dr. Patel. I've been having bad headaches and some blurry vision." },
  { role: "ai", text: "I'm sorry to hear that. Are you experiencing any sudden severe headache, weakness on one side, or difficulty speaking?" },
  { role: "caller", text: "No, nothing like that. It's a constant dull headache with occasional blurriness." },
  { role: "ai", text: "Thank you. I have Dr. Patel available Tuesday at 2:30 PM or Thursday at 10:15 AM. Which works better?" },
];

const TranscriptMessage = ({ role, text, delay }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  if (!visible) return null;
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", animation: "msgSlide 0.5s ease both" }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, background: role === "ai" ? "#2B7A5F" : "rgba(255,255,255,0.12)" }}>{role === "ai" ? "🤖" : "👤"}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3, color: role === "ai" ? "#34D399" : "rgba(255,255,255,0.4)" }}>{role === "ai" ? "VocaHealth" : "Caller"}</div>
        <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, background: "rgba(255,255,255,0.05)", borderRadius: 9, padding: "9px 12px" }}>{text}</div>
      </div>
    </div>
  );
};

const MetricBar = ({ label, value, suffix, pct, color = "#34D399" }) => (
  <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 20px" }}>
    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{label}</div>
    <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: color === "#34D399" ? color : "#fff" }}>
      {value}{suffix && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#34D399", fontWeight: 600, marginLeft: 6 }}>{suffix}</span>}
    </div>
    {pct !== undefined && <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 3, marginTop: 10, overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 3, background: color, width: `${pct}%`, transition: "width 1.5s ease" }}/></div>}
  </div>
);

const FeatureCard = ({ icon, iconBg, title, desc }) => {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: "#fff", border: `1px solid ${h ? "#2B7A5F" : "#E8E5DF"}`, borderRadius: 14,
      padding: "28px 24px", transition: "all 0.3s ease", position: "relative", overflow: "hidden",
      transform: h ? "translateY(-3px)" : "none",
      boxShadow: h ? "0 12px 40px rgba(26,35,50,0.08)" : "0 1px 3px rgba(26,35,50,0.04)",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#2B7A5F", transform: h ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.3s ease", transformOrigin: "left" }}/>
      <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 16, background: iconBg }}>{icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, letterSpacing: -0.2 }}>{title}</h3>
      <p style={{ fontSize: 13, color: "#5A6677", lineHeight: 1.55, margin: 0 }}>{desc}</p>
    </div>
  );
};

const PriceCard = ({ name, desc, amount, period, features, featured, btnLabel }) => {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: "#fff", border: `1px solid ${featured ? "#2B7A5F" : "#E8E5DF"}`, borderRadius: 14,
      padding: "32px 24px", position: "relative", transition: "all 0.3s ease",
      transform: h ? "translateY(-3px)" : "none",
      boxShadow: featured ? "0 12px 40px rgba(26,35,50,0.08), 0 0 0 1px #2B7A5F" : h ? "0 12px 40px rgba(26,35,50,0.08)" : "0 1px 3px rgba(26,35,50,0.04)",
    }}>
      {featured && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "#2B7A5F", color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "4px 12px", borderRadius: 50, whiteSpace: "nowrap" }}>Most Popular</div>}
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 5 }}>{name}</div>
      <div style={{ fontSize: 12, color: "#8E96A3", marginBottom: 18, lineHeight: 1.45 }}>{desc}</div>
      <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 40, letterSpacing: -1.5, marginBottom: 3 }}>
        {typeof amount === "number" ? <><sup style={{ fontSize: 18, verticalAlign: "top" }}>$</sup>{amount}</> : amount}
      </div>
      <div style={{ fontSize: 12, color: "#8E96A3", marginBottom: 20 }}>{period}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
        {features.map((f, i) => (
          <li key={i} style={{ fontSize: 13, color: "#5A6677", padding: "7px 0", borderBottom: "1px solid #F0EDE8", display: "flex", alignItems: "center", gap: 8 }}><CheckIcon/> {f}</li>
        ))}
      </ul>
      <button style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "10px 20px", borderRadius: 50, fontFamily: "'DM Sans',sans-serif",
        fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.25s ease",
        border: featured ? "none" : "1.5px solid #E8E5DF",
        background: featured ? "#2B7A5F" : "transparent",
        color: featured ? "#fff" : "#1A2332",
      }}>{btnLabel}</button>
    </div>
  );
};

const Anim = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease` }}>{children}</div>;
};

const SectionHead = ({ tag, title, desc }) => (
  <Anim style={{ textAlign: "center", padding: "60px 24px 36px", maxWidth: 580, margin: "0 auto" }}>
    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#2B7A5F", marginBottom: 12 }}>{tag}</div>
    <h2 className="sec-title" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 34, letterSpacing: -0.8, lineHeight: 1.15, marginBottom: 12 }}>{title}</h2>
    <p style={{ fontSize: 15, color: "#5A6677", lineHeight: 1.6 }}>{desc}</p>
  </Anim>
);

export default function VocaHealth() {
  const [menu, setMenu] = useState(false);
  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    const onScroll = () => {
      for (const id of ["features", "demo", "pricing"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) setActiveNav(id);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const feats = [
    { icon: "📅", bg: "#E8F5EE", title: "Smart Scheduling", desc: "Books, reschedules, and cancels appointments across providers. Syncs with your EHR calendar in real time." },
    { icon: "🩺", bg: "#FFF0ED", title: "Symptom Triage", desc: "Asks clinical questions and routes urgent cases to on-call staff using configurable protocols." },
    { icon: "💊", bg: "#FFF8E7", title: "Rx Refill Routing", desc: "Captures prescription refill requests, verifies identity, and routes to your pharmacy workflow." },
    { icon: "🌐", bg: "#E8F5EE", title: "Multilingual", desc: "Speaks 30+ languages natively. Auto-detects the caller's language and switches mid-conversation." },
    { icon: "📋", bg: "#FFF0ED", title: "Patient Intake", desc: "Collects insurance, demographics, and pre-visit questionnaires over the phone before appointments." },
    { icon: "🔒", bg: "#FFF8E7", title: "HIPAA Compliant", desc: "End-to-end encryption, BAA included, SOC 2 Type II certified. Built for protected health information." },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#F6F4F0", color: "#1A2332", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        @keyframes orbFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-10px) scale(1.02)}}
        @keyframes orbRing{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.05);opacity:0.5}}
        @keyframes barWave{0%,100%{height:10px}50%{height:40px}}
        @keyframes dotPulse{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes floatCard{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes msgSlide{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
        @keyframes logoPulse{0%,100%{opacity:0.6;transform:scale(0.85)}50%{opacity:1;transform:scale(1.1)}}
        @media(max-width:768px){
          .hero-g{grid-template-columns:1fr!important;text-align:center!important}
          .hero-vis{order:-1!important}
          .hero-acts{justify-content:center!important}
          .feat-g,.steps-g,.price-g{grid-template-columns:1fr!important}
          .demo-g{grid-template-columns:1fr!important}
          .stats-g{grid-template-columns:repeat(2,1fr)!important}
          .fc-hide{display:none!important}
          .nav-desk{display:none!important}
          .sec-title{font-size:28px!important}
          .hero-t{font-size:32px!important}
          .cta-t{font-size:26px!important}
          .cta-inner{padding:40px 20px!important}
        }
        @media(min-width:769px){.nav-mob{display:none!important}.mob-menu{display:none!important}}
      `}</style>

      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", position: "sticky", top: 0, zIndex: 100, background: "rgba(246,244,240,0.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid #F0EDE8" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", color: "#1A2332" }}>
          <div style={{ width: 32, height: 32, background: "#2B7A5F", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#34D399", animation: "logoPulse 2.5s ease-in-out infinite" }}/>
          </div>
          <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, letterSpacing: -0.3 }}>Voca<span style={{ color: "#2B7A5F" }}>Health</span></span>
        </a>
        <div className="nav-desk" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {["Features", "Demo", "Pricing"].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} style={{ textDecoration: "none", color: activeNav === s.toLowerCase() ? "#1A2332" : "#5A6677", fontSize: 13, fontWeight: 500 }}>{s}</a>
          ))}
          <a href="#" style={{ textDecoration: "none", color: "#2B7A5F", fontSize: 13, fontWeight: 600, padding: "8px 12px" }}>Log In</a>
          <a href="#" style={{ textDecoration: "none", background: "#2B7A5F", color: "#fff", fontSize: 13, fontWeight: 600, padding: "9px 20px", borderRadius: 50 }}>Get Started</a>
        </div>
        <button className="nav-mob" onClick={() => setMenu(!menu)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1A2332" }}>
          {menu ? <CloseIcon/> : <MenuIcon/>}
        </button>
      </nav>

      {menu && <div className="mob-menu" style={{ position: "fixed", top: 65, left: 0, right: 0, background: "#fff", zIndex: 99, padding: 20, display: "flex", flexDirection: "column", gap: 14, borderBottom: "1px solid #E8E5DF", boxShadow: "0 12px 40px rgba(26,35,50,0.08)" }}>
        {["Features", "Demo", "Pricing"].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setMenu(false)} style={{ textDecoration: "none", color: "#1A2332", fontSize: 15, fontWeight: 500, padding: "6px 0" }}>{s}</a>
        ))}
        <a href="#" style={{ textDecoration: "none", background: "#2B7A5F", color: "#fff", fontSize: 13, fontWeight: 600, padding: "11px 20px", borderRadius: 50, textAlign: "center", marginTop: 6 }}>Get Started</a>
      </div>}

      {/* HERO */}
      <section className="hero-g" style={{ padding: "60px 24px 48px", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <Anim>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px 5px 7px", background: "#E8F5EE", borderRadius: 50, fontSize: 11.5, fontWeight: 600, color: "#2B7A5F", marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, background: "#34D399", borderRadius: "50%", animation: "dotPulse 1.5s ease-in-out infinite" }}/>
              HIPAA Compliant · SOC 2 Certified
            </div>
          </Anim>
          <Anim delay={0.1}>
            <h1 className="hero-t" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 48, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 18 }}>
              Your clinic's<br/>front desk,<br/><em style={{ fontStyle: "italic", color: "#2B7A5F" }}>reimagined.</em>
            </h1>
          </Anim>
          <Anim delay={0.2}>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#5A6677", maxWidth: 440, marginBottom: 30 }}>
              An AI voice receptionist that answers every call, books appointments, handles intake, and triages patients — so your staff can focus on care.
            </p>
          </Anim>
          <Anim delay={0.3}>
            <div className="hero-acts" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 50, fontSize: 13, fontWeight: 600, background: "#2B7A5F", color: "#fff", textDecoration: "none" }}><PhoneIcon/> Start Free Trial</a>
              <a href="#demo" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 50, fontSize: 13, fontWeight: 600, background: "transparent", color: "#1A2332", textDecoration: "none", border: "1.5px solid #E8E5DF" }}>See It In Action</a>
            </div>
          </Anim>
        </div>
        <div className="hero-vis" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 0" }}>
          <Anim delay={0.3}><VoiceOrb/></Anim>
        </div>
      </section>

      {/* STATS */}
      <Anim style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 48px" }}>
        <div className="stats-g" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#E8E5DF", borderRadius: 12, overflow: "hidden" }}>
          {[{ v: "97%", l: "Calls Resolved" }, { v: "<2s", l: "Avg. Answer Time" }, { v: "4,200+", l: "Clinics Served" }, { v: "22hrs", l: "Staff Time Saved / Wk" }].map((s, i) => (
            <div key={i} style={{ background: "#fff", padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 30, letterSpacing: -0.8 }}>{s.v}</div>
              <div style={{ fontSize: 12, color: "#8E96A3", marginTop: 3, fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </Anim>

      {/* FEATURES */}
      <div id="features">
        <SectionHead tag="Capabilities" title="Everything your front desk handles — on autopilot" desc="Purpose-built for medical clinics with deep healthcare workflow integrations."/>
        <div className="feat-g" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {feats.map((f, i) => <Anim key={i} delay={i * 0.07}><FeatureCard icon={f.icon} iconBg={f.bg} title={f.title} desc={f.desc}/></Anim>)}
        </div>
      </div>

      {/* DEMO */}
      <div id="demo">
        <SectionHead tag="Live Demo" title="Hear a real conversation" desc="How VocaHealth handles an inbound call at a family medicine practice."/>
        <Anim style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px" }}>
          <div className="demo-g" style={{ background: "#1A2332", borderRadius: 18, padding: "36px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle,rgba(52,211,153,0.08),transparent)" }}/>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: "#fff", marginBottom: 10, letterSpacing: -0.4 }}>Inbound Call Transcript</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.5, marginBottom: 24 }}>Family Medicine Associates — March 15, 2026</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {transcriptData.map((m, i) => <TranscriptMessage key={i} role={m.role} text={m.text} delay={i * 500}/>)}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative", zIndex: 1 }}>
              <MetricBar label="Sentiment" value="Positive" suffix="↑ 92%" pct={92}/>
              <MetricBar label="Call Duration" value="1:42" pct={35} color="#fff"/>
              <MetricBar label="Triage Level" value="Routine" pct={25} color="#34D399"/>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 20px" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Actions Taken</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.9 }}>✓ Symptom screening<br/>✓ Urgency ruled out<br/>✓ Appointment offered</div>
              </div>
            </div>
          </div>
        </Anim>
      </div>

      {/* STEPS */}
      <SectionHead tag="Setup" title="Live in 48 hours, not 48 days" desc="No hardware. No phone system changes. Plug into your existing lines."/>
      <div className="steps-g" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {[
          { n: "01", t: "Connect Your Lines", d: "Forward your clinic's number or connect via SIP trunk. Works with any phone provider." },
          { n: "02", t: "Configure Workflows", d: "Set scheduling rules, triage protocols, provider availability, and greeting scripts." },
          { n: "03", t: "Go Live", d: "VocaHealth answers calls 24/7. Monitor transcripts, analytics, and satisfaction in real time." },
        ].map((s, i) => (
          <Anim key={i} delay={i * 0.1} style={{ textAlign: "center", padding: "32px 24px" }}>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 56, color: "#E8E5DF", lineHeight: 1, marginBottom: 14 }}>{s.n}</div>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.t}</h4>
            <p style={{ fontSize: 13, color: "#5A6677", lineHeight: 1.55 }}>{s.d}</p>
          </Anim>
        ))}
      </div>

      {/* PRICING */}
      <div id="pricing">
        <SectionHead tag="Pricing" title="Simple, transparent pricing" desc="No per-minute billing surprises. Choose the plan that fits your practice."/>
        <div className="price-g" style={{ maxWidth: 1020, margin: "0 auto", padding: "0 24px 60px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, alignItems: "start" }}>
          <Anim><PriceCard name="Solo Practice" desc="For individual providers" amount={299} period="per month, per location" features={["Up to 500 calls / month", "1 provider calendar", "Basic triage protocols", "Email support"]} btnLabel="Start Trial"/></Anim>
          <Anim delay={0.1}><PriceCard name="Group Practice" desc="For multi-provider clinics" amount={699} period="per month, per location" features={["Up to 2,000 calls / month", "Unlimited calendars", "Advanced triage + Rx", "EHR integration", "Priority support"]} featured btnLabel="Start Trial"/></Anim>
          <Anim delay={0.2}><PriceCard name="Enterprise" desc="For health systems" amount="Custom" period="tailored to your needs" features={["Unlimited calls", "Custom integrations", "Dedicated account manager", "On-prem deployment", "SLA guarantee"]} btnLabel="Contact Sales"/></Anim>
        </div>
      </div>

      {/* CTA */}
      <Anim style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px" }}>
        <div className="cta-inner" style={{ background: "#2B7A5F", borderRadius: 18, padding: "56px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top left,rgba(255,255,255,0.12),transparent 60%),radial-gradient(ellipse at bottom right,rgba(0,0,0,0.15),transparent 60%)" }}/>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 className="cta-t" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 36, color: "#fff", letterSpacing: -0.8, marginBottom: 12 }}>Stop losing patients to voicemail</h2>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 15, marginBottom: 28, maxWidth: 420, marginLeft: "auto", marginRight: "auto", lineHeight: 1.55 }}>Join 4,200+ clinics that never miss a call. Set up in under 48 hours.</p>
            <button style={{ background: "#fff", color: "#2B7A5F", fontWeight: 700, padding: "13px 28px", borderRadius: 50, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Start Your Free 14-Day Trial →</button>
          </div>
        </div>
      </Anim>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E8E5DF", padding: "32px 24px", maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 12, color: "#8E96A3" }}>© 2026 VocaHealth, Inc. All rights reserved.</p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "BAA", "Status", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "#8E96A3", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
