// VendorTermsModal.jsx
// Drop-in modal — shown when vendor clicks "Submit Application"
// Props:
//   onAccept(termsAccepted: true)  → called when user ticks box and clicks confirm
//   onClose()                      → called when user dismisses without accepting

import { useState } from "react";

const CloseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const ShieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const TERMS_EN = [
"Vendors must provide accurate information and valid documents during registration.",
"A booking is considered confirmed once the customer pays the advance amount through the platform.",
"Vendors must provide the service as agreed and complete the work professionally and on time.",
"Vendors may update the final service cost and remaining balance amount through the platform after reviewing the work requirements.",
"Vendors must clearly communicate all charges and should not add hidden or unauthorized fees.",
"Vendors must not request customers to make payments outside the platform.",
"If a vendor cancels a confirmed booking without a valid reason, a penalty amount may be deducted from the vendor's earnings or future payments.",
"Repeated booking cancellations, poor service, customer complaints, or policy violations may result in account suspension or permanent removal from the platform.",
"Vendors must treat customers respectfully and maintain professional conduct at all times.",
"The platform reserves the right to suspend or terminate any vendor account that violates these terms.",
"By registering as a vendor and accepting bookings, the vendor agrees to these Terms & Conditions."
];

const TERMS_TA = [
"பதிவின் போது விற்பனையாளர்கள் சரியான தகவல்களையும் செல்லுபடியாகும் ஆவணங்களையும் வழங்க வேண்டும்.",
"வாடிக்கையாளர் தளத்தின் மூலம் முன்பணம் செலுத்தியவுடன் பதிவு உறுதிசெய்யப்பட்டதாகக் கருதப்படும்.",
"விற்பனையாளர்கள் ஒப்புக்கொண்டபடி சேவையை வழங்கி, பணியை தொழில்முறையாகவும் குறிப்பிட்ட நேரத்திற்குள் முடிக்க வேண்டும்.",
"பணியின் தேவைகளை மதிப்பாய்வு செய்த பிறகு, விற்பனையாளர்கள் தளத்தின் மூலம் இறுதி சேவை கட்டணத்தையும் மீதமுள்ள தொகையையும் புதுப்பிக்கலாம்.",
"விற்பனையாளர்கள் அனைத்து கட்டணங்களையும் தெளிவாக தெரிவிக்க வேண்டும். மறைமுக அல்லது அனுமதிக்கப்படாத கட்டணங்களை வசூலிக்கக் கூடாது.",
"விற்பனையாளர்கள் வாடிக்கையாளர்களிடம் தளத்திற்கு வெளியே பணம் செலுத்துமாறு கோரக்கூடாது.",
"சரியான காரணமின்றி உறுதிப்படுத்தப்பட்ட பதிவை விற்பனையாளர் ரத்து செய்தால், அபராதத் தொகை அவரின் வருமானம் அல்லது எதிர்கால பணப்பரிவர்த்தனைகளிலிருந்து கழிக்கப்படலாம்.",
"தொடர்ச்சியான பதிவு ரத்துகள், தரமற்ற சேவை, வாடிக்கையாளர் புகார்கள் அல்லது கொள்கை மீறல்கள் காரணமாக கணக்கு தற்காலிகமாக நிறுத்தப்படலாம் அல்லது நிரந்தரமாக நீக்கப்படலாம்.",
"விற்பனையாளர்கள் வாடிக்கையாளர்களை மரியாதையுடன் நடத்தி எப்போதும் தொழில்முறை நடத்தையை பின்பற்ற வேண்டும்.",
"இந்த விதிமுறைகளை மீறும் விற்பனையாளர் கணக்குகளை நிறுத்தவோ அல்லது நீக்கவோ தளத்திற்கு முழு உரிமை உண்டு.",
"விற்பனையாளராக பதிவு செய்து சேவை பதிவுகளை ஏற்றுக்கொள்வதன் மூலம், இந்த விதிமுறைகள் மற்றும் நிபந்தனைகளை ஏற்றுக்கொள்வதாக கருதப்படும்."
];


