import { useEffect, useMemo, useState } from "react";
import "./App.css";

const getStoredToken = () => {
  const tokenKey = import.meta.env.VITE_TOKEN_KEY || "authToken";
  return (
    localStorage.getItem(tokenKey) ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem(tokenKey) ||
    sessionStorage.getItem("authToken") ||
    sessionStorage.getItem("token") ||
    ""
  );
};

const persistAuthSnapshot = ({ token, user } = {}) => {
  const tokenKey = import.meta.env.VITE_TOKEN_KEY || "authToken";
  if (token) {
    localStorage.setItem(tokenKey, token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("token", token);
    sessionStorage.setItem(tokenKey, token);
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("token", token);
  }

  if (!user) return;

  const serializedUser = typeof user === "string" ? user : JSON.stringify(user);
  localStorage.setItem("user", serializedUser);
  sessionStorage.setItem("user", serializedUser);
};

const requestParentAuthSnapshot = () =>
  new Promise((resolve) => {
    if (window.top === window || !window.parent) {
      resolve(null);
      return;
    }

    let timeoutId = 0;

    const handleMessage = (event) => {
      const data = event?.data || {};
      if (data.type !== "nexion-auth-response") return;
      window.clearTimeout(timeoutId);
      window.removeEventListener("message", handleMessage);
      resolve({
        token: typeof data.token === "string" ? data.token : "",
        user: data.user || null
      });
    };

    timeoutId = window.setTimeout(() => {
      window.removeEventListener("message", handleMessage);
      resolve(null);
    }, 1200);

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "nexion-auth-request" }, "*");
  });

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user") || sessionStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
};

const syncAuthFromParent = async () => {
  const authSnapshot = await requestParentAuthSnapshot();
  if (!authSnapshot?.token) return null;
  persistAuthSnapshot(authSnapshot);
  return {
    token: getStoredToken(),
    user: getStoredUser()
  };
};

const FEATURE_LABEL_ALIASES = {
  Inbound: "Inbound Calls / IVR",
  Outbound: "Outbound Voice",
  Missed: "Missed Call",
  Email: "Email Automation"
};

const normalizePlanFeatureLabel = (label) => FEATURE_LABEL_ALIASES[String(label || "").trim()] || String(label || "").trim();

const CRM_FEATURES = [
  "CRM Home",
  "Pipeline",
  "Tasks",
  "Deals",
  "Meetings",
  "Reports",
  "Follow-up Ops",
  "Lead Scoring Settings",
  "Task Calendar"
];

const OPENING_OFFER_MODULES = [
  { label: "Meta Ads", icon: "ti ti-brand-meta", tone: "teal" },
  { label: "WhatsApp Broadcast", icon: "ti ti-brand-whatsapp", tone: "sky" },
  { label: "Lead Score / CRM Task", icon: "ti ti-users", tone: "violet" },
  { label: "Missed Calls", icon: "ti ti-phone-off", tone: "rose" },
  { label: "WhatsApp Chatbot", icon: "ti ti-brand-whatsapp", tone: "blue" },
  { label: "IVR / Inbound", icon: "ti ti-phone-incoming", tone: "amber" },
  { label: "Outbound Calls", icon: "ti ti-outbound", tone: "sky" },
  { label: "Bulk Email Automation", icon: "ti ti-mail", tone: "blue" }
];

