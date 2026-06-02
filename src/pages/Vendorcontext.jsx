import { createContext, useContext, useState } from "react";

// ── Seed data matching the cards shown in the image ───────────────────────────
const SEED_VENDORS = [
    {
        id: 1,
        fullName: "Ramesh Kumar",
        shopName: "Kumar Electricals",
        experience: "8",
        city: "Bengaluru",
        category: "Electrician",
        rating: 4.9,
        reviews: 342,
        distance: "2.4 km",
        coverImg: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80",
        avatarImg: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 2,
        fullName: "Suresh Plumbing",
        shopName: "Suresh & Co",
        experience: "12",
        city: "Bengaluru",
        category: "Plumber",
        rating: 4.8,
        reviews: 215,
        distance: "2.4 km",
        coverImg: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        avatarImg: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        id: 3,
        fullName: "Priya Sharma",
        shopName: "Priya Wellness",
        experience: "5",
        city: "Bengaluru",
        category: "Cleaning",
        rating: 5.0,
        reviews: 128,
        distance: "2.4 km",
        coverImg: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
        avatarImg: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 4,
        fullName: "Ramesh Kumar",
        shopName: "Kumar Electricals",
        experience: "8",
        city: "Bengaluru",
        category: "Electrician",
        rating: 4.9,
        reviews: 342,
        distance: "2.4 km",
        coverImg: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80",
        avatarImg: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 5,
        fullName: "Suresh Plumbing",
        shopName: "Suresh & Co",
        experience: "12",
        city: "Bengaluru",
        category: "Plumber",
        rating: 4.8,
        reviews: 215,
        distance: "2.4 km",
        coverImg: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        avatarImg: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        id: 6,
        fullName: "Priya Sharma",
        shopName: "Priya Wellness",
        experience: "5",
        city: "Bengaluru",
        category: "Cleaning",
        rating: 5.0,
        reviews: 128,
        distance: "2.4 km",
        coverImg: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
        avatarImg: "https://randomuser.me/api/portraits/women/44.jpg",
    },
];

const VendorContext = createContext(null);

export function VendorProvider({ children }) {
    const [vendors, setVendors] = useState(SEED_VENDORS);

    const addVendor = (formData) => {
        const newVendor = {
            id: Date.now(),
            fullName: formData.fullName || "New Vendor",
            shopName: formData.shopName || "",
            experience: formData.experience || "1",
            city: formData.city || "Bengaluru",
            category: formData.category || "General",
            rating: (4.0 + Math.random()).toFixed(1),
            reviews: Math.floor(Math.random() * 50) + 1,
            distance: (Math.random() * 5 + 0.5).toFixed(1) + " km",
            // Use a placeholder cover + avatar since no image upload for profile photo
            coverImg: `https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80`,
            avatarImg: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName || "V")}&background=2563eb&color=fff&size=80`,
        };
        setVendors((prev) => [newVendor, ...prev]);
        return newVendor;
    };

    return (
        <VendorContext.Provider value={{ vendors, addVendor }}>
            {children}
        </VendorContext.Provider>
    );
}

export function useVendors() {
    return useContext(VendorContext);
}