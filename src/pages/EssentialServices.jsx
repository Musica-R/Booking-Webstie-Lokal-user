import { useNavigate } from "react-router-dom";
import "../styles/EssentialServices.css";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const icons = {
  electrician: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#3b5bdb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  plumber: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
  ac: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07 19.07 4.93" />
    </svg>
  ),
  painting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 13.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6.5" />
      <path d="M7 13V7a5 5 0 0 1 10 0v6" />
      <line x1="12" y1="13" x2="12" y2="21" />
    </svg>
  ),
  cleaning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  carwash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5" />
      <circle cx="15" cy="17" r="2" /><circle cx="7" cy="17" r="2" />
      <path d="M13 17H9M19 17h2" />
    </svg>
  ),
  ro: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </svg>
  ),
  cctv: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  pest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  appliance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  carpenter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#3b5bdb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  tank: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
};

export const SERVICES = [
  {
    id: 1, name: "Electrician", desc: "Wiring, repair & installation",
    iconKey: "electrician", color: "blue", price: 399,
    rating: 4.5, reviews: "384", duration: "30–45 min", pros: 48,
    badge: { text: "Most Booked", color: "#1e3a8a" },
    image: "/assets/electrician.jpg",
  },
  {
    id: 2, name: "Plumber", desc: "Pipes, leaks & fittings",
    iconKey: "plumber", color: "yellow", price: 399,
    rating: 4.3, reviews: "157", duration: "20–40 min", pros: 35,
    badge: null,
    image: "/assets/plumber.jpg",
  },
  {
    id: 3, name: "AC Repair", desc: "Service, gas refilling & install",
    iconKey: "ac", color: "teal", price: 499,
    rating: 4.0, reviews: "124", duration: "45–60 min", pros: 29,
    badge: { text: "Available Now", color: "#059669" },
    image: "/assets/ac-repair.jpg",
  },
  {
    id: 4, name: "Painting", desc: "Interior & exterior painting",
    iconKey: "painting", color: "rose", price: 599,
    rating: 4.5, reviews: "344", duration: "2–4 hrs", pros: 22,
    badge: null,
    image: "/assets/painting.jpg",
  },
  {
    id: 5, name: "Cleaning", desc: "Home, kitchen & bathroom",
    iconKey: "cleaning", color: "purple", price: 349,
    rating: 4.9, reviews: "4.2k", duration: "1–3 hrs", pros: 61,
    badge: { text: "Top Rated", color: "#7c3aed" },
    image: "/assets/housekeeping.jpg",
  },
  {
    id: 6, name: "Car Wash", desc: "Doorstep car care",
    iconKey: "carwash", color: "yellow", price: 299,
    rating: 4.4, reviews: "1.1k", duration: "30–60 min", pros: 18,
    badge: null,
    image: "/assets/car-wash.jpg",
  },
  {
    id: 7, name: "RO Service", desc: "Water purifier repair",
    iconKey: "ro", color: "sky", price: 349,
    rating: 4.6, reviews: "760", duration: "20–30 min", pros: 14,
    badge: null,
    image: "/assets/ro-service.jpg",
  },
  {
    id: 8, name: "CCTV Install", desc: "Security camera setup",
    iconKey: "cctv", color: "orange", price: 799,
    rating: 4.7, reviews: "540", duration: "1–2 hrs", pros: 11,
    badge: null,
    image: "/assets/cctv-install.jpg",
  },
  {
    id: 9, name: "Pest Control", desc: "Termite & bug removal",
    iconKey: "pest", color: "red", price: 499,
    rating: 4.5, reviews: "1.3k", duration: "45–90 min", pros: 19,
    badge: null,
    image: "/assets/pest-control.jpg",
  },
  {
    id: 10, name: "Appliance Repair", desc: "Washing machine, fridge & more",
    iconKey: "appliance", color: "lime", price: 399,
    rating: 4.6, reviews: "2.0k", duration: "30–60 min", pros: 33,
    badge: null,
    image: "/assets/appliance-repair.jpg",
  },
  {
    id: 11, name: "Carpenter", desc: "Furniture & woodwork",
    iconKey: "carpenter", color: "slate", price: 349,
    rating: 4.5, reviews: "890", duration: "1–3 hrs", pros: 16,
    badge: null,
    image: "/assets/carpenter.jpg",
  },
  {
    id: 12, name: "Tank Cleaning", desc: "Water tank hygiene",
    iconKey: "tank", color: "amber", price: 599,
    rating: 4.7, reviews: "430", duration: "1–2 hrs", pros: 9,
    badge: null,
    image: "/assets/tank-cleaning.jpg",
  },
];

