import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SERVICES } from "./EssentialServices";
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const VerifyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb"
        stroke="#2563eb" strokeWidth="0">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ── Service Icons ─────────────────────────────────────────────────────────────
const serviceIcons = {
    electrician: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#3b5bdb" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    plumber: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
    ),
    ac: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07 19.07 4.93" />
        </svg>
    ),
    painting: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M2 13.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6.5" />
            <path d="M7 13V7a5 5 0 0 1 10 0v6" />
            <line x1="12" y1="13" x2="12" y2="21" />
        </svg>
    ),
    cleaning: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    carwash: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5" />
            <circle cx="15" cy="17" r="2" /><circle cx="7" cy="17" r="2" />
            <path d="M13 17H9M19 17h2" />
        </svg>
    ),
    ro: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M9 9h6M9 12h6M9 15h4" />
        </svg>
    ),
    cctv: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    ),
    pest: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
    ),
    appliance: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    carpenter: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#3b5bdb" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    tank: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
    ),
};

// ── Step definitions ──────────────────────────────────────────────────────────
const STEPS = [
    { id: 1, label: "Details" },
    { id: 2, label: "Date & Time" },
    { id: 3, label: "Address" },
    { id: 4, label: "Payment" },
    { id: 5, label: "Success" },
];

// ── Dates (dynamic: next 6 days from today) ───────────────────────────────────
function getNext6Days() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const result = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        result.push({
            day: days[d.getDay()],
            num: d.getDate(),
            month: months[d.getMonth()],
            year: d.getFullYear(),
            full: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
        });
    }
    return result;
}

const TIME_SLOTS = ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "06:00 PM"];

