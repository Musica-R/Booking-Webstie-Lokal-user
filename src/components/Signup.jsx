// Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css";

/* ── Icons ── */
const BackIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const EyeIcon = ({ open }) =>
    open ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const LocationIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

/* ── Field validation helpers ── */
const validators = {
    name: (v) => v.trim().length >= 2 ? "" : "Name must be at least 2 characters",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address",
    password: (v) => v.length >= 8 ? "" : "Password must be at least 8 characters",
    phone: (v) => /^\d{10}$/.test(v) ? "" : "Enter a valid 10-digit mobile number",
    location: (v) => v.trim().length >= 3 ? "" : "Enter your city or area",
};

/* ── Main Signup Page ── */
export default function SignupPage() {
    const API_URL = process.env.REACT_APP_API_URL;
    
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        profileImage: null,
    });

    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [locating, setLocating] = useState(false);

    /* Update a single field */
    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        // Clear error on change
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    /* Validate all fields, return true if clean */
    const validateAll = () => {
        const newErrors = {};
        Object.keys(validators).forEach((field) => {
            const msg = validators[field](form[field]);
            if (msg) newErrors[field] = msg;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* Auto-detect location via Geolocation API */
    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            setErrors((prev) => ({ ...prev, location: "Geolocation not supported by your browser." }));
            return;
        }
        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const data = await res.json();
                    const city =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.state_district ||
                        "";
                    const state = data.address.state || "";
                    const detected = city ? `${city}, ${state}` : state;
                    handleChange("location", detected);
                } catch {
                    setErrors((prev) => ({ ...prev, location: "Could not fetch location. Please type manually." }));
                } finally {
                    setLocating(false);
                }
            },
            () => {
                setErrors((prev) => ({ ...prev, location: "Location access denied. Please type manually." }));
                setLocating(false);
            }
        );
    };

    /* Submit */
    const handleSignUp = async () => {
        if (!validateAll()) return;

        try {
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("password", form.password);
            formData.append("phone", form.phone);
            formData.append("location", form.location);

            if (form.profileImage) {
                formData.append("profileImage", form.profileImage);
            }

            const response = await fetch(
                `${API_URL}/users/register`,
                {
                    method: "POST",
                    body: formData, // 👈 NO headers needed
                }
            );

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                navigate("/login");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Server Error");
        }
    };
    return (
        <>
            {/* Top Nav */}
            <nav className="login-nav">
                <button className="nav-back" aria-label="Go back">
                    <Link to="/login"><BackIcon /></Link>
                </button>
                <div className="nav-logo" aria-label="Lokal">
                    <span className="nav-logo-text">Lokal</span>
                    <span className="nav-logo-dot" aria-hidden="true">.</span>
                </div>
            </nav>

            {/* Signup form */}
            <main className="login-page">
                <div className="login-card">
                    <h1 className="login-heading">Create your account</h1>
                    <p className="login-sub">Join NearKart and discover local services near you.</p>

                    {/* Full Name */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            className={`form-input${errors.name ? " input-error" : ""}`}
                            type="text"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            autoComplete="name"
                        />
                        {errors.name && <p className="field-error">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="su-email">Email Address</label>
                        <input
                            id="su-email"
                            className={`form-input${errors.email ? " input-error" : ""}`}
                            type="email"
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            autoComplete="email"
                        />
                        {errors.email && <p className="field-error">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="su-password">Password</label>
                        <div className="password-wrap">
                            <input
                                id="su-password"
                                className={`form-input${errors.password ? " input-error" : ""}`}
                                type={showPass ? "text" : "password"}
                                placeholder="Min. 8 characters"
                                value={form.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                autoComplete="new-password"
                            />
                            <button
                                className="eye-btn"
                                type="button"
                                onClick={() => setShowPass((p) => !p)}
                                aria-label={showPass ? "Hide password" : "Show password"}
                            >
                                <EyeIcon open={showPass} />
                            </button>
                        </div>
                        {errors.password && <p className="field-error">{errors.password}</p>}
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label className="form-label">Mobile Number</label>
                        <div className={`phone-input-row${errors.phone ? " input-error-border" : ""}`}>
                            <div className="phone-prefix">
                                <span className="flag">🇮🇳</span>
                                <span>+91</span>
                            </div>
                            <input
                                className="phone-number-input"
                                type="tel"
                                placeholder="Enter 10-digit number"
                                maxLength={10}
                                value={form.phone}
                                onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ""))}
                                aria-label="Mobile number"
                            />
                        </div>
                        {errors.phone && <p className="field-error">{errors.phone}</p>}
                    </div>

                    {/* Profile Image */}
                    <div className="form-group">
                        <label className="form-label">Profile Image</label>

                        <input
                            type="file"
                            accept="image/*"
                            className="form-input"
                            onChange={(e) =>
                                handleChange("profileImage", e.target.files[0])
                            }
                        />

                        {form.profileImage && (
                            <p className="field-error" style={{ color: "green" }}>
                                Selected: {form.profileImage.name}
                            </p>
                        )}
                    </div>

                    {/* Location */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="location">Location</label>
                        <div className="location-wrap">
                            <input
                                id="location"
                                className={`form-input location-input${errors.location ? " input-error" : ""}`}
                                type="text"
                                placeholder="City or area (e.g. Bangalore, MG Road)"
                                value={form.location}
                                onChange={(e) => handleChange("location", e.target.value)}
                                autoComplete="address-level2"
                            />
                            <button
                                className={`detect-btn${locating ? " detecting" : ""}`}
                                type="button"
                                onClick={handleDetectLocation}
                                aria-label="Detect my location"
                                title="Auto-detect location"
                                disabled={locating}
                            >
                                <LocationIcon />
                                <span>{locating ? "Detecting…" : "Detect"}</span>
                            </button>
                        </div>
                        {errors.location && <p className="field-error">{errors.location}</p>}
                    </div>

                    {/* Submit */}
                    <button className="btn-primary" type="button" onClick={handleSignUp}>
                        Create Account
                    </button>

                    {/* Divider */}
                    <div className="or-divider" aria-hidden="true">
                        <div className="or-line" />
                        <span className="or-text">Or sign up with</span>
                        <div className="or-line" />
                    </div>

                    {/* Social */}
                    <div className="social-row">
                        <button className="btn-social" type="button" aria-label="Sign up with Google">
                            <GoogleIcon /> Google
                        </button>
                        <button className="btn-social" type="button" aria-label="Sign up with Facebook">
                            <FacebookIcon /> Facebook
                        </button>
                    </div>

                    {/* Login link */}
                    <p className="signup-link">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </main>
        </>
    );
}