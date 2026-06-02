// Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

// ── SVG Icons (inline, zero-dependency) ──────────────────────────────────────
const PinIcon = () => (
    <svg
        className="pin-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const ChevronIcon = () => (
    <svg
        className="chevron-icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const SearchIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const BellIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokelinejoin="round"
    >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const UserIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

// ── Nav links config ──────────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Activities", path: "/activities" },
    { label: "Become a Vendor", path: "/become-vendor" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Listen for login events
        const handleUserLogin = (event) => {
            setUser(event.detail);
        };

        window.addEventListener('userLogin', handleUserLogin);

        return () => {
            window.removeEventListener('userLogin', handleUserLogin);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const handleUserClick = () => {
        navigate('/account');
    };

    return (
        <>
            <nav className="navbar">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-text">Lokal</span>
                    <span className="navbar__logo-dot">.</span>
                </Link>

                {/* Location Selector */}
                <button className="navbar__location" aria-label="Change location">
                    <PinIcon />
                    <span className="navbar__location-label">Bengaluru, KA</span>
                    <ChevronIcon />
                </button>

                {/* Search */}
                <div className="navbar__search">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search nearby services, activities..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search"
                    />
                </div>

                {/* Nav Links */}
                <div className="navbar__links">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.path}
                            className={({ isActive }) =>
                                `navbar__link${isActive ? " navbar__link--active" : ""}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="navbar__actions">
                    <button className="navbar__bell" aria-label="Notifications">
                        <BellIcon />
                        <span className="navbar__bell-badge" aria-hidden="true" />
                    </button>

                    {user ? (
                        <div className="navbar__user-menu">
                            <button
                                className="navbar__user-btn"
                                onClick={handleUserClick}
                                aria-label="User menu"
                            >
                                <UserIcon />
                                <span className="navbar__username">{user.name}</span>
                            </button>
                            <button
                                className="navbar__logout-btn"
                                onClick={handleLogout}
                                aria-label="Logout"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="navbar__cta">Login / Signup</Link>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    className={`navbar__hamburger${menuOpen ? " open" : ""}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </nav>

            {/* Mobile Drawer */}
            <div className={`navbar__drawer${menuOpen ? " open" : ""}`} role="dialog" aria-label="Mobile navigation">
                {/* Mobile Search */}
                <div className="navbar__drawer-search" style={{ position: "relative" }}>
                    <SearchIcon
                        style={{
                            position: "absolute",
                            left: 14,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#9ca3af",
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search nearby services, activities..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Mobile Location */}
                <button className="navbar__location" style={{ alignSelf: "flex-start" }}>
                    <PinIcon />
                    <span className="navbar__location-label">Bengaluru, KA</span>
                    <ChevronIcon />
                </button>

                {/* Mobile Links */}
                {NAV_LINKS.map((link) => (
                    <NavLink
                        key={link.label}
                        to={link.path}
                        className={({ isActive }) =>
                            `navbar__link${isActive ? " navbar__link--active" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        {link.label}
                    </NavLink>
                ))}

                {/* Mobile CTA */}
                {user ? (
                    <>
                        <button
                            className="navbar__drawer-user"
                            onClick={() => {
                                setMenuOpen(false);
                                handleUserClick();
                            }}
                        >
                            <UserIcon />
                            <span>{user.name}</span>
                        </button>
                        <button
                            className="navbar__drawer-logout"
                            onClick={() => {
                                setMenuOpen(false);
                                handleLogout();
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="navbar__drawer-cta" onClick={() => setMenuOpen(false)}>
                        Login / Signup
                    </Link>
                )}
            </div>
        </>
    );
}