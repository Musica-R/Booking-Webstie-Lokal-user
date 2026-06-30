// Profile.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Profilee.css';
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// ===== NAVBAR =====
function Navbar() {
  const API_URL = process.env.REACT_APP_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

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
            <img
              src={user?.profileImage || "https://i.pravatar.cc/32?img=8"}
              alt={user?.name || "User"}
              className="avatar-sm"
            />
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
  { key: 'MyActivities', label: 'My Activities', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { key: 'SavedVendors', label: 'Saved Vendors', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg> },
  // { key: 'Notifications', label: 'Notifications', badge: 2, icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
  { key: 'Wallet', label: 'Transaction History', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" /></svg> },
  { key: 'WalletHistory', label: 'Wallet', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" /></svg> },
  { key: 'Settings', label: 'Settings', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg> },
];

function Sidebar({ activePage, setActivePage }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-user">
        <img
          src={user?.profileImage || "https://i.pravatar.cc/80?img=8"}
          alt={user?.name || "User"}
          className="profile-avatar"
        />
        <div>
          <p className="sidebar-name">{user?.name}</p>
          <p className="sidebar-email">{user?.email}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`sidebar-item ${activePage === item.key ? "active" : ""}`}
            onClick={() => setActivePage(item.key)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
          </button>
        ))}

        <div className="sidebar-divider" />

        <button
          className="sidebar-item sidebar-logout"
          onClick={handleLogout}
        >
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

// ===== ADDRESS MODAL =====
const ADDRESS_TYPES = ["Home", "Office", "Other"];

const emptyAddressForm = {
  address_type: "Home",
  flat: "",
  area: "",
  city: "",
  state: "",
  pincode: "",
};

function AddressModal({ isOpen, onClose, onSave, editData }) {
  const [form, setForm] = useState(emptyAddressForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        address_type: editData.address_type || "Home",
        flat: editData.flat || "",
        area: editData.area || "",
        city: editData.city || "",
        state: editData.state || "",
        pincode: editData.pincode || "",
      });
    } else {
      setForm(emptyAddressForm);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { flat, area, city, state, pincode } = form;
    if (!flat || !area || !city || !state || !pincode) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await onSave(form, editData?._id || editData?.id);
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{editData ? "Edit Address" : "Add New Address"}</h3>
          <button className="modal-close" onClick={onClose}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-field">
            <label className="field-label">Address Type</label>
            <div className="address-type-pills">
              {ADDRESS_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`type-pill${form.address_type === type ? " active" : ""}`}
                  onClick={() => setForm({ ...form, address_type: type })}
                >
                  {type === "Home" && "🏠"}
                  {type === "Office" && "🏢"}
                  {type === "Other" && "📍"}
                  {" "}{type}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-field">
            <label className="field-label">Flat / Door No.</label>
            <input
              className="field-input"
              name="flat"
              placeholder="e.g. Flat 12A, Block B"
              value={form.flat}
              onChange={handleChange}
            />
          </div>

          <div className="modal-field">
            <label className="field-label">Area / Street</label>
            <input
              className="field-input"
              name="area"
              placeholder="e.g. Anna Nagar"
              value={form.area}
              onChange={handleChange}
            />
          </div>

          <div className="modal-field-row">
            <div className="modal-field">
              <label className="field-label">City</label>
              <input
                className="field-input"
                name="city"
                placeholder="e.g. Chennai"
                value={form.city}
                onChange={handleChange}
              />
            </div>
            <div className="modal-field">
              <label className="field-label">State</label>
              <input
                className="field-input"
                name="state"
                placeholder="e.g. Tamil Nadu"
                value={form.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-field">
            <label className="field-label">Pincode</label>
            <input
              className="field-input"
              name="pincode"
              placeholder="e.g. 600040"
              maxLength={6}
              value={form.pincode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : editData ? "Update Address" : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== MY PROFILE PAGE =====
function MyProfile() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [form, setForm] = useState({
    fullName: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    location: userData?.location || "",
  });

  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [stats, setStats] = useState([
    { label: "Total Bookings", value: 0, icon: "📅", color: "#EFF6FF" },
    { label: "Completed", value: 0, icon: "✅", color: "#F0FDF4" },
    { label: "Saved", value: 0, icon: "❤️", color: "#FFF1F2" },
    { label: "Wallet Balance", value: "₹0", icon: "💳", color: "#FFFBEB" },
  ]);

  useEffect(() => {
    fetchAddresses();
    fetchDashboard();
  }, []);

  const fetchAddresses = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const userId = storedUser._id || storedUser.id;
    if (!userId) return;
    setAddressLoading(true);
    try {
      const response = await fetch(`${API_URL}/address/user-address/${userId}`);
      const data = await response.json();
      if (response.ok && data.success) {
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setAddressLoading(false);
    }
  };

  const fetchDashboard = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const userId = storedUser._id || storedUser.id;

    if (!userId) return;

    try {
      const response = await fetch(
        `${API_URL}/users/dashboard/${userId}`
      );

      const data = await response.json();

      if (response.ok && data.success) {
        const dashboard = data.data;

        setStats([
          {
            label: "Total Bookings",
            value: dashboard.totalBookings,
            icon: "📅",
            color: "#EFF6FF",
          },
          {
            label: "Completed",
            value: dashboard.completedBookings,
            icon: "✅",
            color: "#F0FDF4",
          },
          {
            label: "Saved",
            value: dashboard.savedVendors,
            icon: "❤️",
            color: "#FFF1F2",
          },
          {
            label: "Wallet Balance",
            value: `₹${dashboard.walletAmount}`,
            icon: "💳",
            color: "#FFFBEB",
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    }
  };

  const handleSaveAddress = async (formData, addressId) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const userId = storedUser._id || storedUser.id;

    try {
      let response, data;

      if (addressId) {
        response = await fetch(
          `${API_URL}/address/update-address/${addressId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        data = await response.json();
        if (response.ok && data.success) {
          await fetchAddresses();
          alert("Address updated successfully!");
        } else {
          alert(data.message || "Failed to update address.");
        }
      } else {
        response = await fetch(`${API_URL}/address/add-address`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, ...formData }),
        });
        data = await response.json();
        if (response.ok && data.success) {
          await fetchAddresses();
          alert("Address added successfully!");
        } else {
          alert(data.message || "Failed to add address.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }

    setShowAddressModal(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      const response = await fetch(
        `${API_URL}/address/delete-address/${addressId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        await fetchAddresses();
        alert("Address deleted.");
      } else {
        alert(data.message || "Failed to delete address.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  const openAddModal = () => {
    setEditingAddress(null);
    setShowAddressModal(true);
  };

  const openEditModal = (addr) => {
    setEditingAddress(addr);
    setShowAddressModal(true);
  };

  const handleSaveProfile = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const response = await fetch(
        `${API_URL}/users/update/${storedUser._id || storedUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.fullName,
            email: form.email,
            phone: form.phone,
            location: form.location,
          }),
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        const updatedUser = {
          ...storedUser,
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          location: form.location,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUserData(updatedUser);
        alert("Profile Updated Successfully");
        setEditing(false);
      } else {
        alert(data.message || "Update Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  const formatAddress = (addr) =>
    [addr.flat, addr.area, addr.city, addr.state, addr.pincode]
      .filter(Boolean)
      .join(", ");

  return (
    <div className="profile-page">
      <div className="stats-row">
        {stats.map((s) => (
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
          <div>
            <img
              src={userData?.profileImage || "https://i.pravatar.cc/80?img=8"}
              alt={userData?.name || "User"}
              className="profile-avatar"
            />
          </div>
          <div className="profile-meta">
            <div className="profile-name-row">
              <h2 className="profile-name">{userData?.name}</h2>
              <span className="verified-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#22C55E">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified
              </span>
            </div>
            <p className="member-since">Member since March 2024</p>
          </div>
          <button
            type="button"
            className="btn btn-outline edit-btn"
            onClick={() => {
              if (editing) {
                handleSaveProfile();
              } else {
                setEditing(true);
              }
            }}
          >
            ✏️ {editing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

        <div className="profile-fields">
          {[
            { label: "Full Name", key: "fullName", icon: "👤" },
            { label: "Email", key: "email", icon: "✉️" },
            { label: "Phone Number", key: "phone", icon: "📞" },
            { label: "Location", key: "location", icon: "📍" },
          ].map((f) => (
            <div className="profile-field" key={f.key}>
              <label className="field-label">
                <span>{f.icon}</span> {f.label}
              </label>
              {editing ? (
                <input
                  className="field-input"
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              ) : (
                <div className="field-value">{form[f.key]}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card addresses-card">
        <div className="addresses-header">
          <h3>Saved Addresses</h3>
          <button className="btn btn-outline add-address-btn" onClick={openAddModal}>
            + Add New
          </button>
        </div>

        {addressLoading ? (
          <p className="address-loading">Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <p className="address-empty">No saved addresses yet. Add one!</p>
        ) : (
          <div className="addresses-grid">
            {addresses.filter(Boolean).map((addr, idx) => {
              const id = addr._id || addr.id || `addr-${idx}`;
              return (
                <div className="address-item" key={id}>
                  <div className="address-type-row">
                    <span>📍</span>
                    <span className="address-type">{addr.address_type}</span>
                    {addr.isDefault && (
                      <span className="default-badge">Default</span>
                    )}
                  </div>
                  <p className="address-text">{formatAddress(addr)}</p>
                  <div className="address-actions">
                    <button className="link-btn" onClick={() => openEditModal(addr)}>
                      Edit
                    </button>
                    <button
                      className="link-btn danger-link"
                      onClick={() => handleDeleteAddress(id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        editData={editingAddress}
      />
    </div>
  );
}

// ===== MY BOOKINGS PAGE =====
const statusCfg = {
  pending: { label: 'Upcoming', color: '#2563EB', bg: '#EFF6FF', dot: '#2563EB' },
  completed: { label: 'Completed', color: '#16A34A', bg: '#F0FDF4', dot: '#22C55E' },
  cancelled_by_user: {
    label: 'Cancelled By You',
    color: '#DC2626',
    bg: '#FEF2F2',
    dot: '#EF4444'
  },
  cancelled_by_vendor: {
    label: 'Cancelled By vendor',
    color: '#DC2626',
    bg: '#FEF2F2',
    dot: '#EF4444'
  },
};

function MyBookings() {
  const API_URL = process.env.REACT_APP_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const downloadInvoice = (b) => {
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(18);
    doc.text("INVOICE", 105, y, { align: "center" });
    y += 15;
    doc.setFontSize(11);
    doc.text(`Booking No: ${b.booking_number}`, 14, y); y += 8;
    doc.text(`Customer: ${b.customer_name}`, 14, y); y += 8;
    doc.text(`Phone: ${b.customer_phone}`, 14, y); y += 12;
    doc.setFontSize(13);
    doc.text("Vendor Details", 14, y); y += 8;
    doc.setFontSize(11);
    doc.text(`Vendor Name: ${b.vendor_details.vendor_name}`, 14, y); y += 7;
    doc.text(`Service Category: ${b.vendor_details.category_name}`, 14, y); y += 12;
    doc.setFontSize(13);
    doc.text("Address", 14, y); y += 8;
    doc.setFontSize(11);
    doc.text(
      `${b.address.flat}, ${b.address.area}, ${b.address.city}, ${b.address.state} - ${b.address.pincode}`,
      14, y
    );
    y += 15;
    autoTable(doc, {
      startY: y,
      head: [["#", "Service", "Qty", "Price"]],
      body: b.items.map((item, index) => [
        index + 1,
        item.sub_service_name,
        item.quantity,
        `Rs.${item.price}`,
      ]),
      theme: "grid",
    });
    y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Amount: Rs.${b.total_amount}`, 14, y); y += 8;
    doc.text(`Balance Amount: Rs.${b.balance_amount}`, 14, y); y += 8;
    doc.text(`Payment Status: ${b.payment_status}`, 14, y); y += 8;
    doc.text(`Balance Payment Status: ${b.balance_payment_status}`, 14, y); y += 8;
    doc.text(`Booking Status: ${b.booking_status}`, 14, y);
    doc.save(`invoice-${b.booking_number}.pdf`);
  };

  const BOOKINGS_PER_PAGE = 2;

  const [activeTab, setActiveTab] = useState('All');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [ratingBooking, setRatingBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

  useEffect(() => {
    const fetchBookings = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const userId = storedUser._id || storedUser.id;
      if (!userId) {
        setError('User not found. Please log in again.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/booking/booking-list/${userId}`);
        const data = await response.json();
        if (response.ok && data.success) {
          setBookings(data.data || []);
        } else {
          setError(data.message || 'Failed to load bookings.');
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError('Server error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  function RatingModal({ isOpen, onClose, booking }) {
    const API_URL = process.env.REACT_APP_API_URL;
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (isOpen) { setRating(0); setHovered(0); setReview(''); }
    }, [isOpen]);

    if (!isOpen || !booking) return null;

    const handleSubmit = async () => {
      if (rating === 0) { alert('Please select a rating.'); return; }
      setLoading(true);
      try {
        const storedUser = JSON.parse(localStorage.getItem('user')) || {};
        const userId = storedUser._id || storedUser.id;
        const res = await fetch(`${API_URL}/users/add-review`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            booking_id: booking.booking_id,
            vendor_id: booking.vendor_details?.vendor_id,
            user_id: userId,
            rating,
            review,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          alert('Thank you for your review!');
          onClose();
        } else {
          alert(data.message || 'Failed to submit review.');
        }
      } catch (err) {
        console.error(err);
        alert('Server error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Rate Service</h3>
            <button className="modal-close" onClick={onClose}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 16 }}>
              How was your experience with{' '}
              <strong>{booking.vendor_details?.vendor_name || 'this vendor'}</strong>?
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                    fontSize: 32,
                    color: star <= (hovered || rating) ? '#F59E0B' : '#D1D5DB',
                    transition: 'color 0.15s',
                  }}
                >
                  ★
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginBottom: 12 }}>
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
              </p>
            )}
            <div className="modal-field">
              <label className="field-label">Review (optional)</label>
              <textarea
                className="field-input"
                rows={3}
                placeholder="Share your experience..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                style={{ resize: 'vertical', minHeight: 80 }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={onClose} disabled={loading}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePayBalance = async (booking) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const res = await fetch(`${API_URL}/payment/balance/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: booking.balance_amount }),
      });
      const data = await res.json();
      if (!data.success) {
        alert("Order creation failed. Please try again.");
        return;
      }
      const order = data.order;
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Lokal Services",
        description: "Balance Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${API_URL}/payment/balance/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking_id: booking.booking_id,
                amount: booking.balance_amount,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert("Payment Successful!");
              setBookings((prev) =>
                prev.map((b) =>
                  b.booking_id === booking.booking_id
                    ? { ...b, balance_payment_status: "paid", payment_status: "paid" }
                    : b
                )
              );
            } else {
              alert(verifyData.message || "Payment verification failed.");
            }
          } catch (err) {
            console.error("Verify error:", err);
            alert("Verification failed. Contact support with your payment ID: " + response.razorpay_payment_id);
          }
        },
        prefill: {
          name: storedUser?.name || "",
          email: storedUser?.email || "",
          contact: storedUser?.phone || "",
        },
        theme: { color: "#2563eb" },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (err) {
      console.error("handlePayBalance error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const getTabLabel = (status) => {
    const cfg = statusCfg[status?.toLowerCase()];
    return cfg?.label || 'Upcoming';
  };

  const filtered =
    activeTab === 'All'
      ? bookings
      : bookings.filter((b) => getTabLabel(b.booking_status) === activeTab);

  const totalPages = Math.ceil(filtered.length / BOOKINGS_PER_PAGE);
  const paginatedBookings = filtered.slice((currentPage - 1) * BOOKINGS_PER_PAGE, currentPage * BOOKINGS_PER_PAGE);

  const count = (tab) =>
    tab === 'All'
      ? bookings.length
      : bookings.filter((b) => getTabLabel(b.booking_status) === tab).length;

  const formatDate = (dateStr, timeStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return `${date.toLocaleDateString('en-IN', options)}${timeStr ? ` at ${timeStr}` : ''}`;
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return [addr.flat, addr.area, addr.city, addr.state, addr.pincode]
      .filter(Boolean)
      .join(', ');
  };

  const hasOutstandingBalance = (b) =>
    parseFloat(b.balance_amount) > 0 && b.balance_payment_status !== 'paid';

  const isBalancePaid = (b) =>
    parseFloat(b.balance_amount) > 0 && b.balance_payment_status === 'paid';

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await fetch(`${API_URL}/vendors/booking-status/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_status: "cancelled_by_user" }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b.booking_id === bookingId
              ? { ...b, booking_status: "cancelled_by_user" }
              : b
          )
        );
        const booking = bookings.find((b) => b.booking_id === bookingId);
        const message = `
Booking Cancelled

Booking No: ${booking.booking_number}

Customer: ${user.name}

Service: ${booking.vendor_details?.category_name}

Date: ${booking.booking_date}
Time: ${booking.booking_time}

The customer has cancelled this booking.
`;
        const vendorPhone = booking.vendor_details?.vendor_phone;
        window.open(
          `https://wa.me/${vendorPhone}?text=${encodeURIComponent(message)}`,
          "_blank"
        );
        alert("Booking cancelled successfully");
      } else {
        alert(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="bookings-page card">
        <div className="bookings-header">
          <h2>My Bookings</h2>
          <p className="bookings-sub">View and manage all your service bookings</p>
        </div>
        <p style={{ padding: '2rem 0', color: '#6B7280', textAlign: 'center' }}>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bookings-page card">
        <div className="bookings-header">
          <h2>My Bookings</h2>
          <p className="bookings-sub">View and manage all your service bookings</p>
        </div>
        <p style={{ padding: '2rem 0', color: '#DC2626', textAlign: 'center' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="bookings-page card">
      <div className="bookings-header">
        <h2>My Bookings</h2>
        <p className="bookings-sub">View and manage all your service bookings</p>
      </div>

      <div className="bookings-tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={`tab-btn${activeTab === t ? ' active' : ''}`}
            onClick={() => { setActiveTab(t); setCurrentPage(1); }}
          >
            {t} ({count(t)})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ padding: '2rem 0', color: '#6B7280', textAlign: 'center' }}>No bookings found.</p>
      ) : (
        <>
          <div className="bookings-list">
            {paginatedBookings.map((b) => {
              const statusKey = b.booking_status?.toLowerCase();
              const cfg = statusCfg[statusKey] || statusCfg.pending;
              const vendor = b.vendor_details || {};
              const payment = b.payment || {};
              const items = b.items || [];
              const isExpanded = expandedId === b.booking_id;

              return (
                <div className="booking-item" key={b.booking_id}>

                  {/* ── Top row ── */}
                  <div className="booking-top">
                    <span className="booking-id">{b.booking_number} ·</span>
                    <span className="booking-status" style={{ color: cfg.color, background: cfg.bg }}>
                      <span className="status-dot" style={{ background: cfg.dot }} />
                      {cfg.label}
                    </span>
                    {hasOutstandingBalance(b) && (
                      <button className="pay-balance-btn" onClick={() => handlePayBalance(b)}>
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }} aria-hidden="true">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <path d="M2 10h20" />
                        </svg>
                        Pay Balance ₹{parseFloat(b.balance_amount).toFixed(2)}
                      </button>
                    )}
                    <span style={{ fontWeight: "bold" }}>₹{parseFloat(b.balance_amount).toFixed(2)}</span>
                    {isBalancePaid(b) && (
                      <span className="balance-paid-badge">
                        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Balance Paid
                      </span>
                    )}
                    <span className="booking-amount">₹{parseFloat(b.total_amount).toFixed(2)}</span>
                    <span
                      className="breakdown-pay-badge"
                      style={{
                        background: b.payment_status === 'paid' ? '#F0FDF4' : '#FEF2F2',
                        color: b.payment_status === 'paid' ? '#16A34A' : '#DC2626',
                        border: `1px solid ${b.payment_status === 'paid' ? '#BBF7D0' : '#FECACA'}`,
                      }}
                    >
                      {b.payment_status === 'paid' ? '✓ Advance Paid' : b.payment_status}
                    </span>
                  </div>

                  {/* ── Vendor + date + address ── */}
                  <div className="booking-body">
                    <img
                      src={vendor.vendor_profile || 'https://i.pravatar.cc/48?img=12'}
                      alt={vendor.vendor_name || 'Vendor'}
                      className="booking-avatar"
                      onError={(e) => { e.target.src = 'https://i.pravatar.cc/48?img=12'; }}
                    />
                    <div className="booking-details">
                      <p className="booking-service">
                        {vendor.category_name || 'Service'}{' '}
                        <span className="provider-name">with {vendor.vendor_name}</span>
                      </p>
                      <div className="booking-meta">
                        <span>📅 {formatDate(b.booking_date, b.booking_time)}</span>
                        <span>📍 {formatAddress(b.address)}</span>
                        <span>📞 {vendor.vendor_phone}</span>
                        <span>📱 {vendor.vendor_whatsapp}</span>
                      </div>
                    </div>
                  </div>

                  {/* ── Services & Payment breakdown (toggle) ── */}
                  <div className="booking-breakdown">
                    <button
                      className="breakdown-toggle"
                      onClick={() => setExpandedId(isExpanded ? null : b.booking_id)}
                    >
                      <span>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 5, verticalAlign: 'middle' }}>
                          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Services &amp; Payment
                      </span>
                      <svg
                        width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
                        viewBox="0 0 24 24"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="breakdown-panel">
                        <div className="breakdown-section">
                          <p className="breakdown-section-title">Services Booked</p>
                          {items.length === 0 ? (
                            <p className="breakdown-empty">No service items found.</p>
                          ) : (
                            <div className="breakdown-items">
                              {items.map((item, idx) => (
                                <div className="breakdown-row" key={item.item_id || idx}>
                                  <div className="breakdown-row-left">
                                    <span className="breakdown-check">✓</span>
                                    <span className="breakdown-item-name">Sub-service - {item.sub_service_name}</span>
                                    {item.quantity > 1 && (
                                      <span className="breakdown-qty">× {item.quantity}</span>
                                    )}
                                  </div>
                                  <span className="breakdown-item-price">₹{parseFloat(item.price).toFixed(2)}</span>
                                </div>
                              ))}
                              <div className="breakdown-total-row">
                                <span>Total</span>
                                <span>₹{parseFloat(b.total_amount).toFixed(2)}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="breakdown-section">
                          <p className="breakdown-section-title">Payment Details</p>
                          <div className="breakdown-payment">
                            <div className="breakdown-payment-row">
                              <span className="breakdown-pay-label">Status</span>
                              <span
                                className="breakdown-pay-badge"
                                style={{
                                  background: b.payment_status === 'paid' ? '#F0FDF4' : '#FEF2F2',
                                  color: b.payment_status === 'paid' ? '#16A34A' : '#DC2626',
                                  border: `1px solid ${b.payment_status === 'paid' ? '#BBF7D0' : '#FECACA'}`,
                                }}
                              >
                                {b.payment_status === 'paid' ? '✓ Paid' : b.payment_status}
                              </span>
                            </div>
                            {parseFloat(b.balance_amount) > 0 && (
                              <div className="breakdown-payment-row">
                                <span className="breakdown-pay-label">Balance Due</span>
                                <span
                                  className="breakdown-pay-badge"
                                  style={{
                                    background: b.balance_payment_status === 'paid' ? '#F0FDF4' : '#FFF7ED',
                                    color: b.balance_payment_status === 'paid' ? '#16A34A' : '#92400E',
                                    border: `1px solid ${b.balance_payment_status === 'paid' ? '#BBF7D0' : '#FCD34D'}`,
                                  }}
                                >
                                  {b.balance_payment_status === 'paid'
                                    ? `✓ ₹${parseFloat(b.balance_amount).toFixed(2)} Paid`
                                    : `₹${parseFloat(b.balance_amount).toFixed(2)} Pending`}
                                </span>
                              </div>
                            )}
                            {payment.razorpay_payment_id && (
                              <div className="breakdown-payment-row">
                                <span className="breakdown-pay-label">Transaction ID</span>
                                <span className="breakdown-pay-value breakdown-pay-mono">
                                  {payment.razorpay_payment_id}
                                </span>
                              </div>
                            )}
                            {payment.paid_amount && (
                              <div className="breakdown-payment-row">
                                <span className="breakdown-pay-label">Amount Paid</span>
                                <span className="breakdown-pay-value" style={{ color: '#16A34A', fontWeight: 600 }}>
                                  ₹{parseFloat(payment.paid_amount).toFixed(2)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Action buttons ── */}
                  <div className="booking-actions">
                    {(statusKey === 'pending' || statusKey === 'confirmed') && (
                      <>
                        <button className="btn btn-ghost action-sm" onClick={() => handleCancelBooking(b.booking_id)}>Cancel</button>
                        <button className="btn btn-ghost action-sm">Reschedule</button>
                        <button className="btn btn-primary action-sm">Track Pro →</button>
                      </>
                    )}
                    {statusKey === 'completed' && (
                      <>
                        <button className="btn btn-ghost action-sm" onClick={() => setRatingBooking(b)}>☆ Rate Service</button>
                        <Link className="btn btn-primary action-sm" to={`/booking/${vendor.vendor_id}`}>↻ Book Again</Link>
                        <button className="btn btn-ghost action-sm" onClick={() => downloadInvoice(b)}>Download Invoice</button>
                      </>
                    )}
                    {(statusKey === 'cancelled_by_user' || statusKey === 'cancelled_by_vendor') && (
                      <Link className="btn btn-primary action-sm" to={`/booking/${vendor.vendor_id}`}>↻ Book Again</Link>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="bookings-pagination">
              <button
                className="pg-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`pg-btn${currentPage === p ? ' active' : ''}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}

              <button
                className="pg-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                ›
              </button>

              <span className="pg-info">
                {(currentPage - 1) * BOOKINGS_PER_PAGE + 1}–{Math.min(currentPage * BOOKINGS_PER_PAGE, filtered.length)} of {filtered.length}
              </span>
            </div>
          )}
        </>
      )}

      <RatingModal
        isOpen={!!ratingBooking}
        onClose={() => setRatingBooking(null)}
        booking={ratingBooking}
      />
    </div>
  );
}
function Pagination({ total, page, onPage }) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;

  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0 8px', flexWrap: 'wrap', gap: 8 }}>
      <span style={{ fontSize: 13, color: '#6B7280' }}>Showing {from}–{to} of {total}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button onClick={() => onPage(page - 1)} disabled={page === 1} style={btnStyle(false)}>‹</button>
        {pages.map((p, i) =>
          p === "…"
            ? <span key={`e-${i}`} style={{ color: '#9CA3AF', padding: '0 4px' }}>…</span>
            : <button key={p} onClick={() => onPage(p)} style={btnStyle(p === page)}>{p}</button>
        )}
        <button onClick={() => onPage(page + 1)} disabled={page === totalPages} style={btnStyle(false)}>›</button>
      </div>
    </div>
  );
}

const btnStyle = (active) => ({
  minWidth: 34,
  height: 34,
  padding: '0 8px',
  borderRadius: 8,
  border: active ? '1.5px solid #2563EB' : '1px solid #E5E7EB',
  background: active ? '#2563EB' : '#fff',
  color: active ? '#fff' : '#374151',
  fontWeight: active ? 700 : 400,
  fontSize: 14,
  cursor: active ? 'default' : 'pointer',
  opacity: 1,
});

// ===== MY ACTIVITIES PAGE =====
const activityStatusCfg = {
  pending: { label: 'Upcoming', color: '#2563EB', bg: '#EFF6FF', dot: '#2563EB' },
  confirmed: { label: 'Confirmed', color: '#7C3AED', bg: '#F5F3FF', dot: '#7C3AED' },
  completed: { label: 'Completed', color: '#16A34A', bg: '#F0FDF4', dot: '#22C55E' },
  cancelled: { label: 'Cancelled', color: '#DC2626', bg: '#FEF2F2', dot: '#EF4444' },
  cancelled_by_user: { label: 'Cancelled By You', color: '#DC2626', bg: '#FEF2F2', dot: '#EF4444' },
  cancelled_by_vendor: { label: 'Cancelled By Vendor', color: '#DC2626', bg: '#FEF2F2', dot: '#EF4444' },
};

const PAGE_SIZE = 2;

function MyActivities() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [activeTab, setActiveTab] = useState('All');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);

  const tabs = ['All', 'Upcoming', 'Confirmed', 'Completed', 'Cancelled'];

  useEffect(() => {
    const fetchActivities = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const userId = storedUser._id || storedUser.id;
      if (!userId) {
        setError('User not found. Please log in again.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/act/user-act/${userId}`);
        const data = await response.json();
        if (response.ok && data.success) {
          setActivities(data.data || []);
        } else {
          setError(data.message || 'Failed to load activities.');
        }
      } catch (err) {
        console.error('Failed to fetch activities:', err);
        setError('Server error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const getStatusCfg = (status) => {
    return activityStatusCfg[status?.toLowerCase()] || activityStatusCfg.pending;
  };

  const getTabLabel = (status) => {
    return getStatusCfg(status).label;
  };

  const filtered =
    activeTab === 'All'
      ? activities
      : activities.filter((a) => getTabLabel(a.booking_status) === activeTab);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const count = (tab) =>
    tab === 'All'
      ? activities.length
      : activities.filter((a) => getTabLabel(a.booking_status) === tab).length;

  const formatDate = (dateStr, timeStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return `${date.toLocaleDateString('en-IN', options)}${timeStr ? ` at ${timeStr}` : ''}`;
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return [addr.flat, addr.area, addr.city, addr.state, addr.pincode]
      .filter(Boolean)
      .join(', ');
  };

  if (loading) {
    return (
      <div className="bookings-page card">
        <div className="bookings-header">
          <h2>My Activities</h2>
          <p className="bookings-sub">View and manage all your activity enrollments</p>
        </div>
        <p style={{ padding: '2rem 0', color: '#6B7280', textAlign: 'center' }}>Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bookings-page card">
        <div className="bookings-header">
          <h2>My Activities</h2>
          <p className="bookings-sub">View and manage all your activity enrollments</p>
        </div>
        <p style={{ padding: '2rem 0', color: '#DC2626', textAlign: 'center' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="bookings-page card">
      <div className="bookings-header">
        <h2>My Activities</h2>
        <p className="bookings-sub">View and manage all your activity enrollments</p>
      </div>

      <div className="bookings-tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={`tab-btn${activeTab === t ? ' active' : ''}`}
            onClick={() => { setActiveTab(t); setPage(1); }}
          >
            {t} ({count(t)})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ padding: '2rem 0', color: '#6B7280', textAlign: 'center' }}>No activities found.</p>
      ) : (
        <>
          <div className="bookings-list">
            {paginated.map((a) => {
              const cfg = getStatusCfg(a.booking_status);
              const vendor = a.vendor_details || {};
              const plan = a.plan || {};
              const isExpanded = expandedId === a.booking_id;

              return (
                <div className="booking-item" key={a.booking_id}>

                  {/* ── Top row ── */}
                  <div className="booking-top">
                    <span className="booking-id">{a.booking_number} ·</span>

                    <span className="booking-status" style={{ color: cfg.color, background: cfg.bg }}>
                      <span className="status-dot" style={{ background: cfg.dot }} />
                      {cfg.label}
                    </span>

                    {/* Plan badge */}
                    {plan.plan_name && (
                      <span
                        className="breakdown-pay-badge"
                        style={{
                          background: '#F5F3FF',
                          color: '#7C3AED',
                          border: '1px solid #DDD6FE',
                        }}
                      >
                        📋 {plan.plan_name}
                      </span>
                    )}

                    <span className="booking-amount">₹{parseFloat(a.advance_amount).toFixed(2)}</span>

                    <span
                      className="breakdown-pay-badge"
                      style={{
                        background: a.payment_status === 'paid' ? '#F0FDF4' : '#FEF2F2',
                        color: a.payment_status === 'paid' ? '#16A34A' : '#DC2626',
                        border: `1px solid ${a.payment_status === 'paid' ? '#BBF7D0' : '#FECACA'}`,
                      }}
                    >
                      {a.payment_status === 'paid' ? '✓ Advance Paid' : a.payment_status}
                    </span>
                  </div>

                  {/* ── Vendor + date + address ── */}
                  <div className="booking-body">
                    <img
                      src={vendor.vendor_profile || 'https://i.pravatar.cc/48?img=12'}
                      alt={vendor.vendor_name || 'Vendor'}
                      className="booking-avatar"
                      onError={(e) => { e.target.src = 'https://i.pravatar.cc/48?img=12'; }}
                    />
                    <div className="booking-details">
                      <p className="booking-service">
                        {vendor.activity_name || 'Activity'}{' '}
                        <span className="provider-name">with {vendor.vendor_name}</span>
                      </p>
                      {vendor.shop_name && (
                        <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>
                          🏫 {vendor.shop_name}
                        </p>
                      )}
                      <div className="booking-meta">
                        <span>📅 {formatDate(a.booking_date, a.booking_time)}</span>
                        <span>📍 {formatAddress(a.address)}</span>
                        <span>📞 {vendor.vendor_phone}</span>
                        {vendor.vendor_whatsapp && (
                          <span>📱 {vendor.vendor_whatsapp}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Plan & Payment breakdown (toggle) ── */}
                  <div className="booking-breakdown">
                    <button
                      className="breakdown-toggle"
                      onClick={() => setExpandedId(isExpanded ? null : a.booking_id)}
                    >
                      <span>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 5, verticalAlign: 'middle' }}>
                          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Plan &amp; Payment
                      </span>
                      <svg
                        width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
                        viewBox="0 0 24 24"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="breakdown-panel">
                        {/* Plan details */}
                        <div className="breakdown-section">
                          <p className="breakdown-section-title">Plan Details</p>
                          <div className="breakdown-items">
                            <div className="breakdown-row">
                              <div className="breakdown-row-left">
                                <span className="breakdown-check">✓</span>
                                <span className="breakdown-item-name">{plan.plan_name} Plan</span>
                              </div>
                              <span className="breakdown-item-price">₹{parseFloat(plan.amount || 0).toFixed(2)}</span>
                            </div>
                            <div className="breakdown-total-row">
                              <span>Total</span>
                              <span>₹{parseFloat(a.total_amount).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Payment details */}
                        <div className="breakdown-section">
                          <p className="breakdown-section-title">Payment Details</p>
                          <div className="breakdown-payment">
                            <div className="breakdown-payment-row">
                              <span className="breakdown-pay-label">Advance Paid</span>
                              <span
                                className="breakdown-pay-badge"
                                style={{
                                  background: '#F0FDF4',
                                  color: '#16A34A',
                                  border: '1px solid #BBF7D0',
                                }}
                              >
                                ✓ ₹{parseFloat(plan.advance_amount || 0).toFixed(2)}
                              </span>
                            </div>

                            <div className="breakdown-payment-row">
                              <span className="breakdown-pay-label">Balance Due</span>
                              <span
                                className="breakdown-pay-badge"
                                style={{
                                  background: '#FFF7ED',
                                  color: '#92400E',
                                  border: '1px solid #FCD34D',
                                }}
                              >
                                ₹{(parseFloat(plan.amount || 0) - parseFloat(plan.advance_amount || 0)).toFixed(2)} Pending
                              </span>
                            </div>

                            <div className="breakdown-payment-row">
                              <span className="breakdown-pay-label">Payment Status</span>
                              <span
                                className="breakdown-pay-badge"
                                style={{
                                  background: a.payment_status === 'paid' ? '#F0FDF4' : '#FEF2F2',
                                  color: a.payment_status === 'paid' ? '#16A34A' : '#DC2626',
                                  border: `1px solid ${a.payment_status === 'paid' ? '#BBF7D0' : '#FECACA'}`,
                                }}
                              >
                                {a.payment_status === 'paid' ? '✓ Paid' : a.payment_status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Action buttons ── */}
                  <div className="booking-actions">
                    {/* {(a.booking_status?.toLowerCase() === 'pending' ||
                      a.booking_status?.toLowerCase() === 'confirmed') && (
                        <button
                          className="btn btn-ghost action-sm"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to cancel this activity?')) {
                              alert('Cancel feature coming soon.');
                            }
                          }}
                        >
                          Cancel
                        </button>
                      )} */}
                    {a.booking_status?.toLowerCase() === 'completed' && (
                      <button className="btn btn-ghost action-sm">☆ Rate Activity</button>
                    )}
                    <a
                      href={`https://wa.me/${vendor.vendor_whatsapp || vendor.vendor_phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost action-sm"
                    >
                      💬 WhatsApp
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
          <Pagination total={filtered.length} page={page} onPage={setPage} />
        </>
      )}
    </div>
  );
}

// ===== SAVED VENDORS PAGE =====
const SV_PAGE_SIZE = 6;

function SvPagination({ total, page, onPage }) {
  const totalPages = Math.ceil(total / SV_PAGE_SIZE);
  if (totalPages <= 1) return null;

  const from = (page - 1) * SV_PAGE_SIZE + 1;
  const to = Math.min(page * SV_PAGE_SIZE, total);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const btn = (active, disabled) => ({
    minWidth: 34, height: 34, padding: '0 8px',
    borderRadius: 8,
    border: active ? '1.5px solid #7C3AED' : '1px solid #E5E7EB',
    background: active ? '#7C3AED' : '#fff',
    color: active ? '#fff' : '#374151',
    fontWeight: active ? 700 : 400,
    fontSize: 14,
    cursor: disabled || active ? 'default' : 'pointer',
    opacity: disabled ? 0.35 : 1,
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0 8px', flexWrap: 'wrap', gap: 8 }}>
      <span style={{ fontSize: 13, color: '#6B7280' }}>Showing {from}–{to} of {total}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button onClick={() => onPage(page - 1)} disabled={page === 1} style={btn(false, page === 1)}>‹</button>
        {pages.map((p, i) =>
          p === "…"
            ? <span key={`e-${i}`} style={{ color: '#9CA3AF', padding: '0 4px' }}>…</span>
            : <button key={p} onClick={() => onPage(p)} style={btn(p === page, false)}>{p}</button>
        )}
        <button onClick={() => onPage(page + 1)} disabled={page === totalPages} style={btn(false, page === totalPages)}>›</button>
      </div>
    </div>
  );
}

function SavedVendors({ userId = 1 }) {
  const API_URL = process.env.REACT_APP_API_URL;

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/fav/user/${userId}`);
        const json = await res.json();
        if (json.success) {
          setVendors(json.data);
          setPage(1);
        } else {
          setError("Failed to load saved vendors.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const paginated = vendors.slice((page - 1) * SV_PAGE_SIZE, page * SV_PAGE_SIZE);

  if (loading) {
    return (
      <div className="saved-vendors-page card">
        <div className="sv-header">
          <h2>Saved Vendors</h2>
          <p className="sv-sub">Quick access to your favourite professionals</p>
        </div>
        <p className="sv-loading">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="saved-vendors-page card">
        <div className="sv-header">
          <h2>Saved Vendors</h2>
          <p className="sv-sub">Quick access to your favourite professionals</p>
        </div>
        <p className="sv-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="saved-vendors-page card">
      <div className="sv-header">
        <h2>Saved Vendors</h2>
        <p className="sv-sub">Quick access to your favourite professionals</p>
      </div>

      {vendors.length === 0 ? (
        <p className="sv-empty">No saved vendors yet. Start exploring!</p>
      ) : (
        <>
          <div className="sv-grid">
            {paginated.map((v) => (
              <div className="vendor-card" key={v.id}>
                <img src={v.profile_url} alt={v.full_name} className="vendor-avatar" />
                <div className="vendor-info">
                  <p className="vendor-name">{v.full_name}</p>
                  <p className="vendor-role">{v.category_name}</p>
                  <div className="vendor-rating">
                    <span className="star">★</span>
                    <span className="rating-val">{parseFloat(v.rating).toFixed(1)}</span>
                  </div>
                </div>
                <Link className="book-btn" to={`/booking/${v.id}`}>
                  Book
                </Link>
              </div>
            ))}
          </div>

          <SvPagination total={vendors.length} page={page} onPage={setPage} />
        </>
      )}
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
        <button className="mark-all-btn" onClick={() => setNotifs(n => n.map(x => ({ ...x, read: true })))}>
          Mark all as read
        </button>
      </div>
      <div className="notif-list">
        {notifs.map(n => (
          <div
            key={n.id}
            className={`notif-item${n.read ? '' : ' unread'}`}
            onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
          >
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
const WL_PAGE_SIZE = 4;

function WlPagination({ total, page, onPage }) {
  const totalPages = Math.ceil(total / WL_PAGE_SIZE);
  if (totalPages <= 1) return null;

  const from = (page - 1) * WL_PAGE_SIZE + 1;
  const to = Math.min(page * WL_PAGE_SIZE, total);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const btn = (active, disabled) => ({
    minWidth: 34, height: 34, padding: '0 8px',
    borderRadius: 8,
    border: active ? '1.5px solid #7C3AED' : '1px solid #E5E7EB',
    background: active ? '#7C3AED' : '#fff',
    color: active ? '#fff' : '#374151',
    fontWeight: active ? 700 : 400,
    fontSize: 14,
    cursor: disabled || active ? 'default' : 'pointer',
    opacity: disabled ? 0.35 : 1,
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 4px', flexWrap: 'wrap', gap: 8 }}>
      <span style={{ fontSize: 13, color: '#6B7280' }}>Showing {from}–{to} of {total}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button onClick={() => onPage(page - 1)} disabled={page === 1} style={btn(false, page === 1)}>‹</button>
        {pages.map((p, i) =>
          p === "…"
            ? <span key={`e-${i}`} style={{ color: '#9CA3AF', padding: '0 4px' }}>…</span>
            : <button key={p} onClick={() => onPage(p)} style={btn(p === page, false)}>{p}</button>
        )}
        <button onClick={() => onPage(page + 1)} disabled={page === totalPages} style={btn(false, page === totalPages)}>›</button>
      </div>
    </div>
  );
}

function Wallet() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const userId = storedUser._id || storedUser.id;
      if (!userId) {
        setError("User not found. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/payment/user-pay-history/${userId}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setTxns(data.data || []);
          setPage(1);
        } else {
          setError(data.message || "Failed to load transactions.");
        }
      } catch (err) {
        console.error("Failed to fetch payment history:", err);
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const totalPaid = txns
    .filter(tx => tx.payment_status === 'paid')
    .reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);

  const paginated = txns.slice((page - 1) * WL_PAGE_SIZE, page * WL_PAGE_SIZE);

  return (
    <div className="wallet-page">
      <div className="balance-card">
        <p className="balance-label">Total Paid</p>
        <p className="balance-amount">₹{totalPaid.toFixed(2)}</p>
        {/* <div className="wallet-actions">
          <button className="wallet-add-btn">+ Add Money</button>
          <button className="wallet-withdraw-btn">Withdraw</button>
        </div> */}
      </div>

      <div className="card transactions-card">
        <div className="tx-header"><h3>Recent Transactions</h3></div>

        {loading ? (
          <p style={{ padding: '2rem 0', color: '#6B7280', textAlign: 'center' }}>
            Loading transactions...
          </p>
        ) : error ? (
          <p style={{ padding: '2rem 0', color: '#DC2626', textAlign: 'center' }}>
            {error}
          </p>
        ) : txns.length === 0 ? (
          <p style={{ padding: '2rem 0', color: '#6B7280', textAlign: 'center' }}>
            No transactions found.
          </p>
        ) : (
          <>
            <div className="tx-list">
              {paginated.map(tx => (
                <div className="tx-item" key={tx.payment_id}>
                  <div className={`tx-icon ${tx.payment_type === 'advance' ? 'debit' : 'credit'}`}>
                    {tx.payment_type === 'advance'
                      ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7l-7 7-7-7" /></svg>
                      : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19V5m-7 7l7-7 7 7" /></svg>
                    }
                  </div>
                  <div className="tx-info">
                    <p className="tx-label">
                      {tx.payment_type === 'advance' ? 'Advance' : 'Balance'} payment to {tx.vendor_name}
                    </p>
                    <p className="tx-date">{tx.services}</p>
                    <p className="tx-date">{formatDate(tx.created_at)}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="tx-amount debit">-₹{parseFloat(tx.amount).toFixed(2)}</p>
                    <span
                      className="breakdown-pay-badge"
                      style={{
                        background: tx.payment_status === 'paid' ? '#F0FDF4' : '#FEF2F2',
                        color: tx.payment_status === 'paid' ? '#16A34A' : '#DC2626',
                        border: `1px solid ${tx.payment_status === 'paid' ? '#BBF7D0' : '#FECACA'}`,
                        fontSize: 11,
                      }}
                    >
                      {tx.payment_status === 'paid' ? '✓ Paid' : tx.payment_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <WlPagination total={txns.length} page={page} onPage={setPage} />
          </>
        )}
      </div>
    </div>
  );
}

// ==== Wallet ===

const WL_WALLET_PAGE_SIZE = 6;

function WlWalletPagination({ total, page, onPage }) {
  const totalPages = Math.ceil(total / WL_WALLET_PAGE_SIZE);
  if (totalPages <= 1) return null;

  const from = (page - 1) * WL_WALLET_PAGE_SIZE + 1;
  const to = Math.min(page * WL_WALLET_PAGE_SIZE, total);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const btn = (active, disabled) => ({
    minWidth: 34, height: 34, padding: '0 8px',
    borderRadius: 8,
    border: active ? '1.5px solid #7C3AED' : '1px solid #E5E7EB',
    background: active ? '#7C3AED' : '#fff',
    color: active ? '#fff' : '#374151',
    fontWeight: active ? 700 : 400,
    fontSize: 14,
    cursor: disabled || active ? 'default' : 'pointer',
    opacity: disabled ? 0.35 : 1,
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 4px', flexWrap: 'wrap', gap: 8 }}>
      <span style={{ fontSize: 13, color: '#6B7280' }}>Showing {from}–{to} of {total}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button onClick={() => onPage(page - 1)} disabled={page === 1} style={btn(false, page === 1)}>‹</button>
        {pages.map((p, i) =>
          p === "…"
            ? <span key={`e-${i}`} style={{ color: '#9CA3AF', padding: '0 4px' }}>…</span>
            : <button key={p} onClick={() => onPage(p)} style={btn(p === page, false)}>{p}</button>
        )}
        <button onClick={() => onPage(page + 1)} disabled={page === totalPages} style={btn(false, page === totalPages)}>›</button>
      </div>
    </div>
  );
}

function WalletHistory() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const userId = storedUser._id || storedUser.id;
      if (!userId) {
        setError("User not found. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/users/wallet-history/${userId}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setTxns(data.wallet_history || []);
          setPage(1);
        } else {
          setError(data.message || "Failed to load wallet history.");
        }
      } catch (err) {
        console.error("Failed to fetch wallet history:", err);
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatAmount = (val) => {
    const n = parseFloat(val);
    if (isNaN(n)) return '₹0.00';
    return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const totalCredits = txns
    .filter(tx => tx.type === 'credit')
    .reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);

  const totalDebits = txns
    .filter(tx => tx.type === 'debit')
    .reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);

  const walletBalance = totalCredits - totalDebits;

  const paginated = txns.slice((page - 1) * WL_WALLET_PAGE_SIZE, page * WL_WALLET_PAGE_SIZE);

  return (
    <div className="wallet-page">

      {/* Balance card */}
      <div className="balance-card">
        <p className="balance-label">Wallet Balance</p>
        <p className="balance-amount">{formatAmount(walletBalance)}</p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Total Credits</p>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#86EFAC' }}>{formatAmount(totalCredits)}</p>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Total Debits</p>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#FCA5A5' }}>{formatAmount(totalDebits)}</p>
          </div>
        </div>
      </div>

      {/* Transactions card */}
      <div className="card transactions-card">
        <div className="tx-header">
          <h3>Wallet History</h3>
          {!loading && !error && (
            <span style={{ fontSize: 13, color: '#6B7280' }}>{txns.length} transaction{txns.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {loading ? (
          <p style={{ padding: '2rem 0', color: '#6B7280', textAlign: 'center' }}>Loading wallet history...</p>
        ) : error ? (
          <p style={{ padding: '2rem 0', color: '#DC2626', textAlign: 'center' }}>{error}</p>
        ) : txns.length === 0 ? (
          <p style={{ padding: '2rem 0', color: '#6B7280', textAlign: 'center' }}>No wallet transactions found.</p>
        ) : (
          <>
            <div className="tx-list">
              {paginated.map(tx => (
                <div className="tx-item" key={tx.id}>

                  {/* Icon */}
                  <div className={`tx-icon ${tx.type === 'debit' ? 'debit' : 'credit'}`}>
                    {tx.type === 'debit'
                      ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7l-7 7-7-7" /></svg>
                      : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19V5m-7 7l7-7 7 7" /></svg>
                    }
                  </div>

                  {/* Info */}
                  <div className="tx-info">
                    <p className="tx-label">
                      {tx.reason}
                    </p>
                    <p className="tx-date" style={{ marginBottom: 2 }}>
                      🏪 {tx.vendor_name}
                      {tx.shop_name && <span style={{ color: '#9CA3AF' }}> · {tx.shop_name}</span>}
                    </p>
                    <p className="tx-date">
                      {formatDate(tx.created_at)} · {formatTime(tx.created_at)}
                      <span style={{ marginLeft: 8, color: '#9CA3AF' }}>Booking #{tx.booking_id}</span>
                    </p>
                  </div>

                  {/* Amount + status */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p
                      className="tx-amount"
                      style={{ color: tx.type === 'credit' ? '#16A34A' : '#DC2626', marginBottom: 4 }}
                    >
                      {tx.type === 'credit' ? '+' : '-'}{formatAmount(tx.amount)}
                    </p>
                    <span
                      className="breakdown-pay-badge"
                      style={{
                        background: tx.type === 'credit' ? '#F0FDF4' : '#FEF2F2',
                        color: tx.type === 'credit' ? '#16A34A' : '#DC2626',
                        border: `1px solid ${tx.type === 'credit' ? '#BBF7D0' : '#FECACA'}`,
                        fontSize: 11,
                      }}
                    >
                      {tx.type === 'credit' ? '↑ Credit' : '↓ Debit'}
                    </span>
                  </div>

                </div>
              ))}
            </div>

            <WlWalletPagination total={txns.length} page={page} onPage={setPage} />
          </>
        )}
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
  const [prefs, setPrefs] = useState({
    pushNotifications: true,
    emailUpdates: true,
    smsAlerts: false,
    locationServices: true,
  });
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
            <a href="/" className="social-icon">f</a>
            <a href="/" className="social-icon">𝕏</a>
            <a href="/" className="social-icon">◎</a>
            <a href="/" className="social-icon">in</a>
          </div>
        </div>
        <div className="footer-links">
          <a href="/">About Us</a>
          <a href="/">Careers</a>
          <a href="/">Blog</a>
          <a href="/">Contact Support</a>
          <a href="/" className="footer-vendor-link">Become a Vendor</a>
        </div>
        <div className="footer-links">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms &amp; Conditions</a>
          <a href="/">Cancellation Policy</a>
          <a href="/">Trust &amp; Safety</a>
        </div>
        <div className="footer-newsletter">
          <p>Subscribe to our newsletter for the latest offers and updates.</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
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
const pages = { MyProfile, MyBookings, MyActivities, SavedVendors, Notifications, Wallet, WalletHistory, Settings };
const user = JSON.parse(localStorage.getItem("user"));

const greetings = {
  MyProfile: `Welcome back, ${user?.name} 🗒️`,
  MyBookings: `Welcome back, ${user?.name} 👋`,
  MyActivities: `Welcome back, ${user?.name} ⚡`,
  SavedVendors: `Welcome back, ${user?.name} 🗒️`,
  Notifications: `Welcome back, ${user?.name} 🗒️`,
  Wallet: `Welcome back, ${user?.name} 🗒️`,
  WalletHistory: `Welcome back, ${user?.name} 💰`,
  Settings: `Welcome back, ${user?.name} 🗒️`,
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