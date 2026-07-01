import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVendors } from "./Vendorcontext";
import VendorTermsModal from "./Vendortermsmodal";
import "../styles/BecomeVendor.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const ShopIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);
const CloseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const BoltIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" strokeWidth="0">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);
const UploadIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
);
const ChevronDown = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);
const RupeeIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12M6 8h12M6 13l9 8M6 13h3a6 6 0 0 0 0-5H6" />
    </svg>
);
const PersonIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const ToolIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);
const MapPinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);
const IdIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <path d="M14 9h4M14 12h4M14 15h2" />
    </svg>
);
const ActivityIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);
const StallIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v4H3z" />
        <path d="M3 7v13h18V7" />
        <path d="M9 7v13M15 7v13" />
        <path d="M3 12h18" />
    </svg>
);
const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);
const LinkIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

const AVAILABILITY_OPTIONS = [
    { value: "all_days", label: "All days" },
    { value: "weekdays", label: "Weekdays only" },
    { value: "weekends", label: "Weekends only" },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEAR STALL VENDOR FORM
// ─────────────────────────────────────────────────────────────────────────────
function NearStallVendorForm({ onClose }) {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        shop_name: "",
        phone: "",
        whatsapp_number: "",
        email: "",
        password: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        description: "",
        google_map_link: "",
        latitude: "",
        longitude: "",
        opening_time: "08:00",
        closing_time: "22:00",
    });

    // ── File states ──
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [profilePhoto2, setProfilePhoto2] = useState(null);
    const [profilePhoto3, setProfilePhoto3] = useState(null);
    const [governmentId, setGovernmentId] = useState(null);
    const profileRef = useRef(null);
    const profileRef2 = useRef(null);
    const profileRef3 = useRef(null);
    const govRef = useRef(null);
    const [dragOverId, setDragOverId] = useState(null);

    const [submitting, setSubmitting] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [razorpayData, setRazorpayData] = useState(null); // { order_id, payment_id, signature }

    const LISTING_FEE = 100;

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "description") {
            const words = value.trim().split(/\s+/).filter(Boolean);

            if (words.length > 5) {
                return;
            }
        }

        setForm((f) => ({ ...f, [name]: value }));
    };

    // ── File helpers ──
    const handleFile = (field, file) => {
        if (!file) return;

        if (field === "profilePhoto") {
            setProfilePhoto(file);
        } else if (field === "profilePhoto2") {
            setProfilePhoto2(file);
        } else if (field === "profilePhoto3") {
            setProfilePhoto3(file);
        } else {
            setGovernmentId(file);
        }
    };

    const handleDrop = (e, field) => {
        e.preventDefault();
        setDragOverId(null);
        handleFile(field, e.dataTransfer.files[0]);
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }
        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setForm((f) => ({
                    ...f,
                    latitude: pos.coords.latitude.toFixed(6),
                    longitude: pos.coords.longitude.toFixed(6),
                }));
                setLocationLoading(false);
            },
            () => {
                alert("Unable to fetch location. Please enter manually.");
                setLocationLoading(false);
            }
        );
    };

    const validateForm = () => {
        if (!form.shop_name || !form.phone || !form.email || !form.password) {
            alert("Please fill in Shop Name, Phone, Email, and Password.");
            return false;
        }
        if (!/^\d{10}$/.test(form.phone)) {
            alert("Phone number must be exactly 10 digits.");
            return false;
        }
        if (form.pincode && !/^\d{6}$/.test(form.pincode)) {
            alert("Pincode must be exactly 6 digits.");
            return false;
        }
        return true;
    };


    // razorpay order creation 


    const handlePayListingFee = async () => {
        try {
            const res = await fetch(`${API_URL}/payment/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: LISTING_FEE })
            });
            const data = await res.json();
            if (!data.success) {
                alert("Could not start payment. Please try again.");
                return;
            }

            const order = data.order;
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Stall Listing Fee",
                description: "One-time listing fee",
                order_id: order.id,
                handler: function (response) {
                    setRazorpayData({
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature
                    });
                    setPaymentDone(true);
                },
                prefill: {
                    name: form.shop_name,
                    email: form.email,
                    contact: form.phone
                },
                theme: { color: "#2563eb" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Payment initiation failed. Please try again.");
        }
    };

    // Step 1: Validate → check payment → show terms
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (!paymentDone) {
            alert("Please complete the ₹100 listing fee payment before submitting.");
            return;
        }
        setShowTerms(true);
    };

    // Step 2: After terms accepted → submit via FormData
    const handleTermsAccepted = async (termsAccepted) => {
        setShowTerms(false);

        const formData = new FormData();
        formData.append("shop_name", form.shop_name);
        formData.append("phone", form.phone);
        formData.append("whatsapp_number", form.whatsapp_number || form.phone);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("address1", form.address1);
        formData.append("address2", form.address2);
        formData.append("city", form.city);
        formData.append("pincode", form.pincode);
        formData.append("description", form.description);
        formData.append("google_map_link", form.google_map_link);
        formData.append("latitude", form.latitude ? parseFloat(form.latitude) : "");
        formData.append("longitude", form.longitude ? parseFloat(form.longitude) : "");
        formData.append("opening_time", form.opening_time);
        formData.append("closing_time", form.closing_time);
        formData.append("listing_fee", LISTING_FEE);
        formData.append("terms_accepted", String(termsAccepted));
        formData.append("razorpay_order_id", razorpayData.order_id);
        formData.append("razorpay_payment_id", razorpayData.payment_id);
        formData.append("razorpay_signature", razorpayData.signature);
        if (profilePhoto) formData.append("profile_photo", profilePhoto);
        if (profilePhoto2) formData.append("profile_photo2", profilePhoto2);
        if (profilePhoto3) formData.append("profile_photo3", profilePhoto3);
        if (governmentId) formData.append("government_id", governmentId);

        setSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/vendors/near-register`, {
                method: "POST",
                body: formData,  // No Content-Type header — browser sets multipart boundary automatically
            });
            const data = await response.json();
            if (data.success) {
                alert("Near Stall Registered Successfully!");
                onClose && onClose();
                navigate("/services");
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // ── Reusable upload zone (same pattern as other forms) ──
    const UploadZone = ({ field, fileRef, currentFile, label }) => (
        <div className="vnd-field">
            <label className="vnd-label">
                {label} <span className="vnd-req">*</span>
            </label>
            <div
                className={`vnd-upload ${dragOverId === field ? "vnd-upload--active" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOverId(field); }}
                onDragLeave={() => setDragOverId(null)}
                onDrop={(e) => handleDrop(e, field)}
                onClick={() => fileRef.current?.click()}
            >
                {currentFile ? (
                    <div className="vnd-upload-chosen">
                        <span className="vnd-upload-check">✓</span>
                        <p className="vnd-upload-text vnd-upload-text--file">{currentFile.name}</p>
                    </div>
                ) : (
                    <>
                        <UploadIcon />
                        <p className="vnd-upload-text">Drag &amp; drop or click to upload</p>
                        <p className="vnd-upload-hint">JPG, PNG, PDF supported</p>
                    </>
                )}
                <input
                    ref={fileRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    style={{ display: "none" }}
                    onChange={(e) => handleFile(field, e.target.files[0])}
                />
            </div>
        </div>
    );

    return (
        <>
            <form className="vnd-form" onSubmit={handleSubmitClick}>

                {/* SECTION 1: Shop Information */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><PersonIcon /></div>
                        <span className="vnd-section-label">Shop Information</span>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Shop Name <span className="vnd-req">*</span></label>
                            <input className="vnd-input" name="shop_name" placeholder="ABC Fast Food"
                                value={form.shop_name} onChange={handleChange} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Phone Number <span className="vnd-req">*</span></label>
                            <input className="vnd-input" name="phone" placeholder="9876543210"
                                value={form.phone} onChange={handleChange} type="tel" maxLength={10} />
                        </div>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">WhatsApp Number</label>
                            <input className="vnd-input" name="whatsapp_number" placeholder="Same as phone if blank"
                                value={form.whatsapp_number} onChange={handleChange} type="tel" maxLength={10} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Email Address <span className="vnd-req">*</span></label>
                            <input className="vnd-input" name="email" placeholder="abc@gmail.com"
                                value={form.email} onChange={handleChange} type="email" />
                        </div>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Password <span className="vnd-req">*</span></label>
                            <input className="vnd-input" type="password" name="password"
                                placeholder="Enter password"
                                value={form.password} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="vnd-field">
                        <label className="vnd-label">Badge (Maximum 5 words)</label>
                        <textarea className="vnd-input vnd-textarea" name="description"
                            placeholder="e.g. Tea, Snacks, Juices…"
                            value={form.description} onChange={handleChange} rows={1} />
                    </div>

                </div>

                {/* SECTION 2: Location */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><MapPinIcon /></div>
                        <span className="vnd-section-label">Location &amp; Address</span>
                    </div>
                    <div className="vnd-field">
                        <label className="vnd-label">Address Line 1</label>
                        <input className="vnd-input" name="address1" placeholder="Shop no., street"
                            value={form.address1} onChange={handleChange} />
                    </div>
                    <div className="vnd-field">
                        <label className="vnd-label">Address Line 2</label>
                        <input className="vnd-input" name="address2" placeholder="Near Bus Stand, Landmark"
                            value={form.address2} onChange={handleChange} />
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">City</label>
                            <input className="vnd-input" name="city" placeholder="Salem"
                                value={form.city} onChange={handleChange} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Pincode</label>
                            <input className="vnd-input" name="pincode" placeholder="636001"
                                value={form.pincode} onChange={handleChange} maxLength={6} />
                        </div>
                    </div>

                    {/* Google Map Link */}
                    <div className="vnd-field">
                        <label className="vnd-label">
                            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <LinkIcon /> Google Maps Link
                            </span>
                        </label>
                        <input className="vnd-input" name="google_map_link"
                            placeholder="https://maps.google.com/..."
                            value={form.google_map_link} onChange={handleChange} />
                    </div>

                    {/* Coordinates */}
                    <div className="vnd-field">
                        <label className="vnd-label">GPS Coordinates</label>
                        <div className="vnd-row" style={{ marginBottom: 0 }}>
                            <div className="vnd-field">
                                <input className="vnd-input" name="latitude" placeholder="Latitude (e.g. 11.6643)"
                                    value={form.latitude} onChange={handleChange} type="number" step="any" />
                            </div>
                            <div className="vnd-field">
                                <input className="vnd-input" name="longitude" placeholder="Longitude (e.g. 78.1460)"
                                    value={form.longitude} onChange={handleChange} type="number" step="any" />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="vnd-location-btn"
                            onClick={handleGetLocation}
                            disabled={locationLoading}
                        >
                            <MapPinIcon />
                            {locationLoading ? "Fetching location…" : "Use My Current Location"}
                        </button>
                    </div>
                </div>

                {/* SECTION 3: Timings */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><ClockIcon /></div>
                        <span className="vnd-section-label">Operating Hours</span>
                    </div>
                    <div className="vnd-field">
                        <label className="vnd-label">Shop Timings</label>
                        <div className="vnd-hours-row">
                            <div className="vnd-field" style={{ flex: 1 }}>
                                <label className="vnd-label" style={{ fontSize: "11px", color: "#9ca3af" }}>Opens at</label>
                                <input className="vnd-input" name="opening_time" type="time"
                                    value={form.opening_time} onChange={handleChange} />
                            </div>
                            <span className="vnd-hours-sep">→</span>
                            <div className="vnd-field" style={{ flex: 1 }}>
                                <label className="vnd-label" style={{ fontSize: "11px", color: "#9ca3af" }}>Closes at</label>
                                <input className="vnd-input" name="closing_time" type="time"
                                    value={form.closing_time} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 4: Documents ── NEW ── */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><IdIcon /></div>
                        <span className="vnd-section-label">Documents</span>
                    </div>
                    <div className="vnd-row">
                        <UploadZone
                            field="profilePhoto"
                            fileRef={profileRef}
                            currentFile={profilePhoto}
                            label="Shop Photo"
                        />
                        <UploadZone
                            field="profilePhoto2"
                            fileRef={profileRef2}
                            currentFile={profilePhoto2}
                            label="Shop Photo 2 (Optional)"
                        />

                        <UploadZone
                            field="profilePhoto3"
                            fileRef={profileRef3}
                            currentFile={profilePhoto3}
                            label="Shop Photo 3 (Optional)"
                        />
                        <UploadZone
                            field="governmentId"
                            fileRef={govRef}
                            currentFile={governmentId}
                            label="Government ID"
                        />
                    </div>
                </div>

                {/* SECTION 5: Listing Fee Payment */}
                <div className="vnd-section vnd-payment-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><RupeeIcon /></div>
                        <span className="vnd-section-label">Listing Fee</span>
                    </div>

                    <div className="vnd-payment-card">
                        <div className="vnd-payment-info">
                            <div className="vnd-payment-amount">
                                <span className="vnd-payment-currency">₹</span>
                                <span className="vnd-payment-number">100</span>
                                <span className="vnd-payment-period">one-time</span>
                            </div>
                            <p className="vnd-payment-desc">
                                A one-time listing fee to feature your stall on Lokal and reach nearby customers.
                            </p>
                        </div>

                        {paymentDone ? (
                            <div className="vnd-payment-success">
                                <span className="vnd-payment-tick">✓</span>
                                <span>Payment of ₹100 received</span>
                            </div>
                        ) : (
                            <button type="button" className="vnd-pay-btn" onClick={handlePayListingFee}>
                                <RupeeIcon />
                                Pay ₹100 to Continue
                            </button>
                        )}
                    </div>
                </div>

                <button
                    className="vnd-submit"
                    type="submit"
                    disabled={submitting || !paymentDone}
                    style={!paymentDone ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                >
                    {submitting ? "Submitting…" : "Submit Application"}
                </button>

                {!paymentDone && (
                    <p className="vnd-payment-note">
                        Complete the ₹100 payment above to unlock submission.
                    </p>
                )}
            </form>

            {showTerms && (
                <VendorTermsModal
                    onAccept={handleTermsAccepted}
                    onClose={() => setShowTerms(false)}
                />
            )}
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY VENDOR FORM
// ─────────────────────────────────────────────────────────────────────────────
function ActivityVendorForm({ onClose }) {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "", shopName: "", phone: "", whatsapp_number: "",
        email: "", password: "", activity_id: "", experience: "",
        address1: "", address2: "", city: "", pincode: "",
        business_description: "", languages_known: "",
        availability: "all_days", start_time: "06:00", end_time: "21:00",
    });

    const [activities, setActivities] = useState([]);
    const [loadingActs, setLoadingActs] = useState(true);

    const [plans, setPlans] = useState([
        { plan_name: "Monthly", amount: "", advance_amount: "" },
        { plan_name: "Quarterly", amount: "", advance_amount: "" },
        { plan_name: "Yearly", amount: "", advance_amount: "" },
    ]);

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [governmentId, setGovernmentId] = useState(null);
    const profileRef = useRef(null);
    const govRef = useRef(null);
    const [dragOverId, setDragOverId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch(`${API_URL}/vendors/activity-categories`);
                const data = await res.json();
                if (data.success) setActivities(data.categories);
            } catch (err) {
                console.error("Failed to load activity categories:", err);
            } finally {
                setLoadingActs(false);
            }
        };
        fetchActivities();
    }, [API_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handlePlanChange = (index, field, value) => {
        setPlans((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const addPlan = () => {
        setPlans((prev) => [...prev, { plan_name: "", amount: "", advance_amount: "" }]);
    };

    const removePlan = (index) => {
        setPlans((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFile = (field, file) => {
        if (!file) return;
        if (field === "profilePhoto") setProfilePhoto(file);
        else setGovernmentId(file);
    };

    const handleDrop = (e, field) => {
        e.preventDefault(); setDragOverId(null);
        handleFile(field, e.dataTransfer.files[0]);
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (!form.fullName || !form.phone || !form.activity_id) {
            alert("Please fill in Full Name, Phone Number and Activity.");
            return;
        }
        if (!/^\d{10}$/.test(form.phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }
        if (form.pincode && !/^\d{6}$/.test(form.pincode)) {
            alert("Pincode must be exactly 6 digits.");
            return;
        }
        const validPlans = plans.filter((p) => p.plan_name.trim() !== "");
        if (validPlans.length === 0) {
            alert("Please add at least one plan (Monthly, Quarterly, or Yearly).");
            return;
        }
        setShowTerms(true);
    };

    const handleTermsAccepted = async (termsAccepted) => {
        setShowTerms(false);

        const validPlans = plans
            .filter((p) => p.plan_name.trim() !== "")
            .map((p) => ({
                plan_name: p.plan_name,
                amount: p.amount === "" ? 0 : Number(p.amount),
                advance_amount: p.advance_amount === "" ? 0 : Number(p.advance_amount),
            }));

        const formData = new FormData();
        formData.append("fullName", form.fullName);
        formData.append("shopName", form.shopName);
        formData.append("phone", form.phone);
        formData.append("whatsapp_number", form.whatsapp_number || form.phone);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("activity_id", form.activity_id);
        formData.append("experience", form.experience);
        formData.append("address1", form.address1);
        formData.append("address2", form.address2);
        formData.append("city", form.city);
        formData.append("pincode", form.pincode);
        formData.append("business_description", form.business_description);
        formData.append("languages_known", form.languages_known);
        formData.append("availability", form.availability);
        formData.append("start_time", form.start_time);
        formData.append("end_time", form.end_time);
        formData.append("terms_accepted", String(termsAccepted));
        formData.append("plans", JSON.stringify(validPlans));
        if (profilePhoto) formData.append("profilePhoto", profilePhoto);
        if (governmentId) formData.append("governmentId", governmentId);

        setSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/vendors/register-activity`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                alert("Activity Vendor Registered Successfully!");
                onClose && onClose();
                navigate("/services");
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const UploadZone = ({ field, fileRef, currentFile, label }) => (
        <div className="vnd-field">
            <label className="vnd-label">{label}<span className="vnd-req">*</span></label>
            <div
                className={`vnd-upload ${dragOverId === field ? "vnd-upload--active" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOverId(field); }}
                onDragLeave={() => setDragOverId(null)}
                onDrop={(e) => handleDrop(e, field)}
                onClick={() => fileRef.current?.click()}
            >
                {currentFile ? (
                    <div className="vnd-upload-chosen">
                        <span className="vnd-upload-check">✓</span>
                        <p className="vnd-upload-text vnd-upload-text--file">{currentFile.name}</p>
                    </div>
                ) : (
                    <>
                        <UploadIcon />
                        <p className="vnd-upload-text">Drag &amp; drop or click to upload</p>
                        <p className="vnd-upload-hint">JPG, PNG, PDF supported</p>
                    </>
                )}
                <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp,.pdf"
                    style={{ display: "none" }}
                    onChange={(e) => handleFile(field, e.target.files[0])} />
            </div>
        </div>
    );

    return (
        <>
            <form className="vnd-form" onSubmit={handleSubmitClick}>

                {/* SECTION 1: Personal Information */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><PersonIcon /></div>
                        <span className="vnd-section-label">Personal Information</span>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Full Name <span className="vnd-req">*</span></label>
                            <input className="vnd-input" name="fullName" placeholder="Ravi Kumar"
                                value={form.fullName} onChange={handleChange} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Shop / Center Name</label>
                            <input className="vnd-input" name="shopName" placeholder="Ravi Fitness Center"
                                value={form.shopName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Phone Number <span className="vnd-req">*</span></label>
                            <input className="vnd-input" name="phone" placeholder="9876543210"
                                value={form.phone} onChange={handleChange} type="tel" maxLength={10} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">WhatsApp Number</label>
                            <input className="vnd-input" name="whatsapp_number" placeholder="Same as phone if blank"
                                value={form.whatsapp_number} onChange={handleChange} type="tel" maxLength={10} />
                        </div>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Email Address</label>
                            <input className="vnd-input" name="email" placeholder="ravi@gmail.com"
                                value={form.email} onChange={handleChange} type="email" />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Password <span className="vnd-req">*</span></label>
                            <input className="vnd-input" type="password" name="password"
                                placeholder="Enter password"
                                value={form.password} onChange={handleChange} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Languages Known</label>
                            <input className="vnd-input" name="languages_known" placeholder="Tamil, English"
                                value={form.languages_known} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="vnd-field">
                        <label className="vnd-label">Business Description</label>
                        <textarea className="vnd-input vnd-textarea" name="business_description"
                            placeholder="Briefly describe your activity and expertise…"
                            value={form.business_description} onChange={handleChange} rows={3} />
                    </div>
                </div>

                {/* SECTION 2: Activity Details */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><ActivityIcon /></div>
                        <span className="vnd-section-label">Activity Details</span>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Activity <span className="vnd-req">*</span></label>
                            <div className="vnd-select-wrap">
                                <select className="vnd-input vnd-select" name="activity_id"
                                    value={form.activity_id} onChange={handleChange} disabled={loadingActs}>
                                    <option value="">{loadingActs ? "Loading…" : "Select activity"}</option>
                                    {activities.map((act) => (
                                        <option key={act.id} value={act.id}>
                                            {act.activity_name}
                                        </option>
                                    ))}
                                </select>
                                <span className="vnd-select-icon"><ChevronDown /></span>
                            </div>
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Years of Experience</label>
                            <input className="vnd-input" name="experience" placeholder="e.g. 8 Years"
                                value={form.experience} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Plans */}
                    <div className="vnd-field">
                        <label className="vnd-label">
                            Membership Plans &nbsp;
                            <span className="vnd-label-hint">Set your pricing plans (labour cost; service charge via admin)</span>
                        </label>

                        <div className="vnd-plans-grid">
                            <div className="vnd-plans-header">
                                <span>Plan Name</span>
                                <span>Amount (₹)</span>
                                <span>Advance (₹)</span>
                                <span></span>
                            </div>
                            {plans.map((plan, index) => (
                                <div key={index} className="vnd-plan-row">
                                    <input
                                        className="vnd-input"
                                        placeholder="e.g. Monthly"
                                        value={plan.plan_name}
                                        onChange={(e) => handlePlanChange(index, "plan_name", e.target.value)}
                                    />
                                    <div className="vnd-price-wrap">
                                        <span className="vnd-price-icon"><RupeeIcon /></span>
                                        <input
                                            className="vnd-price-input"
                                            type="number"
                                            min="0"
                                            placeholder="1500"
                                            value={plan.amount}
                                            onChange={(e) => handlePlanChange(index, "amount", e.target.value)}
                                        />
                                    </div>
                                    <div className="vnd-price-wrap">
                                        <span className="vnd-price-icon"><RupeeIcon /></span>
                                        <input
                                            className="vnd-price-input"
                                            type="number"
                                            min="0"
                                            placeholder="500"
                                            value={plan.advance_amount}
                                            onChange={(e) => handlePlanChange(index, "advance_amount", e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="vnd-plan-remove"
                                        onClick={() => removePlan(index)}
                                        title="Remove plan"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button type="button" className="vnd-plan-add" onClick={addPlan}>
                            + Add Plan
                        </button>
                    </div>

                    {/* Availability */}
                    <div className="vnd-field">
                        <label className="vnd-label">Availability</label>
                        <div className="vnd-avail-tabs">
                            {AVAILABILITY_OPTIONS.map((opt) => (
                                <div key={opt.value}
                                    className={`vnd-avail-tab ${form.availability === opt.value ? "vnd-avail-tab--active" : ""}`}
                                    onClick={() => setForm((f) => ({ ...f, availability: opt.value }))}>
                                    {opt.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="vnd-field">
                        <label className="vnd-label">Working Hours</label>
                        <div className="vnd-hours-row">
                            <div className="vnd-field" style={{ flex: 1 }}>
                                <label className="vnd-label" style={{ fontSize: "11px", color: "#9ca3af" }}>From</label>
                                <input className="vnd-input" name="start_time" type="time"
                                    value={form.start_time} onChange={handleChange} />
                            </div>
                            <span className="vnd-hours-sep">→</span>
                            <div className="vnd-field" style={{ flex: 1 }}>
                                <label className="vnd-label" style={{ fontSize: "11px", color: "#9ca3af" }}>To</label>
                                <input className="vnd-input" name="end_time" type="time"
                                    value={form.end_time} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: Address */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><MapPinIcon /></div>
                        <span className="vnd-section-label">Address</span>
                    </div>
                    <div className="vnd-field">
                        <label className="vnd-label">Address Line 1</label>
                        <input className="vnd-input" name="address1" placeholder="House / flat no., street"
                            value={form.address1} onChange={handleChange} />
                    </div>
                    <div className="vnd-field">
                        <label className="vnd-label">Address Line 2</label>
                        <input className="vnd-input" name="address2" placeholder="Landmark, area"
                            value={form.address2} onChange={handleChange} />
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">City</label>
                            <input className="vnd-input" name="city" placeholder="Chennai"
                                value={form.city} onChange={handleChange} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Pincode</label>
                            <input className="vnd-input" name="pincode" placeholder="600001"
                                value={form.pincode} onChange={handleChange} maxLength={6} />
                        </div>
                    </div>
                </div>

                {/* SECTION 4: Documents */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><IdIcon /></div>
                        <span className="vnd-section-label">Documents</span>
                    </div>
                    <div className="vnd-row">
                        <UploadZone field="profilePhoto" fileRef={profileRef}
                            currentFile={profilePhoto} label="Profile Photo" />
                        <UploadZone field="governmentId" fileRef={govRef}
                            currentFile={governmentId} label="Government ID" />
                    </div>
                </div>

                <button className="vnd-submit" type="submit" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit Application"}
                </button>
            </form>

            {showTerms && (
                <VendorTermsModal
                    onAccept={handleTermsAccepted}
                    onClose={() => setShowTerms(false)}
                />
            )}
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE VENDOR FORM
// ─────────────────────────────────────────────────────────────────────────────
function ServiceVendorForm({ onClose }) {
    const API_URL = process.env.REACT_APP_API_URL;
    const { addVendor } = useVendors();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "", shopName: "", phone: "", whatsapp_number: "",
        email: "", password: "", category_id: "", experience: "", address1: "",
        address2: "", city: "", pincode: "", business_description: "",
        languages_known: "", availability: "all_days",
        start_time: "09:00", end_time: "18:00",
    });

    const [categories, setCategories] = useState([]);
    const [subServices, setSubServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState({});
    const [customServices, setCustomServices] = useState([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const [loadingSubs, setLoadingSubs] = useState(false);
    const [dragOverId, setDragOverId] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [governmentId, setGovernmentId] = useState(null);
    const profileRef = useRef(null);
    const govRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${API_URL}/vendors/list-categories`);
                const data = await res.json();
                if (data.success) setCategories(data.categories);
            } catch (err) {
                console.error("Failed to load categories:", err);
            } finally {
                setLoadingCats(false);
            }
        };
        fetchCategories();
    }, [API_URL]);

    useEffect(() => {
        if (!form.category_id) { setSubServices([]); setSelectedServices({}); return; }
        const fetchSubs = async () => {
            setLoadingSubs(true); setSubServices([]); setSelectedServices({});
            try {
                const res = await fetch(`${API_URL}/vendors/sub-services/${form.category_id}`);
                const data = await res.json();
                if (data.success) setSubServices(data.subServices);
            } catch (err) {
                console.error("Failed to load sub-services:", err);
            } finally {
                setLoadingSubs(false);
            }
        };
        fetchSubs();
    }, [form.category_id, API_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleServiceToggle = (id) => {
        setSelectedServices((prev) => {
            if (id in prev) { const u = { ...prev }; delete u[id]; return u; }
            return { ...prev, [id]: "" };
        });
    };

    const addCustomService = () =>
        setCustomServices(prev => [...prev, { service_name: "", price: "" }]);

    const removeCustomService = (i) =>
        setCustomServices(prev => prev.filter((_, idx) => idx !== i));

    const handleCustomServiceChange = (i, field, value) =>
        setCustomServices(prev => {
            const updated = [...prev];
            updated[i] = { ...updated[i], [field]: value };
            return updated;
        });

    const handleServicePrice = (id, price) =>
        setSelectedServices((prev) => ({ ...prev, [id]: price }));

    const handleFile = (field, file) => {
        if (!file) return;
        if (field === "profilePhoto") setProfilePhoto(file);
        else setGovernmentId(file);
    };

    const handleDrop = (e, field) => {
        e.preventDefault(); setDragOverId(null);
        handleFile(field, e.dataTransfer.files[0]);
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (!form.fullName || !form.phone || !form.category_id) {
            alert("Please fill in Full Name, Phone Number and Service Category.");
            return;
        }
        if (!/^\d{10}$/.test(form.phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }
        if (form.pincode && !/^\d{6}$/.test(form.pincode)) {
            alert("Pincode must be exactly 6 digits.");
            return;
        }
        setShowTerms(true);
    };

    const handleTermsAccepted = async (termsAccepted) => {
        setShowTerms(false);

        const servicesArray = [
            // existing selected sub-services
            ...Object.entries(selectedServices).map(([id, price]) => ({
                sub_service_id: Number(id),
                price: price === "" ? 0 : Number(price),
            })),
            // custom services
            ...customServices
                .filter(s => s.service_name.trim() !== "")
                .map(s => ({
                    service_name: s.service_name.trim(),
                    price: s.price === "" ? 0 : Number(s.price),
                    is_custom: true,
                })),
        ];

        const formData = new FormData();
        formData.append("fullName", form.fullName);
        formData.append("shopName", form.shopName);
        formData.append("phone", form.phone);
        formData.append("whatsapp_number", form.whatsapp_number || form.phone);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("category_id", form.category_id);
        formData.append("experience", form.experience);
        formData.append("address1", form.address1);
        formData.append("address2", form.address2);
        formData.append("city", form.city);
        formData.append("pincode", form.pincode);
        formData.append("business_description", form.business_description);
        formData.append("languages_known", form.languages_known);
        formData.append("availability", form.availability);
        formData.append("start_time", form.start_time);
        formData.append("end_time", form.end_time);
        formData.append("terms_accepted", String(termsAccepted));
        formData.append("services", JSON.stringify(servicesArray));
        if (profilePhoto) formData.append("profilePhoto", profilePhoto);
        if (governmentId) formData.append("governmentId", governmentId);

        setSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/vendors/vendorregister`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                alert("Vendor Registered Successfully!");
                onClose && onClose();
                navigate("/services");
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const UploadZone = ({ field, fileRef, currentFile, label }) => (
        <div className="vnd-field">
            <label className="vnd-label">{label}<span className="vnd-req">*</span></label>
            <div
                className={`vnd-upload ${dragOverId === field ? "vnd-upload--active" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOverId(field); }}
                onDragLeave={() => setDragOverId(null)}
                onDrop={(e) => handleDrop(e, field)}
                onClick={() => fileRef.current?.click()}
            >
                {currentFile ? (
                    <div className="vnd-upload-chosen">
                        <span className="vnd-upload-check">✓</span>
                        <p className="vnd-upload-text vnd-upload-text--file">{currentFile.name}</p>
                    </div>
                ) : (
                    <>
                        <UploadIcon />
                        <p className="vnd-upload-text">Drag &amp; drop or click to upload</p>
                        <p className="vnd-upload-hint">JPG, PNG, PDF supported</p>
                    </>
                )}
                <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp,.pdf"
                    style={{ display: "none" }}
                    onChange={(e) => handleFile(field, e.target.files[0])} />
            </div>
        </div>
    );

    return (
        <>
            <form className="vnd-form" onSubmit={handleSubmitClick}>

                {/* SECTION 1: Personal Information */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><PersonIcon /></div>
                        <span className="vnd-section-label">Personal Information</span>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Full Name <span className="vnd-req">*</span></label>
                            <input className="vnd-input" name="fullName" placeholder="Ramesh Kumar"
                                value={form.fullName} onChange={handleChange} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Shop / Business Name</label>
                            <input className="vnd-input" name="shopName" placeholder="Kumar Electricals"
                                value={form.shopName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Phone Number <span className="vnd-req">*</span></label>
                            <input className="vnd-input" name="phone" placeholder="9876543210"
                                value={form.phone} onChange={handleChange} type="tel" maxLength={10} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">WhatsApp Number</label>
                            <input className="vnd-input" name="whatsapp_number" placeholder="Same as phone if blank"
                                value={form.whatsapp_number} onChange={handleChange} type="tel" maxLength={10} />
                        </div>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Email Address</label>
                            <input className="vnd-input" name="email" placeholder="ramesh@example.com"
                                value={form.email} onChange={handleChange} type="email" />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Password <span className="vnd-req">*</span></label>
                            <input className="vnd-input" type="password" name="password"
                                placeholder="Enter password"
                                value={form.password} onChange={handleChange} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Languages Known</label>
                            <input className="vnd-input" name="languages_known" placeholder="Tamil, English, Hindi"
                                value={form.languages_known} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="vnd-field">
                        <label className="vnd-label">Business Description</label>
                        <textarea className="vnd-input vnd-textarea" name="business_description"
                            placeholder="Briefly describe your services and expertise…"
                            value={form.business_description} onChange={handleChange} rows={3} />
                    </div>
                </div>

                {/* SECTION 2: Service Details */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><ToolIcon /></div>
                        <span className="vnd-section-label">Service Details</span>
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Service Category <span className="vnd-req">*</span></label>
                            <div className="vnd-select-wrap">
                                <select className="vnd-input vnd-select" name="category_id"
                                    value={form.category_id} onChange={handleChange} disabled={loadingCats}>
                                    <option value="">{loadingCats ? "Loading…" : "Select category"}</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                                    ))}
                                </select>
                                <span className="vnd-select-icon"><ChevronDown /></span>
                            </div>
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Years of Experience</label>
                            <input className="vnd-input" name="experience" placeholder="e.g. 5 years"
                                value={form.experience} onChange={handleChange} />
                        </div>
                    </div>
                    {form.category_id && (
                        <div className="vnd-field">
                            <label className="vnd-label">
                                Sub-services &amp; Pricing -&nbsp;&nbsp;
                                <span className="vnd-label-hint">Select what you offer and set your price. Enter only the labour cost; service charge via admin panel.</span>
                            </label>
                            {loadingSubs ? (
                                <div className="vnd-subs-loading">Loading sub-services…</div>
                            ) : subServices.length === 0 ? (
                                <div className="vnd-subs-loading">No sub-services available.</div>
                            ) : (
                                <div className="vnd-subs-grid">
                                    {subServices.map((sub) => {
                                        const checked = sub.id in selectedServices;
                                        return (
                                            <div key={sub.id}
                                                className={`vnd-sub-card ${checked ? "vnd-sub-card--checked" : ""}`}
                                                onClick={() => handleServiceToggle(sub.id)}>
                                                <div className="vnd-sub-top">
                                                    <div className={`vnd-checkbox ${checked ? "vnd-checkbox--on" : ""}`}>
                                                        {checked && (
                                                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                                                <polyline points="2,6 5,9 10,3" stroke="#fff"
                                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className="vnd-sub-name">{sub.service_name}</span>
                                                </div>
                                                {checked && (
                                                    <div className="vnd-price-wrap" onClick={(e) => e.stopPropagation()}>
                                                        <span className="vnd-price-icon"><RupeeIcon /></span>
                                                        <input className="vnd-price-input" type="number" min="0"
                                                            placeholder="Your price"
                                                            value={selectedServices[sub.id]}
                                                            onChange={(e) => handleServicePrice(sub.id, e.target.value)} />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {/* Custom services */}
                            {customServices.map((cs, i) => (
                                <div key={i} className="vnd-plan-row" style={{ marginTop: "8px" }}>
                                    <input
                                        className="vnd-input"
                                        placeholder="Custom service name"
                                        value={cs.service_name}
                                        onChange={e => handleCustomServiceChange(i, "service_name", e.target.value)}
                                    />
                                    <div className="vnd-price-wrap">
                                        <span className="vnd-price-icon"><RupeeIcon /></span>
                                        <input
                                            className="vnd-price-input"
                                            type="number"
                                            min="0"
                                            placeholder="Price"
                                            value={cs.price}
                                            onChange={e => handleCustomServiceChange(i, "price", e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="vnd-plan-remove"
                                        onClick={() => removeCustomService(i)}
                                    >✕</button>
                                </div>
                            ))}

                            <button type="button" className="vnd-plan-add" onClick={addCustomService}>
                                + Add Custom Service
                            </button>
                        </div>

                    )}
                    <div className="vnd-field">
                        <label className="vnd-label">Availability</label>
                        <div className="vnd-avail-tabs">
                            {AVAILABILITY_OPTIONS.map((opt) => (
                                <div key={opt.value}
                                    className={`vnd-avail-tab ${form.availability === opt.value ? "vnd-avail-tab--active" : ""}`}
                                    onClick={() => setForm((f) => ({ ...f, availability: opt.value }))}>
                                    {opt.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="vnd-field">
                        <label className="vnd-label">Working Hours</label>
                        <div className="vnd-hours-row">
                            <div className="vnd-field" style={{ flex: 1 }}>
                                <label className="vnd-label" style={{ fontSize: "11px", color: "#9ca3af" }}>From</label>
                                <input className="vnd-input" name="start_time" type="time"
                                    value={form.start_time} onChange={handleChange} />
                            </div>
                            <span className="vnd-hours-sep">→</span>
                            <div className="vnd-field" style={{ flex: 1 }}>
                                <label className="vnd-label" style={{ fontSize: "11px", color: "#9ca3af" }}>To</label>
                                <input className="vnd-input" name="end_time" type="time"
                                    value={form.end_time} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: Address */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><MapPinIcon /></div>
                        <span className="vnd-section-label">Address</span>
                    </div>
                    <div className="vnd-field">
                        <label className="vnd-label">Address Line 1</label>
                        <input className="vnd-input" name="address1" placeholder="House / flat no., street"
                            value={form.address1} onChange={handleChange} />
                    </div>
                    <div className="vnd-field">
                        <label className="vnd-label">Address Line 2</label>
                        <input className="vnd-input" name="address2" placeholder="Landmark, area"
                            value={form.address2} onChange={handleChange} />
                    </div>
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">City</label>
                            <input className="vnd-input" name="city" placeholder="Chennai"
                                value={form.city} onChange={handleChange} />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Pincode</label>
                            <input className="vnd-input" name="pincode" placeholder="600001"
                                value={form.pincode} onChange={handleChange} maxLength={6} />
                        </div>
                    </div>
                </div>

                {/* SECTION 4: Documents */}
                <div className="vnd-section">
                    <div className="vnd-section-header">
                        <div className="vnd-section-icon"><IdIcon /></div>
                        <span className="vnd-section-label">Documents</span>
                    </div>
                    <div className="vnd-row">
                        <UploadZone field="profilePhoto" fileRef={profileRef}
                            currentFile={profilePhoto} label="Profile Photo" />
                        <UploadZone field="governmentId" fileRef={govRef}
                            currentFile={governmentId} label="Government ID" />
                    </div>
                </div>

                <button className="vnd-submit" type="submit" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit Application"}
                </button>
            </form>

            {showTerms && (
                <VendorTermsModal
                    onAccept={handleTermsAccepted}
                    onClose={() => setShowTerms(false)}
                />
            )}
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT — three-button toggle
// ─────────────────────────────────────────────────────────────────────────────
export default function BecomeVendor({ onClose }) {
    // "service" | "activity" | "nearstall"
    const [vendorType, setVendorType] = useState("service");

    return (
        <div className="vnd-overlay">
            <div className="vnd-modal">

                {/* Header */}
                <div className="vnd-header">
                    <div className="vnd-header-icon"><ShopIcon /></div>
                    <div className="vnd-header-text">
                        <h2 className="vnd-title">Become a Vendor</h2>
                        <p className="vnd-subtitle">Tell us about yourself to get started</p>
                    </div>
                    <button className="vnd-close" onClick={onClose} type="button"><CloseIcon /></button>
                </div>

                {/* Banner */}
                <div className="vnd-banner">
                    <BoltIcon />
                    <span>Get verified in 48 hours and start earning ₹40,000+ per month.</span>
                </div>

                {/* ── Type Toggle ── */}
                <div className="vnd-type-toggle">
                    <button
                        type="button"
                        className={`vnd-type-btn ${vendorType === "service" ? "vnd-type-btn--active" : ""}`}
                        onClick={() => setVendorType("service")}
                    >
                        <ToolIcon />
                        <span>Service</span>
                    </button>
                    <button
                        type="button"
                        className={`vnd-type-btn ${vendorType === "activity" ? "vnd-type-btn--active" : ""}`}
                        onClick={() => setVendorType("activity")}
                    >
                        <ActivityIcon />
                        <span>Activity</span>
                    </button>
                    <button
                        type="button"
                        className={`vnd-type-btn ${vendorType === "nearstall" ? "vnd-type-btn--active" : ""}`}
                        onClick={() => setVendorType("nearstall")}
                    >
                        <StallIcon />
                        <span>Near Stall</span>
                    </button>
                </div>

                {/* ── Render correct form ── */}
                {vendorType === "service" && <ServiceVendorForm onClose={onClose} />}
                {vendorType === "activity" && <ActivityVendorForm onClose={onClose} />}
                {vendorType === "nearstall" && <NearStallVendorForm onClose={onClose} />}

            </div>
        </div>
    );
}