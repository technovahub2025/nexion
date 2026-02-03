import { useState } from "react";
import "./app.css";
import preview1 from "./assets/usecase-inbound.jpeg";
import preview2 from "./assets/usecase-outbound.jpeg";
import preview3 from "./assets/usecase-ivr.jpeg";
import preview4 from "./assets/usecase-analytics.jpeg";

const USE_CASES = [
  {
    id: 1,
    title: "Inbound Call Automation",
    description:
      "AI answers incoming calls instantly, routes customers using IVR or voice input, and resolves common queries without agent intervention.",
    points: [
      "24×7 AI call answering",
      "Smart IVR & voice routing",
      "Automatic agent escalation",
    ],
    image: preview1,
  },
  {
    id: 2,
    title: "Outbound Voice Campaigns",
    description:
      "Launch bulk automated voice calls with one click. Perfect for reminders, alerts, promotions, and announcements.",
    points: [
      "Bulk voice broadcasts",
      "Custom AI voices",
      "Live delivery tracking",
    ],
    image: preview2,
  },
  {
    id: 3,
    title: "AI Voice Bot Conversations",
    description:
      "Replace rigid menus with natural voice conversations. Customers speak freely and AI responds intelligently.",
    points: [
      "Speech-based input",
      "Intent detection",
      "Dynamic AI responses",
    ],
    image: preview3,
  },
  {
    id: 4,
    title: "Call Analytics & Insights",
    description:
      "Track every call in real time. Measure engagement, success rates, and call duration from a single dashboard.",
    points: [
      "Real-time analytics",
      "IVR routing breakdown",
      "Performance insights",
    ],
    image: preview4,
  },
];



export const UseCases = () => {
  const [active, setActive] = useState(USE_CASES[0]);
  const [zoomImage, setZoomImage] = useState(null);

  return (
    <section className="usecases-section" id="usecases">
      <div className="usecases-container">
        {/* LEFT */}
        <div className="usecases-left">
          <h2>Voice Automation in Action</h2>
          <p className="subtitle">
            See how businesses use <strong>Nexion</strong> to automate calls,
            engage customers, and scale effortlessly.
          </p>

          <div className="usecase-list">
            {USE_CASES.map((item) => (
              <div
                key={item.id}
                className={`usecase-item ${active.id === item.id ? "active" : ""
                  }`}
                onClick={() => setActive(item)}
              >
                <h4>{item.title}</h4>
                <p>{item.description}</p>

                <ul>
                  {item.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="usecases-right">
          <div className="preview-frame">
            <img
              src={active.image}
              alt={active.title}
              onClick={() => setZoomImage(active.image)}
              className="preview-image"/>
          </div>
        </div>
        {zoomImage && (
          <div className="image-modal" onClick={() => setZoomImage(null)}>
            <img src={zoomImage} alt="Preview zoom" />
          </div>
        )}

      </div>
    </section>
  );
};
