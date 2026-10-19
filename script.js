/**
 * MAIN INTERACTION & PORTFOLIO CONTROLLER
 * Abdulbasit Abubakar | Experthub Agency
 */

document.addEventListener("DOMContentLoaded", () => {
  initDynamicYear();
  initMobileNavigation();
  initPortfolioSystem();
  initServicePreselection();
  initFormHandler("audit-form", "audit-submit-btn", "audit-form-status");
  initFormHandler("contact-form", "contact-submit-btn", "contact-form-status");
});

/* ==========================================================================
   1. DYNAMIC FOOTER YEAR
   ========================================================================== */
function initDynamicYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   2. ACCESSIBLE MOBILE NAVIGATION
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById("mobile-nav-toggle");
  const primaryNav = document.getElementById("primary-navigation");
  if (!toggleBtn || !primaryNav) return;

  const navLinks = primaryNav.querySelectorAll("a");

  function closeMenu() {
    toggleBtn.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  }

  function toggleMenu() {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    primaryNav.classList.toggle("is-open", !isExpanded);
  }

  toggleBtn.addEventListener("click", toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && primaryNav.classList.contains("is-open")) {
      closeMenu();
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   3. PORTFOLIO RENDERING & CATEGORY FILTERING
   ========================================================================== */
function initPortfolioSystem() {
  const featuredContainer = document.getElementById("featured-projects-grid");
  const completeContainer = document.getElementById("complete-portfolio-grid");
  const filtersContainer = document.getElementById("portfolio-filters");
  const countMeta = document.getElementById("portfolio-count");

  if (!Array.isArray(PORTFOLIO_PROJECTS)) return;

  // Render Featured Projects
  if (featuredContainer) {
    const featuredProjects = PORTFOLIO_PROJECTS.filter((p) => p.featured);
    featuredContainer.innerHTML = featuredProjects
      .map((project, index) => createProjectCardHTML(project, index + 1, true))
      .join("");
    attachImageFallbacks(featuredContainer);
  }

  // Render Category Filter Buttons
  let activeCategory = "All Projects";

  function renderFilterButtons() {
    if (!filtersContainer || !Array.isArray(PORTFOLIO_CATEGORIES)) return;

    filtersContainer.innerHTML = PORTFOLIO_CATEGORIES.map((category) => {
      const isActive = category === activeCategory;
      return `
        <button 
          type="button" 
          class="filter-btn ${isActive ? "active" : ""}" 
          role="tab" 
          aria-selected="${isActive}"
          data-category="${escapeHTML(category)}"
        >
          ${escapeHTML(category)}
        </button>
      `;
    }).join("");

    filtersContainer.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedCategory = btn.getAttribute("data-category");
        if (selectedCategory && selectedCategory !== activeCategory) {
          activeCategory = selectedCategory;
          renderFilterButtons();
          renderCompletePortfolio();
        }
      });
    });
  }

  function renderCompletePortfolio() {
    if (!completeContainer) return;

    const filtered =
      activeCategory === "All Projects"
        ? PORTFOLIO_PROJECTS
        : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

    if (countMeta) {
      countMeta.textContent = `Showing ${filtered.length} of ${PORTFOLIO_PROJECTS.length} projects (${activeCategory})`;
    }

    if (filtered.length === 0) {
      completeContainer.innerHTML = `
        <div class="empty-portfolio-state">
          <p>No projects currently listed under "${escapeHTML(activeCategory)}".</p>
        </div>
      `;
      return;
    }

    completeContainer.innerHTML = filtered
      .map((project, idx) => createProjectCardHTML(project, idx + 1, false))
      .join("");

    attachImageFallbacks(completeContainer);
  }

  renderFilterButtons();
  renderCompletePortfolio();
}

/**
 * Generates semantic HTML for a single project card.
 * Handles missing screenshots gracefully with an architectural placeholder.
 * Handles missing liveUrl gracefully without broken links.
 */
