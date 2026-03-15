import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// --- SVG Icons ---
const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="8" y1="22" x2="16" y2="22" />
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

// --- Animated Waveform ---
const Waveform = ({ active }) => (
  <div className={`waveform ${active ? 'waveform--active' : ''}`}>
    {Array.from({ length: 12 }).map((_, i) => (
      <span key={i} className="waveform__bar" style={{ animationDelay: `${i * 0.08}s` }} />
    ))}
  </div>
);

// --- Floating Orbs Background ---
const FloatingOrbs = () => (
  <div className="orbs" aria-hidden="true">
    <div className="orb orb--1" />
    <div className="orb orb--2" />
    <div className="orb orb--3" />
    <div className="orb orb--4" />
  </div>
);

// --- Stat Counter ---
const StatCounter = ({ end, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = (end / duration) * 16;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div className="stat" ref={ref}>
      <span className="stat__number">{count.toLocaleString()}{suffix}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
};

// --- Feature Card ---
const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="feature-card" style={{ '--card-gradient': gradient }}>
    <div className="feature-card__icon">{icon}</div>
    <h3 className="feature-card__title">{title}</h3>
    <p className="feature-card__desc">{description}</p>
  </div>
);

// --- Step Card ---
const StepCard = ({ number, title, description }) => (
  <div className="step-card">
    <div className="step-card__number">{number}</div>
    <h3 className="step-card__title">{title}</h3>
    <p className="step-card__desc">{description}</p>
  </div>
);

// --- Testimonial Card ---
const TestimonialCard = ({ name, role, avatar, text, rating }) => (
  <div className="testimonial-card">
    <div className="testimonial-card__stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'star star--filled' : 'star'}><StarIcon filled={i < rating} /></span>
      ))}
    </div>
    <p className="testimonial-card__text">"{text}"</p>
    <div className="testimonial-card__author">
      <div className="testimonial-card__avatar" style={{ background: avatar }}>
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <div className="testimonial-card__name">{name}</div>
        <div className="testimonial-card__role">{role}</div>
      </div>
    </div>
  </div>
);

// --- Navbar ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#top" className="navbar__logo">
          <div className="navbar__logo-icon"><MicIcon /></div>
          <span>VocaHealth</span>
        </a>
        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it Works</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        </div>
        <div className="navbar__actions">
          <button className="btn btn--ghost">Sign in</button>
          <button className="btn btn--primary">Get Started</button>
        </div>
        <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

