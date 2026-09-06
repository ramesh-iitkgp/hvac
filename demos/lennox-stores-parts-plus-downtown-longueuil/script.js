// WebKartX HVAC Style 2 (ThermoPro Apex) Dynamic Engine
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("data/business.json");
    if (!res.ok) throw new Error("Could not load business.json");
    const data = await res.json();
    renderBusinessDataV2(data);
  } catch (err) {
    console.warn("Using default HVAC Style 2 data:", err);
  }

  // Initialize Interactive Estimate Calculator
  initEstimateCalculator();

  // Handle Demo Form Submission
  const demoForm = document.getElementById("hvac-quote-form-v2");
  if (demoForm) {
    demoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const modal = document.getElementById("demo-modal-v2");
      if (modal) {
        modal.style.display = "flex";
      } else {
        alert("Demo Inquiry Submitted! In your live production website, inquiries are automatically routed to your business inbox.");
      }
      demoForm.reset();
    });
  }
});

function renderBusinessDataV2(data) {
  if (!data) return;

  const bName = data.business_name || data.canonical_name || "Apex Air Solutions";
  const city = data.city || "Dallas";
  const phone = (data.phone || data.whatsapp || "").trim();
  const cleanPhone = phone.replace(/\D/g, "");
  const email = (data.email || "").trim();
  const address = data.address || `${city}, TX`;
  const hours = data.opening_hours || "Mon - Sat: 8:00 AM - 6:00 PM | Direct Inquiries & Service";

  // Document Title
  document.title = `${bName} | Precision Climate & HVAC Solutions in ${city}`;

  // Brand Name
  document.querySelectorAll(".brand-name-text").forEach((el) => (el.textContent = bName));

  // Tagline & Hero Description
  const taglineEl = document.getElementById("hero-title-v2");
  if (taglineEl) {
    taglineEl.textContent = data.tagline
      ? data.tagline
      : `Precision Climate Engineering & HVAC Solutions in ${city.toUpperCase()}`;
  }

  const heroDescEl = document.getElementById("hero-desc-v2");
  if (heroDescEl) {
    heroDescEl.textContent = `High-efficiency heating, precision cooling diagnostics, and custom HVAC engineering for residential and commercial properties in ${city} and surrounding areas.`;
  }

  // City Elements
  document.querySelectorAll(".dynamic-city").forEach((el) => (el.textContent = city));

  // Mobile Bottom WhatsApp Link
  const mobWa = document.getElementById("mobile-wa-bottom-btn");
  if (mobWa) {
    if (cleanPhone && cleanPhone.length >= 7) {
      const waMsg = "Hi " + bName + "! 👋 I came across your HVAC services in " + city + " and would like to request an estimate.";
      mobWa.href = "https://wa.me/" + cleanPhone + "?text=" + encodeURIComponent(waMsg);
    } else {
      mobWa.href = "#quote-v2";
    }
  }

  // Phone Binding
  if (phone && cleanPhone.length >= 7) {
    document.querySelectorAll(".dynamic-phone-text").forEach((el) => (el.textContent = phone));
    document.querySelectorAll(".dynamic-phone-link").forEach((el) => {
      el.href = `tel:${cleanPhone}`;
    });
    document.querySelectorAll(".dynamic-call-btn-text").forEach((el) => {
      el.textContent = `Call ${phone}`;
    });
  } else {
    document.querySelectorAll(".dynamic-phone-text").forEach((el) => (el.textContent = "Direct Inquiries Online"));
    document.querySelectorAll(".dynamic-phone-link").forEach((el) => {
      el.href = "#quote-v2";
    });
    document.querySelectorAll(".dynamic-call-btn-text").forEach((el) => {
      el.textContent = "Request a Quote";
    });
  }

  // Email Binding
  const emailLinkEl = document.getElementById("footer-email-link-v2");
  const emailTextEl = document.getElementById("footer-email-text-v2");
  if (email) {
    if (emailTextEl) emailTextEl.textContent = email;
    if (emailLinkEl) emailLinkEl.href = `mailto:${email}`;
  } else if (emailTextEl && emailLinkEl) {
    emailTextEl.textContent = "Inquire via Online Form";
    emailLinkEl.href = "#quote-v2";
  }

  // Address & Hours
  const addrEl = document.getElementById("footer-address-v2");
  if (addrEl) addrEl.textContent = address;

  const hoursEl = document.getElementById("footer-hours-v2");
  if (hoursEl) hoursEl.textContent = hours;

  // Stats / Value Badges
  if (data.stats) {
    if (data.stats.feature_1_title && document.getElementById("stat-title-1")) {
      document.getElementById("stat-title-1").textContent = data.stats.feature_1_title;
    }
    if (data.stats.feature_1_desc && document.getElementById("stat-desc-1")) {
      document.getElementById("stat-desc-1").textContent = data.stats.feature_1_desc;
    }
    if (data.stats.feature_2_title && document.getElementById("stat-title-2")) {
      document.getElementById("stat-title-2").textContent = data.stats.feature_2_title;
    }
    if (data.stats.feature_2_desc && document.getElementById("stat-desc-2")) {
      document.getElementById("stat-desc-2").textContent = data.stats.feature_2_desc;
    }
    if (data.stats.feature_3_title && document.getElementById("stat-title-3")) {
      document.getElementById("stat-title-3").textContent = data.stats.feature_3_title;
    }
    if (data.stats.feature_3_desc && document.getElementById("stat-desc-3")) {
      document.getElementById("stat-desc-3").textContent = data.stats.feature_3_desc;
    }
    if (data.stats.feature_4_title && document.getElementById("stat-title-4")) {
      document.getElementById("stat-title-4").textContent = data.stats.feature_4_title;
    }
    if (data.stats.feature_4_desc && document.getElementById("stat-desc-4")) {
      document.getElementById("stat-desc-4").textContent = data.stats.feature_4_desc;
    }
  }

  // Services Grid
  if (data.services && data.services.length > 0) {
    const servicesContainer = document.getElementById("services-v2-container");
    if (servicesContainer) {
      servicesContainer.innerHTML = "";
      data.services.forEach((s) => {
        const card = document.createElement("div");
        card.className = "service-v2-card";
        const imgUrl = s.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80";
        const badge = s.badge || "Certified Service";
        const desc = s.description || "Precision HVAC engineering and diagnostic support for reliable indoor comfort.";
        const ctaHref = (phone && cleanPhone.length >= 7) ? `tel:${cleanPhone}` : "#quote-v2";
        const ctaText = (phone && cleanPhone.length >= 7) ? "Call for Service" : "Request Service";

        card.innerHTML = `
          <div class="card-img-wrapper">
            <img src="${imgUrl}" alt="${s.name}" loading="lazy">
            <span class="card-badge-floating">${badge}</span>
          </div>
          <div class="service-v2-body">
            <h3>${s.name}</h3>
            <p>${desc}</p>
            <a href="${ctaHref}" class="btn-v2 btn-glow-cyan" style="align-self: flex-start; padding: 8px 18px; font-size: 0.85rem;">
              ${ctaText}
            </a>
          </div>
        `;
        servicesContainer.appendChild(card);
      });
    }
  }

  // Service Areas Tags
  const areasContainer = document.getElementById("areas-v2-container");
  if (areasContainer) {
    areasContainer.innerHTML = "";
    if (data.service_areas && data.service_areas.length > 0 && !(data.service_areas.length === 1 && data.service_areas[0] === city)) {
      data.service_areas.forEach((area) => {
        const tag = document.createElement("div");
        tag.className = "area-tag-v2";
        tag.textContent = area;
        areasContainer.appendChild(tag);
      });
    } else {
      const defaultAreas = [
        `${city}`,
        `${city} Metro Area`,
        `Greater ${city} Region`,
        "Surrounding Communities",
        "Regional Service Hub",
        "Direct Dispatch Zone"
      ];
      defaultAreas.forEach((area) => {
        const tag = document.createElement("div");
        tag.className = "area-tag-v2";
        tag.textContent = area;
        areasContainer.appendChild(tag);
      });
    }
  }

  // Reviews
  if (data.reviews && data.reviews.length > 0) {
    const reviewsContainer = document.getElementById("reviews-v2-container");
    if (reviewsContainer) {
      reviewsContainer.innerHTML = "";
      data.reviews.forEach((r) => {
        const card = document.createElement("div");
        card.className = "review-v2-card";
        const avatar = r.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
        card.innerHTML = `
          <div>
            <div class="review-stars">★★★★★</div>
            <div class="review-quote">"${r.text}"</div>
          </div>
          <div class="client-meta">
            <img src="${avatar}" alt="${r.author}" class="client-avatar" loading="lazy">
            <div>
              <div style="font-weight: 700; font-size: 0.95rem; color: #fff;">${r.author}</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">${r.role || "Verified Customer Review"}</div>
            </div>
          </div>
        `;
        reviewsContainer.appendChild(card);
      });
    }
  }
}

