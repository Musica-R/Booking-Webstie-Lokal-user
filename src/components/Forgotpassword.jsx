// ForgotPassword.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

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

const API_URL = process.env.REACT_APP_API_URL;

/* ── STEP 1: Enter Email ── */
function EmailStep({ onSent }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError("");

        if (!email) {
            setError("Email is required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/users/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                onSent(email);
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error("Forgot Password Error:", err);
            setError("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="login-heading">Forgot Password?</h1>
            <p className="login-sub">
                Enter your registered email address and we'll send you an OTP to reset your password.
            </p>

            <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                    id="email"
                    className="form-input"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
                className="btn-primary"
                type="button"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Sending..." : "Send OTP"}
            </button>

            <p className="signup-link">
                Remembered your password? <Link to="/login">Sign In</Link>
            </p>
        </>
    );
}

/* ── STEP 2: Verify OTP ── */
function OtpStep({ email, onVerified, onEditEmail }) {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        setError("");

        if (!otp) {
            setError("OTP is required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/users/verify-reset-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (data.success) {
                onVerified();
            } else {
                setError(data.message || "Invalid OTP");
            }
        } catch (err) {
            console.error("Verify OTP Error:", err);
            setError("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="login-heading">Verify OTP</h1>
            <p className="otp-sent-msg">
                We've sent a 6-digit code to{" "}
                <strong>{email}</strong>{" "}
                <button className="otp-edit-btn" type="button" onClick={onEditEmail}>
                    Edit
                </button>
            </p>

            <div className="form-group">
                <label className="form-label" htmlFor="otp">Enter OTP</label>
                <input
                    id="otp"
                    className="form-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
                className="btn-primary"
                type="button"
                onClick={handleVerify}
                disabled={loading}
            >
                {loading ? "Verifying..." : "Verify OTP"}
            </button>
        </>
    );
}

/* ── STEP 3: Reset Password ── */
function ResetPasswordStep({ email, onSuccess }) {
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        setError("");

        if (!password || !confirmPassword) {
            setError("Both fields are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/users/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword: password }),
            });

            const data = await res.json();

            if (data.success) {
                onSuccess();
            } else {
                setError(data.message || "Password update failed");
            }
        } catch (err) {
            console.error("Reset Password Error:", err);
            setError("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="login-heading">Reset Password</h1>
            <p className="login-sub">Create a new password for <strong>{email}</strong></p>

            <div className="form-group">
                <label className="form-label" htmlFor="newPassword">New Password</label>
                <div className="password-wrap">
                    <input
                        id="newPassword"
                        className="form-input"
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                <div className="password-wrap">
                    <input
                        id="confirmPassword"
                        className="form-input"
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    <button
                        className="eye-btn"
                        type="button"
                        onClick={() => setShowConfirm((p) => !p)}
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                        <EyeIcon open={showConfirm} />
                    </button>
                </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
                className="btn-primary"
                type="button"
                onClick={handleReset}
                disabled={loading}
            >
                {loading ? "Updating..." : "Reset Password"}
            </button>
        </>
    );
}

/* ── STEP 4: Success ── */
function SuccessStep() {
    const navigate = useNavigate();

    return (
        <>
            <h1 className="login-heading">Password Updated!</h1>
            <p className="login-sub">
                Your password has been reset successfully. You can now sign in with your new password.
            </p>

            <button
                className="btn-primary"
                type="button"
                onClick={() => navigate("/login", { replace: true })}
            >
                Go to Sign In
            </button>
        </>
    );
}

/* ── Main Forgot Password Page ── */
export default function ForgotPasswordPage() {
    const [step, setStep] = useState("email"); // email -> otp -> reset -> success
    const [email, setEmail] = useState("");

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

            <main className="login-page">
                <div className="login-card">
                    {step === "email" && (
                        <EmailStep
                            onSent={(em) => {
                                setEmail(em);
                                setStep("otp");
                            }}
                        />
                    )}

                    {step === "otp" && (
                        <OtpStep
                            email={email}
                            onEditEmail={() => setStep("email")}
                            onVerified={() => setStep("reset")}
                        />
                    )}

                    {step === "reset" && (
                        <ResetPasswordStep
                            email={email}
                            onSuccess={() => setStep("success")}
                        />
                    )}

                    {step === "success" && <SuccessStep />}
                </div>
            </main>
        </>
    );
}