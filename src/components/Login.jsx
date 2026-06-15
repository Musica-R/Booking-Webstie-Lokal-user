// Login.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/Login.css";


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

/* ── OTP Input boxes ── */
function OtpInput({ otp, setOtp }) {
    const inputRefs = useRef([]);

    const handleChange = (e, idx) => {
        const val = e.target.value.replace(/\D/g, "").slice(-1);
        const next = [...otp];
        next[idx] = val;
        setOtp(next);
        if (val && idx < 5) {
            inputRefs.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const next = [...otp];
        pasted.split("").forEach((ch, i) => { next[i] = ch; });
        setOtp(next);
        const focusIdx = Math.min(pasted.length, 5);
        inputRefs.current[focusIdx]?.focus();
    };

    return (
        <div className="otp-boxes" role="group" aria-label="6-digit OTP">
            {otp.map((digit, idx) => (
                <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    className={`otp-box${digit ? " filled" : ""}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onPaste={handlePaste}
                    aria-label={`OTP digit ${idx + 1}`}
                    autoComplete="one-time-code"
                />
            ))}
        </div>
    );
}

/* ── Countdown timer hook ── */
function useCountdown(initial) {
    const [seconds, setSeconds] = useState(initial);
    const [running, setRunning] = useState(true);

    useEffect(() => {
        if (!running) return;
        if (seconds <= 0) { setRunning(false); return; }
        const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [seconds, running]);

    const reset = () => { setSeconds(initial); setRunning(true); };
    const fmt = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    return { seconds, fmt, done: !running, reset };
}

/* ── OTP Verification form ── */
function OtpVerifyForm({ phone, onEdit, onLoginSuccess }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const { fmt, done, reset } = useCountdown(24);
    const navigate = useNavigate();
    const location = useLocation();
    const masked = `+91 XXXXX X${phone.slice(-4)}`;

    const handleResend = () => {
        setOtp(["", "", "", "", "", ""]);
        reset();
    };

    const handleVerify = () => {
        const otpValue = otp.join("");
        if (otpValue.length === 6) {
            const userData = {
                isLoggedIn: true,
                name: "John Doe",
                phone: phone,
                email: "john.doe@example.com",
                avatar: null,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            onLoginSuccess(userData);

            // Redirect back to where user came from, or /account as fallback
            const redirectTo = location.state?.redirectTo || "/account";
            navigate(redirectTo, { replace: true });
        } else {
            alert("Please enter complete OTP");
        }
    };

    return (
        <>
            <p className="otp-sent-msg">
                We've sent a 6-digit code to{" "}
                <strong>{masked}</strong>{" "}
                <button className="otp-edit-btn" type="button" onClick={onEdit}>
                    Edit
                </button>
            </p>

            <OtpInput otp={otp} setOtp={setOtp} />

            <p className="otp-resend">
                {done ? (
                    <button className="otp-resend-btn" type="button" onClick={handleResend}>
                        Resend OTP
                    </button>
                ) : (
                    <>Resend OTP in <strong>{fmt}</strong></>
                )}
            </p>

            <button className="btn-primary" type="button" onClick={handleVerify}>
                Verify &amp; Login
            </button>
        </>
    );
}

/* ── Phone OTP tab ── */
function PhoneOTPForm({ onLoginSuccess }) {
    const [phone, setPhone] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const handleSend = () => {
        if (phone.length === 10) setOtpSent(true);
    };

    if (otpSent) {
        return (
            <OtpVerifyForm
                phone={phone}
                onEdit={() => setOtpSent(false)}
                onLoginSuccess={onLoginSuccess}
            />
        );
    }

    return (
        <>
            <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <div className="phone-input-row">
                    <div className="phone-prefix">
                        <span className="flag">🇮🇳</span>
                        <span>+91</span>
                    </div>
                    <input
                        className="phone-number-input"
                        type="tel"
                        placeholder="Enter 10-digit number"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        aria-label="Mobile number"
                    />
                </div>
            </div>
            <button className="btn-primary" type="button" onClick={handleSend}>
                Send OTP
            </button>
        </>
    );
}

/* ── Email & Password tab ── */
function EmailPasswordForm({ onLoginSuccess }) {
    const [showPass, setShowPass] = useState(false);
    const [email,    setEmail]    = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const API_URL = process.env.REACT_APP_API_URL;

    const handleSignIn = async () => {
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                const userData = {
                    isLoggedIn:   true,
                    id:           data.user.id,
                    name:         data.user.name,
                    email:        data.user.email,
                    phone:        data.user.phone,
                    location:     data.user.location,
                    profileImage: data.user.profileImage,
                };

                localStorage.setItem("user", JSON.stringify(userData));
                onLoginSuccess(userData);

                // Redirect back to where user came from, or /account as fallback
                const redirectTo = location.state?.redirectTo || "/account";
                navigate(redirectTo, { replace: true });
            } else {
                alert(data.message || "Invalid email or password");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Server error. Please try again.");
        }
    };

    return (
        <>
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

            <div className="form-group">
                <div className="form-label-row">
                    <label className="form-label" htmlFor="password">Password</label>
                   <Link to="/forgot-password" className="form-forgot">Forgot Password?</Link>
                </div>
                <div className="password-wrap">
                    <input
                        id="password"
                        className="form-input"
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
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

            <button className="btn-primary" type="button" onClick={handleSignIn}>
                Sign In
            </button>
        </>
    );
}

/* ── Main Login Page ── */
export default function LoginPage() {
    const [tab, setTab] = useState("email");

    const handleLoginSuccess = (userData) => {
        window.dispatchEvent(new CustomEvent("userLogin", { detail: userData }));
    };

    return (
        <>
            {/* Top Nav */}
            <nav className="login-nav">
                <button className="nav-back" aria-label="Go back">
                    <Link to="/"><BackIcon /></Link>
                </button>
                <div className="nav-logo" aria-label="Lokal">
                    <span className="nav-logo-text">Lokal</span>
                    <span className="nav-logo-dot" aria-hidden="true">.</span>
                </div>
            </nav>

            {/* Login form */}
            <main className="login-page">
                <div className="login-card">
                    <h1 className="login-heading">Sign in to your account</h1>
                    <p className="login-sub">Welcome back! Please enter your details.</p>

                    {/* Tab switcher */}
                    <div className="login-tabs" role="tablist" aria-label="Sign in method">
                        <button
                            className={`login-tab${tab === "phone" ? " active" : ""}`}
                            role="tab"
                            aria-selected={tab === "phone"}
                            onClick={() => setTab("phone")}
                        >
                            Phone OTP
                        </button>
                        <button
                            className={`login-tab${tab === "email" ? " active" : ""}`}
                            role="tab"
                            aria-selected={tab === "email"}
                            onClick={() => setTab("email")}
                        >
                            Email &amp; Password
                        </button>
                    </div>

                    {/* Tab content */}
                    {tab === "phone"
                        ? <PhoneOTPForm onLoginSuccess={handleLoginSuccess} />
                        : <EmailPasswordForm onLoginSuccess={handleLoginSuccess} />
                    }

                    {/* Or divider */}
                    <div className="or-divider" aria-hidden="true">
                        <div className="or-line" />
                        <span className="or-text">Or continue with</span>
                        <div className="or-line" />
                    </div>

                    {/* Social buttons */}
                    <div className="social-row">
                        <button className="btn-social" type="button" aria-label="Sign in with Google">
                            <GoogleIcon /> Google
                        </button>
                        <button className="btn-social" type="button" aria-label="Sign in with Facebook">
                            <FacebookIcon /> Facebook
                        </button>
                    </div>

                    {/* Sign up */}
                    <p className="signup-link">
                        New to NearKart? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </main>
        </>
    );
}