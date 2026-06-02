import React, { useState } from 'react';
import '../styles/Settings.css';

const Toggle = ({ checked, onChange }) => (
    <button
        className={`toggle${checked ? ' on' : ''}`}
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
    >
        <span className="toggle-knob" />
    </button>
);

export default function Settings() {
    const [prefs, setPrefs] = useState({
        pushNotifications: true,
        emailUpdates: true,
        smsAlerts: false,
        locationServices: true,
    });

    const set = (key) => (val) => setPrefs(p => ({ ...p, [key]: val }));

    const toggleItems = [
        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive booking updates and offers' },
        { key: 'emailUpdates', label: 'Email Updates', desc: 'Weekly digest of new services in your area' },
        { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Critical booking alerts via SMS' },
        { key: 'locationServices', label: 'Location Services', desc: 'Allow Lokal to access your location' },
    ];

    return (
        <div className="settings-page card">
            <div className="settings-header">
                <h2>Settings</h2>
                <p className="settings-sub">Manage your preferences and account security</p>
            </div>

            {/* Notification Preferences */}
            <div className="settings-section">
                {toggleItems.map(item => (
                    <div className="settings-row" key={item.key}>
                        <div className="settings-row-info">
                            <p className="settings-row-label">{item.label}</p>
                            <p className="settings-row-desc">{item.desc}</p>
                        </div>
                        <Toggle checked={prefs[item.key]} onChange={set(item.key)} />
                    </div>
                ))}
            </div>

            {/* Account Section */}
            <div className="settings-account-section">
                <h3 className="account-section-title">Account</h3>

                <button className="account-row">
                    <span>Change Password</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                <button className="account-row">
                    <span>Two-Factor Authentication</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                <button className="account-row danger-row">
                    <span>Delete Account</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}