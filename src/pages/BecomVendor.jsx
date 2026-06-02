import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVendors } from "./Vendorcontext";
import "../styles/BecomeVendor.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const ShopIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const BoltIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#d97706"
        stroke="#d97706" strokeWidth="0">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const UploadIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
        stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
export default function BecomeVendor({ onClose }) {
    const { addVendor } = useVendors();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        shopName: "",
        phone: "",
        email: "",
        category: "",
        experience: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
    });

    const [dragOver, setDragOver] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const fileRef = useRef(null);

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleFile = (file) => {
        if (file) setUploadedFile(file.name);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.fullName || !form.phone || !form.category) {
            alert("Please fill in Full Name, Phone Number and Service Category.");
            return;
        }
        addVendor(form);
        onClose && onClose();
        navigate("/services");
    };

    return (
        <div className="vnd-overlay">
            <div className="vnd-modal">

                {/* ── Header ── */}
                <div className="vnd-header">
                    <div className="vnd-header-icon">
                        <ShopIcon />
                    </div>
                    <div className="vnd-header-text">
                        <h2 className="vnd-title">Become a Vendor</h2>
                        <p className="vnd-subtitle">Tell us about yourself to get started</p>
                    </div>
                    <button className="vnd-close" onClick={onClose} type="button">
                        <CloseIcon />
                    </button>
                </div>

                {/* ── Banner ── */}
                <div className="vnd-banner">
                    <BoltIcon />
                    <span>Get verified in 48 hours and start earning ₹40,000+ per month.</span>
                </div>

                {/* ── Form ── */}
                <form className="vnd-form" onSubmit={handleSubmit}>

                    {/* Row: Full Name + Shop Name */}
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">Full Name</label>
                            <input
                                className="vnd-input"
                                name="fullName"
                                placeholder="Ramesh Kumar"
                                value={form.fullName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="vnd-field">
                        <label className="vnd-label">Shop Name</label>
                        <input
                            className="vnd-input"
                            name="shopName"
                            placeholder="Kumar Electricals"
                            value={form.shopName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone */}
                    <div className="vnd-field">
                        <label className="vnd-label">Phone Number</label>
                        <input
                            className="vnd-input"
                            name="phone"
                            placeholder="+91 98765 43210"
                            value={form.phone}
                            onChange={handleChange}
                            type="tel"
                        />
                    </div>

                    {/* Email */}
                    <div className="vnd-field">
                        <label className="vnd-label">Email Address</label>
                        <input
                            className="vnd-input"
                            name="email"
                            placeholder="ramesh@example.com"
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                        />
                    </div>

                    {/* Service Category */}
                    <div className="vnd-field">
                        <label className="vnd-label">Service Category</label>
                        <input
                            className="vnd-input"
                            name="category"
                            placeholder=""
                            value={form.category}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Experience */}
                    <div className="vnd-field">
                        <label className="vnd-label">Experience</label>
                        <input
                            className="vnd-input"
                            name="experience"
                            placeholder=""
                            value={form.experience}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Address Line 1 */}
                    <div className="vnd-field">
                        <label className="vnd-label">Address Line 1</label>
                        <input
                            className="vnd-input"
                            name="address1"
                            placeholder=""
                            value={form.address1}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Address Line 2 */}
                    <div className="vnd-field">
                        <label className="vnd-label">Address Line  2</label>
                        <input
                            className="vnd-input"
                            name="address2"
                            placeholder=""
                            value={form.address2}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Row: City + Pincode */}
                    <div className="vnd-row">
                        <div className="vnd-field">
                            <label className="vnd-label">City</label>
                            <input
                                className="vnd-input"
                                name="city"
                                placeholder=""
                                value={form.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="vnd-field">
                            <label className="vnd-label">Pincode</label>
                            <input
                                className="vnd-input"
                                name="pincode"
                                placeholder=""
                                value={form.pincode}
                                onChange={handleChange}
                                maxLength={6}
                            />
                        </div>
                    </div>

                    {/* Upload Government ID */}
                    <div className="vnd-field">
                        <label className="vnd-label">Upload Government Id</label>
                        <div
                            className={`vnd-upload ${dragOver ? "vnd-upload--active" : ""}`}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileRef.current?.click()}
                        >
                            <UploadIcon />
                            {uploadedFile ? (
                                <p className="vnd-upload-text vnd-upload-text--file">{uploadedFile}</p>
                            ) : (
                                <>
                                    <p className="vnd-upload-text">Drag &amp; Drop or Choose file to upload</p>
                                    <p className="vnd-upload-hint">JPG, PDF, CVS</p>
                                </>
                            )}
                            <input
                                ref={fileRef}
                                type="file"
                                accept=".jpg,.jpeg,.pdf,.csv"
                                style={{ display: "none" }}
                                onChange={(e) => handleFile(e.target.files[0])}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button className="vnd-submit" type="submit">
                        Submit Application
                    </button>

                </form>
            </div>
        </div>
    );
}