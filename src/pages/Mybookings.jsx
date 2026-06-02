import React, { useState } from 'react';
import '../styles/MyBookings.css';

const allBookings = [
    {
        id: 'LK-2826-04821',
        status: 'Upcoming',
        service: 'Electrician',
        provider: 'Ramesh Kumar',
        date: '15 May 2026 at 12:30 PM',
        location: 'Flat 402, Prestige Sunrise, HSR Layout',
        amount: '₹298',
        image: 'https://i.pravatar.cc/48?img=12',
    },
    {
        id: 'LK-2826-04799',
        status: 'Completed',
        service: 'Plumber',
        provider: 'Suresh Plumbing',
        date: '08 May 2026 at 10:00 AM',
        location: 'WeWork Galaxy, Residency Rd',
        amount: '₹549',
        image: 'https://i.pravatar.cc/48?img=15',
    },
    {
        id: 'LK-2826-04722',
        status: 'Completed',
        service: 'Yoga Trainer',
        provider: 'Priya Sharma',
        date: '02 May 2026 at 06:00 AM',
        location: 'Flat 402, Prestige Sunrise, HSR Layout',
        amount: '₹1,200',
        image: 'https://i.pravatar.cc/48?img=5',
    },
    {
        id: 'LK-2826-04781',
        status: 'Cancelled',
        service: 'AC Repair',
        provider: 'Ramesh Kumar',
        date: '28 Apr 2026 at 04:00 PM',
        location: 'Flat 402, Prestige Sunrise, HSR Layout',
        amount: '₹699',
        image: 'https://i.pravatar.cc/48?img=12',
    },
];

const statusConfig = {
    Upcoming: { color: '#2563EB', bg: '#EFF6FF', dot: '#2563EB' },
    Completed: { color: '#16A34A', bg: '#F0FDF4', dot: '#22C55E' },
    Cancelled: { color: '#DC2626', bg: '#FEF2F2', dot: '#EF4444' },
};

const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

export default function MyBookings() {
    const [activeTab, setActiveTab] = useState('All');

    const filtered = activeTab === 'All'
        ? allBookings
        : allBookings.filter(b => b.status === activeTab);

    const count = (tab) => tab === 'All' ? allBookings.length : allBookings.filter(b => b.status === tab).length;

    return (
        <div className="bookings-page card">
            <div className="bookings-header">
                <h2>My Bookings</h2>
                <p className="bookings-sub">View and manage all your service bookings</p>
            </div>

            <div className="bookings-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`tab-btn${activeTab === tab ? ' active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab} ({count(tab)})
                    </button>
                ))}
            </div>

            <div className="bookings-list">
                {filtered.map(booking => {
                    const cfg = statusConfig[booking.status];
                    return (
                        <div className="booking-item" key={booking.id}>
                            <div className="booking-top">
                                <span className="booking-id">{booking.id} ·</span>
                                <span className="booking-status" style={{ color: cfg.color, background: cfg.bg }}>
                                    <span className="status-dot" style={{ background: cfg.dot }} />
                                    {booking.status}
                                </span>
                                <span className="booking-amount">{booking.amount}</span>
                            </div>

                            <div className="booking-body">
                                <img src={booking.image} alt={booking.provider} className="booking-avatar" />
                                <div className="booking-details">
                                    <p className="booking-service">
                                        {booking.service} <span className="provider-name">with {booking.provider}</span>
                                    </p>
                                    <div className="booking-meta">
                                        <span>📅 {booking.date}</span>
                                        <span>📍 {booking.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="booking-actions">
                                {booking.status === 'Upcoming' && (
                                    <>
                                        <button className="btn btn-ghost action-sm">Cancel</button>
                                        <button className="btn btn-ghost action-sm">Reschedule</button>
                                        <button className="btn btn-primary action-sm">Track Pro →</button>
                                    </>
                                )}
                                {booking.status === 'Completed' && (
                                    <>
                                        <button className="btn btn-ghost action-sm">⬇ Invoice</button>
                                        <button className="btn btn-ghost action-sm">☆ Rate Service</button>
                                        <button className="btn btn-primary action-sm">↻ Book Again</button>
                                    </>
                                )}
                                {booking.status === 'Cancelled' && (
                                    <button className="btn btn-primary action-sm">↻ Book Again</button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}