// Interactive Ballpark Estimate Calculator
function initEstimateCalculator() {
  const serviceSelect = document.getElementById("calc-service-type");
  const sizeSelect = document.getElementById("calc-property-size");
  const priceDisplay = document.getElementById("calc-price-val");

  if (!serviceSelect || !sizeSelect || !priceDisplay) return;

  function calculate() {
    const service = serviceSelect.value;
    const size = sizeSelect.value;

    let baseRange = "$89 – $189";
    if (service === "tuneup") {
      baseRange = size === "large" ? "$129 – $219" : "$89 – $159";
    } else if (service === "repair") {
      baseRange = size === "large" ? "$240 – $580" : "$160 – $420";
    } else if (service === "install") {
      baseRange = size === "large" ? "$5,800 – $9,200" : "$3,800 – $6,400";
    } else if (service === "ductless") {
      baseRange = size === "large" ? "$3,200 – $5,400" : "$1,900 – $3,200";
    }

    priceDisplay.textContent = baseRange;
  }

  serviceSelect.addEventListener("change", calculate);
  sizeSelect.addEventListener("change", calculate);
}


// Mobile Bottom Nav Active Tab Handler
document.addEventListener("DOMContentLoaded", () => {
  const mobileTabs = document.querySelectorAll(".mobile-app-tab[data-tab]");
  if (mobileTabs.length) {
    mobileTabs.forEach(tab => {
      tab.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            mobileTabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
          }
        }
      });
    });

    const navSections = ["overview", "services", "calculator", "reviews"];
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + 200;
      for (let i = navSections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(navSections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          mobileTabs.forEach(t => {
            if (t.getAttribute("data-tab") === navSections[i]) {
              t.classList.add("active");
            } else {
              t.classList.remove("active");
            }
          });
          break;
        }
      }
    }, { passive: true });
  }
});
