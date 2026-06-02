import { useState } from "react";
import "../styles/Footer.css";

const socialLinks = [
    {
        label: "Facebook",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        label: "Twitter / X",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
];

const colOne = [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact Support", href: "#" },
    { label: "Become a Vendor", href: "#", bold: true },
];

const colTwo = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Cancellation Policy", href: "#" },
    { label: "Trust & Safety", href: "#" },
];

const ArrowRight = () => (
    <svg viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer className="footer" role="contentinfo">
            <div className="footer-top">
                {/* Brand */}
                <div className="footer-brand">
                    <div className="footer-logo" aria-label="Lokal">
                        <span className="footer-logo-text">Lokal</span>
                        <span className="footer-logo-dot" aria-hidden="true">.</span>
                    </div>
                    <p className="footer-tagline">
                        Your trusted hyperlocal platform to book verified services, skilled
                        professionals, and engaging co-curricular activities near your
                        doorstep.
                    </p>
                    <nav className="footer-socials" aria-label="Social media links">
                        {socialLinks.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                className="footer-social-btn"
                                aria-label={s.label}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Link column 1 */}
                <nav className="footer-links" aria-label="Company links">
                    <ul>
                        {colOne.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className={link.bold ? "footer-link-bold" : ""}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Link column 2 */}
                <nav className="footer-links" aria-label="Legal links">
                    <ul>
                        {colTwo.map((link) => (
                            <li key={link.label}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Newsletter */}
                <div className="footer-newsletter">
                    <p className="footer-newsletter-title">
                        Subscribe to our newsletter for the latest offers and updates.
                    </p>
                    {subscribed ? (
                        <p style={{ color: "#4ade80", fontSize: "14px", fontWeight: 500 }}>
                            ✓ Thanks for subscribing!
                        </p>
                    ) : (
                        <div className="footer-input-wrap">
                            <input
                                type="email"
                                className="footer-email-input"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                                aria-label="Email address for newsletter"
                            />
                            <button
                                className="footer-subscribe-btn"
                                onClick={handleSubscribe}
                                aria-label="Subscribe to newsletter"
                            >
                                Subscribe <ArrowRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
                <p className="footer-copyright">
                    © 2026 Lokal Technologies Pvt Ltd. All rights reserved.
                </p>
                <p className="footer-made">
                    Made with <span className="footer-heart" aria-label="love">♥</span> in India
                </p>
            </div>
        </footer>
    );
}