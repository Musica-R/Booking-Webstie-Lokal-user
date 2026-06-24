import { useState } from "react";
import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// ── SVG Icons ─────────────────────────────────────────────────────────────────
const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const PinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const ChevronDown = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const StoreIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const ShieldIcon = ({ color = "#3b5bdb" }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const CheckCircleIcon = ({ color = "#22c55e" }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const ZapIcon = ({ color = "#f5a623" }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

// ── Placeholder image URLs (Unsplash) ─────────────────────────────────────────
const YOGA_IMG =
    "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=80";
const PLUMBER_IMG =
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80";

// ── Component ─────────────────────────────────────────────────────────────────
export default function Hero() {
    const [service, setService] = useState("");
    const [location, setLocation] = useState("Bengaluru");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!service.trim()) return;

        setLoading(true);

        try {
            const res = await axios.get(
                `http://localhost:5000/api/fav/search?q=${service}`
            );

            const data = res.data;

            if (data.success) {
                setTimeout(() => {
                    if (data.type === "service") {
                        navigate(`/services?category=${data.id}`);
                    } else {
                        navigate(`/activity?category=${data.id}`);
                    }
                }, 800); // 300ms delay
            } else {
                setLoading(false);
                alert("No service or activity found");
            }
        } catch (err) {
            setLoading(false);
        }
    };
    return (
        <section className="hero">
            <div className="hero__inner">

                {/* ── Left Column ── */}
                <div className="hero__left">

                    {/* Badge */}
                    <div className="hero__badge">
                        <span className="hero__badge-dot" />
                        Now in 200+ Cities
                    </div>

                    {/* Headline */}
                    <h1 className="hero__headline">
                        Book{" "}
                        <span className="hero__headline-underline">Trusted</span>
                        <br />
                        Services Near
                        <br />
                        Your Doorstep
                    </h1>

                    {/* Subtext */}
                    <p className="hero__subtext">
                        From expert electricians, plumbers, and AC technicians to certified yoga
                        trainers and silambam coaches. Verified professionals, guaranteed quality.
                    </p>

                    {/* Search Bar */}
                    <form className="hero__search-bar" onSubmit={handleSearch}>
                        <div className="hero__search-input-wrap">
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="What service do you need?"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            />
                        </div>
                        <div className="hero__search-divider" />
                        <div className="hero__location-wrap">
                            <PinIcon />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="hero__search-btn" disabled={loading}>
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </form>

                    {/* CTA Buttons */}
                    <div className="hero__actions"  >
                        <button className="hero__btn hero__btn--services" onClick={() => navigate("/services")}>
                            Services <ChevronDown />
                        </button>
                        <button className="hero__btn hero__btn--activities" onClick={() => navigate("/activity")}>
                            Activities <ChevronDown />
                        </button>
                        <button className="hero__btn hero__btn--vendor" onClick={() => navigate("/become-vendor")}>
                            <StoreIcon /> Become a Vendor
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="hero__stats">
                        <div className="hero__stat">
                            <div className="hero__stat-number">50K+</div>
                            <div className="hero__stat-label">Verified Pros</div>
                        </div>
                        <div className="hero__stat">
                            <div className="hero__stat-number">4.8/5</div>
                            <div className="hero__stat-label">
                                <span className="star">★</span> Average Rating
                            </div>
                        </div>
                        <div className="hero__stat">
                            <div className="hero__stat-number">1M+</div>
                            <div className="hero__stat-label">Happy Customers</div>
                        </div>
                    </div>
                </div>

                {/* ── Right Column ── */}
                <div className="hero__right">

                    {/* Yoga image card */}
                    <div className="hero__img-card hero__img-card--yoga">
                        <img src={YOGA_IMG} alt="Yoga trainer" />
                    </div>

                    {/* Plumber image card */}
                    <div className="hero__img-card hero__img-card--plumber">
                        <img src={PLUMBER_IMG} alt="Plumber at work" />
                    </div>

                    {/* Floating Badge — Verified Pros */}
                    <div className="hero__float-badge hero__float-badge--verified-pro">
                        <div className="hero__float-badge-icon hero__float-badge-icon--blue">
                            <ShieldIcon color="#3b5bdb" />
                        </div>
                        <div>
                            <div className="hero__float-badge-title">Verified Pros</div>
                            <div className="hero__float-badge-sub">100% Background checked</div>
                        </div>
                    </div>

                    {/* Floating Badge — Govt. Verified */}
                    <div className="hero__float-badge hero__float-badge--govt">
                        <div className="hero__float-badge-icon hero__float-badge-icon--green">
                            <CheckCircleIcon color="#22c55e" />
                        </div>
                        <div>
                            <div className="hero__float-badge-title">Govt. Verified</div>
                            <div className="hero__float-badge-sub">Aadhaar &amp; License</div>
                        </div>
                    </div>

                    {/* Floating Badge — Fast Booking */}
                    <div className="hero__float-badge hero__float-badge--booking">
                        <div className="hero__float-badge-icon hero__float-badge-icon--yellow">
                            <ZapIcon color="#f5a623" />
                        </div>
                        <div>
                            <div className="hero__float-badge-title">Fast Booking</div>
                            <div className="hero__float-badge-sub">Under 2 minutes</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}