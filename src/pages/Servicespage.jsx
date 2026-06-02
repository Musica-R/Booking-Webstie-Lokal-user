import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useVendors } from "./Vendorcontext";
import "../styles/ServicesPage.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
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
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#f59e0b"
        stroke="#f59e0b" strokeWidth="0">
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

// ── Constants ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 6;

// ── Professional Card ─────────────────────────────────────────────────────────
function ProfessionalCard({ vendor, onBook }) {
    return (
        <div className="sp-card">
            {/* Cover image */}
            <div className="sp-card__cover">
                <img
                    src={vendor.coverImg}
                    alt={vendor.fullName}
                    className="sp-card__cover-img"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80"; }}
                />
                {/* Rating badge */}
                <div className="sp-card__rating">
                    <StarIcon />
                    <span>{vendor.rating}({vendor.reviews})</span>
                </div>
                {/* Avatar */}
                <div className="sp-card__avatar-wrap">
                    <img
                        src={vendor.avatarImg}
                        alt={vendor.fullName}
                        className="sp-card__avatar"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.fullName)}&background=2563eb&color=fff&size=80`; }}
                    />
                </div>
            </div>

            {/* Body */}
            <div className="sp-card__body">
                <div className="sp-card__name-row">
                    <h3 className="sp-card__name">{vendor.fullName}</h3>
                    <ShieldIcon />
                </div>
                <div className="sp-card__meta">
                    <span className="sp-card__exp">{vendor.experience} yrs exp</span>
                    <span className="sp-card__dot">•</span>
                    <LocationIcon />
                    <span className="sp-card__dist">{vendor.distance}</span>
                </div>

                {/* Actions */}
                <div className="sp-card__actions">
                    <button className="sp-card__call">
                        <PhoneIcon /> Call
                    </button>
                    <button className="sp-card__book" onClick={() => onBook(vendor)}>
                        Book
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── ServicesPage ──────────────────────────────────────────────────────────────
export default function ServicesPage() {
    const { vendors } = useVendors();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    // Filter by search
    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        if (!q) return vendors;
        return vendors.filter(v =>
            v.fullName.toLowerCase().includes(q) ||
            v.city.toLowerCase().includes(q) ||
            v.category.toLowerCase().includes(q) ||
            v.shopName.toLowerCase().includes(q)
        );
    }, [vendors, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleBook = (vendor) => {
        // Route to booking with vendor info (uses service id 1 as example)
        navigate(`/booking/1`);
    };

    const handlePageChange = (p) => {
        if (p >= 1 && p <= totalPages) setPage(p);
    };

    // Build page numbers with ellipsis
    const pageNumbers = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (page <= 3) return [1, 2, 3, "...", totalPages];
        if (page >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        return [1, "...", page, "...", totalPages];
    };

    return (
        <div className="sp-page">

            {/* ── Hero Header ── */}
            <div className="sp-hero">
                <div className="sp-hero__inner">
                    {/* Breadcrumb */}
                    <nav className="sp-breadcrumb">
                        <HomeIcon /><span>Home</span>
                        <Chevron /><span>Services</span>
                        <Chevron /><strong>Electrician</strong>
                    </nav>

                    <div className="sp-hero__content">
                        <div className="sp-hero__left">
                            <div className="sp-hero__icon-wrap">
                                <BoltIcon />
                            </div>
                            <div>
                                <h1 className="sp-hero__title">Electrician in<br />Bengaluru</h1>
                                <p className="sp-hero__sub">{filtered.length} verified professionals available near you</p>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="sp-hero__search">
                            <SearchIcon />
                            <input
                                className="sp-hero__search-input"
                                placeholder="Search by name or area..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="sp-body">

                {/* Filters bar */}
                <div className="sp-filters-bar">
                    <button className="sp-filters-btn">
                        <FilterIcon /> Filters
                    </button>
                </div>

                {/* Count row */}
                <div className="sp-count-row">
                    <span className="sp-count-text">
                        Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} professionals
                    </span>
                </div>

                {/* Grid */}
                {paginated.length === 0 ? (
                    <div className="sp-empty">No professionals found. Try a different search.</div>
                ) : (
                    <div className="sp-grid">
                        {paginated.map((vendor) => (
                            <ProfessionalCard key={vendor.id} vendor={vendor} onBook={handleBook} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
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