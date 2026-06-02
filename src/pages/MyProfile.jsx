import React, { useState } from 'react';
import '../styles/MyProfile.css';

const stats = [
    { label: 'Total Bookings', value: '12', icon: '📅', color: '#EFF6FF' },
    { label: 'Completed', value: '9', icon: '✅', color: '#F0FDF4' },
    { label: 'Saved', value: '5', icon: '❤️', color: '#FFF1F2' },
    { label: 'Wallet Balance', value: '₹450', icon: '💳', color: '#FFFBEB' },
];

export default function MyProfile() {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        fullName: 'Arjun Reddy',
        email: 'arjun.reddy@gmail.com',
        phone: '+91 98765 43210',
        location: 'Bengaluru, KA',
    });

    const addresses = [
        { type: 'Home', address: 'Flat 402, Prestige Sunrise, HSR Layout Sector 2, Bengaluru, 560102', isDefault: true },
        { type: 'Office', address: 'WeWork Galaxy, 43 Residency Rd, Shanthala Nagar, Bengaluru, 560025', isDefault: false },
    ];

    return (
        <div className="profile-page">
            {/* Stats Row */}
            <div className="stats-row">
                {stats.map(s => (
                    <div className="stat-card" key={s.label} style={{ background: s.color }}>
                        <span className="stat-icon">{s.icon}</span>
                        <p className="stat-value">{s.value}</p>
                        <p className="stat-label">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Profile Card */}
            <div className="card profile-card">
                <div className="profile-banner" />
                <div className="profile-info-header">
                    <div className="profile-avatar-wrap">
                        <img src="https://i.pravatar.cc/80?img=8" alt="Arjun" className="profile-avatar" />
                    </div>
                    <div className="profile-meta">
                        <div className="profile-name-row">
                            <h2 className="profile-name">Arjun Reddy</h2>
                            <span className="verified-badge">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="#22C55E"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Verified
                            </span>
                        </div>
                        <p className="member-since">Member since March 2024</p>
                    </div>
                    <button className="btn btn-outline edit-btn" onClick={() => setEditing(!editing)}>
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        {editing ? 'Save Profile' : 'Edit Profile'}
                    </button>
                </div>

                <div className="profile-fields">
                    {[
                        { label: 'Full Name', key: 'fullName', icon: '👤' },
                        { label: 'Email', key: 'email', icon: '✉️' },
                        { label: 'Phone Number', key: 'phone', icon: '📞' },
                        { label: 'Location', key: 'location', icon: '📍' },
                    ].map(field => (
                        <div className="profile-field" key={field.key}>
                            <label className="field-label">
                                <span>{field.icon}</span> {field.label}
                            </label>
                            {editing ? (
                                <input
                                    className="field-input"
                                    value={form[field.key]}
                                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                />
                            ) : (
                                <div className="field-value">{form[field.key]}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Saved Addresses */}
            <div className="card addresses-card">
                <div className="addresses-header">
                    <h3>Saved Addresses</h3>
                    <button className="btn btn-outline add-address-btn">+ Add New</button>
                </div>
                <div className="addresses-grid">
                    {addresses.map(addr => (
                        <div className="address-item" key={addr.type}>
                            <div className="address-type-row">
                                <span className="address-pin">📍</span>
                                <span className="address-type">{addr.type}</span>
                                {addr.isDefault && <span className="default-badge">Default</span>}
                            </div>
                            <p className="address-text">{addr.address}</p>
                            <div className="address-actions">
                                <button className="link-btn">Edit</button>
                                <button className="link-btn danger-link">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}