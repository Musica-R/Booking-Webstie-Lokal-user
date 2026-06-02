import React, { useState } from 'react';
import '../styles/Notifications.css';

const initialNotifications = [
    { id: 1, title: 'Booking Confirmed', desc: 'Your electrician booking is confirmed for tomorrow 12:30 PM.', time: '2 hrs ago', read: false },
    { id: 2, title: '50% OFF on Deep Cleaning', desc: 'Limited time offer on home deep cleaning services this weekend.', time: '1 day ago', read: false },
    { id: 3, title: 'Service Completed', desc: 'Rate your experience with Suresh Plumbing.', time: '3 days ago', read: true },
    { id: 4, title: 'Payment Successful', desc: '₹549 charged to your UPI for booking LK-2026-04799.', time: '5 days ago', read: true },
];

export default function Notifications() {
    const [notifications, setNotifications] = useState(initialNotifications);

    const markAllRead = () => setNotifications(n => n.map(item => ({ ...item, read: true })));
    const markRead = (id) => setNotifications(n => n.map(item => item.id === id ? { ...item, read: true } : item));

    return (
        <div className="notifications-page card">
            <div className="notif-header">
                <div>
                    <h2>Notifications</h2>
                    <p className="notif-sub">Stay updated on your bookings and offers</p>
                </div>
                <button className="mark-all-btn" onClick={markAllRead}>Mark all as read</button>
            </div>

            <div className="notif-list">
                {notifications.map(notif => (
                    <div
                        className={`notif-item${notif.read ? '' : ' unread'}`}
                        key={notif.id}
                        onClick={() => markRead(notif.id)}
                    >
                        <div className={`notif-icon-wrap${notif.read ? ' read' : ''}`}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                        <div className="notif-content">
                            <div className="notif-title-row">
                                <p className="notif-title">{notif.title}</p>
                                {!notif.read && <span className="unread-dot" />}
                            </div>
                            <p className="notif-desc">{notif.desc}</p>
                            <p className="notif-time">{notif.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}