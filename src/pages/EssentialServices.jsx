import { useNavigate } from "react-router-dom";
import "../styles/EssentialServices.css";
import MobileVendorList from "./MobileVendorList";

// ── Arrow Icon ────────────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Service Icons ─────────────────────────────────────────────────────────────
const icons = {
  electrician: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#3b5bdb" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  plumber: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
  ac: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07 19.07 4.93" />
    </svg>
  ),
  painting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 13.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6.5" />
      <path d="M7 13V7a5 5 0 0 1 10 0v6" />
      <line x1="12" y1="13" x2="12" y2="21" />
    </svg>
  ),
  cleaning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  carwash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5" />
      <circle cx="15" cy="17" r="2" /><circle cx="7" cy="17" r="2" />
      <path d="M13 17H9M19 17h2" />
    </svg>
  ),
  ro: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </svg>
  ),
  cctv: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  pest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  appliance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  carpenter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#3b5bdb" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  tank: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
};

// ── Services Data — id matches the API category id ────────────────────────────
export const SERVICES = [
  { id: 1, name: "Electrician", desc: "Wiring, repair & installation", iconKey: "electrician", color: "blue" },
  { id: 2, name: "Plumber", desc: "Pipes, leaks & fittings", iconKey: "plumber", color: "yellow" },
  { id: 3, name: "AC Repair", desc: "Service, gas & repair", iconKey: "ac", color: "teal" },
  { id: 4, name: "Painting", desc: "Interior & exterior", iconKey: "painting", color: "rose" },
  { id: 5, name: "Cleaning", desc: "Deep home cleaning", iconKey: "cleaning", color: "purple" },
  { id: 6, name: "Car Wash", desc: "Doorstep car care", iconKey: "carwash", color: "yellow" },
  { id: 7, name: "RO Service", desc: "Water purifier repair", iconKey: "ro", color: "sky" },
  { id: 8, name: "CCTV Install", desc: "Security camera setup", iconKey: "cctv", color: "orange" },
  { id: 9, name: "Pest Control", desc: "Termite & bug removal", iconKey: "pest", color: "red" },
  { id: 10, name: "Appliance Repair", desc: "Washing machine, fridge", iconKey: "appliance", color: "lime" },
  { id: 11, name: "Carpenter", desc: "Furniture & woodwork", iconKey: "carpenter", color: "slate" },
  { id: 12, name: "Tank Cleaning", desc: "Water tank hygiene", iconKey: "tank", color: "amber" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function EssentialServices() {
  const navigate = useNavigate();

  // Navigate to vendor list for the chosen category
  const handleServiceClick = (svc) => {
    navigate(`/category/${svc.id}`);
  };

  return (
    <>
      <section className="home-services">
        {/* Top Row */}
        <div className="home-services__top">
          <div>
            <h2 className="home-services__heading">Essential Home Services</h2>
            <p className="home-services__sub">
              Book expert professionals for all your home maintenance and repair
              needs. Quality service guaranteed.
            </p>
          </div>
          <a href="/services" className="home-services__view-all">
            View All Services <ArrowRight />
          </a>
        </div>

        {/* Grid */}
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
      <MobileVendorList />
    </>
  );
}