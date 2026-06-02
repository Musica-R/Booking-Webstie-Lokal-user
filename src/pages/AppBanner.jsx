import "../styles/AppBanner.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const CheckCircleIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const PlayStoreIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
    </svg>
);

const AppleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
);

// ── Features ──────────────────────────────────────────────────────────────────
const FEATURES = [
    "Real-time tracking of professionals",
    "Exclusive app-only discounts & offers",
    "One-tap secure payments",
    "Instant chat support",
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function AppBanner() {
    return (
        <section className="app-banner">
            <div className="app-banner__card">

                {/* ── Left ── */}
                <div className="app-banner__left">
                    <h2 className="app-banner__title">
                        Get the Lokal App for
                        <span className="app-banner__title-highlight">Faster Bookings</span>
                    </h2>

                    <p className="app-banner__desc">
                        Download our mobile app to track your service professionals in
                        real-time, get exclusive offers, and manage bookings effortlessly.
                    </p>

                    <ul className="app-banner__features">
                        {FEATURES.map((f) => (
                            <li className="app-banner__feature" key={f}>
                                <CheckCircleIcon />
                                {f}
                            </li>
                        ))}
                    </ul>

                    {/* Store buttons */}
                    <div className="app-banner__store-btns">
                        <a href="#" className="app-banner__store-btn">
                            <PlayStoreIcon />
                            <div className="app-banner__store-label">
                                <span className="app-banner__store-sub">Get it on</span>
                                <span className="app-banner__store-name">Google Play</span>
                            </div>
                        </a>

                        <a href="#" className="app-banner__store-btn">
                            <AppleIcon />
                            <div className="app-banner__store-label">
                                <span className="app-banner__store-sub">Download on the</span>
                                <span className="app-banner__store-name">App Store</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* ── Right — Phone Mockup ── */}
                <div className="app-banner__right">
                    {/* Shadow phone behind */}
                    <div className="app-banner__phone-shadow" />

                    {/* Main phone */}
                    <div className="app-banner__phone">
                        <div className="app-banner__phone-notch" />
                        <div className="app-banner__phone-screen">
                            <div className="app-banner__phone-location">Current Location</div>
                            <div className="app-banner__phone-city">Bengaluru, KA</div>

                            <div className="app-banner__phone-offer">
                                <div className="app-banner__phone-offer-label">Special Offer</div>
                                <div className="app-banner__phone-offer-text">50% OFF on AC<br />Repair</div>
                            </div>

                            <div className="app-banner__phone-skeleton">
                                <div className="app-banner__phone-line app-banner__phone-line--long" />
                                <div className="app-banner__phone-line app-banner__phone-line--medium" />
                                <div className="app-banner__phone-line app-banner__phone-line--short" />
                                <div className="app-banner__phone-line app-banner__phone-line--long" />
                                <div className="app-banner__phone-line app-banner__phone-line--medium" />
                                <div className="app-banner__phone-line app-banner__phone-line--short" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}