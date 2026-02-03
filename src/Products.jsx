import { useState } from "react";
import "./App.css";
import productVoice from "./assets/voice.png";
import productBroadcast from "./assets/broadcast.png";
import productAnalytics from "./assets/analytics.png";

const PRODUCTS = [
    {
        id: "broadcast",
        title: "Message Broadcasting",
        tagline: "Reach customers instantly at scale",
        description:
            "Send bulk notifications, reminders, and updates using approved messaging workflows designed for reliability and scale.",
        bullets: [
            "Bulk message campaigns",
            "Template-based messaging",
            "Delivery tracking",
        ],
        image: productBroadcast,
    },
    {
        id: "voice",
        title: "Voice Automation",
        tagline: "Automate inbound and outbound calls with AI",
        description:
            "Design intelligent call flows, deploy AI voice bots, and handle thousands of customer calls automatically without human intervention.",
        bullets: [
            "Inbound call automation",
            "Outbound voice campaigns",
            "AI-powered voice bots",
        ],
        image: productVoice,
    },
    {
        id: "analytics",
        title: "Analytics & Insights",
        tagline: "Understand every interaction",
        description:
            "Get real-time visibility into calls, campaigns, and customer interactions with actionable analytics and performance insights.",
        bullets: [
            "Call analytics",
            "Campaign performance",
            "Operational insights",
        ],
        image: productAnalytics,
    },
];

export const Products = () => {
    const [active, setActive] = useState(PRODUCTS[0]);

    return (
        <section className="products-section" id="products">
            <div className="products-container">
                {/* LEFT NAV */}
                <div className="products-nav">
                    <h2>Products</h2>

                    <div className="product-steps">
                        {PRODUCTS.map((item, index) => (
                            <div
                                key={item.id}
                                className={`product-step ${active.id === item.id ? "active" : ""
                                    }`}
                                onClick={() => setActive(item)}
                            >
                                <span className="step-index">{index + 1}</span>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>{item.tagline}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="products-content">
                    <div className="product-preview">
                        <img src={active.image} alt={active.title} />
                    </div>

                    <div className="product-details">
                        <h3>{active.title}</h3>
                        <p>{active.description}</p>

                        <ul>
                            {active.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>

                        <div className="product-actions">
                            <a className="hero-cta-primary" href="#contact">Get a Demo</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
