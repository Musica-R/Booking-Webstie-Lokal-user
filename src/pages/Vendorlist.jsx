import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Vendorlist.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const ArrowLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

const ArrowRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const LocationIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const ClockIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const StarIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const VerifyIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth="0">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ── Availability helpers ──────────────────────────────────────────────────────
function formatAvailability(availability) {
    const map = {
        all_days: "Mon – Sun",
        weekdays: "Mon – Fri",
        weekends: "Sat – Sun",
    };
    return map[availability] || availability;
}

function formatTime(time) {
    if (!time) return "";
    const [h, m] = time.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const display = hour % 12 || 12;
    return `${display}:${m} ${ampm}`;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function VendorList() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    const [category, setCategory] = useState(null);
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/vendors/vendors/category/${categoryId}`);
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                if (data.success) {
                    setCategory(data.category);
                    setVendors(data.vendors);
                } else {
                    throw new Error("Invalid response");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [categoryId]);

    const handleBook = (vendorId) => {
        const user = localStorage.getItem("user");

        if (!user) {
            navigate("/login");
            return;
        }

        navigate(`/booking/${vendorId}`);
    };

    // ── Loading ──
    if (loading) return (
        <div className="vl-page">
            <div className="vl-loader">
                <div className="vl-spinner" />
                <p>Finding professionals…</p>
            </div>
        </div>
    );

    // ── Error ──
    if (error) return (
        <div className="vl-page">
            <div className="vl-loader">
                <p style={{ color: "#dc2626" }}>Failed to load vendors: {error}</p>
                <button className="vl-btn-back" style={{ marginTop: 16 }} onClick={() => navigate("/")}>
                    <ArrowLeft /> Back to Home
                </button>
            </div>
        </div>
    );

    return (
        <div className="vl-page">
            {/* Header */}
            <div className="vl-header">
                <button className="vl-back-btn" onClick={() => navigate("/")}>
                    <ArrowLeft />
                </button>
                <div className="vl-header-text">
                    <h1 className="vl-title">{category?.name || "Professionals"}</h1>
                    <p className="vl-count">
                        {vendors.length} professional{vendors.length !== 1 ? "s" : ""} available
                    </p>
                </div>
            </div>

            {/* Vendor Cards */}
            {vendors.length === 0 ? (
                <div className="vl-empty">
                    <p>No professionals found for this category yet.</p>
                    <button className="vl-btn-back" onClick={() => navigate("/")}>
                        <ArrowLeft /> Back to Home
                    </button>
                </div>
            ) : (
                <div className="vl-list">
                    {vendors.map(vendor => {
                        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.full_name)}&background=2563eb&color=fff&size=80`;
                        return (
                            <div className="vl-card" key={vendor.id}>
                                {/* Avatar */}
                                <div className="vl-card__avatar-col">
                                    <img
                                        src={vendor.profile_url || avatarFallback}
                                        alt={vendor.full_name}
                                        className="vl-card__avatar"
                                        onError={e => { e.target.src = avatarFallback; }}
                                    />
                                    <span className="vl-card__category-pill">
                                        {category?.name}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="vl-card__info">
                                    <div className="vl-card__name-row">
                                        <h2 className="vl-card__name">{vendor.full_name}</h2>
                                        <VerifyIcon />
                                    </div>
                                    <p className="vl-card__shop">{vendor.shop_name}</p>

                                    <div className="vl-card__badges">
                                        <span className="vl-badge vl-badge--star">
                                            <StarIcon /> 4.5
                                        </span>
                                        <span className="vl-badge">{vendor.experience} exp</span>
                                        <span className="vl-badge">
                                            <LocationIcon /> {vendor.city}
                                        </span>
                                    </div>

                                    <div className="vl-card__timing">
                                        <ClockIcon />
                                        <span>
                                            {formatAvailability(vendor.availability)} &nbsp;·&nbsp;
                                            {formatTime(vendor.start_time)} – {formatTime(vendor.end_time)}
                                        </span>
                                    </div>

                                    <p className="vl-card__desc">{vendor.business_description}</p>

                                    <button
                                        className="vl-book-btn"
                                        onClick={() => handleBook(vendor.id)}
                                    >
                                        {isLoggedIn ? "Book Now" : "Login to Book"}
                                        <ArrowRight />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}