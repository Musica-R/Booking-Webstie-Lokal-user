import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ServicesPage.css";

// ── Category Images ───────────────────────────────────────────────────────────
const CATEGORY_IMAGES = {
    "Electrician":      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
    "Plumber":          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "AC Repair":        "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?auto=format&fit=crop&w=600&q=80",
    "Painting":         "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
    "Cleaning":         "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80",
    "Car Wash":         "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80",
    "RO Service":       "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80",
    "CCTV Install":     "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80",
    "Pest Control":     "https://images.unsplash.com/photo-1632408258154-97a4c6e0d8e3?w=600&q=80",
    "Appliance Repair": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80",
    "Carpenter":        "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=600&q=80",
    "Tank Cleaning":    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=80",
};

const DEFAULT_COVER = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80";
const PAGE_SIZE = 6;
const safeLC = (val) => (val ?? "").toString().toLowerCase();

// ── Icons (unchanged) ─────────────────────────────────────────────────────────
const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const FilterIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);
const BoltIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);
const StarIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);
const PhoneIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);
const ShieldIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
    </svg>
);
const LocationIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);
const ChevronLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);
const ChevronRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);
const HomeIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);
const Chevron = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);
const ClearIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const LockIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

// ── Helper: read & parse user from localStorage ───────────────────────────────
function getStoredUser() {
    try {
        const raw = localStorage.getItem("user");
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        // Accept both {isLoggedIn: true, ...} and any truthy object
        return parsed?.isLoggedIn ? parsed : null;
    } catch {
        return null;
    }
}

// ── Professional Card ─────────────────────────────────────────────────────────
// ── Heart Icon ────────────────────────────────────────────────────────────────
const HeartIcon = ({ filled }) => (
    <svg width="16" height="16" viewBox="0 0 24 24"
        fill={filled ? "#ef4444" : "none"}
        stroke={filled ? "#ef4444" : "#9ca3af"}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transition: "fill 0.2s, stroke 0.2s, transform 0.15s" }}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

