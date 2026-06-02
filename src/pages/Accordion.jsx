import { useState } from "react";
import "../styles/Accordion.css";

const faqs = [
    {
        id: 1,
        question: "How does the booking process work?",
        answer:
            "Simply search for the service you need, browse through verified professionals, select a convenient date and time, and confirm your booking. You can pay securely online or via cash after the service is completed.",
    },
    {
        id: 2,
        question: "How are the service professionals verified?",
        answer:
            "Every professional goes through a rigorous background check, identity verification, and skills assessment before joining our platform. We also continuously monitor reviews and ratings to ensure quality standards are maintained.",
    },
    {
        id: 3,
        question: "What is your cancellation policy?",
        answer:
            "You can cancel or reschedule a booking up to 24 hours in advance at no charge. Cancellations made within 24 hours may incur a small fee. In case of emergencies, please contact our support team and we'll do our best to assist you.",
    },
    {
        id: 4,
        question: "What payment methods do you accept?",
        answer:
            "We accept all major credit and debit cards, UPI, net banking, and digital wallets like Google Pay and PhonePe. You also have the option to pay cash directly to the professional after service completion.",
    },
    {
        id: 5,
        question: "What if I am not satisfied with the service?",
        answer:
            "Your satisfaction is our priority. If you're not happy with the service, please report it within 48 hours via the app or our support team. We will arrange a free redo or provide a refund based on the situation.",
    },
    {
        id: 6,
        question: "How can I register as a vendor or professional?",
        answer:
            "Click on the 'Join as Professional' button on our homepage, fill in your details, upload required documents for verification, and complete a short skills test. Our team will review and activate your profile within 2–3 business days.",
    },
];

const ChevronIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

function AccordionItem({ item, isOpen, onToggle }) {
    return (
        <div className={`accordion-item${isOpen ? " open" : ""}`}>
            <button
                className="accordion-trigger"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                id={`trigger-${item.id}`}
            >
                <span className="accordion-question">{item.question}</span>
                <span className="accordion-icon" aria-hidden="true">
                    <ChevronIcon />
                </span>
            </button>

            <div
                id={`panel-${item.id}`}
                role="region"
                aria-labelledby={`trigger-${item.id}`}
                className={`accordion-panel${isOpen ? " open" : ""}`}
            >
                <p className="accordion-answer">{item.answer}</p>
            </div>
        </div>
    );
}

export default function Accordion() {
    const [openId, setOpenId] = useState(1);

    const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

    return (
        <div className="faq-wrapper">
            <div className="faq-container">
                {/* Header */}
                <header className="faq-header">
                    <span className="faq-eyebrow">Support</span>
                    <h1 className="faq-title">Frequently Asked Questions</h1>
                    <p className="faq-subtitle">
                        Got questions? We've got answers. If you need more help, our{" "}
                        <span>support team is available 24/7</span>.
                    </p>
                </header>

                {/* Accordion */}
                <div className="accordion-list" role="list">
                    {faqs.map((item) => (
                        <AccordionItem
                            key={item.id}
                            item={item}
                            isOpen={openId === item.id}
                            onToggle={() => toggle(item.id)}
                        />
                    ))}
                </div>

                {/* Footer */}
                <footer className="faq-footer">
                    Still have questions?{" "}
                    <a href="mailto:support@example.com">Contact our support team →</a>
                </footer>
            </div>
        </div>
    );
}