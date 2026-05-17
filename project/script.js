const {
  SITE_CONFIG,
  PROBLEM_ITEMS,
  PROCESS_STEPS,
  COST_ITEMS,
  PROJECTS,
  TRUST_ITEMS,
  SCENARIO_ITEMS,
  REVIEWS,
  FAQ_ITEMS,
  QUIZ_STEPS,
} = window;

const quizState = {
  source: "site",
  currentStep: 0,
  answers: {},
  selectedProject: "",
};

const ICONS = {
  calculator: `
    <rect x="5.25" y="3.75" width="13.5" height="16.5" rx="2" />
    <path d="M8.25 8h7.5" />
    <path d="M8.5 12h.01" />
    <path d="M12 12h.01" />
    <path d="M15.5 12h.01" />
    <path d="M8.5 15.5h.01" />
    <path d="M12 15.5h.01" />
    <path d="M15.5 15.5h.01" />
  `,
  calendar: `
    <path d="M6.25 5.5h11.5A2.25 2.25 0 0 1 20 7.75v10A2.25 2.25 0 0 1 17.75 20H6.25A2.25 2.25 0 0 1 4 17.75v-10A2.25 2.25 0 0 1 6.25 5.5Z" />
    <path d="M8 3.75v3.5" />
    <path d="M16 3.75v3.5" />
    <path d="M4 9.5h16" />
    <path d="M8 13.25h4" />
    <path d="M8 16.25h7" />
  `,
  eye: `
    <path d="M4 12s2.75-5.25 8-5.25S20 12 20 12s-2.75 5.25-8 5.25S4 12 4 12Z" />
    <circle cx="12" cy="12" r="2.25" />
  `,
  layers: `
    <path d="m12 4.5 8 4-8 4-8-4z" />
    <path d="m5.75 12 6.25 3.1 6.25-3.1" />
    <path d="m5.75 15.5 6.25 3.1 6.25-3.1" />
  `,
  contract: `
    <path d="M7 3.75h7l3 3v13.5H7z" />
    <path d="M14 3.75v3h3" />
    <path d="M9.75 12.25h3.75" />
    <path d="M9.75 15.25h2.25" />
    <path d="m13.25 17 1.25 1.25 2.5-3" />
  `,
  document: `
    <path d="M7 3.75h7l3 3v13.5H7z" />
    <path d="M14 3.75v3h3" />
    <path d="M9.75 11h4.5" />
    <path d="M9.75 14h4.5" />
    <path d="M9.75 17h3" />
  `,
  wallet: `
    <path d="M4.5 7.5h13.75a1.75 1.75 0 0 1 1.75 1.75v7.5a1.75 1.75 0 0 1-1.75 1.75H5.75A1.75 1.75 0 0 1 4 16.75v-8.5A1.75 1.75 0 0 1 5.75 6.5h10.5" />
    <path d="M17 12h3v3h-3a1.5 1.5 0 0 1 0-3Z" />
    <path d="M7.5 6.5 15 4.25" />
  `,
  camera: `
    <path d="M6.5 8.25h2l1.25-2h4.5l1.25 2h2A2.5 2.5 0 0 1 20 10.75v6A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.75v-6a2.5 2.5 0 0 1 2.5-2.5Z" />
    <circle cx="12" cy="13.5" r="3.25" />
    <path d="M17 10.75h.01" />
  `,
  brick: `
    <path d="M4 7h16v10H4z" />
    <path d="M4 12h16" />
    <path d="M9.35 7v5" />
    <path d="M14.65 12v5" />
  `,
  helmet: `
    <path d="M5 15.5h14" />
    <path d="M7 15.5v-2.25a5 5 0 0 1 10 0v2.25" />
    <path d="M10 8.75v6.75" />
    <path d="M14 8.75v6.75" />
    <path d="M6.5 17.75h11" />
  `,
  bank: `
    <path d="M4 10h16" />
    <path d="M5.25 18.75h13.5" />
    <path d="M6.5 10v8.75" />
    <path d="M10.15 10v8.75" />
    <path d="M13.85 10v8.75" />
    <path d="M17.5 10v8.75" />
    <path d="M4.75 8.25 12 4.25l7.25 4" />
  `,
  home: `
    <path d="M4.75 11.25 12 5l7.25 6.25" />
    <path d="M6.75 10.25v9h10.5v-9" />
    <path d="M10 19.25v-5h4v5" />
  `,
  map: `
    <path d="m5 6.75 4.75-1.5 4.5 1.5L19 5.25v12l-4.75 1.5-4.5-1.5L5 18.75z" />
    <path d="M9.75 5.25v12" />
    <path d="M14.25 6.75v12" />
  `,
};

