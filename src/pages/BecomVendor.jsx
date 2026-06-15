// ── CHANGES ONLY — apply these to your existing BecomeVendor.jsx ──────────────
//
// 1. Import VendorTermsModal at the top:
//
//    import VendorTermsModal from "./VendorTermsModal";
//
// 2. Add one state variable inside the component:
//
//    const [showTerms, setShowTerms] = useState(false);
//
// 3. Replace handleSubmit entirely with the two functions below:
//
//    // Called when user clicks "Submit Application" — validates then shows modal
//    const handleSubmitClick = (e) => {
//        e.preventDefault();
//
//        if (!form.fullName || !form.phone || !form.category_id) {
//            alert("Please fill in Full Name, Phone Number and Service Category.");
//            return;
//        }
//        if (!/^\d{10}$/.test(form.phone)) {
//            alert("Phone number must be exactly 10 digits.");
//            return;
//        }
//        if (form.pincode && !/^\d{6}$/.test(form.pincode)) {
//            alert("Pincode must be exactly 6 digits.");
//            return;
//        }
//
//        setShowTerms(true);   // ← open Terms modal
//    };
//
//    // Called by VendorTermsModal when user ticks the box and confirms
//    const handleTermsAccepted = async (termsAccepted) => {
//        setShowTerms(false);
//
//        const servicesArray = Object.entries(selectedServices).map(([id, price]) => ({
//            sub_service_id: Number(id),
//            price: price === "" ? 0 : Number(price),
//        }));
//
//        const formData = new FormData();
//        formData.append("fullName",            form.fullName);
//        formData.append("shopName",            form.shopName);
//        formData.append("phone",               form.phone);
//        formData.append("whatsapp_number",     form.whatsapp_number || form.phone);
//        formData.append("email",               form.email);
//        formData.append("category_id",         form.category_id);
//        formData.append("experience",          form.experience);
//        formData.append("address1",            form.address1);
//        formData.append("address2",            form.address2);
//        formData.append("city",                form.city);
//        formData.append("pincode",             form.pincode);
//        formData.append("business_description",form.business_description);
//        formData.append("languages_known",     form.languages_known);
//        formData.append("availability",        form.availability);
//        formData.append("start_time",          form.start_time);
//        formData.append("end_time",            form.end_time);
//        formData.append("terms_accepted",      String(termsAccepted));   // ← "true"
//        formData.append("services",            JSON.stringify(servicesArray));
//        if (profilePhoto)  formData.append("profilePhoto",  profilePhoto);
//        if (governmentId)  formData.append("governmentId",  governmentId);
//
//        setSubmitting(true);
//        try {
//            const response = await fetch(`${API_URL}/vendors/vendorregister`, {
//                method: "POST",
//                body: formData,
//            });
//            const data = await response.json();
//            if (data.success) {
//                alert("Vendor Registered Successfully!");
//                onClose && onClose();
//                navigate("/services");
//            } else {
//                alert(data.message || "Registration failed.");
//            }
//        } catch (error) {
//            console.error(error);
//            alert("Something went wrong. Please try again.");
//        } finally {
//            setSubmitting(false);
//        }
//    };
//
// 4. Change the <form> onSubmit and the submit button:
//
//    <form className="vnd-form" onSubmit={handleSubmitClick}>
//        ...
//        <button className="vnd-submit" type="submit" disabled={submitting}>
//            {submitting ? "Submitting…" : "Submit Application"}
//        </button>
//    </form>
//
// 5. Render the modal just before the closing </div> of vnd-overlay:
//
//    {showTerms && (
//        <VendorTermsModal
//            onAccept={handleTermsAccepted}
//            onClose={() => setShowTerms(false)}
//        />
//    )}
//
// ─────────────────────────────────────────────────────────────────────────────
// Full updated component for reference:

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVendors } from "./Vendorcontext";
import VendorTermsModal from "./Vendortermsmodal";   // ← NEW
import "../styles/BecomeVendor.css";

// ── Icons (unchanged) ─────────────────────────────────────────────────────────
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

// ── Component ─────────────────────────────────────────────────────────────────
export default function BecomeVendor({ onClose }) {

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
    const [loadingCats, setLoadingCats] = useState(true);
    const [loadingSubs, setLoadingSubs] = useState(false);
    const [dragOverId, setDragOverId] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [governmentId, setGovernmentId] = useState(null);
    const profileRef = useRef(null);
    const govRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);
    const [showTerms, setShowTerms] = useState(false);   // ← NEW

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

    // ── Step 1: validate → open Terms modal ───────────────────────────────────
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

    // ── Step 2: user accepted T&C → do the actual API call ───────────────────
    const handleTermsAccepted = async (termsAccepted) => {
        setShowTerms(false);

        const servicesArray = Object.entries(selectedServices).map(([id, price]) => ({
            sub_service_id: Number(id),
            price: price === "" ? 0 : Number(price),
        }));

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
        formData.append("terms_accepted", String(termsAccepted));   // "true"
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

    // ── Upload Zone (unchanged) ───────────────────────────────────────────────
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

    const AVAILABILITY_OPTIONS = [
        { value: "all_days", label: "All days" },
        { value: "weekdays", label: "Weekdays only" },
        { value: "weekends", label: "Weekends only" },
    ];

    // ── Render ────────────────────────────────────────────────────────────────
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

                {/* ── form onSubmit now points to handleSubmitClick ── */}
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
                                <label className="vnd-label">
                                    Password <span className="vnd-req">*</span>
                                </label>

                                <input
                                    className="vnd-input"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
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
                                    <span className="vnd-label-hint">select what you offer and set your price</span>
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

                    {/* Submit — triggers validation then opens Terms modal */}
                    <button className="vnd-submit" type="submit" disabled={submitting}>
                        {submitting ? "Submitting…" : "Submit Application"}
                    </button>

                </form>
            </div>

            {/* ── Terms & Conditions modal ── */}
            {showTerms && (
                <VendorTermsModal
                    onAccept={handleTermsAccepted}
                    onClose={() => setShowTerms(false)}
                />
            )}
        </div>
    );
}