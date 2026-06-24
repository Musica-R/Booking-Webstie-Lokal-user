import { useNavigate } from "react-router-dom";
import "../styles/Activities.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const ArrowRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const PinIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const ACTIVITIES = [
    { id: 3,  name: "Dance",           emoji: "💃",  color: "pink",     rating: 4.9, trainers: "45+ Trainers", location: "Whitefield, BLR"  },
    { id: 7,  name: "Drawing",         emoji: "🎨",  color: "cream",    rating: 4.7, trainers: "22+ Trainers", location: "BTM Layout, BLR"  },
    { id: 1,  name: "Gym",             emoji: "🏋️",  color: "yellow",   rating: 4.8, trainers: "30+ Trainers", location: "Indiranagar, BLR" },
    { id: 5,  name: "Karate",          emoji: "🥋",  color: "peach",    rating: 4.8, trainers: "18+ Trainers", location: "Jayanagar, BLR"   },
    { id: 10, name: "Meditation",      emoji: "🪷",  color: "teal",     rating: 4.9, trainers: "15+ Trainers", location: "JP Nagar, BLR"    },
    { id: 4,  name: "Music Class",     emoji: "🎸",  color: "rose",     rating: 4.6, trainers: "32+ Trainers", location: "Malleswaram, BLR" },
    { id: 6,  name: "Silambam",        emoji: "🥢",  color: "lavender", rating: 4.8, trainers: "8+ Trainers",  location: "Koramangala, BLR" },
    { id: 11, name: "Spoken English",  emoji: "🗣️", color: "sky",      rating: 4.5, trainers: "50+ Trainers", location: "Online / Offline"  },
    { id: 8,  name: "Swimming",        emoji: "🏊",  color: "mint",     rating: 4.7, trainers: "20+ Trainers", location: "HSR Layout, BLR"  },
    { id: 12, name: "Tuition",         emoji: "📚",  color: "lilac",    rating: 4.6, trainers: "60+ Trainers", location: "Online / Offline"  },
    { id: 2,  name: "Yoga",            emoji: "🧘",  color: "lavender", rating: 4.9, trainers: "24+ Trainers", location: "Indiranagar, BLR" },
    { id: 9,  name: "Zumba",           emoji: "🕺",  color: "lilac",    rating: 4.8, trainers: "28+ Trainers", location: "Marathahalli, BLR"},
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Activities() {
    const navigate = useNavigate();

    const handleBook = (act) => {
        navigate(`/activity-booking/${encodeURIComponent(act.name)}`);
    };

    return (
        <section className="activities">
            {/* Top Row */}
            <div className="activities__top">
                <div>
                    <h2 className="activities__heading">Co-Curricular Activities</h2>
                    <p className="activities__sub">
                        Discover and book top-rated trainers for fitness, arts, and skill
                        development near you.
                    </p>
                </div>
                <a href="/activity" className="activities__view-all">
                    View All Activities <ArrowRight />
                </a>
            </div>

            {/* Grid */}
            <div className="activities__grid">
                {ACTIVITIES.map((act) => (
                    <div
                        key={act.id}
                        className={`activities__card activities__card--${act.color}`}
                        onClick={() => handleBook(act)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="activities__icon">{act.emoji}</div>
                        <div className="activities__card-name">{act.name}</div>
                        <div className="activities__rating">
                            <span className="activities__rating-star">★</span>
                            <span className="activities__rating-score">{act.rating}</span>
                            <span className="activities__rating-count">{act.trainers}</span>
                        </div>
                        <div className="activities__location">
                            <PinIcon />
                            {act.location}
                        </div>
                        <button
                            className="activities__book-btn"
                            onClick={(e) => {
                                e.stopPropagation(); // prevent double-fire from card click
                                handleBook(act);
                            }}
                        >
                            Book Trainer
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}