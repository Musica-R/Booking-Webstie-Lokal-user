import { useNavigate } from "react-router-dom";
import "../styles/Activities.css";

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

const ACTIVITIES = [
    { id: 3, name: "Dance", emoji: "💃", color: "pink", rating: 4.9, trainers: "45+ Trainers", location: "Whitefield, BLR", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80" },
    { id: 7, name: "Drawing", emoji: "🎨", color: "cream", rating: 4.7, trainers: "22+ Trainers", location: "BTM Layout, BLR", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80" },
    { id: 1, name: "Gym", emoji: "🏋️", color: "yellow", rating: 4.8, trainers: "30+ Trainers", location: "Indiranagar, BLR", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
    { id: 5, name: "Karate", emoji: "🥋", color: "peach", rating: 4.8, trainers: "18+ Trainers", location: "Jayanagar, BLR", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80" },
    { id: 10, name: "Meditation", emoji: "🪷", color: "teal", rating: 4.9, trainers: "15+ Trainers", location: "JP Nagar, BLR", image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&q=80" },
    { id: 4, name: "Music Class", emoji: "🎸", color: "rose", rating: 4.6, trainers: "32+ Trainers", location: "Malleswaram, BLR", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80" },
    { id: 6, name: "Silambam", emoji: "🥢", color: "lavender", rating: 4.8, trainers: "8+ Trainers", location: "Koramangala, BLR", image: "https://images.unsplash.com/photo-1562771379-eafdca7a02f8?w=400&q=80" },
    { id: 11, name: "Spoken English", emoji: "🗣️", color: "sky", rating: 4.5, trainers: "50+ Trainers", location: "Online / Offline", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80" },
    { id: 8, name: "Swimming", emoji: "🏊", color: "mint", rating: 4.7, trainers: "20+ Trainers", location: "HSR Layout, BLR", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80" },
    { id: 12, name: "Tuition", emoji: "📚", color: "lilac", rating: 4.6, trainers: "60+ Trainers", location: "Online / Offline", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80" },
    { id: 2, name: "Yoga", emoji: "🧘", color: "lavender", rating: 4.9, trainers: "24+ Trainers", location: "Indiranagar, BLR", image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&q=80" },
    { id: 9, name: "Zumba", emoji: "🕺", color: "lilac", rating: 4.8, trainers: "28+ Trainers", location: "Marathahalli, BLR", image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80" },
];

const CATEGORIES = [
    {
        label: "Arts & Creative",
        emoji: "🎭",
        ids: [3, 7, 4],
    },
    {
        label: "Fitness & Wellness",
        emoji: "💪",
        ids: [1, 5, 10, 6, 8, 2, 9],
    },
    {
        label: "Education & Learning",
        emoji: "📖",
        ids: [11, 12],
    },
];

const activityById = Object.fromEntries(ACTIVITIES.map((a) => [a.id, a]));

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

            {/* Desktop Grid */}
            <div className="activities__grid activities__grid--desktop">
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
                            onClick={(e) => { e.stopPropagation(); handleBook(act); }}
                        >
                            Book Trainer
                        </button>
                    </div>
                ))}
            </div>

            {/* Mobile Grouped Layout */}

            <div className="activities__mobile-categories">
                {CATEGORIES.map((cat) => (
                    <div key={cat.label} className="activities__category-block">
                        <div className="activities__category-label">
                            <span>{cat.emoji}</span> {cat.label}
                        </div>
                        <div className="activities__scroll-row">
                            {cat.ids.map((id) => {
                                const act = activityById[id];
                                return (
                                    <div
                                        key={act.id}
                                        className="activities__img-card"
                                        onClick={() => handleBook(act)}
                                    >
                                        <img
                                            className="activities__img-card-photo"
                                            src={act.image}
                                            alt={act.name}
                                            loading="lazy"
                                        />
                                        <div className="activities__img-card-overlay" />
                                        <div className="activities__img-card-badge">
                                            {act.emoji} {act.name}
                                        </div>
                                        <div className="activities__img-card-body">
                                            <div className="activities__img-card-name">{act.name}</div>
                                            <div className="activities__img-card-rating">
                                                <span className="activities__img-card-star">★</span>
                                                <span className="activities__img-card-score">{act.rating}</span>
                                                <span className="activities__img-card-count">{act.trainers}</span>
                                            </div>
                                            <button
                                                className="activities__img-card-btn"
                                                onClick={(e) => { e.stopPropagation(); handleBook(act); }}
                                            >
                                                Book Trainer
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}