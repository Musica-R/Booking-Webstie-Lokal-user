import React from "react";
import "../styles/Activity.css"; // ← keep your existing import path

const activities = [
  {
    id: 1,
    name: "Yoga",
    count: "24+ trainers nearby",
    emoji: "🧘",
    iconClass: "lokal-icon-yoga",
  },
  {
    id: 2,
    name: "Silambam",
    count: "8+ trainers nearby",
    emoji: "🥢",
    iconClass: "lokal-icon-silambam",
  },
  {
    id: 3,
    name: "Gymnastics",
    count: "12+ trainers nearby",
    emoji: "🤸",
    iconClass: "lokal-icon-gymnastics",
  },
  {
    id: 4,
    name: "Karate",
    count: "18+ trainers nearby",
    emoji: "🥋",
    iconClass: "lokal-icon-karate",
  },
  {
    id: 5,
    name: "Dance",
    count: "45+ trainers nearby",
    emoji: "💃",
    iconClass: "lokal-icon-dance",
  },
  {
    id: 6,
    name: "Music Class",
    count: "32+ trainers nearby",
    emoji: "🎸",
    iconClass: "lokal-icon-music",
  },
  {
    id: 7,
    name: "Meditation",
    count: "15+ trainers nearby",
    emoji: "🪷",
    iconClass: "lokal-icon-meditation",
  },
  {
    id: 8,
    name: "Drawing",
    count: "22+ trainers nearby",
    emoji: "🎨",
    iconClass: "lokal-icon-drawing",
  },
  {
    id: 9,
    name: "Zumba",
    count: "28+ trainers nearby",
    emoji: "🕺",
    iconClass: "lokal-icon-zumba",
  },
  {
    id: 10,
    name: "Spoken English",
    count: "50+ trainers nearby",
    emoji: "💬",
    iconClass: "lokal-icon-spoken",
    fullWidth: true,
  },
];

function ActivityItem({ activity }) {
  return (
    <div
      className={`lokal-activity-item${
        activity.fullWidth ? " lokal-full-width" : ""
      }`}
    >
      <div className={`lokal-activity-icon ${activity.iconClass}`}>
        {activity.emoji}
      </div>
      <div className="lokal-activity-info">
        <span className="lokal-activity-name">{activity.name}</span>
        <span className="lokal-activity-count">{activity.count}</span>
      </div>
    </div>
  );
}

function Activity() {
  return (
    <div className="lokal-activities-card">
      <div className="lokal-activities-header">
        <h2 className="lokal-activities-title">All Activities</h2>
        <a href="#" className="lokal-view-all-link">
          View all <span className="lokal-arrow">→</span>
        </a>
      </div>

      <div className="lokal-activities-grid">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default Activity;