/* ── Reusable trust badge row ── */
const TrustBadges = () => (
  <div className="mob-svc-card__trust">
    <div className="mob-svc-card__trust-item">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b5bdb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span>Verified Experts</span>
    </div>
    {/* <div className="mob-svc-card__trust-item">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b5bdb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span>On-time Service</span>
    </div> */}
    <div className="mob-svc-card__trust-item">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b5bdb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
      <span>Satisfaction Guaranteed</span>
    </div>
  </div>
);

function MobileServices({ onServiceClick }) {
  return (
    <div className="mob-services">

      {/* ── Hero Banner ── */}
      <div className="mob-hero">
        <div className="mob-hero__text">
          <h1 className="mob-hero__title">
            Expert home services,{" "}
            <span className="mob-hero__accent">guaranteed.</span>
          </h1>
          <p className="mob-hero__sub">
            Skilled professionals. Trusted service.<br />
            Your satisfaction, our promise.
          </p>
        </div>
        <div className="mob-hero__shield" aria-hidden="true">
          <svg width="72" height="82" viewBox="0 0 80 90" fill="none">
            <path
              d="M40 4L8 17v24c0 22 14.4 36.5 32 42 17.6-5.5 32-20 32-42V17L40 4z"
              fill="#e8edf8" stroke="#d0d9f0" strokeWidth="1.5"
            />
            <path
              d="M40 4L8 17v24c0 22 14.4 36.5 32 42 17.6-5.5 32-20 32-42V17L40 4z"
              fill="url(#shieldGrad)"
            />
            <path
              d="M26 44l10 10 18-20"
              stroke="#3b5bdb" strokeWidth="3.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="shieldGrad" x1="40" y1="4" x2="40" y2="86" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#eef2ff" />
                <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
          {/* sparkles */}
          <span className="mob-hero__spark mob-hero__spark--tl" />
          <span className="mob-hero__spark mob-hero__spark--tr" />
          <span className="mob-hero__spark mob-hero__spark--br" />
        </div>
      </div>

      {/* ── Service Cards ── */}
      <div className="mob-list">
        {SERVICES.map((svc) => (
          <div
            key={svc.id}
            className="mob-svc-card"
            onClick={() => onServiceClick(svc)}
          >
            {/* Left — full-height image */}
            <div className="mob-svc-card__img-wrap">
              <img className="mob-svc-card__img" src={svc.image} alt={svc.name} />
            </div>

            {/* Right — content */}
            <div className="mob-svc-card__body">

              {/* Icon + title block */}
              <div className="mob-svc-card__header">
                <div className={`mob-svc-card__icon-wrap mob-svc-card__icon-wrap--${svc.color}`}>
                  {icons[svc.iconKey]}
                </div>
                <div className="mob-svc-card__title-block">
                  <div className="mob-svc-card__name">{svc.name}</div>
                  {/* <div className="mob-svc-card__subtitle">Expert Home {svc.name}</div> */}
                </div>
              </div>

              {/* Trust badges */}
              <TrustBadges />

              {/* Book Now */}
              <button
                className="mob-svc-card__book-btn"
                onClick={(e) => { e.stopPropagation(); onServiceClick(svc); }}
              >
                Book Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* ── Bookings Banner ── */}
      <div className="mob-banner">
        <div className="mob-banner__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <circle cx="12" cy="16" r="2" />
          </svg>
        </div>
        <div className="mob-banner__text">
          <div className="mob-banner__title">Manage Your Bookings</div>
          <div className="mob-banner__sub">View, reschedule or cancel anytime</div>
        </div>
        {/* <a href="/account" className="mob-banner__btn">
          My Bookings <ArrowRight />
        </a> */}
      </div>

    </div>
  );
}

export default function EssentialServices() {
  const navigate = useNavigate();

  const handleServiceClick = (svc) => {
    navigate(`/category/${svc.id}`);
  };

  return (
    <>
      {/* Desktop */}
      <section className="home-services">
        <div className="home-services__top">
          <div>
            <h2 className="home-services__heading">Essential Home Services</h2>
            <p className="home-services__sub">
              Book expert professionals for all your home maintenance and repair needs. Quality service guaranteed.
            </p>
          </div>
          <a href="/services" className="home-services__view-all">
            View All Services <ArrowRight />
          </a>
        </div>
        <div className="home-services__grid">
          {SERVICES.map((svc) => (
            <div
              className="home-services__card"
              key={svc.id}
              onClick={() => handleServiceClick(svc)}
              style={{ cursor: "pointer" }}
            >
              <div className={`home-services__icon-wrap home-services__icon-wrap--${svc.color}`}>
                {icons[svc.iconKey]}
              </div>
              <div className="home-services__card-name">{svc.name}</div>
              <div className="home-services__card-desc">{svc.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile */}
      <MobileServices onServiceClick={handleServiceClick} />
    </>
  );
}