function createProjectCardHTML(project, indexNumber, isFeatured) {
  const paddedIndex = String(indexNumber).padStart(2, "0");
  const initials = getProjectInitials(project.name);
  const hasImage = Boolean(project.image && project.image.trim() !== "");
  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim() !== "");

  const placeholderMarkup = `
    <div class="project-placeholder">
      <div class="placeholder-top">
        <span class="placeholder-category-tag">${escapeHTML(project.category)}</span>
        <span>PRJ // ${paddedIndex}</span>
      </div>
      <div class="placeholder-center">
        <span class="placeholder-monogram" aria-hidden="true">${escapeHTML(initials)}</span>
        <span class="placeholder-title">${escapeHTML(project.name)}</span>
      </div>
      <div class="placeholder-bottom">
        <span>${escapeHTML(project.projectType)}</span>
        <span>EXPERTHUB ARCHIVE</span>
      </div>
    </div>
  `;

  const previewMediaMarkup = hasImage
    ? `<img 
         src="${escapeHTML(project.image)}" 
         alt="${escapeHTML(project.name)} project preview" 
         class="project-img" 
         loading="${isFeatured ? "eager" : "lazy"}"
         data-fallback-name="${escapeHTML(project.name)}"
         data-fallback-category="${escapeHTML(project.category)}"
         data-fallback-type="${escapeHTML(project.projectType)}"
         data-fallback-index="${paddedIndex}"
       >`
    : placeholderMarkup;

  const techTagsMarkup =
    Array.isArray(project.technologies) && project.technologies.length > 0
      ? `<div class="project-tech-list" aria-label="Technologies and focus areas">
           ${project.technologies
             .map((t) => `<span class="tech-tag">${escapeHTML(t)}</span>`)
             .join("")}
         </div>`
      : "";

  const actionButtonMarkup = hasLiveUrl
    ? `<a 
         href="${escapeHTML(project.liveUrl)}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="btn btn-secondary btn-sm project-link-btn"
         aria-label="View live project: ${escapeHTML(project.name)} (opens in a new tab)"
       >
         <span>View Project</span>
         <svg class="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
           <path d="M7 17L17 7M7 7h10v10"/>
         </svg>
       </a>`
    : `<span class="project-link-disabled" aria-disabled="true">
         Live Preview Link Pending
       </span>`;

  return `
    <article class="project-card">
      <div class="project-preview">
        ${previewMediaMarkup}
      </div>
      <div class="project-body">
        <div>
          <div class="project-meta-row">
            <span class="badge-category">${escapeHTML(project.category)}</span>
            <span class="badge-type">${escapeHTML(project.projectType)}</span>
          </div>
          <h3 class="project-title">${escapeHTML(project.name)}</h3>
          <p class="project-description">${escapeHTML(project.description)}</p>
          ${techTagsMarkup}
        </div>
        <div class="project-footer">
          ${actionButtonMarkup}
        </div>
      </div>
    </article>
  `;
}

function attachImageFallbacks(container) {
  const images = container.querySelectorAll("img.project-img");
  images.forEach((img) => {
    img.addEventListener("error", () => {
      const name = img.getAttribute("data-fallback-name") || "Project";
      const category = img.getAttribute("data-fallback-category") || "Portfolio";
      const type = img.getAttribute("data-fallback-type") || "Concept";
      const idx = img.getAttribute("data-fallback-index") || "01";
      const initials = getProjectInitials(name);

      const wrapper = img.parentElement;
      if (wrapper) {
        wrapper.innerHTML = `
          <div class="project-placeholder">
            <div class="placeholder-top">
              <span class="placeholder-category-tag">${escapeHTML(category)}</span>
              <span>PRJ // ${escapeHTML(idx)}</span>
            </div>
            <div class="placeholder-center">
              <span class="placeholder-monogram" aria-hidden="true">${escapeHTML(initials)}</span>
              <span class="placeholder-title">${escapeHTML(name)}</span>
            </div>
            <div class="placeholder-bottom">
              <span>${escapeHTML(type)}</span>
              <span>EXPERTHUB ARCHIVE</span>
            </div>
          </div>
        `;
      }
    });
  });
}