document.addEventListener("DOMContentLoaded", () => {
  applyMeta();
  bindStaticConfig();
  renderNavigation();
  renderHeroBadges();
  renderProofStrip();
  renderProblemCards();
  renderProcessCards();
  renderPricingCards();
  renderProjectCards();
  renderTrustCards();
  renderScenarioCards();
  renderReviewCards();
  renderFaq();
  injectFaqSchema();
  setupActions();
  setupFaq();
  setupLeadForm();
  setupMobileNav();
  setupQuizShortcuts();
  setupReveal();
  setupMediaFallbacks();
});

function applyMeta() {
  const { title, description, canonical, ogImage } = SITE_CONFIG.meta;

  document.title = title;
  setMetaContent("meta-description", description);
  setMetaContent("meta-og-title", title);
  setMetaContent("meta-og-description", description);
  setMetaContent("meta-og-url", canonical);
  setMetaContent("meta-og-image", ogImage);
  setMetaContent("meta-twitter-title", title);
  setMetaContent("meta-twitter-description", description);
  setMetaContent("meta-twitter-image", ogImage);

  const canonicalLink = document.getElementById("meta-canonical");
  if (canonicalLink) {
    canonicalLink.href = canonical;
  }
}

function setMetaContent(id, value) {
  const node = document.getElementById(id);
  if (node) {
    node.setAttribute("content", value);
  }
}

function bindStaticConfig() {
  document.querySelectorAll("[data-config-text]").forEach((node) => {
    const value = getValue(node.dataset.configText);
    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-config-href]").forEach((node) => {
    const value = getValue(node.dataset.configHref);
    if (typeof value === "string") {
      node.setAttribute("href", value);
    }
  });

  document.querySelectorAll("[data-config-image]").forEach((node) => {
    const file = getValue(node.dataset.configImage);
    const alt = getValue(node.dataset.configAlt);
    if (typeof file === "string") {
      node.setAttribute("src", buildImagePath(file));
    }
    if (typeof alt === "string") {
      node.setAttribute("alt", alt);
    }
  });
}

function getValue(path) {
  return path.split(".").reduce((current, segment) => {
    if (current == null) {
      return undefined;
    }

    if (/^\d+$/.test(segment)) {
      return current[Number(segment)];
    }

    return current[segment];
  }, SITE_CONFIG);
}

function buildImagePath(file) {
  if (!file) {
    return "";
  }

  if (/^(https?:)?\/\//.test(file) || file.startsWith("/") || file.startsWith("../")) {
    return file;
  }

  return `${SITE_CONFIG.imageBasePath}${file}`;
}

function renderNavigation() {
  const navList = document.getElementById("nav-list");
  const footerNav = document.getElementById("footer-nav");
  const items = SITE_CONFIG.nav
    .map(
      (item) =>
        `<li><a href="${item.href}">${item.label}</a></li>`,
    )
    .join("");

  navList.innerHTML = items;
  footerNav.innerHTML = items;
}