const planCatalog = {
  monthly: [
    {
      code: "basic",
      name: "Basic",
      price: "₹3,999",
      note: "per month",
      features: ["Broadcast Dashboard", "Team Inbox", "Broadcast", "Templates", "Contacts", ...CRM_FEATURES, "Voice Broadcast", "Missed Call"],
      cta: "Upgrade to Basic"
    },
    {
      code: "growth",
      name: "Growth",
      price: "₹6,999",
      note: "per month",
      features: ["Ads Manager", "Insights", "Connect Meta", "Broadcast Dashboard", "Team Inbox", "Broadcast", "Templates", "Contacts", ...CRM_FEATURES, "Voice Broadcast", "Inbound Calls / IVR", "Call Analytics", "Missed Call", "Email Automation"],
      cta: "Upgrade to Growth"
    },
    {
      code: "enterprise",
      name: "Enterprise",
      price: "Custom",
      note: "contact sales",
      features: ["Ads Manager", "Insights", "Connect Meta", "Broadcast Dashboard", "Team Inbox", "Broadcast", "Templates", "Contacts", ...CRM_FEATURES, "Voice Broadcast", "Inbound Calls / IVR", "Outbound Voice", "Call Analytics", "Missed Call", "Email Automation"],
      cta: "Contact Sales"
    }
  ],
  yearly: [
    {
      code: "basic",
      name: "Basic",
      price: "₹47,988",
      note: "per year",
      features: ["Broadcast Dashboard", "Team Inbox", "Broadcast", "Templates", "Contacts", ...CRM_FEATURES, "Voice Broadcast", "Missed Call"],
      cta: "Upgrade to Basic"
    },
    {
      code: "growth",
      name: "Growth",
      price: "₹83,988",
      note: "per year",
      features: ["Ads Manager", "Insights", "Connect Meta", "Broadcast Dashboard", "Team Inbox", "Broadcast", "Templates", "Contacts", ...CRM_FEATURES, "Voice Broadcast", "Inbound Calls / IVR", "Call Analytics", "Missed Call", "Email Automation"],
      cta: "Upgrade to Growth"
    },
    {
      code: "enterprise",
      name: "Enterprise",
      price: "Custom",
      note: "contact sales",
      features: ["Ads Manager", "Insights", "Connect Meta", "Broadcast Dashboard", "Team Inbox", "Broadcast", "Templates", "Contacts", ...CRM_FEATURES, "Voice Broadcast", "Inbound Calls / IVR", "Outbound Voice", "Call Analytics", "Missed Call", "Email Automation"],
      cta: "Contact Sales"
    }
  ]
};

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [pricingOverrides, setPricingOverrides] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState("");

  const salesWhatsAppLink =
    "https://wa.me/919003530230?text=Hi%20Nexion%20team,%20I%20want%20to%20know%20more%20about%20the%20Enterprise%20plan.";
  const openingOfferWhatsAppLink =
    "https://wa.me/919003530230?text=Hi%20Nexion%20team,%20I%20want%20to%20claim%20the%20Opening%20Offer%20today%20only%20all%20services%20for%204999.";
  const brandLogoUrl =
    import.meta.env.VITE_BRAND_LOGO_URL ||
    "https://technovahub.in/nexion/landingpage/assets/logo(new)-U0PXgXDz.png";

  const API_URL =
    import.meta.env.VITE_API_ADMIN_URL ||
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "";

  const plans = useMemo(() => {
    const base = planCatalog[billingCycle] || planCatalog.monthly;
    if (!pricingOverrides) return base;
    return base.map((plan) => {
      const override = pricingOverrides.find((p) => p.planCode === plan.code);
      if (!override) return plan;
      const price =
        billingCycle === "yearly"
          ? override.yearlyPrice
          : override.monthlyPrice;
      return {
        ...plan,
        price:
          plan.code === "enterprise"
            ? plan.price
            : `₹${Number(price || 0).toLocaleString("en-IN")}`
      };
    });
  }, [billingCycle, pricingOverrides]);

  const displayPlans = useMemo(
    () =>
      plans.map((plan) => {
        const override = pricingOverrides?.find((item) => item.planCode === plan.code);
        return {
          ...plan,
          features:
            Array.isArray(override?.features) && override.features.length > 0
              ? override.features
              : plan.features
        };
      }),
    [plans, pricingOverrides]
  );

  useEffect(() => {
    if (!API_URL) return;
    const fetchPricing = async () => {
      try {
        const res = await fetch(`${API_URL}/api/plan-pricing`);
        if (!res.ok) return;
        const data = await res.json();
        const items = data?.data || [];
        setPricingOverrides(
          items.map((item) => ({
            planCode: String(item.planCode || "").toLowerCase(),
            monthlyPrice: Number(item.monthlyPrice || 0),
            yearlyPrice: Number(item.yearlyPrice || 0),
            features: Array.isArray(item.features) ? item.features.map((feature) => normalizePlanFeatureLabel(feature)) : []
          }))
        );
      } catch (err) {
        // fallback to defaults
      }
    };
    fetchPricing();
  }, [API_URL]);

  const handleOpeningOffer = () => {
    window.open(openingOfferWhatsAppLink, "_blank", "noopener,noreferrer");
  };

  const handleUpgrade = async (planCode) => {
    if (planCode === "enterprise") {
      window.open(salesWhatsAppLink, "_blank", "noopener,noreferrer");
      return;
    }

    let storedUser = getStoredUser();
    let token = getStoredToken();

    // Always prefer the live product-app session when pricing is embedded or opened from it.
    const parentAuth = await syncAuthFromParent();
    if (parentAuth?.token) {
      token = parentAuth.token;
      storedUser = parentAuth.user;
    }

    if (!token) {
      alert("UNAUTHORIZED LOGIN AGAIN");
      return;
    }

    if (String(storedUser?.role || "").toLowerCase() === "superadmin") {
      alert("Superadmin accounts cannot purchase plans. Please login with a user workspace account.");
      return;
    }

    if (!storedUser?.companyId) {
      alert("Workspace billing details are missing. Please login again with your user account.");
      return;
    }

    if (!API_URL) {
      alert("Billing API not configured.");
      return;
    }

    setCheckoutLoading(planCode);

    try {
      const createOrder = async (authToken) =>
        fetch(`${API_URL}/api/subscriptions/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify({ planCode, billingCycle })
        });

      let res = await createOrder(token);

      if (res.status === 403) {
        // Retry once with a freshly pulled auth snapshot so stale landing storage
        // does not block a newly registered user.
        const refreshedAuth = await syncAuthFromParent();
        if (refreshedAuth?.token) {
          token = refreshedAuth.token;
          storedUser = refreshedAuth.user;
          res = await createOrder(token);
        }
      }

      if (res.status === 401) {
        throw new Error("UNAUTHORIZED LOGIN AGAIN");
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || errData?.error || "Unable to start checkout.");
      }

      const data = await res.json();
      const payload = data?.data || data || {};
      const orderId = payload.order_id || payload.orderId || payload?.order?.id;
      const amount = payload.amount || payload?.order?.amount;
      const currency = payload.currency || payload?.order?.currency || "INR";
      const key = payload.key || import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!orderId || !amount || !key) {
        throw new Error("Invalid Razorpay order details.");
      }

      const ready = await loadRazorpay();
      if (!ready) {
        throw new Error("Razorpay failed to load.");
      }

      const companyId =
        storedUser?.companyId || storedUser?.company?._id || storedUser?.company || "";
      const companyName =
        storedUser?.companyName ||
        storedUser?.company?.name ||
        storedUser?.username ||
        storedUser?.email ||
        "your workspace";

      const razorpay = new window.Razorpay({
        key,
        amount,
        currency,
        order_id: orderId,
        name: "Nexion",
        image: brandLogoUrl,
        description: `${planCode.charAt(0).toUpperCase()}${planCode.slice(1)} ${billingCycle} plan`,
        theme: { color: "#2563eb" },
        prefill: {
          name: storedUser?.username || storedUser?.name || "",
          email: storedUser?.email || "",
          contact:
            storedUser?.phoneNumber ||
            storedUser?.phonenumber ||
            storedUser?.mobile ||
            storedUser?.contact ||
            ""
        },
        notes: {
          companyId: String(companyId || ""),
          companyName: String(companyName || ""),
          billingCycle: String(billingCycle || "monthly"),
          planCode: String(planCode || "")
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_URL}/api/payments/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(response)
            });

            const verifyData = await verifyRes.json().catch(() => ({}));
            if (!verifyRes.ok) {
              throw new Error(verifyData?.message || "Payment verification failed.");
            }

            const currentUser = getStoredUser() || {};
            const nextContext = verifyData?.data?.context || {};
            persistAuthSnapshot({
              token,
              user: {
                ...currentUser,
                companyId: currentUser?.companyId || companyId || "",
                companyName: currentUser?.companyName || companyName,
                planCode: nextContext.planCode || planCode,
                featureFlags: nextContext.featureFlags || currentUser?.featureFlags || {},
                subscriptionStatus: nextContext.subscriptionStatus || "active",
                documentStatus: nextContext.documentStatus || currentUser?.documentStatus || "pending",
                workspaceAccessState: nextContext.workspaceAccessState || currentUser?.workspaceAccessState || "paid_pending_documents",
                canPerformActions: nextContext.canPerformActions ?? currentUser?.canPerformActions ?? false,
                canViewAnalytics: nextContext.canViewAnalytics ?? currentUser?.canViewAnalytics ?? true,
                trialStart: nextContext.trialStart || currentUser?.trialStart || null,
                trialEnd: nextContext.trialEnd || currentUser?.trialEnd || null,
                trialUsage: nextContext.trialUsage || currentUser?.trialUsage || null,
                trialLimits: nextContext.trialLimits || currentUser?.trialLimits || null
              }
            });

            if (window.top !== window.self && window.parent) {
              window.parent.postMessage(
                {
                  type: "nexion-payment-verified",
                  context: nextContext
                },
                "*"
              );
              return;
            }

            alert("Payment successful. Your plan is now active.");
            window.location.href = import.meta.env.VITE_PRODUCT_APP_URL || "/";
          } catch (verifyError) {
            alert(verifyError?.message || "Payment verification failed.");
          }
        },
        config: {
          display: {
            language: "en"
          }
        }
      });

      razorpay.open();
    } catch (err) {
      alert(err?.message || "Unable to open Razorpay.");
    } finally {
      setCheckoutLoading("");
    }
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <h2 className="pricing-title">Commercial Plans</h2>
        <p className="pricing-subtitle">
          Choose a plan that fits your business. Scale anytime with Nexion.
        </p>

        <div className="pricing-toggle" role="group" aria-label="Billing cycle">
          <button
            className={`pricing-toggle-btn ${billingCycle === "monthly" ? "active" : ""}`}
            onClick={() => setBillingCycle("monthly")}
            type="button"
          >
            Monthly
          </button>
          <button
            className={`pricing-toggle-btn ${billingCycle === "yearly" ? "active" : ""}`}
            onClick={() => setBillingCycle("yearly")}
            type="button"
          >
            Yearly
            <span className="pricing-save-badge">Save 15%</span>
          </button>
        </div>

        {billingCycle === "monthly" && (
          <div className="pricing-promo-card">
          <div className="pricing-promo-topbar">
            <span className="pricing-promo-badge">Opening Offer</span>
            <span className="pricing-promo-toptext">Limited time launch deal</span>
          </div>

          <div className="pricing-promo-body">
            <div className="pricing-promo-left">
              <p className="pricing-promo-kicker">Full Access</p>
              <div className="pricing-promo-price">
                <span className="pricing-promo-currency">₹</span>
                <span className="pricing-promo-amount">4,999</span>
                <span className="pricing-promo-period">/mo</span>
              </div>
              <p className="pricing-promo-copy">
                Everything you need in one powerful bundle. Priority setup and faster onboarding included.
              </p>
              <div className="pricing-promo-chip">
                <span className="pricing-promo-chip-dot" />
                All modules included
              </div>
            </div>

            <div className="pricing-promo-right">
              <p className="pricing-promo-righttitle">Included Modules</p>
              <div className="pricing-promo-grid">
                {OPENING_OFFER_MODULES.map((feature) => (
                  <div
                    className={`pricing-promo-item ${feature.span ? "span-2" : ""}`}
                    key={feature.label}
                  >
                    <span className={`pricing-promo-icon ${feature.tone}`}>
                      <i className={feature.icon} aria-hidden="true" />
                    </span>
                    <span className="pricing-promo-itemlabel">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pricing-promo-sep" />

          <div className="pricing-promo-footer">
            <button type="button" className="pricing-promo-btn" onClick={handleOpeningOffer}>
              Claim Opening Offer →
            </button>
            <p className="pricing-promo-foot">
              <span>Priority setup.</span> Faster onboarding. <span>One powerful bundle.</span>
            </p>
          </div>
          </div>
        )}

        <div className="pricing-grid">
          {displayPlans.map((plan) => (
            <div
              className={`pricing-card ${plan.code === "growth" ? "featured" : ""}`}
              key={`${billingCycle}-${plan.code}`}
            >
              {plan.code === "growth" && <span className="badge">Most Popular</span>}
              <h3>{plan.name}</h3>
              <p className={`price ${plan.code === "enterprise" ? "custom" : ""}`}>
                {plan.price}
                <span>{billingCycle === "monthly" ? "/mo" : "/yr"}</span>
              </p>
              <div className="pricing-note">{plan.note}</div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                className={plan.code === "growth" ? "btn-primary" : "btn-outline"}
                onClick={() => handleUpgrade(plan.code)}
                disabled={checkoutLoading === plan.code}
              >
                {checkoutLoading === plan.code ? "Opening..." : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