// --- Main App ---
export default function App() {
  const [micActive, setMicActive] = useState(false);

  const features = [
    {
      icon: <MicIcon />,
      title: 'Voice Analysis',
      description: 'Advanced AI listens to vocal patterns and detects subtle health markers with clinical accuracy.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <BrainIcon />,
      title: 'AI Diagnostics',
      description: 'Machine learning models trained on millions of data points surface personalized health insights.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <HeartIcon />,
      title: 'Wellness Tracking',
      description: 'Monitor cardiovascular, respiratory, and mental health trends over time from your voice.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: <ChartIcon />,
      title: 'Health Dashboard',
      description: 'Beautiful, clear dashboards give you an at-a-glance overview of your health journey.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      icon: <ShieldIcon />,
      title: 'Privacy First',
      description: 'End-to-end encryption and zero-knowledge architecture keep your health data yours alone.',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      icon: <HeartIcon />,
      title: 'Doctor Connect',
      description: 'Share reports directly with your care team and receive real-time feedback from physicians.',
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    },
  ];

  const steps = [
    { number: '01', title: 'Speak Freely', description: 'Open the app and speak for 30 seconds. No scripts, no pressure — just talk naturally.' },
    { number: '02', title: 'AI Analyzes', description: 'Our models extract 200+ biomarkers from pitch, rhythm, and resonance patterns in real time.' },
    { number: '03', title: 'Get Insights', description: 'Receive a comprehensive health report with actionable recommendations within seconds.' },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Cardiologist, Stanford Health',
      avatar: 'linear-gradient(135deg, #667eea, #764ba2)',
      text: 'VocaHealth flagged a potential arrhythmia in one of my patients days before traditional diagnostics. The voice biomarker analysis is genuinely remarkable.',
      rating: 5,
    },
    {
      name: 'Marcus Williams',
      role: 'Marathon Runner & Wellness Coach',
      avatar: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      text: "I use it every morning as part of my health routine. It's like having a doctor in my pocket. The respiratory insights have transformed my training.",
      rating: 5,
    },
    {
      name: 'Priya Nair',
      role: 'Patient, Chronic Fatigue Syndrome',
      avatar: 'linear-gradient(135deg, #f093fb, #f5576c)',
      text: 'Finally a tool that takes my symptoms seriously. VocaHealth detected stress biomarkers that correlated perfectly with my flare-ups. Life-changing.',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      period: 'forever',
      color: '#6b7280',
      features: ['3 voice scans/month', 'Basic health report', 'Trend tracking (30 days)', 'Mobile app access'],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Pro',
      price: '19',
      period: 'per month',
      color: '#00C9A7',
      features: ['Unlimited voice scans', 'Full AI health report', 'Trend tracking (1 year)', 'Doctor report sharing', 'Priority support', 'Early feature access'],
      cta: 'Start Free Trial',
      featured: true,
    },
    {
      name: 'Clinical',
      price: '79',
      period: 'per month',
      color: '#4A9EFF',
      features: ['Everything in Pro', 'Multi-patient management', 'EHR integration', 'Clinical-grade exports', 'Dedicated account manager', 'Custom biomarker models'],
      cta: 'Contact Sales',
      featured: false,
    },
  ];

  return (
    <div className="app">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <FloatingOrbs />
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Backed by clinical research &amp; 200K+ users
          </div>
          <h1 className="hero__headline">
            Your voice reveals<br />
            <span className="hero__headline-gradient">your health</span>
          </h1>
          <p className="hero__subheadline">
            Speak for 30 seconds. Our AI analyzes 200+ vocal biomarkers to give you
            a personalized health snapshot — no wearables, no blood draws, no hassle.
          </p>
          <div className="hero__actions">
            <button
              className={`btn btn--hero-mic ${micActive ? 'btn--hero-mic-active' : ''}`}
              onClick={() => setMicActive(v => !v)}
              aria-pressed={micActive}
            >
              <MicIcon />
              {micActive ? 'Listening...' : 'Try it now — speak freely'}
              <Waveform active={micActive} />
            </button>
            <button className="btn btn--hero-demo">
              <span className="btn__play"><PlayIcon /></span>
              Watch demo
            </button>
          </div>
          <p className="hero__trust">No credit card required &bull; Free forever plan &bull; HIPAA compliant</p>
        </div>
        <div className="hero__visual">
          <div className="phone-mockup">
            <div className="phone-mockup__screen">
              <div className="phone-mockup__header">
                <div className="phone-mockup__dot" />
                <span>Health Scan</span>
              </div>
              <div className="phone-mockup__score">
                <div className="score-ring">
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" className="score-ring__bg" />
                    <circle cx="60" cy="60" r="52" className="score-ring__fill" strokeDasharray="326" strokeDashoffset="49" />
                  </svg>
                  <div className="score-ring__label">
                    <span className="score-ring__value">87</span>
                    <span className="score-ring__sub">Health Score</span>
                  </div>
                </div>
              </div>
              <div className="phone-mockup__metrics">
                {[
                  { label: 'Respiratory', value: 92, color: '#00C9A7' },
                  { label: 'Stress Level', value: 31, color: '#4A9EFF' },
                  { label: 'Vocal Vitality', value: 88, color: '#a78bfa' },
                ].map(m => (
                  <div key={m.label} className="metric">
                    <div className="metric__top">
                      <span>{m.label}</span>
                      <span style={{ color: m.color }}>{m.value}</span>
                    </div>
                    <div className="metric__bar">
                      <div className="metric__fill" style={{ width: `${m.value}%`, background: m.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="phone-mockup__waveform">
                <Waveform active={true} />
              </div>
            </div>
          </div>
          <div className="hero__floating-cards">
            <div className="floating-card floating-card--1">
              <HeartIcon />
              <div>
                <div className="floating-card__value">72 BPM</div>
                <div className="floating-card__label">Heart rate normal</div>
              </div>
            </div>
            <div className="floating-card floating-card--2">
              <ShieldIcon />
              <div>
                <div className="floating-card__value">HIPAA</div>
                <div className="floating-card__label">Certified secure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <StatCounter end={200000} suffix="+" label="Active users" />
            <StatCounter end={98} suffix="%" label="Accuracy rate" />
            <StatCounter end={200} suffix="+" label="Health biomarkers" />
            <StatCounter end={50} suffix="+" label="Partner clinics" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Features</div>
            <h2 className="section-title">Everything your health deserves</h2>
            <p className="section-subtitle">
              From real-time analysis to long-term trend tracking, VocaHealth gives you
              the full picture of your wellbeing.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">How it works</div>
            <h2 className="section-title">Health insights in three steps</h2>
            <p className="section-subtitle">
              No equipment. No appointments. Just your voice and 30 seconds of your time.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <StepCard key={i} {...s} />
            ))}
          </div>
          <div className="how-section__cta">
            <button className="btn btn--primary btn--lg">
              Start your free scan <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section" id="testimonials">
        <FloatingOrbs />
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Reviews</div>
            <h2 className="section-title">Trusted by patients &amp; clinicians</h2>
            <p className="section-subtitle">
              Join 200,000+ people who've made VocaHealth part of their wellness routine.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Pricing</div>
            <h2 className="section-title">Simple, transparent pricing</h2>
            <p className="section-subtitle">
              Start free. Upgrade when you're ready. Cancel anytime.
            </p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}>
                {plan.featured && <div className="pricing-card__badge">Most Popular</div>}
                <div className="pricing-card__header">
                  <div className="pricing-card__name" style={{ color: plan.color }}>{plan.name}</div>
                  <div className="pricing-card__price">
                    <span className="pricing-card__currency">$</span>
                    <span className="pricing-card__amount">{plan.price}</span>
                  </div>
                  <div className="pricing-card__period">{plan.period}</div>
                </div>
                <ul className="pricing-card__features">
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <span className="check-icon" style={{ color: plan.color }}><CheckIcon /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn btn--full ${plan.featured ? 'btn--primary' : 'btn--outline'}`}
                  style={plan.featured ? {} : { '--outline-color': plan.color }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <FloatingOrbs />
        <div className="container">
          <div className="cta-card">
            <div className="cta-card__icon"><MicIcon /></div>
            <h2 className="cta-card__title">Start listening to your body today</h2>
            <p className="cta-card__sub">
              Your first scan is free. No credit card. No commitment. Just clarity.
            </p>
            <div className="cta-card__actions">
              <button className="btn btn--primary btn--lg">
                Get your free health scan <ArrowIcon />
              </button>
              <button className="btn btn--ghost-light">Learn more</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="navbar__logo">
                <div className="navbar__logo-icon"><MicIcon /></div>
                <span>VocaHealth</span>
              </div>
              <p className="footer__tagline">Voice-powered health insights for a better, longer life.</p>
            </div>
            <div className="footer__links">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#how-it-works">How it works</a>
              <button className="footer__link-btn">API</button>
            </div>
            <div className="footer__links">
              <h4>Company</h4>
              <button className="footer__link-btn">About</button>
              <button className="footer__link-btn">Blog</button>
              <button className="footer__link-btn">Careers</button>
              <button className="footer__link-btn">Press</button>
            </div>
            <div className="footer__links">
              <h4>Legal</h4>
              <button className="footer__link-btn">Privacy Policy</button>
              <button className="footer__link-btn">Terms of Service</button>
              <button className="footer__link-btn">HIPAA Compliance</button>
              <button className="footer__link-btn">Cookie Policy</button>
            </div>
          </div>
          <div className="footer__bottom">
            <p>&copy; 2026 VocaHealth Inc. All rights reserved.</p>
            <p>Made with <HeartIcon /> for better health</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
