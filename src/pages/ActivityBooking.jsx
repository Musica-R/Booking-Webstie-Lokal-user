import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
const VerifyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth="0">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const ClockIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
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
const ActivityIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

// ── Constants ─────────────────────────────────────────────────────────────────
const STEPS = [
    { id: 1, label: "Activity" },
    { id: 2, label: "Trainer" },
    { id: 3, label: "Plan" },
    { id: 4, label: "Address" },
    { id: 5, label: "Payment" },
    { id: 6, label: "Success" },
];

const ADDRESS_TYPES = ["Home", "Office", "Other"];
const ADDR_TYPE_ICONS = { Home: "🏠", Office: "🏢", Other: "📍" };
const emptyAddrForm = { address_type: "Home", flat: "", area: "", city: "", state: "", pincode: "" };

const PAYMENT_OPTS = [
    { id: "upi", icon: "💳", name: "UPI (GPay, PhonePe, Paytm)", sub: "Pay directly from your bank account" },
    { id: "card", icon: "🏧", name: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay accepted" },
    { id: "later", icon: "💵", name: "Pay after service", sub: "Pay via cash or UPI after work is done" },
];

const CATEGORY_EMOJI = {
    Dance: "💃", Gym: "🏋️", Yoga: "🧘", Karate: "🥋", Music: "🎵",
    Swimming: "🏊", Zumba: "🕺", Drawing: "🎨", Silambam: "🪃",
    Meditation: "🌿", Tuition: "📚", "Spoken English": "🗣️",
};
const getCategoryEmoji = (name) => {
    for (const key of Object.keys(CATEGORY_EMOJI)) {
        if (name?.toLowerCase().includes(key.toLowerCase())) return CATEGORY_EMOJI[key];
    }
    return "🎯";
};

function formatAddress(addr) {
    return [addr.flat, addr.area, addr.city, addr.state, addr.pincode].filter(Boolean).join(", ");
}

// ── Non-Refundable Warning Modal ──────────────────────────────────────────────
const RefundWarningModal = ({ amount, onConfirm, onCancel }) => (
    <div className="bk-modal-overlay">
        <div className="bk-modal">
            <div className="bk-modal-icon"><WarningIcon /></div>
            <h3 className="bk-modal-title">Payment Notice</h3>
            <div className="bk-modal-lang-block">
                <p className="bk-modal-lang-tag">English</p>
                <p className="bk-modal-msg">
                    The advance payment of <strong>₹{amount}</strong> is <strong>non-refundable</strong> once confirmed.
                    Please make sure your booking details are correct before proceeding.
                </p>
            </div>
            <div className="bk-modal-lang-block bk-modal-lang-block--tamil">
                <p className="bk-modal-lang-tag">தமிழ்</p>
                <p className="bk-modal-msg">
                    நீங்கள் செலுத்தவுள்ள <strong>₹{amount}</strong> முன்பணம் உறுதிப்படுத்தப்பட்டதும்
                    <strong> திரும்பப் பெற முடியாது</strong>. தொடர்வதற்கு முன் விவரங்களை சரிபார்க்கவும்.
                </p>
            </div>
            <div className="bk-modal-actions">
                <button className="bk-modal-btn-cancel" onClick={onCancel}>Cancel / ரத்து செய்</button>
                <button className="bk-modal-btn-confirm" onClick={onConfirm}>I Understand, Pay ₹{amount}</button>
            </div>
        </div>
    </div>
);

// ── AddressForm ───────────────────────────────────────────────────────────────
const AddressForm = ({ onSave, onCancel, saving }) => {
    const [form, setForm] = useState(emptyAddrForm);
    const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
    return (
        <div className="bk-card">
            <div className="bk-card-head" style={{ marginBottom: 18 }}>
                <LocationIcon />
                <div className="bk-card-head__title">New Address</div>
                <button className="bk-addr-cancel" onClick={onCancel}>✕ Cancel</button>
            </div>
            <div className="bk-addr-type-row">
                {ADDRESS_TYPES.map(type => (
                    <button key={type}
                        className={`bk-addr-type-pill ${form.address_type === type ? "active" : ""}`}
                        onClick={() => handleChange("address_type", type)}>
                        {ADDR_TYPE_ICONS[type]} {type}
                    </button>
                ))}
            </div>
            <div className="bk-form-grid">
                <div className="bk-field">
                    <label>Flat / House / Building</label>
                    <input placeholder="Flat 101, ABC Apts" value={form.flat}
                        onChange={e => handleChange("flat", e.target.value)} />
                </div>
                <div className="bk-field">
                    <label>Area / Locality</label>
                    <input placeholder="Anna Nagar" value={form.area}
                        onChange={e => handleChange("area", e.target.value)} />
                </div>
                <div className="bk-form-row">
                    <div className="bk-field">
                        <label>City</label>
                        <input placeholder="Chennai" value={form.city}
                            onChange={e => handleChange("city", e.target.value)} />
                    </div>
                    <div className="bk-field">
                        <label>State</label>
                        <input placeholder="Tamil Nadu" value={form.state}
                            onChange={e => handleChange("state", e.target.value)} />
                    </div>
                </div>
                <div className="bk-field">
                    <label>Pincode</label>
                    <input placeholder="600040" maxLength={6} value={form.pincode}
                        onChange={e => handleChange("pincode", e.target.value)} />
                </div>
            </div>
            <button className="bk-btn-next"
                style={{ marginTop: 16, width: "100%", justifyContent: "center", opacity: saving ? 0.6 : 1 }}
                onClick={() => onSave(form)} disabled={saving}>
                {saving ? "Saving…" : "Save Address"}
            </button>
        </div>
    );
};

// ── Stepper ───────────────────────────────────────────────────────────────────
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
export default function ActivityBooking() {
    const { activityName } = useParams();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const onBack = () => navigate("/");

    const [step, setStep] = useState(activityName ? 2 : 1);

    // ── Step 1: Categories ────────────────────────────────────────────────
    const [categories, setCategories] = useState([]);
    const [catsLoading, setCatsLoading] = useState(!activityName);
    const [catsError, setCatsError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(
        activityName ? { activity_name: decodeURIComponent(activityName) } : null
    );

    // ── Step 2: Vendors ───────────────────────────────────────────────────
    const [vendors, setVendors] = useState([]);
    const [vendorsLoading, setVendorsLoading] = useState(false);
    const [vendorsError, setVendorsError] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState(null);

    // ── Step 3: Plan + Date/Time ──────────────────────────────────────────
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");

    // ── Step 4: Address ───────────────────────────────────────────────────
    const [addresses, setAddresses] = useState([]);
    const [addrLoading, setAddrLoading] = useState(false);
    const [selectedAddrId, setSelectedAddrId] = useState(null);
    const [showAddrForm, setShowAddrForm] = useState(false);
    const [addrSaving, setAddrSaving] = useState(false);

    // ── Step 5: Payment ───────────────────────────────────────────────────
    const [selectedPay, setSelectedPay] = useState("upi");
    const [showWarning, setShowWarning] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // ── Fetch categories ──────────────────────────────────────────────────
    useEffect(() => {
        if (activityName) return;
        (async () => {
            try {
                setCatsLoading(true);
                const res = await fetch(`${API_URL}/vendors/activity-categories`);
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                if (data.success && Array.isArray(data.categories)) {
                    setCategories(data.categories);
                } else throw new Error("Invalid response");
            } catch (err) {
                setCatsError(err.message);
            } finally {
                setCatsLoading(false);
            }
        })();
    }, [activityName]);

    // ── Fetch vendors whenever selectedCategory changes ───────────────────
    useEffect(() => {
        if (!selectedCategory) return;
        (async () => {
            try {
                setVendorsLoading(true);
                setVendorsError(null);
                setVendors([]);
                setSelectedVendor(null);
                const res = await fetch(
                    `${API_URL}/vendors/activity-vendors/${encodeURIComponent(selectedCategory.activity_name)}`
                );
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                if (data.success && Array.isArray(data.vendors)) {
                    setVendors(data.vendors);
                } else throw new Error("Invalid response");
            } catch (err) {
                setVendorsError(err.message);
            } finally {
                setVendorsLoading(false);
            }
        })();
    }, [selectedCategory]);

    // ── Fetch addresses on mount ──────────────────────────────────────────
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
        } catch {
            alert("Server error. Please try again.");
        } finally {
            setAddrSaving(false);
        }
    };

    // ── Pricing helpers ───────────────────────────────────────────────────
    const advanceAmount = selectedPlan ? parseFloat(selectedPlan.advance_amount) || 0 : 0;
    const totalAmount = selectedPlan ? parseFloat(selectedPlan.amount) || 0 : 0;

    // ── Build payload ─────────────────────────────────────────────────────
    const buildPayload = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return {
            user_id: user.id,
            activity_vendor_id: selectedVendor.id,
            activity_plan_id: selectedPlan.id,
            customer_name: user.name,
            customer_phone: user.phone,
            customer_address: selectedAddrId,
            booking_date: bookingDate,
            booking_time: bookingTime,
            total_amount: totalAmount,
            advance_amount: advanceAmount,
            wallet_used: 0,
            final_amount: advanceAmount,
            payment_status: "pending",
        };
    };

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
                body: JSON.stringify({ amount: advanceAmount }),
            });
            const data = await res.json();
            if (!data.success) { alert("Order creation failed"); return; }

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: "INR",
                name: "Activity Booking",
                description: `${selectedCategory?.activity_name} — ${selectedPlan?.plan_name}`,
                order_id: data.order.id,
                handler: async (response) => {
                    try {
                        console.log("Payment Success:", response);

                        const verifyRes = await fetch(`${API_URL}/booking/verify-payment`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                bookingData: buildPayload(),
                                bookingType: "activity",
                            }),
                        });

                        const verifyData = await verifyRes.json();
                        console.log("Verify Response:", verifyData);

                        if (!verifyRes.ok || !verifyData.success) {
                            alert(verifyData.message || "Payment verification failed");
                            return;
                        }

                        const bookingPayload = {
                            ...buildPayload(),
                            payment_status: "paid",
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        };

                        console.log("Booking Payload:", bookingPayload);

                        const bookingRes = await fetch(`${API_URL}/act/create`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(bookingPayload),
                        });

                        const bookingData = await bookingRes.json();
                        console.log("Booking Response:", bookingData);

                        if (!bookingRes.ok || !bookingData.success) {
                            alert(bookingData.message || "Booking creation failed");
                            return;
                        }

                        setStep(6);
                    } catch (err) {
                        console.error("Payment Handler Error:", err);
                        alert("Something went wrong. Please try again.");
                    }
                },
                prefill: {
                    name: JSON.parse(localStorage.getItem("user")).name,
                    email: JSON.parse(localStorage.getItem("user")).email,
                    contact: JSON.parse(localStorage.getItem("user")).phone,
                },
                theme: { color: "#2563eb" },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
        }
    };

    const goNext = () => setStep(s => Math.min(s + 1, 6));
    const goBack = () => {
        if (step === 2 && activityName) {
            navigate(-1);
        } else {
            setStep(s => Math.max(s - 1, 1));
        }
    };

    const selectedAddr = addresses.find(a => (a._id || a.id) === selectedAddrId);

    // ── Plan emoji helper ─────────────────────────────────────────────────
    const getPlanEmoji = (name) => {
        if (!name) return "📋";
        const n = name.toLowerCase();
        if (n.includes("monthly")) return "📅";
        if (n.includes("quarterly")) return "🗓️";
        if (n.includes("annual") || n.includes("yearly")) return "🏆";
        return "📋";
    };

    // ── Render ────────────────────────────────────────────────────────────
    return (
        <div className="bk-page">
            {showWarning && (
                <RefundWarningModal
                    amount={advanceAmount.toFixed(0)}
                    onConfirm={handleWarningConfirm}
                    onCancel={() => setShowWarning(false)}
                />
            )}

            <Stepper step={step} />
            <div className="bk-content">

                {/* ══ STEP 1 — Choose Activity Category ══ */}
                {step === 1 && (
                    <div className="bk-step-body">
                        <p className="bk-subtitle">What activity are you looking for?</p>

                        {catsLoading ? (
                            <div className="bk-loader">
                                <div className="bk-spinner" />
                                <p>Loading activities…</p>
                            </div>
                        ) : catsError ? (
                            <p style={{ color: "#dc2626", textAlign: "center" }}>{catsError}</p>
                        ) : (
                            <div className="bk-card">
                                <div className="bk-card-head">
                                    <ActivityIcon />
                                    <div>
                                        <div className="bk-card-head__title">Select Activity</div>
                                        <div className="bk-card-head__sub">Choose the activity you want to join</div>
                                    </div>
                                </div>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                                    gap: 12,
                                    marginTop: 8,
                                }}>
                                    {categories.map(cat => {
                                        const isSelected = selectedCategory?.id === cat.id;
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(cat)}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    gap: 8,
                                                    padding: "16px 8px",
                                                    border: isSelected ? "2px solid #2563eb" : "1.5px solid #e5e7eb",
                                                    borderRadius: 12,
                                                    background: isSelected ? "#eff6ff" : "#fff",
                                                    cursor: "pointer",
                                                    transition: "all 0.15s",
                                                    fontWeight: isSelected ? 600 : 400,
                                                    color: isSelected ? "#1d4ed8" : "#374151",
                                                    fontSize: 13,
                                                }}>
                                                <span style={{ fontSize: 28 }}>
                                                    {getCategoryEmoji(cat.activity_name)}
                                                </span>
                                                {cat.activity_name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="bk-nav bk-nav--right">
                            <button className="bk-btn-next" onClick={goNext}
                                disabled={!selectedCategory}
                                style={{
                                    opacity: !selectedCategory ? 0.5 : 1,
                                    cursor: !selectedCategory ? "not-allowed" : "pointer",
                                }}>
                                Find Trainers <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ STEP 2 — Choose Trainer / Vendor ══ */}
                {step === 2 && (
                    <div className="bk-step-body">
                        <p className="bk-subtitle">
                            {getCategoryEmoji(selectedCategory?.activity_name)}&nbsp;
                            {selectedCategory?.activity_name} — choose a trainer near you.
                        </p>

                        {vendorsLoading ? (
                            <div className="bk-loader">
                                <div className="bk-spinner" />
                                <p>Finding trainers…</p>
                            </div>
                        ) : vendorsError ? (
                            <p style={{ color: "#dc2626", textAlign: "center" }}>{vendorsError}</p>
                        ) : vendors.length === 0 ? (
                            <div className="bk-card" style={{ textAlign: "center", padding: "32px 20px", color: "#6b7280" }}>
                                No trainers available for this activity right now.
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {vendors.map(v => {
                                    const isSelected = selectedVendor?.id === v.id;
                                    const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(v.full_name)}&background=2563eb&color=fff&size=80`;
                                    return (
                                        <div
                                            key={v.id}
                                            className={`bk-addr-card ${isSelected ? "selected" : ""}`}
                                            onClick={() => setSelectedVendor(v)}
                                            style={{ cursor: "pointer", padding: "16px" }}>
                                            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                                                <img
                                                    src={v.profile_photo_url || avatarFallback}
                                                    alt={v.full_name}
                                                    onError={e => { e.target.src = avatarFallback; }}
                                                    style={{
                                                        width: 60, height: 60, borderRadius: "50%",
                                                        objectFit: "cover", flexShrink: 0,
                                                        border: isSelected ? "2px solid #2563eb" : "2px solid #e5e7eb",
                                                    }}
                                                />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                                                        <span style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{v.full_name}</span>
                                                        <VerifyIcon />
                                                    </div>
                                                    <p style={{ margin: "2px 0 4px", color: "#6b7280", fontSize: 13 }}>{v.shop_name}</p>
                                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                                        <span className="bk-badge bk-badge--star">
                                                            ★ {parseFloat(v.average_rating) > 0 ? parseFloat(v.average_rating).toFixed(1) : "New"}
                                                        </span>
                                                        {v.experience && <span className="bk-badge">{v.experience} exp</span>}
                                                        <span className="bk-badge"><LocationIcon /> {v.city}</span>
                                                    </div>
                                                    {v.languages_known && (
                                                        <p style={{ margin: "6px 0 0", fontSize: 12, color: "#9ca3af" }}>
                                                            🗣️ {v.languages_known}
                                                        </p>
                                                    )}
                                                    <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>
                                                        <ClockIcon style={{ verticalAlign: "middle" }} />&nbsp;
                                                        {v.start_time} – {v.end_time}
                                                    </p>
                                                </div>
                                                <div className="bk-addr-radio" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="bk-nav" style={{ marginTop: 24 }}>
                            <button className="bk-btn-back" onClick={goBack}><ArrowLeft size={16} /> Back</button>
                            <button className="bk-btn-next" onClick={goNext}
                                disabled={!selectedVendor}
                                style={{
                                    opacity: !selectedVendor ? 0.5 : 1,
                                    cursor: !selectedVendor ? "not-allowed" : "pointer",
                                }}>
                                Choose Plan <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ STEP 3 — Plan + Date & Time ══ */}
                {step === 3 && (
                    <div className="bk-step-body">
                        <p className="bk-subtitle">Pick a plan and schedule your first session.</p>

                        {/* ── Plan Selection ── */}
                        <div className="bk-card">
                            <div className="bk-card-head">
                                <TagIcon />
                                <div>
                                    <div className="bk-card-head__title">Select Plan</div>
                                    <div className="bk-card-head__sub">Choose the subscription that suits you</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                                {(selectedVendor?.plans || []).map(plan => {
                                    const amount = parseFloat(plan.amount);
                                    const advance = parseFloat(plan.advance_amount);
                                    const isSelected = selectedPlan?.id === plan.id;
                                    if (amount === 0 && advance === 0) return null;
                                    return (
                                        <div
                                            key={plan.id}
                                            onClick={() => setSelectedPlan(plan)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 14,
                                                padding: "16px 18px",
                                                border: isSelected ? "2px solid #2563eb" : "1.5px solid #e5e7eb",
                                                borderRadius: 12,
                                                background: isSelected ? "#eff6ff" : "#fff",
                                                cursor: "pointer",
                                                transition: "all 0.18s ease",
                                                boxShadow: isSelected ? "0 2px 12px rgba(37,99,235,0.13)" : "none",
                                                position: "relative",
                                            }}>
                                            {/* Plan emoji badge */}
                                            <div style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 10,
                                                background: isSelected ? "#dbeafe" : "#f3f4f6",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 22,
                                                flexShrink: 0,
                                                transition: "background 0.18s",
                                            }}>
                                                {getPlanEmoji(plan.plan_name)}
                                            </div>

                                            {/* Plan info */}
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    fontWeight: isSelected ? 700 : 600,
                                                    fontSize: isSelected ? 16 : 15,
                                                    color: isSelected ? "#1d4ed8" : "#111827",
                                                    letterSpacing: isSelected ? "-0.01em" : "normal",
                                                    transition: "all 0.15s",
                                                }}>
                                                    {plan.plan_name}
                                                </div>
                                                <div style={{
                                                    marginTop: 4,
                                                    display: "flex",
                                                    gap: 10,
                                                    flexWrap: "wrap",
                                                    alignItems: "center",
                                                }}>
                                                    <span style={{
                                                        fontSize: 13,
                                                        color: isSelected ? "#1d4ed8" : "#374151",
                                                        fontWeight: isSelected ? 700 : 500,
                                                    }}>
                                                        ₹{amount.toFixed(0)} total
                                                    </span>
                                                    <span style={{
                                                        fontSize: 12,
                                                        color: "#6b7280",
                                                        background: "#f3f4f6",
                                                        borderRadius: 6,
                                                        padding: "2px 8px",
                                                        fontWeight: 500,
                                                    }}>
                                                        ₹{advance.toFixed(0)} advance
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Selected checkmark */}
                                            {isSelected && (
                                                <div style={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: "50%",
                                                    background: "#2563eb",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0,
                                                }}>
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                                        stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── Date & Time ── */}
                        <div className="bk-card">
                            <div className="bk-card-head">
                                <CalendarIcon />
                                <div>
                                    <div className="bk-card-head__title">Start Date &amp; Time</div>
                                    <div className="bk-card-head__sub">When would you like to begin?</div>
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>

                                {/* Date picker */}
                                <div style={{
                                    border: bookingDate ? "2px solid #2563eb" : "1.5px solid #e5e7eb",
                                    borderRadius: 12,
                                    padding: "14px 16px",
                                    background: bookingDate ? "#eff6ff" : "#fafafa",
                                    transition: "all 0.15s",
                                }}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 8,
                                    }}>
                                        <span style={{ fontSize: 18 }}>📅</span>
                                        <span style={{
                                            fontWeight: 700,
                                            fontSize: 13,
                                            color: bookingDate ? "#1d4ed8" : "#374151",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}>
                                            Booking Date
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        value={bookingDate}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={e => setBookingDate(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "10px 12px",
                                            border: "1.5px solid #e5e7eb",
                                            borderRadius: 8,
                                            fontSize: 15,
                                            fontWeight: bookingDate ? 700 : 400,
                                            color: bookingDate ? "#1d4ed8" : "#6b7280",
                                            background: "#fff",
                                            outline: "none",
                                            boxSizing: "border-box",
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>

                                {/* Time picker */}
                                <div style={{
                                    border: bookingTime ? "2px solid #2563eb" : "1.5px solid #e5e7eb",
                                    borderRadius: 12,
                                    padding: "14px 16px",
                                    background: bookingTime ? "#eff6ff" : "#fafafa",
                                    transition: "all 0.15s",
                                }}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 8,
                                    }}>
                                        <span style={{ fontSize: 18 }}>🕐</span>
                                        <span style={{
                                            fontWeight: 700,
                                            fontSize: 13,
                                            color: bookingTime ? "#1d4ed8" : "#374151",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}>
                                            Preferred Time
                                        </span>
                                    </div>
                                    <input
                                        type="time"
                                        value={bookingTime}
                                        min={selectedVendor?.start_time || "00:00"}
                                        max={selectedVendor?.end_time || "23:59"}
                                        onChange={e => setBookingTime(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "10px 12px",
                                            border: "1.5px solid #e5e7eb",
                                            borderRadius: 8,
                                            fontSize: 15,
                                            fontWeight: bookingTime ? 700 : 400,
                                            color: bookingTime ? "#1d4ed8" : "#6b7280",
                                            background: "#fff",
                                            outline: "none",
                                            boxSizing: "border-box",
                                            cursor: "pointer",
                                        }}
                                    />
                                    {selectedVendor && (
                                        <p style={{
                                            marginTop: 8,
                                            fontSize: 12,
                                            color: "#6b7280",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4,
                                        }}>
                                            <ClockIcon />
                                            Trainer available: <strong>{selectedVendor.start_time}</strong> – <strong>{selectedVendor.end_time}</strong>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bk-nav">
                            <button className="bk-btn-back" onClick={goBack}><ArrowLeft size={16} /> Back</button>
                            <button className="bk-btn-next" onClick={goNext}
                                disabled={!selectedPlan || !bookingDate || !bookingTime}
                                style={{
                                    opacity: (!selectedPlan || !bookingDate || !bookingTime) ? 0.5 : 1,
                                    cursor: (!selectedPlan || !bookingDate || !bookingTime) ? "not-allowed" : "pointer",
                                }}>
                                Continue to Address <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ STEP 4 — Address ══ */}
                {step === 4 && (
                    <div className="bk-step-body">
                        <p className="bk-subtitle">Where should the trainer come for sessions?</p>

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
                                    cursor: (!selectedAddrId || showAddrForm) ? "not-allowed" : "pointer",
                                }}>
                                Continue to Payment <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ STEP 5 — Payment ══ */}
                {step === 5 && (
                    <div className="bk-step-body">
                        <p className="bk-subtitle" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <ShieldIcon /> All transactions are secure and encrypted.
                        </p>

                        <div className="bk-payment-opts">
                            {PAYMENT_OPTS.map(opt => (
                                <div key={opt.id}
                                    className={`bk-pay-opt ${selectedPay === opt.id ? "selected" : ""}`}
                                    onClick={() => setSelectedPay(opt.id)}>
                                    <div className="bk-pay-opt__icon">{opt.icon}</div>
                                    <div className="bk-pay-opt__info">
                                        <div className="bk-pay-opt__name">{opt.name}</div>
                                        <div className="bk-pay-opt__sub">{opt.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="bk-btn-back" onClick={goBack} style={{ marginBottom: 20 }}>
                            <ArrowLeft size={16} /> Back
                        </button>

                        <div className="bk-card bk-summary">
                            <div className="bk-summary-title">Booking Summary</div>

                            <div className="bk-summary-row">
                                <span>Activity</span>
                                <span>{getCategoryEmoji(selectedCategory?.activity_name)} {selectedCategory?.activity_name}</span>
                            </div>
                            <div className="bk-summary-row">
                                <span>Trainer</span><span>{selectedVendor?.full_name}</span>
                            </div>
                            <div className="bk-summary-row">
                                <span>Institute</span><span>{selectedVendor?.shop_name}</span>
                            </div>
                            <div className="bk-summary-row">
                                <span>Start Date</span>
                                <span>{bookingDate} at {bookingTime}</span>
                            </div>
                            {selectedAddr && (
                                <div className="bk-summary-row">
                                    <span>Address</span>
                                    <span style={{ textAlign: "right", maxWidth: 200 }}>{formatAddress(selectedAddr)}</span>
                                </div>
                            )}

                            <hr className="bk-summary-divider" />

                            <div className="bk-summary-services-head">
                                <TagIcon /> <span>Plan details</span>
                            </div>
                            <div className="bk-summary-svc-row">
                                <span className="bk-summary-svc-name">{selectedPlan?.plan_name} Plan</span>
                                <span className="bk-summary-svc-price">₹{totalAmount.toFixed(0)}</span>
                            </div>

                            <hr className="bk-summary-divider" />

                            <div className="bk-summary-total">
                                <span>Plan Total</span><span>₹{totalAmount.toFixed(0)}</span>
                            </div>
                            <div className="bk-summary-total" style={{ fontWeight: 700 }}>
                                <span>Pay Now (Advance)</span><span>₹{advanceAmount.toFixed(0)}</span>
                            </div>

                            <div className="bk-nonrefund-notice">
                                ⚠️ Advance payment is non-refundable · முன்பணம் திரும்பப் பெற முடியாது
                            </div>

                            <button className="bk-confirm-btn" onClick={handleConfirmClick}
                                disabled={submitting} style={{ opacity: submitting ? 0.6 : 1 }}>
                                <ShieldIcon />{" "}
                                {submitting ? "Confirming…" : `Confirm & Pay ₹${advanceAmount.toFixed(0)}`}
                            </button>
                            <p className="bk-terms-note">By proceeding, you agree to our Terms &amp; Conditions</p>
                        </div>
                    </div>
                )}

                {/* ══ STEP 6 — Success ══ */}
                {step === 6 && (
                    <div className="bk-success">
                        <div className="bk-success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h2 className="bk-success-heading">Booking Confirmed!</h2>
                        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 24, fontSize: 15 }}>
                            Your {selectedCategory?.activity_name} session with {selectedVendor?.full_name} is booked.
                        </p>

                        <div className="bk-next-card">
                            <h3>What happens next?</h3>
                            {[
                                "Your trainer will be notified and will confirm the session.",
                                "You will receive a confirmation SMS with the trainer's contact details.",
                                "The trainer will arrive at your location on the scheduled date and time.",
                            ].map((text, i) => (
                                <div key={i} className="bk-next-step">
                                    <div className="bk-next-num">{i + 1}</div>
                                    <div className="bk-next-text">{text}</div>
                                </div>
                            ))}
                        </div>

                        <div className="bk-success-btns">
                            <button className="bk-btn-next" onClick={() => navigate("/account")}
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