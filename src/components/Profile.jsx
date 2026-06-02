// Profile.jsx
import React, { useState } from 'react';
import '../styles/Profilee.css';

// ===== NAVBAR =====
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <div className="logo">Lokal<span className="logo-dot">.</span></div>
          <div className="location-picker">📍 Bengaluru, KA ▾</div>
          <div className="search-bar">
            <span style={{ color: '#9CA3AF', fontSize: 13 }}>🔍</span>
            <input type="text" placeholder="Search nearby services, activities..." />
          </div>
        </div>
        <div className="navbar-right">
          <span className="nav-link">Home</span>
          <span className="nav-link">Services</span>
          <span className="nav-link">Activities</span>
          <span className="nav-link nav-vendor">Become a Vendor</span>
          <button className="icon-btn">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="account-pill">
            <img src="https://i.pravatar.cc/32?img=8" alt="Arjun" className="avatar-sm" />
            <span>My Account</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ===== SIDEBAR =====
const navItems = [
  { key: 'MyProfile', label: 'My Profile', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
  { key: 'MyBookings', label: 'My Bookings', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg> },
  { key: 'SavedVendors', label: 'Saved Vendors', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg> },
  { key: 'Notifications', label: 'Notifications', badge: 2, icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
  { key: 'Wallet', label: 'Wallet', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" /></svg> },
  { key: 'Settings', label: 'Settings', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg> },
];

function Sidebar({ activePage, setActivePage }) {
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

// ===== MY PROFILE PAGE =====
function MyProfile() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: 'Arjun Reddy', email: 'arjun.reddy@gmail.com', phone: '+91 98765 43210', location: 'Bengaluru, KA' });
  const stats = [
    { label: 'Total Bookings', value: '12', icon: '📅', color: '#EFF6FF' },
    { label: 'Completed', value: '9', icon: '✅', color: '#F0FDF4' },
    { label: 'Saved', value: '5', icon: '❤️', color: '#FFF1F2' },
    { label: 'Wallet Balance', value: '₹450', icon: '💳', color: '#FFFBEB' },
  ];
  const addresses = [
    { type: 'Home', address: 'Flat 402, Prestige Sunrise, HSR Layout Sector 2, Bengaluru, 560102', isDefault: true },
    { type: 'Office', address: 'WeWork Galaxy, 43 Residency Rd, Shanthala Nagar, Bengaluru, 560025', isDefault: false },
  ];
  return (
    <div className="profile-page">
      <div className="stats-row">
        {stats.map(s => (
          <div className="stat-card" key={s.label} style={{ background: s.color }}>
            <span className="stat-icon">{s.icon}</span>
            <p className="stat-value">{s.value}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="card profile-card">
        <div className="profile-banner" />
        <div className="profile-info-header">
          <div><img src="https://i.pravatar.cc/80?img=8" alt="Arjun" className="profile-avatar" /></div>
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
            ✏️ {editing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
        <div className="profile-fields">
          {[{ label: 'Full Name', key: 'fullName', icon: '👤' }, { label: 'Email', key: 'email', icon: '✉️' }, { label: 'Phone Number', key: 'phone', icon: '📞' }, { label: 'Location', key: 'location', icon: '📍' }].map(f => (
            <div className="profile-field" key={f.key}>
              <label className="field-label"><span>{f.icon}</span> {f.label}</label>
              {editing
                ? <input className="field-input" value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                : <div className="field-value">{form[f.key]}</div>
              }
            </div>
          ))}
        </div>
      </div>
      <div className="card addresses-card">
        <div className="addresses-header">
          <h3>Saved Addresses</h3>
          <button className="btn btn-outline add-address-btn">+ Add New</button>
        </div>
        <div className="addresses-grid">
          {addresses.map(addr => (
            <div className="address-item" key={addr.type}>
              <div className="address-type-row">
                <span>📍</span>
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

// ===== MY BOOKINGS PAGE =====
const allBookings = [
  { id: 'LK-2826-04821', status: 'Upcoming', service: 'Electrician', provider: 'Ramesh Kumar', date: '15 May 2026 at 12:30 PM', location: 'Flat 402, Prestige Sunrise, HSR Layout', amount: '₹298', image: 'https://i.pravatar.cc/48?img=12' },
  { id: 'LK-2826-04799', status: 'Completed', service: 'Plumber', provider: 'Suresh Plumbing', date: '08 May 2026 at 10:00 AM', location: 'WeWork Galaxy, Residency Rd', amount: '₹549', image: 'https://i.pravatar.cc/48?img=15' },
  { id: 'LK-2826-04722', status: 'Completed', service: 'Yoga Trainer', provider: 'Priya Sharma', date: '02 May 2026 at 06:00 AM', location: 'Flat 402, Prestige Sunrise, HSR Layout', amount: '₹1,200', image: 'https://i.pravatar.cc/48?img=5' },
  { id: 'LK-2826-04781', status: 'Cancelled', service: 'AC Repair', provider: 'Ramesh Kumar', date: '28 Apr 2026 at 04:00 PM', location: 'Flat 402, Prestige Sunrise, HSR Layout', amount: '₹699', image: 'https://i.pravatar.cc/48?img=12' },
];
const statusCfg = {
  Upcoming: { color: '#2563EB', bg: '#EFF6FF', dot: '#2563EB' },
  Completed: { color: '#16A34A', bg: '#F0FDF4', dot: '#22C55E' },
  Cancelled: { color: '#DC2626', bg: '#FEF2F2', dot: '#EF4444' },
};
function MyBookings() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];
  const filtered = activeTab === 'All' ? allBookings : allBookings.filter(b => b.status === activeTab);
  const count = t => t === 'All' ? allBookings.length : allBookings.filter(b => b.status === t).length;
  return (
    <div className="bookings-page card">
      <div className="bookings-header">
        <h2>My Bookings</h2>
        <p className="bookings-sub">View and manage all your service bookings</p>
      </div>
      <div className="bookings-tabs">
        {tabs.map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
            {t} ({count(t)})
          </button>
        ))}
      </div>
      <div className="bookings-list">
        {filtered.map(b => {
          const cfg = statusCfg[b.status];
          return (
            <div className="booking-item" key={b.id}>
              <div className="booking-top">
                <span className="booking-id">{b.id} ·</span>
                <span className="booking-status" style={{ color: cfg.color, background: cfg.bg }}>
                  <span className="status-dot" style={{ background: cfg.dot }} />
                  {b.status}
                </span>
                <span className="booking-amount">{b.amount}</span>
              </div>
              <div className="booking-body">
                <img src={b.image} alt={b.provider} className="booking-avatar" />
                <div className="booking-details">
                  <p className="booking-service">{b.service} <span className="provider-name">with {b.provider}</span></p>
                  <div className="booking-meta">
                    <span>📅 {b.date}</span>
                    <span>📍 {b.location}</span>
                  </div>
                </div>
              </div>
              <div className="booking-actions">
                {b.status === 'Upcoming' && <>
                  <button className="btn btn-ghost action-sm">Cancel</button>
                  <button className="btn btn-ghost action-sm">Reschedule</button>
                  <button className="btn btn-primary action-sm">Track Pro →</button>
                </>}
                {b.status === 'Completed' && <>
                  <button className="btn btn-ghost action-sm">⬇ Invoice</button>
                  <button className="btn btn-ghost action-sm">☆ Rate Service</button>
                  <button className="btn btn-primary action-sm">↻ Book Again</button>
                </>}
                {b.status === 'Cancelled' && <button className="btn btn-primary action-sm">↻ Book Again</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== SAVED VENDORS PAGE =====
const vendors = [
  { id: 1, name: 'Ramesh Kumar', role: 'Electrician', area: 'Indiranagar, BLR', rating: 4.9, reviews: 342, image: 'https://i.pravatar.cc/56?img=12' },
  { id: 2, name: 'Suresh Plumbing', role: 'Plumber', area: 'Koramangala, BLR', rating: 4.8, reviews: 215, image: 'https://i.pravatar.cc/56?img=15' },
  { id: 3, name: 'Priya Sharma', role: 'Yoga Trainer', area: 'HSR Layout, BLR', rating: 5, reviews: 128, image: 'https://i.pravatar.cc/56?img=5' },
];
function SavedVendors() {
  return (
    <div className="saved-vendors-page card">
      <div className="sv-header">
        <h2>Saved Vendors</h2>
        <p className="sv-sub">Quick access to your favourite professionals</p>
      </div>
      <div className="sv-grid">
        {vendors.map(v => (
          <div className="vendor-card" key={v.id}>
            <div className="vendor-card-inner">
              <img src={v.image} alt={v.name} className="vendor-avatar" />
              <div className="vendor-info">
                <p className="vendor-name">{v.name}</p>
                <p className="vendor-role">{v.role} · {v.area}</p>
                <div className="vendor-rating">
                  <span className="star">★</span>
                  <span className="rating-val">{v.rating}</span>
                  <span className="rating-count">({v.reviews})</span>
                </div>
              </div>
              <button className="btn btn-primary book-btn">Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== NOTIFICATIONS PAGE =====
const initNotifs = [
  { id: 1, title: 'Booking Confirmed', desc: 'Your electrician booking is confirmed for tomorrow 12:30 PM.', time: '2 hrs ago', read: false },
  { id: 2, title: '50% OFF on Deep Cleaning', desc: 'Limited time offer on home deep cleaning services this weekend.', time: '1 day ago', read: false },
  { id: 3, title: 'Service Completed', desc: 'Rate your experience with Suresh Plumbing.', time: '3 days ago', read: true },
  { id: 4, title: 'Payment Successful', desc: '₹549 charged to your UPI for booking LK-2026-04799.', time: '5 days ago', read: true },
];
function Notifications() {
  const [notifs, setNotifs] = useState(initNotifs);
  return (
    <div className="notifications-page card">
      <div className="notif-header">
        <div>
          <h2>Notifications</h2>
          <p className="notif-sub">Stay updated on your bookings and offers</p>
        </div>
        <button className="mark-all-btn" onClick={() => setNotifs(n => n.map(x => ({ ...x, read: true })))}>Mark all as read</button>
      </div>
      <div className="notif-list">
        {notifs.map(n => (
          <div key={n.id} className={`notif-item${n.read ? '' : ' unread'}`} onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}>
            <div className={`notif-icon-wrap${n.read ? ' read' : ''}`}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="notif-content">
              <div className="notif-title-row">
                <p className="notif-title">{n.title}</p>
                {!n.read && <span className="unread-dot" />}
              </div>
              <p className="notif-desc">{n.desc}</p>
              <p className="notif-time">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== WALLET PAGE =====
const txns = [
  { id: 1, label: 'Payment for Electrician', date: '15 May 2026', amount: -298, type: 'debit' },
  { id: 2, label: 'Cashback received', date: '12 May 2026', amount: 50, type: 'credit' },
  { id: 3, label: 'Wallet top-up', date: '08 May 2026', amount: 500, type: 'credit' },
  { id: 4, label: 'Payment for Plumber', date: '02 May 2026', amount: -549, type: 'debit' },
];
function Wallet() {
  return (
    <div className="wallet-page">
      <div className="balance-card">
        <p className="balance-label">Wallet Balance</p>
        <p className="balance-amount">₹450<span>.00</span></p>
        <div className="wallet-actions">
          <button className="wallet-add-btn">+ Add Money</button>
          <button className="wallet-withdraw-btn">Withdraw</button>
        </div>
      </div>
      <div className="card transactions-card">
        <div className="tx-header"><h3>Recent Transactions</h3></div>
        <div className="tx-list">
          {txns.map(tx => (
            <div className="tx-item" key={tx.id}>
              <div className={`tx-icon ${tx.type}`}>
                {tx.type === 'credit'
                  ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19V5m-7 7l7-7 7 7" /></svg>
                  : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7l-7 7-7-7" /></svg>
                }
              </div>
              <div className="tx-info">
                <p className="tx-label">{tx.label}</p>
                <p className="tx-date">{tx.date}</p>
              </div>
              <p className={`tx-amount ${tx.type}`}>{tx.type === 'credit' ? '+' : '-'}₹{Math.abs(tx.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== SETTINGS PAGE =====
function Toggle({ checked, onChange }) {
  return (
    <button className={`toggle${checked ? ' on' : ''}`} onClick={() => onChange(!checked)}>
      <span className="toggle-knob" />
    </button>
  );
}
function Settings() {
  const [prefs, setPrefs] = useState({ pushNotifications: true, emailUpdates: true, smsAlerts: false, locationServices: true });
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
      <div className="settings-section">
        {toggleItems.map(item => (
          <div className="settings-row" key={item.key}>
            <div>
              <p className="settings-row-label">{item.label}</p>
              <p className="settings-row-desc">{item.desc}</p>
            </div>
            <Toggle checked={prefs[item.key]} onChange={v => setPrefs(p => ({ ...p, [item.key]: v }))} />
          </div>
        ))}
      </div>
      <div className="settings-account-section">
        <h3 className="account-section-title">Account</h3>
        <button className="account-row">
          <span>Change Password</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
        </button>
        <button className="account-row">
          <span>Two-Factor Authentication</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
        </button>
        <button className="account-row danger-row">
          <span>Delete Account</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

// ===== FOOTER =====
function Footer() {
  const [email, setEmail] = useState('');
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">Lokal<span>.</span></div>
          <p className="footer-tagline">Your trusted hyperlocal platform to book verified services, skilled professionals, and engaging co-curricular activities near your doorstep.</p>
          <div className="footer-socials">
            <a href="#" className="social-icon">f</a>
            <a href="#" className="social-icon">𝕏</a>
            <a href="#" className="social-icon">◎</a>
            <a href="#" className="social-icon">in</a>
          </div>
        </div>
        <div className="footer-links">
          <a href="#">About Us</a><a href="#">Careers</a><a href="#">Blog</a>
          <a href="#">Contact Support</a><a href="#" className="footer-vendor-link">Become a Vendor</a>
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a>
          <a href="#">Cancellation Policy</a><a href="#">Trust &amp; Safety</a>
        </div>
        <div className="footer-newsletter">
          <p>Subscribe to our newsletter for the latest offers and updates.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="subscribe-btn">Subscribe →</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Lokal Technologies Pvt Ltd. All rights reserved.</span>
        <span>Made with ❤️ in India</span>
      </div>
    </footer>
  );
}

// ===== PAGE MAP =====
const pages = { MyProfile, MyBookings, SavedVendors, Notifications, Wallet, Settings };
const greetings = {
  MyProfile: 'Welcome back, Arjun 🗒️', MyBookings: 'Welcome back, Arjun 👋',
  SavedVendors: 'Welcome back, Arjun 🗒️', Notifications: 'Welcome back, Arjun 🗒️',
  Wallet: 'Welcome back, Arjun 🗒️', Settings: 'Welcome back, Arjun 🗒️',
};

// ===== APP ROOT =====
export default function Profile() {
  const [activePage, setActivePage] = useState('MyProfile');
  const PageComponent = pages[activePage];

  return (
    <div className="app">
      <main className="main-content">
        <div className="account-header">
          <p className="greeting">{greetings[activePage]}</p>
          <h1 className="page-title">My Account</h1>
        </div>
        <div className="account-layout">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
          <div className="page-content">
            <PageComponent />
          </div>
        </div>
      </main>
    </div>
  );
}