const PAYMENT_OPTS = [
    { id: "upi", icon: "💳", name: "UPI (GPay, PhonePe, Paytm)", sub: "Pay directly from your bank account" },
    { id: "card", icon: "🏧", name: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay accepted" },
    { id: "later", icon: "💵", name: "Pay after service", sub: "Pay via cash or UPI after work is done" },
];

// ── BookingService Component ──────────────────────────────────────────────────
export default function BookingService() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Look up the service by URL param id; fallback to Electrician
    const svc = SERVICES.find(s => s.id === Number(id)) || SERVICES[0];

    const onBack = () => navigate("/");

    const DATES = getNext6Days();

    const [step, setStep] = useState(1);
    const [requirements, setReqs] = useState("");
    const [selectedDate, setDate] = useState(null);
    const [selectedTime, setTime] = useState(null);
    const [selectedAddr, setAddr] = useState("home");
    const [selectedPay, setPay] = useState("upi");
    const [formData, setForm] = useState({ name: "", phone: "", flat: "", area: "", city: "" });

    const bookingId = "LK-2026-04821";
    const icon = serviceIcons[svc.iconKey] || serviceIcons.electrician;

    const goNext = () => setStep(s => Math.min(s + 1, 5));
    const goBack = () => setStep(s => Math.max(s - 1, 1));

    const selectedDateObj = DATES.find(d => d.full === selectedDate);
    const dateTimeDisplay = selectedDateObj && selectedTime
        ? `${selectedDateObj.year}-${String(DATES.indexOf(selectedDateObj) + 1).padStart(2, '0')}-${String(selectedDateObj.num).padStart(2, '0')}, ${selectedTime}`
        : "Not selected";

    // ── Stepper ────────────────────────────────────────────────────────────────
    const Stepper = () => (
        <div className="bk-stepper">
            {STEPS.map(s => {
                const isDone = step > s.id;
                const isActive = step === s.id;
                return (
                    <div key={s.id} className={`bk-step ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
                        <div className="bk-step__circle">
                            {isDone ? <CheckIcon /> : s.id}
                        </div>
                        <div className="bk-step__label">{s.label}</div>
                    </div>
                );
            })}
        </div>
    );

    // ── Step 1: Details ────────────────────────────────────────────────────────
    const Step1 = () => (
        <div>
            <p className="bk-subtitle">Review your selection before proceeding.</p>

            {/* Selected Service */}
            <div className="bk-card">
                <div className="bk-card-label">Selected service</div>
                <div className="bk-service-row" style={{ marginTop: 10 }}>
                    <div className="bk-service-icon">{icon}</div>
                    <div>
                        <div className="bk-service-name">{svc.name}</div>
                        <div className="bk-service-desc">{svc.desc}</div>
                    </div>
                </div>
            </div>

            {/* Selected Professional */}
            <div className="bk-card">
                <div className="bk-card-label">Selected Professional</div>
                <div className="bk-pro-row" style={{ marginTop: 10 }}>
                    <div className="bk-pro-avatar">R</div>
                    <div>
                        <div className="bk-pro-name">
                            Ramesh Kumar
                            <span className="bk-pro-badge"><VerifyIcon /></span>
                        </div>
                        <div className="bk-pro-meta">
                            <span className="bk-star">★</span>
                            <strong>4.9</strong>
                            <span>•</span>
                            <span>8 yrs exp</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Requirements */}
            <div className="bk-card">
                <div className="bk-card-label" style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>
                    Any specific requirements? <span style={{ color: "#9ca3af", fontWeight: 400 }}>(Optional)</span>
                </div>
                <textarea
                    className="bk-textarea"
                    placeholder="E.g., The AC is making a loud noise, need a deep clean..."
                    value={requirements}
                    onChange={e => setReqs(e.target.value)}
                />
            </div>

            <div className="bk-nav bk-nav--right">
                <button className="bk-btn-next" onClick={goNext}>
                    Continue to Date &amp; Time <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );

    // ── Step 2: Date & Time ────────────────────────────────────────────────────
    const Step2 = () => (
        <div>
            <p className="bk-subtitle">Select a convenient date and time slot.</p>

            <div className="bk-card">
                <div className="bk-date-header">
                    <div className="bk-section-title"><CalendarIcon /> Select Date</div>
                    <div className="bk-month-label">
                        {DATES[0].month} {DATES[0].year}
                    </div>
                </div>
                <div className="bk-dates-row">
                    {DATES.map(d => (
                        <button
                            key={d.full}
                            className={`bk-date-btn ${selectedDate === d.full ? "selected" : ""}`}
                            onClick={() => setDate(d.full)}
                        >
                            <div className="bk-date-day">{d.day}</div>
                            <div className="bk-date-num">{d.num}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="bk-card">
                <div className="bk-section-title">Select Time Slot</div>
                <div className="bk-times-grid">
                    {TIME_SLOTS.map(t => (
                        <button
                            key={t}
                            className={`bk-time-btn ${selectedTime === t ? "selected" : ""}`}
                            onClick={() => setTime(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bk-nav">
                <button className="bk-btn-back" onClick={goBack}>
                    <ArrowLeft size={16} /> Back
                </button>
                <button
                    className="bk-btn-next"
                    onClick={goNext}
                    disabled={!selectedDate || !selectedTime}
                    style={{ opacity: (!selectedDate || !selectedTime) ? 0.5 : 1, cursor: (!selectedDate || !selectedTime) ? "not-allowed" : "pointer" }}
                >
                    Continue to Address <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );

    // ── Step 3: Address ────────────────────────────────────────────────────────
    const Step3 = () => (
        <div>
            <p className="bk-subtitle">Enter your address details.</p>

            {/* Saved addresses */}
            <div className="bk-addr-grid">
                <div
                    className={`bk-addr-card ${selectedAddr === "home" ? "selected" : ""}`}
                    onClick={() => setAddr("home")}
                >
                    <div className="bk-addr-card-title"><LocationIcon /> Home</div>
                    <div className="bk-addr-card-text">
                        Flat 402, Prestige Sunrise<br />
                        HSR Layout Sector 2<br />
                        Bengaluru, 560102
                    </div>
                    <div className="bk-addr-radio" />
                </div>
                <div
                    className={`bk-addr-card ${selectedAddr === "office" ? "selected" : ""}`}
                    onClick={() => setAddr("office")}
                >
                    <div className="bk-addr-card-title"><LocationIcon /> Office</div>
                    <div className="bk-addr-card-text">
                        WeWork Galaxy, 43 Residency Rd<br />
                        Shanthala Nagar<br />
                        Bengaluru, 560025
                    </div>
                    <div className="bk-addr-radio" />
                </div>
            </div>

            {/* Add new address form */}
            <div className="bk-card">
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Add New Address</div>
                <div className="bk-form-grid">
                    <div className="bk-field">
                        <label>Full Name</label>
                        <input placeholder="John Doe" value={formData.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="bk-field">
                        <label>Phone Number</label>
                        <input placeholder="+91 98765 43210" value={formData.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                    <div className="bk-field">
                        <label>Flat / House No. / Building</label>
                        <input placeholder="Flat 101, ABC Apartments" value={formData.flat}
                            onChange={e => setForm(f => ({ ...f, flat: e.target.value }))} />
                    </div>
                    <div className="bk-form-row">
                        <div className="bk-field">
                            <label>Area / Sector / Locality</label>
                            <input placeholder="Indiranagar" value={formData.area}
                                onChange={e => setForm(f => ({ ...f, area: e.target.value }))} />
                        </div>
                        <div className="bk-field">
                            <label>City</label>
                            <input placeholder="City" value={formData.city}
                                onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bk-nav">
                <button className="bk-btn-back" onClick={goBack}>
                    <ArrowLeft size={16} /> Back
                </button>
                <button className="bk-btn-next" onClick={goNext}>
                    Continue to Payment <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );

    // ── Step 4: Payment ────────────────────────────────────────────────────────
    const Step4 = () => (
        <div>
            <p className="bk-subtitle" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <ShieldIcon /> All transactions are secure and encrypted.
            </p>

            {/* Payment options */}
            <div className="bk-payment-opts">
                {PAYMENT_OPTS.map(opt => (
                    <div
                        key={opt.id}
                        className={`bk-pay-opt ${selectedPay === opt.id ? "selected" : ""}`}
                        onClick={() => setPay(opt.id)}
                    >
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

            {/* Booking Summary */}
            <div className="bk-card bk-summary">
                <div className="bk-summary-title">Booking Summary</div>
                <div className="bk-summary-row"><span>Service</span><span>{svc.name}</span></div>
                <div className="bk-summary-row"><span>Professional</span><span>Ramesh Kumar</span></div>
                <div className="bk-summary-row">
                    <span>Date &amp; Time</span>
                    <span>
                        {selectedDateObj
                            ? `${selectedDateObj.year}-${String(selectedDateObj.num).padStart(2, '0')}-${String(selectedDateObj.num).padStart(2, '0')}, ${selectedTime}`
                            : dateTimeDisplay}
                    </span>
                </div>
                <hr className="bk-summary-divider" />
                <div className="bk-summary-row"><span>Base Price</span><span>₹299</span></div>
                <div className="bk-summary-row"><span>Taxes &amp; Fee</span><span>₹49</span></div>
                <div className="bk-summary-row">
                    <span>Discount</span>
                    <span className="bk-summary-discount">-₹50</span>
                </div>
                <hr className="bk-summary-divider" />
                <div className="bk-summary-total"><span>Total</span><span>₹298</span></div>

                <button className="bk-confirm-btn" onClick={goNext}>
                    <ShieldIcon /> Confirm &amp; Pay
                </button>
                <p className="bk-terms-note">By proceeding, you agree to our Terms &amp; Conditions</p>
            </div>
        </div>
    );

    // ── Step 5: Success ────────────────────────────────────────────────────────
    const Step5 = () => (
        <div className="bk-success">
            <div className="bk-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" style={{ color: "#16a34a", width: 40, height: 40 }}>
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <h2 className="bk-success-heading">Booking Confirmed!</h2>
            <p className="bk-success-id">
                Your booking ID is <strong>{bookingId}</strong>
            </p>

            <div className="bk-next-card">
                <h3>What happens next?</h3>
                <div className="bk-next-step">
                    <div className="bk-next-num">1</div>
                    <div className="bk-next-text">The professional will be assigned and notified of your booking.</div>
                </div>
                <div className="bk-next-step">
                    <div className="bk-next-num">2</div>
                    <div className="bk-next-text">You will receive a confirmation SMS with the professional's contact details.</div>
                </div>
                <div className="bk-next-step">
                    <div className="bk-next-num">3</div>
                    <div className="bk-next-text">The professional will arrive at your location on the scheduled date and time.</div>
                </div>
            </div>

            <div className="bk-success-btns">
                <button className="bk-btn-next" style={{ justifyContent: "center", width: "100%", padding: "15px" }}>
                    View Booking Details <ArrowRight size={16} />
                </button>
                <button className="bk-btn-outline" onClick={onBack}>
                    Back to Home
                </button>
            </div>
        </div>
    );

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="bk-page">
            <Stepper />
            <div className="bk-content">
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}
                {step === 5 && <Step5 />}
            </div>
        </div>
    );
}