function renderHeroBadges() {
  const container = document.getElementById("hero-badges");
  container.innerHTML = SITE_CONFIG.hero.badges
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderProofStrip() {
  const container = document.getElementById("proof-strip");
  container.innerHTML = SITE_CONFIG.proof
    .map(
      (item) => `
        <article class="proof-card card" data-reveal>
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </article>
      `,
    )
    .join("");
}

function renderProblemCards() {
  const container = document.getElementById("problem-grid");
  container.innerHTML = PROBLEM_ITEMS
    .map(
      (item) => `
        <article class="pain-card" data-reveal>
          <span class="pain-card__icon">${createIcon(item.icon)}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderProcessCards() {
  const container = document.getElementById("process-grid");
  container.innerHTML = PROCESS_STEPS
    .map(
      (step) => `
        <article class="timeline-card" data-reveal>
          <span class="timeline-card__number">${step.number}</span>
          <h3>${step.title}</h3>
          <p>${step.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderPricingCards() {
  const container = document.getElementById("pricing-grid");
  container.innerHTML = COST_ITEMS
    .map(
      (item) => `
        <article class="pricing-card" data-reveal>
          <span class="pricing-card__label">${item.label}</span>
          <div class="pricing-card__area">${item.area}</div>
          <div class="pricing-card__price">${item.price}</div>
          <div class="project-card__meta">${item.duration}</div>
          <p>${item.text}</p>
          <ul class="feature-list">
            ${item.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
          <button class="button button--ghost" type="button" data-action="open-quiz" data-cta-source="pricing-${item.area}">
            ${SITE_CONFIG.cta.pricing}
          </button>
        </article>
      `,
    )
    .join("");
}

function renderProjectCards() {
  const container = document.getElementById("projects-grid");
  container.innerHTML = PROJECTS
    .map(
      (project, index) => `
        <article class="project-card" data-reveal>
          ${createMediaMarkup(project.image, project.alt, "Визуал проекта")}
          <div class="project-card__topline">
            <div>
              <div class="project-card__meta">${project.area}</div>
              <h3>${project.name}</h3>
            </div>
            <div class="project-card__price">${project.price}</div>
          </div>
          <div class="project-card__meta">${project.duration}</div>
          <p>${project.description}</p>
          <ul class="feature-list">
            ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
          <div class="project-card__actions">
            <button class="button button--solid" type="button" data-action="open-project-details" data-project-index="${index}">
              ${SITE_CONFIG.cta.projectCard}
            </button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderTrustCards() {
  const container = document.getElementById("trust-grid");
  container.innerHTML = TRUST_ITEMS
    .map(
      (item) => `
        <article class="trust-item" data-reveal>
          <div class="trust-item__icon">${createIcon(item.icon)}</div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderScenarioCards() {
  const container = document.getElementById("scenarios-grid");
  container.innerHTML = SCENARIO_ITEMS
    .map(
      (item) => `
        <article class="scenario-card" data-reveal>
          <span class="scenario-card__icon">${createIcon(item.icon)}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderReviewCards() {
  const container = document.getElementById("reviews-grid");
  container.innerHTML = REVIEWS
    .map(
      (item) => `
        <article class="review-card" data-reveal>
          ${createMediaMarkup(item.image, item.alt, "Фото клиента")}
          <div class="review-card__topline">
            <div>
              <div class="review-card__name">${item.name}</div>
              <div class="review-card__role">${item.role}</div>
            </div>
          </div>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderFaq() {
  const container = document.getElementById("faq-list");
  container.innerHTML = FAQ_ITEMS
    .map(
      (item, index) => `
        <article class="faq-item" data-reveal>
          <button
            class="faq-question"
            type="button"
            aria-expanded="false"
            aria-controls="faq-panel-${index}"
            id="faq-control-${index}"
          >
            <span>${item.question}</span>
          </button>
          <div class="faq-answer" id="faq-panel-${index}" role="region" aria-labelledby="faq-control-${index}" hidden>
            <p>${item.answer}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function injectFaqSchema() {
  const schemaNode = document.getElementById("faq-schema");
  if (!schemaNode) {
    return;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  schemaNode.textContent = JSON.stringify(schema);
}

function createMediaMarkup(file, alt, label) {
  return `
    <figure class="media-shell">
      <img class="media-shell__image" src="${buildImagePath(file)}" alt="${alt}" loading="lazy" decoding="async" />
      <span class="media-shell__placeholder">${label}</span>
    </figure>
  `;
}

function createIcon(name) {
  const paths = ICONS[name];
  if (!paths) {
    return "";
  }

  return `
    <svg class="site-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      ${paths}
    </svg>
  `;
}

function setupActions() {
  document.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) {
      return;
    }

    const action = actionTarget.dataset.action;

    if (action === "open-project-details") {
      event.preventDefault();
      openProjectDetails(Number(actionTarget.dataset.projectIndex));
      return;
    }

    if (action === "close-project-details") {
      event.preventDefault();
      closeProjectDetails();
      return;
    }

    if (action === "open-project-quiz") {
      event.preventDefault();
      openProjectQuiz(Number(actionTarget.dataset.projectIndex));
      return;
    }

    if (action === "open-quiz") {
      event.preventDefault();
      openQuiz(actionTarget.dataset.ctaSource || "site");
      return;
    }

    if (action === "close-quiz") {
      event.preventDefault();
      closeQuiz();
      return;
    }

    if (action === "close-lead-success") {
      event.preventDefault();
      closeLeadSuccessModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    const quizModal = document.getElementById("quiz-modal");
    const projectModal = document.getElementById("project-modal");
    const leadSuccessModal = document.getElementById("lead-success-modal");

    if (leadSuccessModal && !leadSuccessModal.hidden) {
      closeLeadSuccessModal();
      return;
    }

    if (quizModal && !quizModal.hidden) {
      closeQuiz();
      return;
    }

    if (projectModal && !projectModal.hidden) {
      closeProjectDetails();
    }
  });
}

function setupFaq() {
  const faqList = document.getElementById("faq-list");
  faqList.addEventListener("click", (event) => {
    const button = event.target.closest(".faq-question");
    if (!button) {
      return;
    }

    const item = button.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    faqList.querySelectorAll(".faq-item").forEach((faqItem) => {
      faqItem.classList.remove("is-open");
      faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      faqItem.querySelector(".faq-answer").hidden = true;
    });

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      answer.hidden = false;
    }
  });
}

function setupLeadForm() {
  const form = document.getElementById("lead-form");
  const status = document.getElementById("lead-form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const areaBudget = String(data.get("areaBudget") || "").trim();
    const hasConsent = data.get("privacyConsent") === "on";

    if (!hasConsent) {
      setStatus(status, "Подтвердите согласие на обработку персональных данных.", true);
      form.elements.privacyConsent.focus();
      return;
    }

    if (!isValidPhone(phone)) {
      setStatus(status, "Введите корректный телефон, чтобы можно было быстро связаться.", true);
      form.elements.phone.focus();
      return;
    }

    await submitLeadRequest({
      form,
      status,
      payload: buildLeadPayload(data, {
        source: "Финальная форма",
        name,
        phone,
        areaBudget,
      }),
      successMessage: "Заявка отправлена. Мы скоро свяжемся с вами.",
      errorMessage: "Не удалось отправить заявку. Попробуйте еще раз.",
    });
  });
}

function buildLeadPayload(data, extra = {}) {
  const fields = Object.fromEntries(
    Array.from(data.entries())
      .filter(([name]) => name !== "privacyConsent")
      .map(([name, value]) => [name, String(value || "").trim()]),
  );

  return {
    ...fields,
    ...extra,
    page: window.location.href,
  };
}

async function submitLeadRequest({ form, status, payload, successMessage, errorMessage, onSuccess }) {
  const submitButton = form.querySelector('[type="submit"]');
  const initialButtonText = submitButton ? submitButton.textContent : "";

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Отправляем...";
  }
  setStatus(status, "Отправляем заявку...", false);

  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
      throw new Error(result.error || errorMessage);
    }

    setStatus(status, successMessage, false);
    form.reset();
    openLeadSuccessModal();
    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    setStatus(status, error.message || errorMessage, true);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = initialButtonText;
    }
  }
}

function setStatus(node, text, isError) {
  node.textContent = text;
  node.classList.toggle("is-error", Boolean(isError));
}

function isValidPhone(value) {
  const digits = String(value).replace(/\D/g, "");
  return digits.length >= 10;
}

function openLeadSuccessModal() {
  const modal = document.getElementById("lead-success-modal");
  if (!modal) {
    return;
  }

  modal.hidden = false;
  updateBodyLock();

  const closeButton = document.getElementById("lead-success-close");
  if (closeButton) {
    closeButton.focus();
  }
}

function closeLeadSuccessModal() {
  const modal = document.getElementById("lead-success-modal");
  if (!modal) {
    return;
  }

  modal.hidden = true;
  updateBodyLock();
}

function setupMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      header.classList.remove("is-menu-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupQuizShortcuts() {
  updateQuizProgress();
}

function openProjectDetails(projectIndex) {
  const project = PROJECTS[projectIndex];
  const modal = document.getElementById("project-modal");
  const content = document.getElementById("project-modal-content");

  if (!project || !modal || !content) {
    return;
  }

  content.innerHTML = createProjectDetailsMarkup(project, projectIndex);
  modal.hidden = false;
  updateBodyLock();

  const closeButton = modal.querySelector(".modal__close");
  if (closeButton) {
    closeButton.focus();
  }
}

function closeProjectDetails() {
  const modal = document.getElementById("project-modal");
  if (!modal) {
    return;
  }

  modal.hidden = true;
  updateBodyLock();
}

function openProjectQuiz(projectIndex) {
  const project = PROJECTS[projectIndex];
  if (!project) {
    return;
  }

  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.hidden = true;
  }

  openQuiz(`project-${project.name}`, project.name);
}

function createProjectDetailsMarkup(project, index) {
  return `
    <figure class="project-detail__media">
      <img src="${buildImagePath(project.image)}" alt="${project.alt}" loading="eager" decoding="async" />
    </figure>
    <div class="project-detail__content">
      <p class="eyebrow">Проект дома</p>
      <h2 id="project-modal-title">${project.name}</h2>
      <p class="project-detail__lead">${project.description}</p>

      <div class="project-detail__stats" aria-label="Ключевые параметры проекта">
        <div>
          <span>Площадь</span>
          <strong>${project.area}</strong>
        </div>
        <div>
          <span>Стоимость</span>
          <strong>${project.price}</strong>
        </div>
        <div>
          <span>Срок</span>
          <strong>${project.duration.replace("Срок: ", "")}</strong>
        </div>
      </div>

      <div class="project-detail__columns">
        ${createProjectList("Планировка", project.plan)}
        ${createProjectList("Что входит", project.included)}
        ${createProjectList("Что можно изменить", project.customizable)}
      </div>

      <button class="button button--solid button--large" type="button" data-action="open-project-quiz" data-project-index="${index}">
        Рассчитать этот проект
      </button>
    </div>
  `;
}

function createProjectList(title, items) {
  return `
    <section class="project-detail__section">
      <h3>${title}</h3>
      <ul>
        ${(items || []).map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  `;
}

function openQuiz(source, selectedProject = "") {
  quizState.source = source;
  quizState.currentStep = 0;
  quizState.answers = {};
  quizState.selectedProject = selectedProject;

  const modal = document.getElementById("quiz-modal");
  modal.hidden = false;
  updateBodyLock();
  renderQuizStep();
}

function closeQuiz() {
  const modal = document.getElementById("quiz-modal");
  modal.hidden = true;
  updateBodyLock();
}

function updateBodyLock() {
  const hasOpenModal = Array.from(document.querySelectorAll(".modal")).some((modal) => !modal.hidden);
  document.body.classList.toggle("is-locked", hasOpenModal);
}

function renderQuizStep() {
  const content = document.getElementById("quiz-content");
  const footer = document.getElementById("quiz-footer");
  const step = QUIZ_STEPS[quizState.currentStep];

  updateQuizProgress();

  if (!step) {
    closeQuiz();
    return;
  }

  if (step.type === "contact") {
    content.innerHTML = `
      <h3 id="quiz-title">${step.title}</h3>
      <p>${step.description}</p>
      <form class="quiz__contact-form" id="quiz-contact-form" novalidate>
        ${step.fields
          .map(
            (field) => `
              <label class="field">
                <span>${field.label}${field.required ? "" : " (опционально)"}</span>
                <input
                  type="${field.name === "phone" ? "tel" : "text"}"
                  name="${field.name}"
                  placeholder="${field.placeholder}"
                  ${field.name === "phone" ? 'inputmode="tel"' : ""}
                  ${field.required ? "required" : ""}
                />
              </label>
            `,
          )
          .join("")}
        <p class="form-status" id="quiz-form-status" aria-live="polite"></p>
        <label class="consent-field">
          <input type="checkbox" name="privacyConsent" required />
          <span>
            Я соглашаюсь на обработку персональных данных и ознакомлен с
            <a href="./privacy.html" target="_blank" rel="noopener">Политикой обработки персональных данных</a>.
          </span>
        </label>
        <div class="quiz__contact-actions">
          <button class="button button--ghost" type="button" id="quiz-back-button">Назад</button>
          <button class="button button--solid" type="submit">${SITE_CONFIG.cta.quiz}</button>
        </div>
      </form>
    `;
    footer.innerHTML = "";

    document.getElementById("quiz-back-button").addEventListener("click", () => {
      quizState.currentStep = Math.max(0, quizState.currentStep - 1);
      renderQuizStep();
    });

    document.getElementById("quiz-contact-form").addEventListener("submit", submitQuizLead);
    return;
  }

  const selected = quizState.answers[step.id];
  content.innerHTML = `
    <h3 id="quiz-title">${step.title}</h3>
    <div class="quiz-options">
      ${step.options
        .map(
          (option) => `
            <button class="quiz-option ${selected === option ? "is-selected" : ""}" type="button" data-option="${option}">
              ${option}
            </button>
          `,
        )
        .join("")}
    </div>
  `;

  content.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      quizState.answers[step.id] = button.dataset.option;
      renderQuizStep();
    });
  });

  footer.innerHTML = `
    <button class="button button--ghost" type="button" id="quiz-prev" ${quizState.currentStep === 0 ? "disabled" : ""}>
      Назад
    </button>
    <button class="button button--solid" type="button" id="quiz-next" ${selected ? "" : "disabled"}>
      Далее
    </button>
  `;

  document.getElementById("quiz-prev").addEventListener("click", () => {
    quizState.currentStep = Math.max(0, quizState.currentStep - 1);
    renderQuizStep();
  });

  document.getElementById("quiz-next").addEventListener("click", () => {
    if (!quizState.answers[step.id]) {
      return;
    }

    quizState.currentStep += 1;
    renderQuizStep();
  });
}

function updateQuizProgress() {
  const total = QUIZ_STEPS.length;
  const current = Math.min(quizState.currentStep + 1, total);
  const counter = document.getElementById("quiz-counter");
  const progressBar = document.getElementById("quiz-progress-bar");

  counter.textContent = `${current} / ${total}`;
  progressBar.style.width = `${(current / total) * 100}%`;
}

async function submitQuizLead(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const status = form.querySelector("#quiz-form-status");
  const data = new FormData(form);
  const phone = String(data.get("phone") || "").trim();
  const name = String(data.get("name") || "").trim();
  const hasConsent = data.get("privacyConsent") === "on";

  if (!hasConsent) {
    setStatus(status, "Подтвердите согласие на обработку персональных данных.", true);
    form.elements.privacyConsent.focus();
    return;
  }

  if (!isValidPhone(phone)) {
    setStatus(status, "Введите корректный телефон, чтобы менеджер мог сориентироваться по запросу.", true);
    form.elements.phone.focus();
    return;
  }

  quizState.answers.contact = { name, phone };

  await submitLeadRequest({
    form,
    status,
    payload: buildLeadPayload(data, {
      source: `Квиз (${quizState.source})`,
      name,
      phone,
      selectedProject: quizState.selectedProject,
      quizAnswers: { ...quizState.answers },
    }),
    successMessage: "Заявка отправлена. Мы скоро свяжемся с вами.",
    errorMessage: "Не удалось отправить заявку. Попробуйте еще раз.",
    onSuccess: closeQuiz,
  });
}

function setupReveal() {
  const elements = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  elements.forEach((element) => observer.observe(element));
}

function setupMediaFallbacks() {
  document.querySelectorAll(".media-shell").forEach((shell) => {
    const image = shell.querySelector(".media-shell__image");
    if (!image) {
      shell.classList.add("is-missing");
      return;
    }

    image.addEventListener("load", () => {
      shell.classList.add("is-ready");
      shell.classList.remove("is-missing");
    });

    image.addEventListener("error", () => {
      shell.classList.add("is-missing");
      image.style.display = "none";
    });

    if (image.complete && image.naturalWidth > 0) {
      shell.classList.add("is-ready");
    }
  });
}
