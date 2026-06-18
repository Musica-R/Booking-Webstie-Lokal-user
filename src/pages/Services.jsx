import "../styles/Services.css";

// ── Arrow Icon ────────────────────────────────────────────────────────────────
const ArrowIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
    </svg>
);

// ── Services Data ─────────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80",
        alt: "Fresh fruits",
        text: "Fresh fruits packed with natural goodness and daily nutrition.",
        link: "https://fresh-fruits-seven-sigma.vercel.app/",
    },
    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
        alt: "Sports turf",
        text:
            "Experience the best turf for football, cricket, and friendly matches with premium facilities and lighting.",
        link: "https://turf-nu.vercel.app/",
    },
    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
        alt: "Modern gym",
        text:
            "Transform your body and mind with modern equipment and expert training.",
        link: "https://gym-ten-mu.vercel.app/",
    },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Services() {
    return (
        <section className="services">
            {/* Header */}
            <div className="services__header">
                <h2 className="services__title">Our Services</h2>
                <p className="services__subtitle">
                    Book your perfect game at the turf and achieve your fitness goals at
                    the gym
                </p>
            </div>

            {/* Cards Grid */}
            <div className="services__grid">
                {SERVICES.map((svc) => (
                    <a
                        href={svc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="services__card"
                        key={svc.id}
                    >
                        <img
                            className="services__card-img"
                            src={svc.image}
                            alt={svc.alt}
                        />
                        <div className="services__card-overlay" />
                        <div className="services__card-body">
                            <p className="services__card-text">{svc.text}</p>
                        </div>
                        <div className="services__card-arrow">
                            <ArrowIcon />
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}