// ── Professional Card ─────────────────────────────────────────────────────────
function ProfessionalCard({ vendor, onBook, isLoggedIn }) {
    const API_URL    = process.env.REACT_APP_API_URL;
    const coverImg   = CATEGORY_IMAGES[vendor.category] || DEFAULT_COVER;
    const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.full_name ?? "?")}&background=2563eb&color=fff&size=80`;

    const [faved,    setFaved]    = useState(false);
    const [favBusy,  setFavBusy]  = useState(false);

    const handleFav = async (e) => {
        e.stopPropagation();
        if (!isLoggedIn) return;           // silently ignore if not logged in
        if (favBusy) return;

        const user = getStoredUser();
        if (!user?.id) return;

        setFavBusy(true);
        try {
            const res = await fetch(`${API_URL}/fav/toggle`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user.id, vendor_id: vendor.id }),
            });
            if (res.ok) setFaved(prev => !prev);
        } catch {
            // silently fail — network issue
        } finally {
            setFavBusy(false);
        }
    };

    useEffect(() => {
    const loadFavoriteStatus = async () => {
        const user = getStoredUser();

        if (!user?.id) return;

        try {
            const res = await fetch(
                `${API_URL}/fav/check?user_id=${user.id}&vendor_id=${vendor.id}`
            );

            const data = await res.json();

            if (data.success) {
                setFaved(data.is_favorite);
            }
        } catch (error) {
            console.error(error);
        }
    };

    loadFavoriteStatus();
}, [vendor.id, API_URL]);

    return (
        <div className="sp-card">
            {/* Cover */}
            <div className="sp-card__cover">
                <img
                    src={coverImg}
                    alt={vendor.full_name}
                    className="sp-card__cover-img"
                    onError={(e) => { e.target.src = DEFAULT_COVER; }}
                />
                <div className="sp-card__rating">
                    <StarIcon />
                    <span>{vendor.rating}</span>
                </div>
                <div className="sp-card__avatar-wrap">
                    <img
                        src={vendor.profile_url || avatarFallback}
                        alt={vendor.full_name}
                        className="sp-card__avatar"
                        onError={(e) => { e.target.src = avatarFallback; }}
                    />
                </div>
            </div>

            {/* Body */}
            <div className="sp-card__body">
                <div className="sp-card__name-row">
                    <h3 className="sp-card__name">{vendor.full_name ?? "Unknown"}</h3>

                    {/* Heart button — right of name, before shield */}
                    <button
                        className={`sp-card__fav ${faved ? "sp-card__fav--active" : ""} ${!isLoggedIn ? "sp-card__fav--disabled" : ""}`}
                        onClick={handleFav}
                        aria-label={faved ? "Remove from favourites" : "Add to favourites"}
                        title={!isLoggedIn ? "Login to save favourites" : faved ? "Saved" : "Save"}
                        disabled={favBusy}
                    >
                        <HeartIcon filled={faved} />
                    </button>

                    <ShieldIcon />
                </div>
                <div className="sp-card__meta">
                    <span className="sp-card__exp">{vendor.experience ?? "N/A"} exp</span>
                    <span className="sp-card__dot">•</span>
                    <LocationIcon />
                    <span className="sp-card__dist">{vendor.city ?? "—"}</span>
                    <span className="sp-card__category">{vendor.category ?? "—"}</span>
                </div>

                {/* Actions */}
                <div className="sp-card__actions">
                    <a className="sp-card__call" href={`tel:${vendor.phone ?? ""}`}>
                        <PhoneIcon /> Call
                    </a>
                    <button
                        className={`sp-card__book ${!isLoggedIn ? "sp-card__book--guest" : ""}`}
                        onClick={() => onBook(vendor)}
                        title={!isLoggedIn ? "Login required to book" : `Book ${vendor.full_name}`}
                    >
                        {isLoggedIn ? (
                            "Book"
                        ) : (
                            <><LockIcon /> Login to Book</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── ServicesPage ──────────────────────────────────────────────────────────────
export default function ServicesPage() {
    const API_URL  = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [vendors,     setVendors]     = useState([]);
    const [loading,     setLoading]     = useState(true);
    const [error,       setError]       = useState(null);
    const [search,      setSearch]      = useState("");
    const [page,        setPage]        = useState(1);

    // ── Auth state — read once on mount, then listen for login/logout events ──
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!getStoredUser());

    useEffect(() => {
        // Sync when user logs in from another tab or via the custom event
        const handleStorageChange = () => setIsLoggedIn(!!getStoredUser());
        const handleLoginEvent    = () => setIsLoggedIn(!!getStoredUser());

        window.addEventListener("storage",   handleStorageChange);
        window.addEventListener("userLogin", handleLoginEvent);
        window.addEventListener("userLogout", handleStorageChange);

        return () => {
            window.removeEventListener("storage",    handleStorageChange);
            window.removeEventListener("userLogin",  handleLoginEvent);
            window.removeEventListener("userLogout", handleStorageChange);
        };
    }, []);

    // ── Fetch vendors ─────────────────────────────────────────────────────────
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                setLoading(true);
                setError(null);
                const res  = await fetch(`${API_URL}/vendors/list-vendors`);
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                if (data.success && Array.isArray(data.vendors)) {
                    setVendors(data.vendors);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVendors();
    }, [API_URL]);

    // ── Filter ────────────────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return vendors;
        return vendors.filter(v =>
            safeLC(v.full_name).includes(q) ||
            safeLC(v.city).includes(q)      ||
            safeLC(v.category).includes(q)  ||
            safeLC(v.shop_name).includes(q)
        );
    }, [vendors, search]);

    // ── Pagination ────────────────────────────────────────────────────────────
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
    const clearSearch  = ()    => { setSearch(""); setPage(1); };

    // ── Book handler: guard with auth check ───────────────────────────────────
    const handleBook = (vendor) => {
        const user = getStoredUser();
        if (!user) {
            // Send them to login; pass the intended destination so Login can redirect back
            navigate("/login", { state: { redirectTo: `/booking/${vendor.id}` } });
            return;
        }
        navigate(`/booking/${vendor.id}`);
    };

    const handlePageChange = (p) => {
        if (p >= 1 && p <= totalPages) setPage(p);
    };

    const pageNumbers = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (page <= 3)              return [1, 2, 3, "...", totalPages];
        if (page >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        return [1, "...", page, "...", totalPages];
    };

    const countLabel = () => {
        if (filtered.length === 0) return "No professionals found";
        const from = (page - 1) * PAGE_SIZE + 1;
        const to   = Math.min(page * PAGE_SIZE, filtered.length);
        return `Showing ${from}–${to} of ${filtered.length} professionals`;
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="sp-page">

            {/* Hero Header */}
            <div className="sp-hero">
                <div className="sp-hero__inner">
                    <nav className="sp-breadcrumb">
                        <HomeIcon /><span>Home</span>
                        <Chevron /><span>Services</span>
                        <Chevron /><strong>All Professionals</strong>
                    </nav>

                    <div className="sp-hero__content">
                        <div className="sp-hero__left">
                            <div className="sp-hero__icon-wrap">
                                <BoltIcon />
                            </div>
                            <div>
                                <h1 className="sp-hero__title">
                                    Service Professionals<br />Near You
                                </h1>
                                <p className="sp-hero__sub">
                                    {loading
                                        ? "Loading..."
                                        : `${filtered.length} verified professional${filtered.length !== 1 ? "s" : ""} available`}
                                </p>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="sp-hero__search">
                            <SearchIcon />
                            <input
                                className="sp-hero__search-input"
                                placeholder="Search by name, category or area..."
                                value={search}
                                onChange={handleSearch}
                            />
                            {search && (
                                <button
                                    className="sp-hero__search-clear"
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                >
                                    <ClearIcon />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="sp-body">

                {/* Filters bar */}
                <div className="sp-filters-bar">
                    <button className="sp-filters-btn">
                        <FilterIcon /> Filters
                    </button>

                    {/* ── Auth hint banner — only shown when not logged in ── */}
                    {!isLoggedIn && (
                        <div className="sp-auth-hint">
                            <LockIcon />
                            <span>
                                <button
                                    className="sp-auth-hint__link"
                                    onClick={() => navigate("/login")}
                                >
                                    Log in
                                </button>{" "}
                                to book a professional
                            </span>
                        </div>
                    )}
                </div>

                {loading && <div className="sp-empty">Loading professionals...</div>}

                {!loading && error && (
                    <div className="sp-empty" style={{ color: "#dc2626" }}>
                        Failed to load vendors: {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="sp-count-row">
                        <span className="sp-count-text">{countLabel()}</span>
                        {search && (
                            <span className="sp-search-tag">
                                "{search}"
                                <button onClick={clearSearch} className="sp-search-tag__close">
                                    <ClearIcon />
                                </button>
                            </span>
                        )}
                    </div>
                )}

                {!loading && !error && (
                    paginated.length === 0 ? (
                        <div className="sp-empty">
                            No professionals found for "<strong>{search}</strong>".
                            <br />
                            <button className="sp-empty__clear-btn" onClick={clearSearch}>
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <div className="sp-grid">
                            {paginated.map((vendor) => (
                                <ProfessionalCard
                                    key={vendor.id}
                                    vendor={vendor}
                                    onBook={handleBook}
                                    isLoggedIn={isLoggedIn}   // ← passed down
                                />
                            ))}
                        </div>
                    )
                )}

                {!loading && !error && totalPages > 1 && (
                    <div className="sp-pagination">
                        <button
                            className="sp-page-btn sp-page-btn--nav"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            <ChevronLeft />
                        </button>
                        {pageNumbers().map((p, i) =>
                            p === "..." ? (
                                <span key={`ellipsis-${i}`} className="sp-page-ellipsis">...</span>
                            ) : (
                                <button
                                    key={p}
                                    className={`sp-page-btn ${page === p ? "sp-page-btn--active" : ""}`}
                                    onClick={() => handlePageChange(p)}
                                >
                                    {p}
                                </button>
                            )
                        )}
                        <button
                            className="sp-page-btn sp-page-btn--nav"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}