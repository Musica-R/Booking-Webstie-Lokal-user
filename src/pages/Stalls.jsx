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

const MapPinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
);

// ── Stalls Data ───────────────────────────────────────────────────────────────
const STALLS = [
    {
        id: 1,
        name: "Sri Krishna Tea Stall",
        category: "Tea Shop",
        status: "open",
        rating: 4.8,
        distance: "0.2 km",
        phone: "+91 98765 43210",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
        // Bengaluru coords
        lat: 12.9716,
        lng: 77.5946,
    },
    {
        id: 2,
        name: "Fresh Juice Corner",
        category: "Juice Stall",
        status: "open",
        rating: 4.5,
        distance: "0.4 km",
        phone: "+91 98765 43211",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
        lat: 12.9352,
        lng: 77.6245,
    },
    {
        id: 3,
        name: "Raju Auto Works",
        category: "Mechanic",
        status: "closed",
        rating: 4.9,
        distance: "1.2 km",
        phone: "+91 98765 43212",
        image: "https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?w=600&q=80",
        lat: 12.9279,
        lng: 77.6271,
    },
    {
        id: 4,
        name: "TechFix Mobile Repair",
        category: "Mobile Repair",
        status: "open",
        rating: 4.6,
        distance: "0.8 km",
        phone: "+91 98765 43213",
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80",
        lat: 12.9698,
        lng: 77.7499,
    },
    {
        id: 5,
        name: "Annapoorna Tiffin",
        category: "Food Stall",
        status: "open",
        rating: 4.7,
        distance: "0.3 km",
        phone: "+91 98765 43214",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80",
        lat: 12.9082,
        lng: 77.6476,
    },
];

// ── Mini Map (OpenStreetMap embed) ────────────────────────────────────────────
function MiniMap({ lat, lng }) {
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.005},${lat - 0.005},${lng + 0.005},${lat + 0.005}&layer=mapnik&marker=${lat},${lng}`;
    return (
        <div className="stalls__map">
            <iframe
                title="map"
                src={url}
                loading="lazy"
            />
            <div className="stalls__map-pin">
                <div className="stalls__map-pin-dot">
                    <MapPinIcon />
                </div>
            </div>
        </div>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Stalls() {
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
                    {STALLS.map((stall) => (
                        <div className="stalls__card" key={stall.id}>
                            {/* Image */}
                            <div className="stalls__card-img-wrap">
                                <img
                                    className="stalls__card-img"
                                    src={stall.image}
                                    alt={stall.name}
                                />
                                <span className="stalls__badge-category">{stall.category}</span>
                                <span className={`stalls__badge-status stalls__badge-status--${stall.status}`}>
                                    {stall.status === "open" ? "Open Now" : "Closed"}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="stalls__card-body">
                                {/* Name + Rating */}
                                <div className="stalls__card-title-row">
                                    <span className="stalls__card-name">{stall.name}</span>
                                    <span className="stalls__card-rating">
                                        <span className="star">★</span> {stall.rating}
                                    </span>
                                </div>

                                {/* Distance + Phone */}
                                <div className="stalls__card-meta">
                                    <div className="stalls__meta-item">
                                        <DistanceIcon />
                                        {stall.distance}
                                    </div>
                                    <div className="stalls__meta-item">
                                        <PhoneIcon />
                                        {stall.phone}
                                    </div>
                                </div>

                                {/* Mini Map */}
                                <MiniMap lat={stall.lat} lng={stall.lng} />
                            </div>

                            {/* Actions */}
                            <div className="stalls__card-actions" style={{ padding: "0 16px 16px" }}>
                                <button className="stalls__btn stalls__btn--navigate">
                                    <NavigateIcon /> Navigate
                                </button>
                                <button
                                    className="stalls__btn stalls__btn--call"
                                    onClick={() => window.location.href = `tel:${stall.phone.replace(/\s/g, "")}`}
                                >
                                    <PhoneIcon /> Quick Call
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}