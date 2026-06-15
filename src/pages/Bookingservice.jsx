import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/BookingService.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
const ArrowRight = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);
const ArrowLeft = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);
const ShieldIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);
const LocationIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);
const CalendarIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);
const VerifyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth="0">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const WrenchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);
const ClockIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);
const TagIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
);
const PlusIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);
const WarningIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
        stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

// ── Constants ─────────────────────────────────────────────────────────────────
const STEPS = [
    { id: 1, label: "Details" },
    { id: 2, label: "Date & Time" },
    { id: 3, label: "Address" },
    { id: 4, label: "Payment" },
    { id: 5, label: "Success" },
];

const PAYMENT_OPTS = [
    { id: "upi", icon: "💳", name: "UPI (GPay, PhonePe, Paytm)", sub: "Pay directly from your bank account" },
    { id: "card", icon: "🏧", name: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay accepted" },
    { id: "later", icon: "💵", name: "Pay after service", sub: "Pay via cash or UPI after work is done" },
];

const ADDRESS_TYPES = ["Home", "Office", "Other"];
const ADDR_TYPE_ICONS = { Home: "🏠", Office: "🏢", Other: "📍" };
const emptyAddrForm = { address_type: "Home", flat: "", area: "", city: "", state: "", pincode: "" };

// ── Date display helpers ──────────────────────────────────────────────────────
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Converts an ISO date string "YYYY-MM-DD" into a display object
 * without timezone shifting (parses as local date).
 */
function parseDateString(isoStr) {
    const [year, month, day] = isoStr.split("-").map(Number);
    const d = new Date(year, month - 1, day); // local, no UTC shift
    return {
        day: DAY_NAMES[d.getDay()],
        num: d.getDate(),
        month: MONTH_NAMES[d.getMonth()],
        year: d.getFullYear(),
        full: isoStr,
    };
}

function formatAddress(addr) {
    return [addr.flat, addr.area, addr.city, addr.state, addr.pincode].filter(Boolean).join(", ");
}

// ── Non-Refundable Warning Modal ──────────────────────────────────────────────
const RefundWarningModal = ({ amount, onConfirm, onCancel }) => (
    <div className="bk-modal-overlay">
        <div className="bk-modal">
            <div className="bk-modal-icon">
                <WarningIcon />
            </div>
            <h3 className="bk-modal-title">Payment Notice</h3>

            {/* English */}
            <div className="bk-modal-lang-block">
                <p className="bk-modal-lang-tag">English</p>
                <p className="bk-modal-msg">
                    The payment of <strong>₹{amount}</strong> is <strong>non-refundable</strong> once confirmed.
                    Please make sure your booking details are correct before proceeding.
                </p>
            </div>

            {/* Tamil */}
            <div className="bk-modal-lang-block bk-modal-lang-block--tamil">
                <p className="bk-modal-lang-tag">தமிழ்</p>
                <p className="bk-modal-msg">
                    நீங்கள் செலுத்தவுள்ள <strong>₹{amount}</strong> தொகை உறுதிப்படுத்தப்பட்டதும்
                    <strong> திரும்பப் பெற முடியாது</strong>. தொடர்வதற்கு முன் உங்கள் முன்பதிவு
                    விவரங்களை சரிபார்க்கவும்.
                </p>
            </div>

            <div className="bk-modal-actions">
                <button className="bk-modal-btn-cancel" onClick={onCancel}>
                    Cancel / ரத்து செய்
                </button>
                <button className="bk-modal-btn-confirm" onClick={onConfirm}>
                    I Understand, Pay ₹{amount}
                </button>
            </div>
        </div>
    </div>
);

// ── AddressForm — defined OUTSIDE BookingService to prevent remount on re-render
const AddressForm = ({ onSave, onCancel, saving }) => {
    const [form, setForm] = useState(emptyAddrForm);

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="bk-card">
            <div className="bk-card-head" style={{ marginBottom: 18 }}>
                <LocationIcon />
                <div className="bk-card-head__title">New Address</div>
                <button className="bk-addr-cancel" onClick={onCancel}>✕ Cancel</button>
            </div>

            {/* Address type pills */}
            <div className="bk-addr-type-row">
                {ADDRESS_TYPES.map(type => (
                    <button
                        key={type}
                        className={`bk-addr-type-pill ${form.address_type === type ? "active" : ""}`}
                        onClick={() => handleChange("address_type", type)}>
                        {ADDR_TYPE_ICONS[type]} {type}
                    </button>
                ))}
            </div>

            <div className="bk-form-grid">
                <div className="bk-field">
                    <label>Flat / House / Building</label>
                    <input
                        placeholder="Flat 101, ABC Apts"
                        value={form.flat}
                        onChange={e => handleChange("flat", e.target.value)}
                    />
                </div>
                <div className="bk-field">
                    <label>Area / Locality</label>
                    <input
                        placeholder="Anna Nagar"
                        value={form.area}
                        onChange={e => handleChange("area", e.target.value)}
                    />
                </div>
                <div className="bk-form-row">
                    <div className="bk-field">
                        <label>City</label>
                        <input
                            placeholder="Chennai"
                            value={form.city}
                            onChange={e => handleChange("city", e.target.value)}
                        />
                    </div>
                    <div className="bk-field">
                        <label>State</label>
                        <input
                            placeholder="Tamil Nadu"
                            value={form.state}
                            onChange={e => handleChange("state", e.target.value)}
                        />
                    </div>
                </div>
                <div className="bk-field">
                    <label>Pincode</label>
                    <input
                        placeholder="600040"
                        maxLength={6}
                        value={form.pincode}
                        onChange={e => handleChange("pincode", e.target.value)}
                    />
                </div>
            </div>

            <button
                className="bk-btn-next"
                style={{ marginTop: 16, width: "100%", justifyContent: "center", opacity: saving ? 0.6 : 1 }}
                onClick={() => onSave(form)}
                disabled={saving}>
                {saving ? "Saving…" : "Save Address"}
            </button>
        </div>
    );
};

