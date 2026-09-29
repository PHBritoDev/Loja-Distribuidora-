(function () {
  "use strict";

  const WHATSAPP_NUMBER = "5561982206185";
  const state = { category: "Todos", query: "" };

  const $ = (selector) => document.querySelector(selector);
  const grid = $("#grid");
  const featGrid = $("#featGrid");
  const catGrid = $("#catGrid");
  const chips = $("#chips");
  const count = $("#count");
  const empty = $("#empty");
  const searchInput = $("#q");

  const whatsappLink = (text) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  const normalize = (text) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const countByCategory = (category) =>
    PRODUCTS.filter((p) => p.category === category).length;

  function createImage(src, alt, eager) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.width = 720;
    img.height = 540;
    if (!eager) img.loading = "lazy";
    img.decoding = "async";
    // Se a foto não carregar, o contêiner mantém o fundo em gradiente, sem ícone quebrado.
    img.addEventListener("error", () => img.remove());
    return img;
  }

  function createCard(product) {
    const card = document.createElement("article");
    card.className = "card";

    const media = document.createElement("div");
    media.className = "card__media";
    media.appendChild(createImage(product.img, product.name));

    const body = document.createElement("div");
    body.className = "card__body";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const desc = document.createElement("p");
    desc.textContent = product.desc;

    const info = document.createElement("ul");
    product.info.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      info.appendChild(li);
    });

    const button = document.createElement("a");
    button.className = "btn btn--wa";
    button.target = "_blank";
    button.rel = "noopener";
    button.href = whatsappLink(
      `Olá, gostaria de saber o preço e a disponibilidade de: ${product.name}.`
    );
    button.innerHTML =
      '<svg class="icon" aria-hidden="true"><use href="#i-wa"/></svg>Pedir pelo WhatsApp';
    button.setAttribute("aria-label", `Pedir ${product.name} pelo WhatsApp`);

    body.append(tag, title, desc, info, button);
    card.append(media, body);
    return card;
  }

  function renderFeatured() {
    featGrid.replaceChildren(
      ...PRODUCTS.filter((p) => p.featured).map(createCard)
    );
  }

  function renderCategories() {
    CATEGORIES.forEach((category) => {
      const first = PRODUCTS.find((p) => p.category === category);
      const total = countByCategory(category);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cat";
      button.setAttribute("aria-label", `Ver ${category}`);
      button.appendChild(createImage(first.img, "", false));
      const label = document.createElement("span");
      label.className = "cat__label";
      label.innerHTML = `<strong>${category}</strong><span>${total} ${
        total === 1 ? "produto" : "produtos"
      }</span>`;
      button.appendChild(label);
      button.addEventListener("click", () => {
        setCategory(category);
        $("#catalogo").scrollIntoView({ behavior: "smooth" });
      });
      catGrid.appendChild(button);
    });
  }

  function renderChips() {
    chips.replaceChildren();
    ["Todos", ...CATEGORIES].forEach((category) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = category;
      chip.dataset.category = category;
      chip.setAttribute("aria-pressed", String(category === state.category));
      chip.addEventListener("click", () => setCategory(category));
      chips.appendChild(chip);
    });
  }

  function setCategory(category) {
    state.category = category;
    chips.querySelectorAll(".chip").forEach((chip) => {
      chip.setAttribute(
        "aria-pressed",
        String(chip.dataset.category === category)
      );
    });
    renderCatalog();
  }

  function renderCatalog() {
    const query = normalize(state.query.trim());
    const results = PRODUCTS.filter((product) => {
      const inCategory =
        state.category === "Todos" || product.category === state.category;
      const haystack = normalize(
        `${product.name} ${product.category} ${product.desc}`
      );
      return inCategory && (!query || haystack.includes(query));
    });

    grid.replaceChildren(...results.map(createCard));
    empty.hidden = results.length > 0;
    count.textContent =
      results.length === 0
        ? ""
        : `${results.length} ${results.length === 1 ? "produto" : "produtos"}` +
          (state.category === "Todos" ? "" : ` em ${state.category}`);
  }

  function bindWhatsappLinks() {
    document.querySelectorAll("[data-wa]").forEach((link) => {
      link.href = whatsappLink(link.dataset.wa);
      link.target = "_blank";
      link.rel = "noopener";
    });
  }

  function bindMenu() {
    const button = $("#menuBtn");
    const menu = $("#menu");
    const icon = button.querySelector("use");

    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      icon.setAttribute("href", open ? "#i-close" : "#i-menu");
      document.body.style.overflow = open ? "hidden" : "";
    };

    button.addEventListener("click", () =>
      setOpen(button.getAttribute("aria-expanded") !== "true")
    );
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
    window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    renderCatalog();
  });

  renderFeatured();
  renderCategories();
  renderChips();
  renderCatalog();
  bindWhatsappLinks();
  bindMenu();
})();