export default function VendorTermsModal({ onAccept, onClose }) {
    const [accepted, setAccepted] = useState(false);

    const handleSubmit = () => {
        if (!accepted) return;
        onAccept(true);
    };

    return (
        <>
            <style>{`
                .vtm-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.55);
                    backdrop-filter: blur(3px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    animation: vtm-fade-in 0.18s ease;
                }
                @keyframes vtm-fade-in {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }

                .vtm-modal {
                    background: #ffffff;
                    border-radius: 16px;
                    width: 100%;
                    max-width: 640px;
                    max-height: 88vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
                    animation: vtm-slide-up 0.22s cubic-bezier(0.34,1.56,0.64,1);
                    overflow: hidden;
                }
                @keyframes vtm-slide-up {
                    from { transform: translateY(24px); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }

                /* ── Header ── */
                .vtm-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 20px 24px 16px;
                    border-bottom: 1px solid #e5e7eb;
                    flex-shrink: 0;
                }
                .vtm-header-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    background: #eff6ff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .vtm-header-text { flex: 1; }
                .vtm-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #111827;
                    margin: 0 0 2px;
                    letter-spacing: -0.2px;
                }
                .vtm-subtitle {
                    font-size: 12px;
                    color: #6b7280;
                    margin: 0;
                }
                .vtm-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    transition: background 0.15s;
                }
                .vtm-close:hover { background: #f3f4f6; }

                /* ── Scroll body ── */
                .vtm-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px 24px;
                    scroll-behavior: smooth;
                }
                .vtm-body::-webkit-scrollbar { width: 5px; }
                .vtm-body::-webkit-scrollbar-thumb {
                    background: #d1d5db;
                    border-radius: 4px;
                }

                /* ── Language sections ── */
                .vtm-lang-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.6px;
                    text-transform: uppercase;
                    color: #2563eb;
                    background: #eff6ff;
                    border: 1px solid #bfdbfe;
                    border-radius: 6px;
                    padding: 4px 10px;
                    margin-bottom: 14px;
                }
                .vtm-lang-badge-ta {
                    color: #7c3aed;
                    background: #f5f3ff;
                    border-color: #ddd6fe;
                    margin-top: 24px;
                }

                .vtm-divider {
                    height: 1px;
                    background: linear-gradient(90deg, #e5e7eb, transparent);
                    margin: 20px 0;
                }

                /* ── Term list ── */
                .vtm-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .vtm-item {
                    display: flex;
                    gap: 12px;
                    padding: 10px 12px;
                    border-radius: 8px;
                    background: #f9fafb;
                    border: 1px solid #f3f4f6;
                    transition: border-color 0.15s;
                }
                .vtm-item:hover { border-color: #e5e7eb; }
                .vtm-num {
                    min-width: 22px;
                    height: 22px;
                    border-radius: 6px;
                    background: #2563eb;
                    color: #fff;
                    font-size: 11px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-top: 1px;
                }
                .vtm-num-ta { background: #7c3aed; }
                .vtm-item-text {
                    font-size: 13px;
                    color: #374151;
                    line-height: 1.6;
                    margin: 0;
                }
                .vtm-item-text-ta {
                    font-family: 'Noto Sans Tamil', sans-serif;
                    font-size: 13px;
                    color: #374151;
                    line-height: 1.75;
                }

                /* ── Footer (checkbox + button) ── */
                .vtm-footer {
                    flex-shrink: 0;
                    padding: 16px 24px 20px;
                    border-top: 1px solid #e5e7eb;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .vtm-check-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    cursor: pointer;
                    user-select: none;
                }
                .vtm-checkbox-wrap {
                    position: relative;
                    flex-shrink: 0;
                    margin-top: 2px;
                }
                .vtm-checkbox-wrap input[type="checkbox"] {
                    position: absolute;
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .vtm-checkbox-custom {
                    width: 20px;
                    height: 20px;
                    border-radius: 6px;
                    border: 2px solid #d1d5db;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: border-color 0.15s, background 0.15s;
                }
                .vtm-checkbox-wrap input:checked ~ .vtm-checkbox-custom {
                    background: #2563eb;
                    border-color: #2563eb;
                }
                .vtm-checkbox-custom svg {
                    opacity: 0;
                    transform: scale(0.6);
                    transition: opacity 0.15s, transform 0.15s;
                }
                .vtm-checkbox-wrap input:checked ~ .vtm-checkbox-custom svg {
                    opacity: 1;
                    transform: scale(1);
                }
                .vtm-check-label {
                    font-size: 13px;
                    color: #374151;
                    line-height: 1.55;
                }
                .vtm-check-label strong {
                    color: #111827;
                }

                .vtm-btn-row {
                    display: flex;
                    gap: 10px;
                }
                .vtm-btn-cancel {
                    flex: 1;
                    padding: 11px 0;
                    border-radius: 10px;
                    border: 1.5px solid #e5e7eb;
                    background: #fff;
                    color: #6b7280;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: border-color 0.15s, color 0.15s;
                }
                .vtm-btn-cancel:hover {
                    border-color: #d1d5db;
                    color: #374151;
                }
                .vtm-btn-submit {
                    flex: 2;
                    padding: 11px 0;
                    border-radius: 10px;
                    border: none;
                    background: linear-gradient(135deg, #2563eb, #1d4ed8);
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: opacity 0.2s, transform 0.15s;
                    box-shadow: 0 2px 8px rgba(37,99,235,0.35);
                    letter-spacing: 0.1px;
                }
                .vtm-btn-submit:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }
                .vtm-btn-submit:not(:disabled):hover {
                    opacity: 0.92;
                    transform: translateY(-1px);
                }
                .vtm-btn-submit:not(:disabled):active {
                    transform: translateY(0);
                }

                @media (max-width: 480px) {
                    .vtm-modal { border-radius: 14px 14px 0 0; max-height: 92vh; }
                    .vtm-overlay { align-items: flex-end; padding: 0; }
                    .vtm-header, .vtm-body, .vtm-footer { padding-left: 16px; padding-right: 16px; }
                }
            `}</style>

            {/* Load Noto Sans Tamil for Tamil text */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600&display=swap"
            />

            <div className="vtm-overlay">
                <div className="vtm-modal" role="dialog" aria-modal="true" aria-labelledby="vtm-title">

                    {/* Header */}
                    <div className="vtm-header">
                        <div className="vtm-header-icon"><ShieldIcon /></div>
                        <div className="vtm-header-text">
                            <h2 className="vtm-title" id="vtm-title">Vendor Terms &amp; Conditions</h2>
                            <p className="vtm-subtitle">Please read carefully before submitting</p>
                        </div>
                        <button className="vtm-close" onClick={onClose} type="button" aria-label="Close">
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Scrollable body */}
                    <div className="vtm-body">

                        {/* English */}
                        <span className="vtm-lang-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            English
                        </span>
                        <ul className="vtm-list">
                            {TERMS_EN.map((term, i) => (
                                <li key={i} className="vtm-item">
                                    <span className="vtm-num">{i + 1}</span>
                                    <p className="vtm-item-text">{term}</p>
                                </li>
                            ))}
                        </ul>

                        <div className="vtm-divider" />

                        {/* Tamil */}
                        <span className="vtm-lang-badge vtm-lang-badge-ta">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            தமிழ்
                        </span>
                        <ul className="vtm-list">
                            {TERMS_TA.map((term, i) => (
                                <li key={i} className="vtm-item">
                                    <span className="vtm-num vtm-num-ta">{i + 1}</span>
                                    <p className="vtm-item-text vtm-item-text-ta">{term}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer */}
                    <div className="vtm-footer">
                        <label className="vtm-check-row">
                            <span className="vtm-checkbox-wrap">
                                <input
                                    type="checkbox"
                                    checked={accepted}
                                    onChange={(e) => setAccepted(e.target.checked)}
                                />
                                <span className="vtm-checkbox-custom">
                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                        <polyline points="2,6 5,9 10,3" stroke="#fff"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </span>
                            <span className="vtm-check-label">
                                I have read and agree to the <strong>Vendor Terms &amp; Conditions</strong>.
                                By submitting, I confirm that all information provided is accurate and I accept
                                full responsibility for the services I offer.
                                {/* Tamil */}
                                <br />
                                <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: "12px", color: "#6b7280" }}>
                                    நான் விற்பனையாளர் விதிமுறைகளை படித்து ஒப்புக்கொள்கிறேன்.
                                </span>
                            </span>
                        </label>

                        <div className="vtm-btn-row">
                            <button className="vtm-btn-cancel" type="button" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                className="vtm-btn-submit"
                                type="button"
                                disabled={!accepted}
                                onClick={handleSubmit}
                            >
                                {accepted ? "Submit Application ✓" : "Accept to Submit"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}