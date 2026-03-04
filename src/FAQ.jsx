import { useState } from "react";
import "./App.css";

const FAQ_ITEMS = [
  {
    question: "How quickly can we go live with Nexion?",
    answer:
      "Most teams go live in 3 to 7 business days. We help with flow setup, testing, and launch so your automation starts fast.",
  },
  {
    question: "Can Nexion integrate with our CRM or existing tools?",
    answer:
      "Yes. Nexion supports API-based integrations and can connect with common CRM, ticketing, and workflow systems for unified operations.",
  },
  {
    question: "Do you support both inbound and outbound automation?",
    answer:
      "Yes. You can run inbound IVR and AI voice bots, plus outbound campaigns for reminders, follow-ups, and announcements.",
  },
  {
    question: "Is this suitable for high call volumes?",
    answer:
      "Yes. Nexion is built to scale and handle high concurrent interactions with performance monitoring and analytics.",
  },
  {
    question: "What kind of support do we get after onboarding?",
    answer:
      "Support depends on your plan. Growth and Enterprise include faster response times, and Enterprise includes priority assistance.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>
            Everything you need to know before getting started with Nexion.
          </p>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={item.question}
                className={`faq-item ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon">{isOpen ? "−" : "+"}</span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer"
                  style={{ maxHeight: isOpen ? "220px" : "0px" }}
                >
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
