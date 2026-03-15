import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// --- SVG Icons ---
const ToothIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 2 5 5 5 8c0 2 .5 3.5 1 5l1 6c.2 1.5 1 2 2 2s1.5-.8 2-2l1-3 1 3c.5 1.2 1 2 2 2s1.8-.5 2-2l1-6c.5-1.5 1-3 1-5 0-3-3-6-7-6z" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.27 6.27l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
          <div className="navbar__logo-icon"><ToothIcon /></div>
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
          <button className="btn btn--primary">Book a Demo</button>
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
  const [callActive, setCallActive] = useState(false);

  const features = [
    {
      icon: <PhoneIcon />,
      title: '24/7 Call Answering',
      description: 'Never miss a patient call again. Our AI receptionist picks up every call instantly — nights, weekends, and holidays.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <CalendarIcon />,
      title: 'Smart Appointment Booking',
      description: 'Automatically schedule, confirm, and reschedule appointments by syncing directly with your practice management software.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <MessageIcon />,
      title: 'Patient FAQ Handling',
      description: 'Answer questions about procedures, insurance acceptance, office hours, and costs — without tying up your front desk.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: <ChartIcon />,
      title: 'Practice Analytics',
      description: 'Track call volumes, booking rates, missed calls, and patient satisfaction from a single intuitive dashboard.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      icon: <ShieldIcon />,
      title: 'HIPAA Compliant',
      description: 'End-to-end encrypted calls and storage. Full HIPAA compliance built in from day one — no extra configuration needed.',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      icon: <ToothIcon />,
      title: 'Dental-Specific AI',
      description: 'Trained on dental terminology, procedures, and workflows. Understands crowns, cleanings, ortho consults, and more.',
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Patient Calls Your Practice',
      description: 'A patient dials your existing number. VocaHealth answers instantly — no hold music, no voicemail.',
    },
    {
      number: '02',
      title: 'AI Handles the Request',
      description: 'The AI understands natural speech, books the appointment, answers questions, or routes urgent calls to your team.',
    },
    {
      number: '03',
      title: 'Confirmation Sent Instantly',
      description: 'The patient gets an SMS or email confirmation. Your calendar is updated in real time. Zero manual work.',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Michelle Park',
      role: 'Owner, Park Family Dentistry',
      avatar: 'linear-gradient(135deg, #667eea, #764ba2)',
      text: "We used to miss 20+ calls a week after hours. Since VocaHealth, our new patient bookings are up 40% and my front desk team can finally focus on patients in the chair.",
      rating: 5,
    },
    {
      name: 'Sandra Torres',
      role: 'Office Manager, Bright Smile Dental',
      avatar: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      text: "The AI handles insurance questions better than I expected. Patients say they can't even tell it's not a real person. Setup took less than a day.",
      rating: 5,
    },
    {
      name: 'Dr. James Okafor',
      role: 'Periodontist, Okafor Dental Group',
      avatar: 'linear-gradient(135deg, #f093fb, #f5576c)',
      text: "Running three locations, staffing a full-time receptionist at each was unsustainable. VocaHealth cut our front desk costs in half while improving our patient experience.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '199',
      period: 'per month',
      color: '#6b7280',
      features: [
        '1 practice location',
        'Up to 300 calls/month',
        'Appointment booking',
        'Basic FAQ handling',
        'SMS confirmations',
        'Email support',
      ],
      cta: 'Start Free Trial',
      featured: false,
    },
    {
      name: 'Growth',
      price: '399',
      period: 'per month',
      color: '#00C9A7',
      features: [
        'Up to 3 locations',
        'Unlimited calls',
        'Full FAQ & insurance Q&A',
        'PMS calendar sync',
        'Analytics dashboard',
        'Priority phone support',
      ],
      cta: 'Book a Demo',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'multi-location groups',
      color: '#4A9EFF',
      features: [
        'Unlimited locations',
        'Custom AI voice & persona',
        'EHR / PMS integration',
        'Dedicated success manager',
        'SLA guarantee',
        'White-label options',
      ],
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
            Trusted by 500+ dental practices across North America
          </div>
          <h1 className="hero__headline">
            Your front desk,<br />
            <span className="hero__headline-gradient">always available</span>
          </h1>
          <p className="hero__subheadline">
            VocaHealth's AI voice receptionist answers every patient call 24/7,
            books appointments, handles FAQs, and syncs with your calendar —
            so your team can focus on care, not calls.
          </p>
          <div className="hero__actions">
            <button
              className={`btn btn--hero-mic ${callActive ? 'btn--hero-mic-active' : ''}`}
              onClick={() => setCallActive(v => !v)}
              aria-pressed={callActive}
            >
              <PhoneIcon />
              {callActive ? 'AI is answering...' : 'Hear it in action'}
              <Waveform active={callActive} />
            </button>
            <button className="btn btn--hero-demo">
              <span className="btn__play"><PlayIcon /></span>
              Watch 2-min demo
            </button>
          </div>
          <p className="hero__trust">No credit card required &bull; 14-day free trial &bull; HIPAA compliant</p>
        </div>
        <div className="hero__visual">
          <div className="phone-mockup">
            <div className="phone-mockup__screen">
              <div className="phone-mockup__header">
                <div className="phone-mockup__dot" />
                <span>Incoming Call</span>
              </div>
              <div className="phone-mockup__call">
                <div className="call-avatar">
                  <PhoneIcon />
                </div>
                <div className="call-name">Sarah Johnson</div>
                <div className="call-status">Booking a cleaning...</div>
              </div>
              <div className="phone-mockup__chat">
                <div className="chat-bubble chat-bubble--ai">
                  "Hi! Thanks for calling Sunrise Dental. I can help you book an appointment. What day works best for you?"
                </div>
                <div className="chat-bubble chat-bubble--patient">
                  "Tuesday afternoon if possible."
                </div>
                <div className="chat-bubble chat-bubble--ai">
                  "Perfect — I have Tuesday at 2:30 PM available. Shall I confirm that for you?"
                </div>
              </div>
              <div className="phone-mockup__booking">
                <span className="booking-badge"><CheckIcon /> Appointment confirmed</span>
                <span className="booking-time">Tue, Mar 18 &bull; 2:30 PM</span>
              </div>
            </div>
          </div>
          <div className="hero__floating-cards">
            <div className="floating-card floating-card--1">
              <CalendarIcon />
              <div>
                <div className="floating-card__value">+40%</div>
                <div className="floating-card__label">More bookings</div>
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
            <StatCounter end={500} suffix="+" label="Dental practices" />
            <StatCounter end={98} suffix="%" label="Call answer rate" />
            <StatCounter end={24} suffix="/7" label="Always available" />
            <StatCounter end={40} suffix="%" label="More bookings avg." />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Features</div>
            <h2 className="section-title">Everything your front desk needs</h2>
            <p className="section-subtitle">
              From after-hours calls to same-day scheduling, VocaHealth handles
              the phone so your team can focus on patients in the chair.
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
            <h2 className="section-title">Up and running in one day</h2>
            <p className="section-subtitle">
              No new phone numbers. No hardware. Just connect to your existing line
              and your AI receptionist is live.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <StepCard key={i} {...s} />
            ))}
          </div>
          <div className="how-section__cta">
            <button className="btn btn--primary btn--lg">
              Book a free demo <ArrowIcon />
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
            <h2 className="section-title">Loved by dental teams everywhere</h2>
            <p className="section-subtitle">
              Join 500+ practices that stopped missing patient calls and started growing.
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
              One flat monthly fee. No per-call charges. Cancel anytime.
            </p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}>
                {plan.featured && <div className="pricing-card__badge">Most Popular</div>}
                <div className="pricing-card__header">
                  <div className="pricing-card__name" style={{ color: plan.color }}>{plan.name}</div>
                  <div className="pricing-card__price">
                    {plan.price === 'Custom' ? (
                      <span className="pricing-card__amount pricing-card__amount--custom">Custom</span>
                    ) : (
                      <>
                        <span className="pricing-card__currency">$</span>
                        <span className="pricing-card__amount">{plan.price}</span>
                      </>
                    )}
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
            <div className="cta-card__icon"><PhoneIcon /></div>
            <h2 className="cta-card__title">Stop missing patient calls today</h2>
            <p className="cta-card__sub">
              Every missed call is a missed appointment. Let VocaHealth answer for you — 24/7, starting today.
            </p>
            <div className="cta-card__actions">
              <button className="btn btn--primary btn--lg">
                Book your free demo <ArrowIcon />
              </button>
              <button className="btn btn--ghost-light">See pricing</button>
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
                <div className="navbar__logo-icon"><ToothIcon /></div>
                <span>VocaHealth</span>
              </div>
              <p className="footer__tagline">AI voice receptionist built exclusively for dental practices.</p>
            </div>
            <div className="footer__links">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#how-it-works">How it works</a>
              <button className="footer__link-btn">Integrations</button>
            </div>
            <div className="footer__links">
              <h4>Company</h4>
              <button className="footer__link-btn">About</button>
              <button className="footer__link-btn">Blog</button>
              <button className="footer__link-btn">Careers</button>
              <button className="footer__link-btn">Contact</button>
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
            <p>Made with <HeartIcon /> for dental teams</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
