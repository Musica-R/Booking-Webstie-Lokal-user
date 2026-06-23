import { useEffect, useState } from "react";

// ── Category → Unsplash image map ────────────────────────────────
const CATEGORY_IMAGES = {
  "Electrician":      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=70&auto=format&fit=crop",
  "Plumber":          "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=70&auto=format&fit=crop",
  "AC Repair":        "https://images.unsplash.com/photo-1581275233117-5ffb8e83e10b?w=600&q=70&auto=format&fit=crop",
  "Painting":         "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=70&auto=format&fit=crop",
  "Housekeeping":     "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=70&auto=format&fit=crop",
  "Car Wash":         "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=70&auto=format&fit=crop",
  "RO Service":       "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=70&auto=format&fit=crop",
  "CCTV Install":     "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70&auto=format&fit=crop",
  "Pest Control":     "https://images.unsplash.com/photo-1599686301988-b6cad1b796c5?w=600&q=70&auto=format&fit=crop",
  "Appliance Repair": "https://images.unsplash.com/photo-1609205807107-a8b15b3b2e26?w=600&q=70&auto=format&fit=crop",
  "Carpenter":        "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?w=600&q=70&auto=format&fit=crop",
  "Tank Cleaning":    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=70&auto=format&fit=crop",
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=70&auto=format&fit=crop";

// ── Star icon ────────────────────────────────────────────────────
const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ── WhatsApp icon ────────────────────────────────────────────────
const WAIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.847L.057 23.571a.75.75 0 0 0 .92.92l5.763-1.504A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.645-.49-5.18-1.348l-.37-.213-3.838 1.002 1.018-3.72-.23-.382A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

// ── Availability label ───────────────────────────────────────────
const availLabel = (val) => {
  const map = { all_days: "All Days", weekdays: "Weekdays", weekends: "Weekends" };
  return map[val] || null;
};

// ── Skeleton cards ───────────────────────────────────────────────
const Skeletons = () =>
  [1, 2, 3].map((k) => (
    <div className="mvl-skeleton" key={k}>
      <div className="mvl-skeleton__img" />
      <div className="mvl-skeleton__body">
        <div className="mvl-skeleton__circle" />
        <div className="mvl-skeleton__lines">
          <div className="mvl-skeleton__line" />
          <div className="mvl-skeleton__line mvl-skeleton__line--short" />
        </div>
      </div>
    </div>
  ));

// ── Main component ───────────────────────────────────────────────
export default function MobileVendorList() {
  const [vendors, setVendors]       = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    Promise.all([
      fetch("http://localhost:5000/api/vendors/list-vendors",    { signal: ctrl.signal }).then(r => r.json()),
      fetch("http://localhost:5000/api/vendors/list-categories", { signal: ctrl.signal }).then(r => r.json()),
    ])
      .then(([vData, cData]) => {
        setVendors(vData.vendors || []);
        setCategories(cData.categories || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Could not load vendors.");
          setLoading(false);
        }
      });

    return () => ctrl.abort();
  }, []);

  const initials = (name) =>
    name
      ? name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
      : "?";

  const openWhatsApp = (e, number) => {
    e.stopPropagation();
    const clean = number.replace(/\D/g, "");
    window.open(`https://wa.me/91${clean}`, "_blank", "noopener");
  };

  const handleBook = (e, vendor) => {
    e.stopPropagation();
    // TODO: wire to your booking flow
    console.log("Book vendor:", vendor.id);
  };

  const filtered =
    activeFilter === "All"
      ? vendors
      : vendors.filter((v) => v.category_name === activeFilter);

  return (
    <div className="mobile-vendor-section">
      <h3 className="mobile-vendor-section__heading">Nearby Vendors</h3>
      <p className="mobile-vendor-section__sub">
        {vendors.length > 0
          ? `${vendors.length} professionals available in your area`
          : "Finding professionals near you…"}
      </p>

      {/* ── Category filter chips ── */}
      {!loading && !error && categories.length > 0 && (
        <div className="mvl-filters">
          {["All", ...categories.map((c) => c.category_name)].map((name) => (
            <button
              key={name}
              className={`mvl-chip${activeFilter === name ? " mvl-chip--active" : ""}`}
              onClick={() => setActiveFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {loading && <Skeletons />}

      {error && (
        <div className="mvl-empty">⚠️ {error}</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="mvl-empty">No vendors found for this category.</div>
      )}

      {!loading &&
        !error &&
        filtered.map((v) => {
          const rating      = parseFloat(v.rating) || 0;
          const hasRating   = rating > 0;
          const avail       = availLabel(v.availability);
          const displayName = v.shop_name?.trim() || v.full_name;
          const coverImg    = CATEGORY_IMAGES[v.category_name] || FALLBACK_IMG;

          return (
            <div className="mvl-card" key={v.id}>

              {/* Cover image */}
              <div className="mvl-cover">
                <img
                  src={coverImg}
                  alt={v.category_name}
                  className="mvl-cover__img"
                />
              </div>

              {/* Card body */}
              <div className="mvl-card-body">
                {/* Avatar (overlaps cover) */}
                <div className="mvl-avatar">
                  {v.profile_url ? (
                    <img
                      src={v.profile_url}
                      alt={v.full_name}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.textContent = initials(v.full_name);
                      }}
                    />
                  ) : (
                    initials(v.full_name)
                  )}
                </div>

                {/* Info */}
                <div className="mvl-info">
                  <div className="mvl-name">{displayName}</div>
                  <div className="mvl-shop">{v.full_name} · {v.category_name}</div>
                  <div className="mvl-meta">
                    <span className="mvl-badge">{v.category_name}</span>
                    {avail && <span className="mvl-badge mvl-badge--avail">{avail}</span>}
                  </div>
                </div>

                {/* Right: rating / exp */}
                <div className="mvl-right">
                  {hasRating ? (
                    <div className="mvl-rating">
                      <StarIcon />
                      {rating.toFixed(1)}
                    </div>
                  ) : (
                    <div className="mvl-exp">
                      {v.experience ? v.experience : "New"}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions row */}
              <div className="mvl-actions">
                {v.whatsapp_number && (
                  <button
                    className="mvl-btn mvl-btn--wa"
                    onClick={(e) => openWhatsApp(e, v.whatsapp_number)}
                    aria-label={`WhatsApp ${v.full_name}`}
                  >
                    <WAIcon /> Chat
                  </button>
                )}
                <button
                  className="mvl-btn mvl-btn--book"
                  onClick={(e) => handleBook(e, v)}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}