// ── Stepper — also outside to avoid remount ───────────────────────────────────
const Stepper = ({ step }) => (
    <div className="bk-stepper">
        {STEPS.map(s => {
            const isDone = step > s.id;
            const isActive = step === s.id;
            return (
                <div key={s.id} className={`bk-step ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
                    <div className="bk-step__circle">{isDone ? <CheckIcon /> : s.id}</div>
                    <div className="bk-step__label">{s.label}</div>
                </div>
            );
        })}
    </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function BookingService() {
    const { id } = useParams();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const onBack = () => navigate("/");

    /* vendor */
    const [vendor, setVendor] = useState(null);
    const [loadingVendor, setLoadingVendor] = useState(true);
    const [vendorError, setVendorError] = useState(null);

    /* dates — fetched from API */
    const [availDates, setAvailDates] = useState([]);      // [{ full, day, num, month, year, status }]
    const [datesLoading, setDatesLoading] = useState(false);
    const [datesError, setDatesError] = useState(null);

    /* slots — fetched from API when a date is picked */
    const [timeSlots, setTimeSlots] = useState([]);        // [{ time, status }]
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [slotsError, setSlotsError] = useState(null);

    /* booking steps */
    const [step, setStep] = useState(1);
    const [selectedSvcs, setSelectedSvcs] = useState([]);
    const [requirements, setReqs] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedPay, setPay] = useState("upi");

    /* address */
    const [addresses, setAddresses] = useState([]);
    const [addrLoading, setAddrLoading] = useState(false);
    const [selectedAddrId, setSelectedAddrId] = useState(null);
    const [showAddrForm, setShowAddrForm] = useState(false);
    const [addrSaving, setAddrSaving] = useState(false);

    /* warning modal */
    const [showWarning, setShowWarning] = useState(false);

    const bookingId = "LK-2026-04821";

    // ── Fetch vendor ──────────────────────────────────────────────────────────
    useEffect(() => {
        (async () => {
            try {
                setLoadingVendor(true);
                const res = await fetch(`${API_URL}/vendors/single-vendor/${id}`);
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                if (data.success && data.vendor) {
                    setVendor(data.vendor);
                } else throw new Error("Invalid response format");
            } catch (err) {
                setVendorError(err.message);
            } finally {
                setLoadingVendor(false);
            }
        })();
    }, [id]);

    // ── Fetch available dates from API ────────────────────────────────────────
    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                setDatesLoading(true);
                setDatesError(null);
                const res = await fetch(`${API_URL}/slot/booking/available-dates/${id}`);
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    // Enrich each entry with display fields
                    const enriched = data.data.map(item => ({
                        ...parseDateString(item.date),
                        status: item.status, // "available" | "disabled"
                    }));
                    setAvailDates(enriched);
                } else {
                    throw new Error("Invalid dates response");
                }
            } catch (err) {
                setDatesError(err.message);
            } finally {
                setDatesLoading(false);
            }
        })();
    }, [id]);

    // ── Fetch available slots when date changes ───────────────────────────────
    useEffect(() => {
        if (!selectedDate || !id) {
            setTimeSlots([]);
            setSelectedTime(null);
            return;
        }
        (async () => {
            try {
                setSlotsLoading(true);
                setSlotsError(null);
                setSelectedTime(null); // clear previous time selection
                const res = await fetch(`${API_URL}/slot/booking/available-slots/${id}/${selectedDate}`);
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    setTimeSlots(data.data); // [{ time, status }]
                } else {
                    throw new Error("Invalid slots response");
                }
            } catch (err) {
                setSlotsError(err.message);
            } finally {
                setSlotsLoading(false);
            }
        })();
    }, [selectedDate, id]);

    // ── Fetch user addresses ──────────────────────────────────────────────────
    useEffect(() => { fetchAddresses(); }, []);

    const fetchAddresses = async () => {
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        const userId = storedUser._id || storedUser.id;
        if (!userId) return;
        setAddrLoading(true);
        try {
            const res = await fetch(`${API_URL}/address/user-address/${userId}`);
            const data = await res.json();
            if (res.ok && data.success) {
                const list = data.addresses || [];
                setAddresses(list);
                if (list.length > 0) setSelectedAddrId(list[0]._id || list[0].id);
            }
        } catch (err) {
            console.error("Failed to fetch addresses:", err);
        } finally {
            setAddrLoading(false);
        }
    };

    /* save new address — receives form data from AddressForm */
    const handleSaveAddress = async (formData) => {
        const { flat, area, city, state, pincode } = formData;
        if (!flat || !area || !city || !state || !pincode) {
            alert("Please fill in all fields.");
            return;
        }
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        const userId = storedUser._id || storedUser.id;
        setAddrSaving(true);
        try {
            const res = await fetch(`${API_URL}/address/add-address`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId, ...formData }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                await fetchAddresses();
                setShowAddrForm(false);
            } else {
                alert(data.message || "Failed to add address.");
            }
        } catch (err) {
            alert("Server error. Please try again.");
        } finally {
            setAddrSaving(false);
        }
    };

    const buildBookingPayload = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return {
            user_id: user.id,
            vendor_id: vendor.id,
            customer_name: user.name,
            customer_phone: user.phone,
            customer_address: selectedAddrId,
            booking_date: selectedDate,
            booking_time: selectedTime,
            total_amount: total,
            category_id: vendor.category.id,
            services: selectedSvcs.map(s => ({
                sub_service_id: s.sub_service_id,
                price: s.price
            }))
        };
    };

    /* show warning first, then proceed to Razorpay */
    const handleConfirmClick = () => {
        setShowWarning(true);
    };

    const handleWarningConfirm = () => {
        setShowWarning(false);
        handlePayment();
    };

    const handlePayment = async () => {
        try {
            const res = await fetch(`${API_URL}/payment/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: total })
            });

            const data = await res.json();

            if (!data.success) {
                alert("Order creation failed");
                return;
            }

            const order = data.order;

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Service Booking",
                description: "Booking Payment",
                order_id: order.id,

                handler: async function (response) {
                    const verifyRes = await fetch(`${API_URL}/booking/verify-payment`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingData: buildBookingPayload()
                        })
                    });

                    const result = await verifyRes.json();

                    if (result.success) {
                        setStep(5);
                    } else {
                        alert("Payment verification failed");
                    }
                },

                prefill: {
                    name: JSON.parse(localStorage.getItem("user")).name,
                    email: JSON.parse(localStorage.getItem("user")).email,
                    contact: JSON.parse(localStorage.getItem("user")).phone,
                },

                theme: { color: "#2563eb" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error(error);
        }
    };

    /* pricing — no tax, no discount */
    const total = selectedSvcs.reduce((s, sv) => s + parseFloat(sv.price), 0);

    const toggleService = (svc) =>
        setSelectedSvcs(prev =>
            prev.find(s => s.sub_service_id === svc.sub_service_id)
                ? prev.filter(s => s.sub_service_id !== svc.sub_service_id)
                : [...prev, svc]
        );

    const isChecked = (svc) => !!selectedSvcs.find(s => s.sub_service_id === svc.sub_service_id);
    const goNext = () => setStep(s => Math.min(s + 1, 5));
    const goBack = () => setStep(s => Math.max(s - 1, 1));

    const selectedDateObj = availDates.find(d => d.full === selectedDate);
    const selectedAddr = addresses.find(a => (a._id || a.id) === selectedAddrId);
    const avatarFallback = vendor
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.full_name)}&background=2563eb&color=fff&size=80`
        : "";

    // Derive a human-readable availability label from the vendor field (still used in Step 2 banner)
    const availLabel = {
        all_days: "Available all days",
        weekdays: "Available Mon – Fri",
        weekends: "Available Sat & Sun",
    }[vendor?.availability] || "";

    /* ── Loading / Error ── */
    if (loadingVendor) return (
        <div className="bk-page">
            <Stepper step={step} />
            <div className="bk-loader">
                <div className="bk-spinner" />
                <p>Loading professional details…</p>
            </div>
        </div>
    );

    if (vendorError || !vendor) return (
        <div className="bk-page">
            <Stepper step={step} />
            <div className="bk-loader">
                <p style={{ color: "#dc2626" }}>Failed to load vendor: {vendorError || "Unknown error"}</p>
                <button className="bk-btn-outline" style={{ marginTop: 16, width: "auto" }} onClick={onBack}>
                    Back to Home
                </button>
            </div>
        </div>
    );

    return (
        <div className="bk-page">
            {/* ── Warning Modal ── */}
            {showWarning && (
                <RefundWarningModal
                    amount={total.toFixed(0)}
                    onConfirm={handleWarningConfirm}
                    onCancel={() => setShowWarning(false)}
                />
            )}

            <Stepper step={step} />
            <div className="bk-content">

                {/* ══ STEP 1 — Service Selection ══ */}
                {step === 1 && (
                    <div className="bk-step-body">
                        <p className="bk-subtitle">Review the professional and select one or more services.</p>

                        <div className="bk-card bk-pro-card">
                            <div className="bk-pro-card__avatar-col">
                                <img
                                    src={vendor.profile_url || avatarFallback}
                                    alt={vendor.full_name}
                                    className="bk-pro-card__avatar"
                                    onError={e => { e.target.src = avatarFallback; }}
                                />
                                <span className="bk-pro-card__category-pill">{vendor.category.name}</span>
                            </div>
                            <div className="bk-pro-card__info">
                                <div className="bk-pro-card__name-row">
                                    <h2 className="bk-pro-card__name">{vendor.full_name}</h2>
                                    <VerifyIcon />
                                </div>
                                <p className="bk-pro-card__shop">{vendor.shop_name}</p>
                                <div className="bk-pro-card__badges">
                                    <span className="bk-badge bk-badge--star">★ 4.5</span>
                                    <span className="bk-badge">{vendor.experience} exp</span>
                                    <span className="bk-badge"><LocationIcon /> {vendor.city}</span>
                                </div>
                                <p className="bk-pro-card__desc">{vendor.business_description}</p>
                            </div>
                        </div>

                        <div className="bk-card">
                            <div className="bk-card-head">
                                <WrenchIcon />
                                <div>
                                    <div className="bk-card-head__title">Select Services</div>
                                    <div className="bk-card-head__sub">You can choose multiple services</div>
                                </div>
                                {selectedSvcs.length > 0 && (
                                    <span className="bk-selected-badge">{selectedSvcs.length} selected</span>
                                )}
                            </div>
                            <div className="bk-svc-grid">
                                {vendor.services.map(svc => {
                                    const checked = isChecked(svc);
                                    return (
                                        <div key={svc.sub_service_id}
                                            className={`bk-svc-tile ${checked ? "checked" : ""}`}
                                            onClick={() => toggleService(svc)}>
                                            <div className="bk-svc-tile__checkbox">
                                                {checked && (
                                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                                        <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2"
                                                            strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="bk-svc-tile__body">
                                                <span className="bk-svc-tile__name">{svc.service_name}</span>
                                                <span className="bk-svc-tile__price">₹{parseFloat(svc.price).toFixed(0)}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {selectedSvcs.length > 0 && (
                                <div className="bk-svc-subtotal">
                                    <span className="bk-svc-subtotal__label">
                                        {selectedSvcs.length} service{selectedSvcs.length > 1 ? "s" : ""} selected
                                    </span>
                                    <span className="bk-svc-subtotal__amount">Subtotal: ₹{total.toFixed(0)}</span>
                                </div>
                            )}
                        </div>

                        <div className="bk-nav bk-nav--right">
                            <button className="bk-btn-next" onClick={goNext}
                                disabled={selectedSvcs.length === 0}
                                style={{
                                    opacity: selectedSvcs.length === 0 ? 0.5 : 1,
                                    cursor: selectedSvcs.length === 0 ? "not-allowed" : "pointer"
                                }}>
                                Continue to Date &amp; Time <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ STEP 2 — Date & Time ══ */}
                {step === 2 && (
                    <div className="bk-step-body">
                        <p className="bk-subtitle">Pick a date and a convenient time slot.</p>

                        {/* Availability banner — only shown if vendor has availability field */}
                        {availLabel && (
                            <div className="bk-avail-banner">
                                <ClockIcon />
                                <span><strong>{availLabel}</strong></span>
                            </div>
                        )}

                        {/* ── Date picker ── */}
                        <div className="bk-card">
                            <div className="bk-card-head">
                                <CalendarIcon />
                                <div>
                                    <div className="bk-card-head__title">Select Date</div>
                                    <div className="bk-card-head__sub">
                                        {availDates.length > 0
                                            ? `${availDates[0].month} ${availDates[0].year}`
                                            : "No dates available"}
                                    </div>
                                </div>
                            </div>

                            {datesLoading ? (
                                <div style={{ textAlign: "center", padding: "24px 0", color: "#6b7280" }}>
                                    <div className="bk-spinner" style={{ margin: "0 auto 10px" }} />
                                    Loading available dates…
                                </div>
                            ) : datesError ? (
                                <p className="bk-no-slots" style={{ color: "#dc2626" }}>
                                    Could not load dates: {datesError}
                                </p>
                            ) : availDates.length === 0 ? (
                                <p className="bk-no-slots">No available dates at the moment.</p>
                            ) : (
                                <div className="bk-dates-row">
                                    {availDates.map(d => {
                                        const isDisabled = d.status !== "available";
                                        const isSelected = selectedDate === d.full;
                                        return (
                                            <button
                                                key={d.full}
                                                className={`bk-date-btn ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                                                onClick={() => !isDisabled && setSelectedDate(d.full)}
                                                disabled={isDisabled}
                                                title={isDisabled ? "Not available" : undefined}
                                                style={{
                                                    opacity: isDisabled ? 0.4 : 1,
                                                    cursor: isDisabled ? "not-allowed" : "pointer",
                                                }}>
                                                <div className="bk-date-day">{d.day}</div>
                                                <div className="bk-date-num">{d.num}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* ── Time slot picker ── */}
                        <div className="bk-card">
                            <div className="bk-card-head">
                                <ClockIcon />
                                <div>
                                    <div className="bk-card-head__title">Select Time Slot</div>
                                    <div className="bk-card-head__sub">
                                        {selectedDate ? "All slots are in local time" : "Select a date first"}
                                    </div>
                                </div>
                            </div>

                            {!selectedDate ? (
                                <p className="bk-no-slots">Please select a date to see available slots.</p>
                            ) : slotsLoading ? (
                                <div style={{ textAlign: "center", padding: "24px 0", color: "#6b7280" }}>
                                    <div className="bk-spinner" style={{ margin: "0 auto 10px" }} />
                                    Loading time slots…
                                </div>
                            ) : slotsError ? (
                                <p className="bk-no-slots" style={{ color: "#dc2626" }}>
                                    Could not load slots: {slotsError}
                                </p>
                            ) : timeSlots.length === 0 ? (
                                <p className="bk-no-slots">No time slots available for this date.</p>
                            ) : (
                                <div className="bk-times-grid">
                                    {timeSlots.map(slot => {
                                        const isUnavailable = slot.status !== "available";
                                        const isSelected = selectedTime === slot.time;
                                        return (
                                            <button
                                                key={slot.time}
                                                className={`bk-time-btn ${isSelected ? "selected" : ""} ${isUnavailable ? "disabled" : ""}`}
                                                onClick={() => !isUnavailable && setSelectedTime(slot.time)}
                                                disabled={isUnavailable}
                                                title={
                                                    slot.status === "booked"
                                                        ? "Already booked"
                                                        : slot.status === "disabled"
                                                        ? "Not available"
                                                        : undefined
                                                }
                                                style={{
                                                    opacity: isUnavailable ? 0.4 : 1,
                                                    cursor: isUnavailable ? "not-allowed" : "pointer",
                                                    textDecoration: slot.status === "booked" ? "underline" : "none",
                                                }}>
                                                {slot.time}
                                                {slot.status === "booked" && (
                                                    <span style={{ fontSize: 10, display: "block", marginTop: 2, color: "#1fa833" }}>
                                                        Booked
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="bk-nav">
                            <button className="bk-btn-back" onClick={goBack}><ArrowLeft size={16} /> Back</button>
                            <button className="bk-btn-next" onClick={goNext}
                                disabled={!selectedDate || !selectedTime}
                                style={{
                                    opacity: (!selectedDate || !selectedTime) ? 0.5 : 1,
                                    cursor: (!selectedDate || !selectedTime) ? "not-allowed" : "pointer"
                                }}>
                                Continue to Address <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ STEP 3 — Address ══ */}
                {step === 3 && (
                    <div className="bk-step-body">
                        <p className="bk-subtitle">Where should the professional come?</p>

                        {addrLoading ? (
                            <div className="bk-card" style={{ textAlign: "center", padding: "32px 20px", color: "#6b7280" }}>
                                <div className="bk-spinner" style={{ margin: "0 auto 12px" }} />
                                Loading your addresses…
                            </div>
                        ) : addresses.length > 0 ? (
                            <div className="bk-addr-grid">
                                {addresses.map((addr, idx) => {
                                    const addrId = addr._id || addr.id || `addr-${idx}`;
                                    const isSelected = selectedAddrId === addrId;
                                    return (
                                        <div key={addrId}
                                            className={`bk-addr-card ${isSelected ? "selected" : ""}`}
                                            onClick={() => setSelectedAddrId(addrId)}>
                                            <div className="bk-addr-card__header">
                                                <span>{ADDR_TYPE_ICONS[addr.address_type] || "📍"}</span>
                                                <span className="bk-addr-card__label">{addr.address_type}</span>
                                            </div>
                                            <p className="bk-addr-card__text">{formatAddress(addr)}</p>
                                            <div className="bk-addr-radio" />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            !showAddrForm && (
                                <div className="bk-card bk-addr-empty">
                                    <LocationIcon />
                                    <p>No saved addresses yet. Add one below.</p>
                                </div>
                            )
                        )}

                        {!showAddrForm ? (
                            <button className="bk-add-addr-btn" onClick={() => setShowAddrForm(true)}>
                                <PlusIcon /> Add New Address
                            </button>
                        ) : (
                            <AddressForm
                                onSave={handleSaveAddress}
                                onCancel={() => setShowAddrForm(false)}
                                saving={addrSaving}
                            />
                        )}

                        <div className="bk-nav" style={{ marginTop: 24 }}>
                            <button className="bk-btn-back" onClick={goBack}><ArrowLeft size={16} /> Back</button>
                            <button className="bk-btn-next" onClick={goNext}
                                disabled={!selectedAddrId || showAddrForm}
                                style={{
                                    opacity: (!selectedAddrId || showAddrForm) ? 0.5 : 1,
                                    cursor: (!selectedAddrId || showAddrForm) ? "not-allowed" : "pointer"
                                }}>
                                Continue to Payment <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ STEP 4 — Payment ══ */}
                {step === 4 && (
                    <div className="bk-step-body">
                        <p className="bk-subtitle" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <ShieldIcon /> All transactions are secure and encrypted.
                        </p>

                        <div className="bk-payment-opts">
                            {PAYMENT_OPTS.map(opt => (
                                <div key={opt.id}
                                    className={`bk-pay-opt ${selectedPay === opt.id ? "selected" : ""}`}
                                    onClick={() => setPay(opt.id)}>
                                    <div className="bk-pay-opt__icon">{opt.icon}</div>
                                    <div className="bk-pay-opt__info">
                                        <div className="bk-pay-opt__name">{opt.name}</div>
                                        <div className="bk-pay-opt__sub">{opt.sub}</div>
                                    </div>
                                    <div className="bk-pay-radio" />
                                </div>
                            ))}
                        </div>

                        <button className="bk-btn-back" onClick={goBack} style={{ marginBottom: 20 }}>
                            <ArrowLeft size={16} /> Back
                        </button>

                        <div className="bk-card bk-summary">
                            <div className="bk-summary-title">Booking Summary</div>

                            <div className="bk-summary-row">
                                <span>Professional</span><span>{vendor.full_name}</span>
                            </div>
                            <div className="bk-summary-row">
                                <span>Date &amp; Time</span>
                                <span>
                                    {selectedDateObj
                                        ? `${selectedDateObj.day}, ${selectedDateObj.num} ${selectedDateObj.month} — ${selectedTime}`
                                        : "Not selected"}
                                </span>
                            </div>
                            {selectedAddr && (
                                <div className="bk-summary-row">
                                    <span>Address</span>
                                    <span style={{ textAlign: "right", maxWidth: 200 }}>
                                        {formatAddress(selectedAddr)}
                                    </span>
                                </div>
                            )}

                            <hr className="bk-summary-divider" />

                            <div className="bk-summary-services-head">
                                <TagIcon /> <span>Services selected</span>
                            </div>
                            {selectedSvcs.map(svc => (
                                <div key={svc.sub_service_id} className="bk-summary-svc-row">
                                    <span className="bk-summary-svc-name">{svc.service_name}</span>
                                    <span className="bk-summary-svc-price">₹{parseFloat(svc.price).toFixed(0)}</span>
                                </div>
                            ))}

                            <hr className="bk-summary-divider" />

                            <div className="bk-summary-total">
                                <span>Total</span><span>₹{total.toFixed(0)}</span>
                            </div>

                            {/* ── Non-refundable notice strip ── */}
                            <div className="bk-nonrefund-notice">
                                ⚠️ This payment is non-refundable · இந்த கட்டணம் திரும்பப் பெற முடியாது
                            </div>

                            <button className="bk-confirm-btn" onClick={handleConfirmClick}>
                                <ShieldIcon /> Confirm &amp; Pay ₹{total.toFixed(0)}
                            </button>
                            <p className="bk-terms-note">By proceeding, you agree to our Terms &amp; Conditions</p>
                        </div>
                    </div>
                )}

                {/* ══ STEP 5 — Success ══ */}
                {step === 5 && (
                    <div className="bk-success">
                        <div className="bk-success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h2 className="bk-success-heading">Booking Confirmed!</h2>

                        <div className="bk-next-card">
                            <h3>What happens next?</h3>
                            {[
                                "The professional will be assigned and notified of your booking.",
                                "You will receive a confirmation SMS with the professional's contact details.",
                                "The professional will arrive at your location on the scheduled date and time.",
                            ].map((text, i) => (
                                <div key={i} className="bk-next-step">
                                    <div className="bk-next-num">{i + 1}</div>
                                    <div className="bk-next-text">{text}</div>
                                </div>
                            ))}
                        </div>

                        <div className="bk-success-btns">
                            <button className="bk-btn-next" onClick={() => navigate('/account')}
                                style={{ justifyContent: "center", width: "100%", padding: "15px" }}>
                                View Booking Details <ArrowRight size={16} />
                            </button>
                            <button className="bk-btn-outline" onClick={onBack}>Back to Home</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}