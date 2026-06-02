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

// ── Data ──────────────────────────────────────────────────────────────────────
const PROFESSIONALS = [
    {
        id: 1,
        name: "Ramesh Kumar",
        profession: "Electrician",
        experience: "8 yrs exp",
        location: "Indiranagar, BLR",
        rating: 4.9,
        reviews: 342,
        availability: "available",
        coverImg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&q=80",
        avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
        id: 2,
        name: "Suresh Plumbing",
        profession: "Plumber",
        experience: "12 yrs exp",
        location: "Koramangala, BLR",
        rating: 4.8,
        reviews: 215,
        availability: "available",
        coverImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
        avatarImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    },
    {
        id: 3,
        name: "Priya Sharma",
        profession: "Yoga Trainer",
        experience: "5 yrs exp",
        location: "HSR Layout, BLR",
        rating: 5,
        reviews: 128,
        availability: "busy",
        coverImg: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=700&q=80",
        avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Professionals() {
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

            {/* Grid */}
            <div className="professionals__grid">
                {PROFESSIONALS.map((pro) => (
                    <div className="professionals__card" key={pro.id}>

                        {/* Cover Image */}
                        <div className="professionals__img-wrap">
                            <img
                                className="professionals__img"
                                src={pro.coverImg}
                                alt={pro.profession}
                            />
                            <div className="professionals__img-overlay" />

                            {/* Profession + Experience badges */}
                            <div className="professionals__img-badges">
                                <span className="professionals__badge">{pro.profession}</span>
                                <span className="professionals__badge">{pro.experience}</span>
                            </div>

                            {/* Avatar */}
                            <div className="professionals__avatar-wrap">
                                <img
                                    className="professionals__avatar"
                                    src={pro.avatarImg}
                                    alt={pro.name}
                                />
                            </div>
                        </div>

                        {/* Body */}
                        <div className="professionals__card-body">
                            <div className="professionals__card-name">{pro.name}</div>

                            <div className="professionals__card-location">
                                <PinIcon />
                                {pro.location}
                            </div>

                            {/* Rating + Availability */}
                            <div className="professionals__card-meta">
                                <div className="professionals__rating">
                                    <span className="star">★</span>
                                    <span className="professionals__rating-score">{pro.rating}</span>
                                    <span className="professionals__rating-reviews">
                                        ({pro.reviews} reviews)
                                    </span>
                                </div>

                                <div className={`professionals__availability professionals__availability--${pro.availability}`}>
                                    <span className="professionals__availability-dot" />
                                    {pro.availability === "available" ? "Available Now" : "Busy"}
                                </div>
                            </div>

                            <div className="professionals__divider" />

                            {/* Actions */}
                            <div className="professionals__actions">
                                <button
                                    className="professionals__btn professionals__btn--call"
                                    onClick={() => alert(`Calling ${pro.name}...`)}
                                >
                                    <PhoneIcon /> Call
                                </button>
                                <button
                                    className="professionals__btn professionals__btn--book"
                                    onClick={() => alert(`Booking ${pro.name}...`)}
                                >
                                    <CalendarIcon /> Book Now
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}