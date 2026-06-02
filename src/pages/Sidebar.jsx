import React from 'react';
import '../styles/Sidebar.css';

const navItems = [
    {
        key: 'MyProfile', label: 'My Profile', icon: (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        )
    },
    {
        key: 'MyBookings', label: 'My Bookings', icon: (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
        )
    },
    {
        key: 'SavedVendors', label: 'Saved Vendors', icon: (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
        )
    },
    {
        key: 'Notifications', label: 'Notifications', badge: 2, icon: (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        )
    },
    {
        key: 'Wallet', label: 'Wallet', icon: (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M16 13a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" stroke="none" /></svg>
        )
    },
    {
        key: 'Settings', label: 'Settings', icon: (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
        )
    },
];

export default function Sidebar({ activePage, setActivePage }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-user">
                <img src="https://i.pravatar.cc/48?img=8" alt="Arjun" className="sidebar-avatar" />
                <div>
                    <p className="sidebar-name">Arjun Reddy</p>
                    <p className="sidebar-email">arjun.reddy@gmail.com</p>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <button
                        key={item.key}
                        className={`sidebar-item${activePage === item.key ? ' active' : ''}`}
                        onClick={() => setActivePage(item.key)}
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-label">{item.label}</span>
                        {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                    </button>
                ))}

                <div className="sidebar-divider" />

                <button className="sidebar-item sidebar-logout">
                    <span className="sidebar-icon">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                    </span>
                    <span className="sidebar-label">Log Out</span>
                </button>
            </nav>
        </aside>
    );
}