function getProjectInitials(name) {
  if (!name) return "EH";
  const words = name.replace(/[^a-zA-Z0-9\s]/g, "").trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

function escapeHTML(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================================================
   4. SERVICE CTA -> CONTACT FORM PRESELECTION
   ========================================================================== */
function initServicePreselection() {
  const serviceLinks = document.querySelectorAll(".service-cta[data-service]");
  const serviceSelect = document.getElementById("contact-service");

  serviceLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetService = link.getAttribute("data-service");
      if (targetService && targetService !== "Website Audits" && serviceSelect) {
        serviceSelect.value = targetService;
      }
    });
  });
}

/* ==========================================================================
   5. FORMSPREE SUBMISSION & VALIDATION HANDLER
   ========================================================================== */
function initFormHandler(formId, submitBtnId, statusContainerId) {
  const form = document.getElementById(formId);
  const submitBtn = document.getElementById(submitBtnId);
  const statusContainer = document.getElementById(statusContainerId);

  if (!form || !submitBtn || !statusContainer) return;

  // Clear field errors on input
  const inputs = form.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
      const errorSpan = document.getElementById(`${input.id}-error`);
      if (errorSpan) errorSpan.textContent = "";
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusContainer.className = "form-status";
    statusContainer.textContent = "";

    const isValid = validateFormFields(form);
    if (!isValid) return;

    const btnTextEl = submitBtn.querySelector(".btn-text");
    const originalBtnText = btnTextEl ? btnTextEl.textContent : "Submit";

    // Set Loading State
    submitBtn.classList.add("is-loading");
    submitBtn.disabled = true;
    if (btnTextEl) btnTextEl.textContent = "Submitting...";

    try {
      const formData = new FormData(form);

      // Normalize URL field if present so user entries like "mystore.com" become valid URLs
      if (formData.has("website_url")) {
        const rawUrl = String(formData.get("website_url") || "").trim();
        if (rawUrl && !/^https?:\/\//i.test(rawUrl)) {
          formData.set("website_url", `https://${rawUrl}`);
        }
      }

      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        statusContainer.classList.add("status-success");

        if (formId === "audit-form") {
          statusContainer.textContent =
            "Your website audit request has been received. Abdulbasit Abubakar will manually inspect your website and follow up via email.";
        } else {
          statusContainer.textContent =
            "Thank you! Your project inquiry has been submitted. I will review your details and get back to you shortly.";
        }
      } else {
        const data = await response.json().catch(() => ({}));
        const errorMsg =
          data && Array.isArray(data.errors)
            ? data.errors.map((err) => err.message).join(", ")
            : "There was an issue submitting your form. Please check your entries or reach out directly via WhatsApp.";
        statusContainer.classList.add("status-error");
        statusContainer.textContent = errorMsg;
      }
    } catch (error) {
      statusContainer.classList.add("status-error");
      statusContainer.textContent =
        "Network error while submitting the form. Please check your internet connection or message me directly on WhatsApp.";
    } finally {
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
      if (btnTextEl) btnTextEl.textContent = originalBtnText;
    }
  });
}

function validateFormFields(form) {
  let isFormValid = true;
  let firstInvalidControl = null;

  const requiredFields = form.querySelectorAll("[required]");

  requiredFields.forEach((field) => {
    const errorSpan = document.getElementById(`${field.id}-error`);
    const value = String(field.value || "").trim();
    let errorMessage = "";

    if (!value) {
      errorMessage = "This field is required.";
    } else if (field.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorMessage = "Please enter a valid email address.";
      }
    } else if (field.name === "website_url") {
      const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;
      try {
        const parsed = new URL(normalized);
        if (!parsed.hostname || !parsed.hostname.includes(".")) {
          errorMessage = "Please enter a valid website URL (e.g., https://yourstore.com).";
        }
      } catch {
        errorMessage = "Please enter a valid website URL (e.g., https://yourstore.com).";
      }
    }

    if (errorMessage) {
      isFormValid = false;
      field.classList.add("is-invalid");
      if (errorSpan) errorSpan.textContent = errorMessage;
      if (!firstInvalidControl) firstInvalidControl = field;
    } else {
      field.classList.remove("is-invalid");
      if (errorSpan) errorSpan.textContent = "";
    }
  });

  if (firstInvalidControl) {
    firstInvalidControl.focus();
  }

  return isFormValid;
}
