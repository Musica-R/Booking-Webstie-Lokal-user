import { useState, useEffect } from "react";
import "../styles/Stalls.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const NavigateIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const DistanceIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns true if current time is between opening_time and closing_time (HH:MM:SS strings) */
function isOpenNow(opening_time, closing_time) {
    if (!opening_time || !closing_time) return false;
    const now = new Date();
    const toMinutes = (t) => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
    };
    const cur = now.getHours() * 60 + now.getMinutes();
    return cur >= toMinutes(opening_time) && cur < toMinutes(closing_time);
}

/** Format HH:MM:SS → 8:00 AM */
function formatTime(t) {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

/** Build a Google Maps URL from the stall object */
function buildMapUrl(stall) {
    if (stall.google_map_link) return stall.google_map_link;
    return `https://www.google.com/maps/search/?api=1&query=${stall.latitude},${stall.longitude}`;
}

/** Static Google Maps thumbnail (no API key needed) */
function mapThumbnailUrl(lat, lng) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x160&markers=color:red%7C${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`;
}

// ── Mini Map ──────────────────────────────────────────────────────────────────
function MiniMap({ stall }) {
    const mapUrl = buildMapUrl(stall);
    const lat = parseFloat(stall.latitude);
    const lng = parseFloat(stall.longitude);

    // Use OpenStreetMap embed (no API key needed); clicking opens Google Maps
    const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.005},${lat - 0.005},${lng + 0.005},${lat + 0.005}&layer=mapnik&marker=${lat},${lng}`;

    return (
        <div
            className="stalls__map"
            onClick={() => window.open(mapUrl, "_blank", "noopener,noreferrer")}
            title="Open in Google Maps"
            style={{ cursor: "pointer", position: "relative" }}
        >
            <iframe
                title={`map-${stall.id}`}
                src={osmEmbed}
                loading="lazy"
                style={{ pointerEvents: "none" }} // Let the wrapper div handle the click
            />
            {/* Click-to-open overlay hint */}
            <div className="stalls__map-overlay">
                <span className="stalls__map-overlay-label">
                    <NavigateIcon /> Open in Maps
                </span>
            </div>
        </div>
    );
}

// ── Skeleton Card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="stalls__card stalls__card--skeleton">
            <div className="stalls__card-img-wrap skeleton-block" style={{ height: 180 }} />
            <div className="stalls__card-body" style={{ gap: 10 }}>
                <div className="skeleton-block" style={{ height: 16, width: "70%", borderRadius: 6 }} />
                <div className="skeleton-block" style={{ height: 12, width: "50%", borderRadius: 6 }} />
                <div className="skeleton-block" style={{ height: 120, borderRadius: 8 }} />
            </div>
        </div>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Stalls() {
    const [stalls, setStalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        async function fetchStalls() {
            try {
                const res = await fetch(`${API_URL}/vendors/near-list`);
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                if (data.success) {
                    setStalls(data.stalls);
                } else {
                    throw new Error("Failed to load stalls.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchStalls();
    }, []);

    return (
        <section className="stalls">
            {/* Top */}
            <div className="stalls__top">
                <div>
                    <h2 className="stalls__heading">Nearby Quick Stalls</h2>
                    <p className="stalls__sub">
                        Quickly find and contact local tea shops, mechanics, and essential
                        stalls around your location.
                    </p>
                </div>
            </div>

            {/* Horizontal scroll track */}
            <div className="stalls__track-wrap">
                <div className="stalls__track">
                    {loading && (
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    )}

                    {error && (
                        <p style={{ color: "#f87171", padding: "16px" }}>
                            ⚠️ {error}
                        </p>
                    )}

                    {!loading && !error && stalls.map((stall) => {
                        const open = isOpenNow(stall.opening_time, stall.closing_time);
                        const status = open ? "open" : "closed";

                        return (
                            <div className="stalls__card" key={stall.id}>
                                {/* Image */}
                                <div className="stalls__card-img-wrap">
                                    <img
                                        className="stalls__card-img"
                                        src={stall.profile_url}
                                        alt={stall.shop_name}
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80";
                                        }}
                                    />
                                    <span className="stalls__badge-category">
                                        {stall.description
                                            ? stall.description.split(" ").slice(0, 2).join(" ")
                                            : "Local Stall"}
                                    </span>
                                    <span className={`stalls__badge-status stalls__badge-status--${status}`}>
                                        {open ? "Open Now" : "Closed"}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="stalls__card-body">
                                    {/* Name + Hours */}
                                    <div className="stalls__card-title-row">
                                        <span className="stalls__card-name">{stall.shop_name}</span>
                                        <span className="stalls__card-rating" title="Hours">
                                            {formatTime(stall.opening_time)} – {formatTime(stall.closing_time)}
                                        </span>
                                    </div>

                                    {/* Address + Phone */}
                                    <div className="stalls__card-meta">
                                        <div className="stalls__meta-item">
                                            <DistanceIcon />
                                            {[stall.address1, stall.city].filter(Boolean).join(", ")}
                                        </div>
                                        <div className="stalls__meta-item">
                                            <PhoneIcon />
                                            {stall.phone}
                                        </div>
                                    </div>

                                    {/* Mini Map — click opens Google Maps */}
                                    <MiniMap stall={stall} />
                                </div>

                                {/* Actions */}
                                <div className="stalls__card-actions" style={{ padding: "0 16px 16px" }}>
                                    <button
                                        className="stalls__btn stalls__btn--navigate"
                                        onClick={() => window.open(buildMapUrl(stall), "_blank", "noopener,noreferrer")}
                                    >
                                        <NavigateIcon /> Navigate
                                    </button>
                                    <button
                                        className="stalls__btn stalls__btn--call"
                                        onClick={() => window.location.href = `tel:${stall.phone}`}
                                    >
                                        <PhoneIcon /> Quick Call
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}