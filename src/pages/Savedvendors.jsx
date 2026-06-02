import React from 'react';
import '../styles/SavedVendors.css';

const vendors = [
    { id: 1, name: 'Ramesh Kumar', role: 'Electrician', area: 'Indiranagar, BLR', rating: 4.9, reviews: 342, image: 'https://i.pravatar.cc/56?img=12' },
    { id: 2, name: 'Suresh Plumbing', role: 'Plumber', area: 'Koramangala, BLR', rating: 4.8, reviews: 215, image: 'https://i.pravatar.cc/56?img=15' },
    { id: 3, name: 'Priya Sharma', role: 'Yoga Trainer', area: 'HSR Layout, BLR', rating: 5, reviews: 128, image: 'https://i.pravatar.cc/56?img=5' },
];

export default function SavedVendors() {
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
                        <button className="unsave-btn" title="Remove from saved">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#EF4444">
                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}