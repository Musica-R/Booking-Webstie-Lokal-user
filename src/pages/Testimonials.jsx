import "../styles/Testimonials.css";

// ── Quote SVG ─────────────────────────────────────────────────────────────────
const QuoteIcon = () => (
    <svg
        className="testimonials__quote-icon"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="#3b5bdb"
    >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
);

// ── Star renderer ─────────────────────────────────────────────────────────────
function Stars({ rating }) {
    return (
        <div className="testimonials__stars">
            {[1, 2, 3, 4, 5].map((i) => {
                const full = i <= Math.floor(rating);
                const half = !full && i === Math.ceil(rating) && rating % 1 !== 0;
                return (
                    <span
                        key={i}
                        className={`testimonials__star ${full ? "testimonials__star--filled" :
                                half ? "testimonials__star--half" :
                                    "testimonials__star--empty"
                            }`}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const REVIEWS = [
    {
        id: 1,
        rating: 5,
        text: '"Booked an electrician for a midnight emergency. The professional arrived in 20 minutes and fixed the short circuit safely. Highly recommended!"',
        name: "Arjun Reddy",
        city: "Bengaluru",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    },
    {
        id: 2,
        rating: 5,
        text: '"Found an amazing Silambam master for my kids through Lokal. The verified badges gave me peace of mind. The platform is incredibly easy to use."',
        name: "Meera Iyer",
        city: "Chennai",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    },
    {
        id: 3,
        rating: 4.5,
        text: '"Got my AC serviced before summer. The technician was polite, transparent about pricing, and left the place spotless. Great startup!"',
        name: "Vikram Singh",
        city: "Coimbatore",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&q=80",
    },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Testimonials() {
    return (
        <section className="testimonials">
            {/* Header */}
            <div className="testimonials__header">
                <h2 className="testimonials__title">Loved by Thousands</h2>
                <p className="testimonials__subtitle">
                    Don't just take our word for it. See what our customers have to say
                    about their experience.
                </p>
            </div>

            {/* Grid */}
            <div className="testimonials__grid">
                {REVIEWS.map((review) => (
                    <div className="testimonials__card" key={review.id}>
                        {/* Stars + quote icon */}
                        <div className="testimonials__card-top">
                            <Stars rating={review.rating} />
                            <QuoteIcon />
                        </div>

                        {/* Review text */}
                        <p className="testimonials__text">{review.text}</p>

                        {/* Reviewer */}
                        <div className="testimonials__reviewer">
                            <img
                                className="testimonials__avatar"
                                src={review.avatar}
                                alt={review.name}
                            />
                            <div>
                                <div className="testimonials__reviewer-name">{review.name}</div>
                                <div className="testimonials__reviewer-city">{review.city}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}