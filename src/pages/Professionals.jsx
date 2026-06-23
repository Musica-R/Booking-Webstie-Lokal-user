import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Professionals.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const PinIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const StarIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

// ── Skeleton Card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="professionals__card professionals__card--skeleton">
        <div className="professionals__img-wrap skeleton-block" style={{ height: 160 }} />
        <div className="professionals__card-body">
            <div className="skeleton-line" style={{ width: "60%", height: 16, marginBottom: 8 }} />
            <div className="skeleton-line" style={{ width: "40%", height: 12, marginBottom: 12 }} />
            <div className="skeleton-line" style={{ width: "80%", height: 12, marginBottom: 20 }} />
            <div style={{ display: "flex", gap: 8 }}>
                <div className="skeleton-line" style={{ flex: 1, height: 36, borderRadius: 8 }} />
                <div className="skeleton-line" style={{ flex: 1, height: 36, borderRadius: 8 }} />
            </div>
        </div>
    </div>
);

// ── Availability helpers ───────────────────────────────────────────────────────
const getAvailabilityLabel = (availability) => {
    if (!availability) return { label: "Available", status: "available" };
    const v = availability.toLowerCase();
    if (v === "weekdays") return { label: "Weekdays", status: "available" };
    if (v === "weekends") return { label: "Weekends Only", status: "busy" };
    return { label: "Available", status: "available" };
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Professionals() {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const res = await fetch(`${API_URL}/vendors/top-rated-vendors`);
                const data = await res.json();
                if (res.ok && data.success) {
                    setVendors(data.vendors || []);
                } else {
                    setError("Failed to load professionals.");
                }
            } catch (err) {
                console.error("Failed to fetch top-rated vendors:", err);
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchVendors();
    }, []);

    return (
        <section className="professionals">
            {/* Header */}
            <div className="professionals__header">
                <h2 className="professionals__title">Top Rated Professionals</h2>
                <p className="professionals__subtitle">
                    Book the most trusted and highly-rated service experts in your city.
                    Verified by Lokal.
                </p>
            </div>

            {/* Error */}
            {error && (
                <p style={{ textAlign: "center", color: "#DC2626", padding: "2rem 0" }}>
                    {error}
                </p>
            )}

            {/* Grid */}
            <div className="professionals__grid">
                {loading ? (
                    [1, 2, 3].map((n) => <SkeletonCard key={n} />)
                ) : (
                    vendors.map((pro) => {
                        const avail = getAvailabilityLabel(pro.availability);
                        const rating = parseFloat(pro.rating) || 0;

                        return (
                            <div className="professionals__card" key={pro.id}>

                                {/* Cover / Profile Image */}
                                <div className="professionals__img-wrap">
                                    <img
                                        className="professionals__img"
                                        src={pro.profile_url}
                                        alt={pro.category_name}
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&q=80";
                                        }}
                                    />
                                    <div className="professionals__img-overlay" />

                                    {/* Category + Experience badges */}
                                    <div className="professionals__img-badges">
                                        <span className="professionals__badge">{pro.category_name}</span>
                                        <span className="professionals__badge">{pro.experience}</span>
                                    </div>

                                    {/* Avatar */}
                                    <div className="professionals__avatar-wrap">
                                        <img
                                            className="professionals__avatar"
                                            src={pro.profile_url}
                                            alt={pro.full_name}
                                            onError={(e) => {
                                                e.target.src = "https://i.pravatar.cc/80?img=8";
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="professionals__card-body">
                                    <div className="professionals__card-name">{pro.full_name}</div>
                                    <div className="professionals__card-shop">{pro.shop_name}</div>

                                    <div className="professionals__card-location">
                                        <PinIcon />
                                        {[pro.address1, pro.city].filter(Boolean).join(", ")}
                                    </div>

                                    {/* Rating + Availability */}
                                    <div className="professionals__card-meta">
                                        <div className="professionals__rating">
                                            <StarIcon />
                                            <span className="professionals__rating-score">
                                                {rating > 0 ? rating.toFixed(1) : "New"}
                                            </span>
                                            {rating > 0 && (
                                                <span className="professionals__rating-reviews">/ 5.0</span>
                                            )}
                                        </div>

                                        <div className={`professionals__availability professionals__availability--${avail.status}`}>
                                            <span className="professionals__availability-dot" />
                                            {avail.label}
                                        </div>
                                    </div>

                                    <div className="professionals__divider" />

                                    {/* Actions */}
                                    <div className="professionals__actions">
                                        {/* <button
                                            className="professionals__btn professionals__btn--call"
                                            onClick={() => window.open(`tel:${pro.phone}`)}
                                        >
                                            <PhoneIcon /> Call
                                        </button> */}
                                        <button
                                            className="professionals__btn professionals__btn--book"
                                            onClick={() => navigate(`/booking/${pro.id}`)}
                                        >
                                            <CalendarIcon /> Book Now
                                        </button>
                                    </div>
                                </div>

                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}