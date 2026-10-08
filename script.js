document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // ANIMACIONES AL HACER SCROLL
  // ==========================================

  const elements = document.querySelectorAll(".reveal");

  // Si el navegador soporta IntersectionObserver
  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Una vez mostrado, dejamos de observarlo
          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    elements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    // Respaldo para navegadores antiguos
    elements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  // ==========================================
  // MOSTRAR PORTADA INMEDIATAMENTE
  // ==========================================

  document.querySelectorAll(".hero .reveal").forEach((element) => {
    element.classList.add("visible");
  });

});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("andahuaylasModal");
  const openButtons = Array.from(document.querySelectorAll("[data-open-andahuaylas-modal]"));
  const closeButton = modal && modal.querySelector(".launch-modal-close");
  const whatsappButton = document.getElementById("launchWhatsAppButton");
  const whatsappOptions = document.getElementById("launchWhatsAppOptions");
  const whatsappLinks = whatsappOptions
    ? Array.from(whatsappOptions.querySelectorAll("[data-launch-whatsapp]"))
    : [];

  if (!modal || openButtons.length === 0 || !closeButton || !whatsappButton || !whatsappOptions || whatsappLinks.length !== 2) {
    return;
  }

  const whatsappMessage = "¡Hola! 😊 Vi en la página de Terranova que están preparando un nuevo proyecto en la ciudad de Andahuaylas y me llamó mucho la atención. ¿Podrían contarme cuando tengan novedades? ¡Gracias!";
  const encodedMessage = encodeURIComponent(whatsappMessage);
  whatsappLinks.forEach(function (link) {
    link.href = "https://wa.me/" + link.dataset.launchWhatsapp + "?text=" + encodedMessage;
  });

  let previousFocus = null;
  let previousBodyOverflow = "";
  let previousInertStates = [];

  const getFocusableElements = function () {
    return Array.from(modal.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function (element) {
      return !element.hidden && element.getClientRects().length > 0;
    });
  };

  const closeModal = function () {
    if (modal.hidden) return;

    modal.hidden = true;
    document.body.style.overflow = previousBodyOverflow;
    previousInertStates.forEach(function (state) {
      state.element.inert = state.inert;
    });
    previousInertStates = [];
    whatsappOptions.hidden = true;
    whatsappButton.setAttribute("aria-expanded", "false");

    if (previousFocus) previousFocus.focus({ preventScroll: true });
    previousFocus = null;
  };

  openButtons.forEach(function (openButton) {
    openButton.addEventListener("click", function () {
      previousFocus = document.activeElement;
      previousBodyOverflow = document.body.style.overflow;
      previousInertStates = Array.from(document.body.children)
        .filter(function (element) {
          return element !== modal;
        })
        .map(function (element) {
          const state = { element: element, inert: element.inert };
          element.inert = true;
          return state;
        });
      document.body.style.overflow = "hidden";
      modal.hidden = false;
      closeButton.focus({ preventScroll: true });
    });
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  whatsappButton.addEventListener("click", function () {
    const willOpen = whatsappOptions.hidden;
    whatsappOptions.hidden = !willOpen;
    whatsappButton.setAttribute("aria-expanded", String(willOpen));
    if (willOpen) whatsappLinks[0].focus({ preventScroll: true });
  });

  modal.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) {
      event.preventDefault();
      modal.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });
});

// ==========================================
// MENÚ WHATSAPP SUPERIOR
// ==========================================

function toggleWhatsapp(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const menu = document.getElementById("whatsappMenu");

  if (!menu) return;

  const abierto = menu.classList.contains("open");

  if (abierto) {
    menu.classList.remove("open");
  } else {
    menu.classList.add("open");
  }
}
// ==========================================
// MENÚ WHATSAPP INFERIOR
// ==========================================

function toggleBottomWhatsapp() {
  const menu = document.getElementById("bottomWhatsappMenu");

  if (menu) {
    menu.classList.toggle("open");
  }
}


// ==========================================
// CERRAR MENÚS AL HACER CLIC FUERA
// ==========================================

document.addEventListener("click", function (event) {

  const topMenu = document.getElementById("whatsappMenu");
  const bottomMenu = document.getElementById("bottomWhatsappMenu");

  const topButton = document.querySelector(".contact-top");
  const bottomButton = document.querySelector(".contact-wa");

  if (
    topMenu &&
    topButton &&
    !topMenu.contains(event.target) &&
    !topButton.contains(event.target)
  ) {
    topMenu.classList.remove("open");
  }

  if (
    bottomMenu &&
    bottomButton &&
    !bottomMenu.contains(event.target) &&
    !bottomButton.contains(event.target)
  ) {
    bottomMenu.classList.remove("open");
  }

});

// ==========================================
// BUSCADOR DE PROPIEDADES PARA COMPRA Y ALQUILER
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("propertySearchForm");
  const search = document.querySelector(".nav-search");
  const mobileToggle = document.querySelector(".search-mobile-toggle");
  const operation = document.getElementById("searchOperation");
  const propertyType = document.getElementById("searchType");
  const locationInput = document.getElementById("searchLocation");
  const resultMessage = document.getElementById("searchResultsMessage");
  const emptyState = document.getElementById("searchEmptyState");
  const emptyMessage = document.getElementById("emptySearchMessage");
  const emptyLocation = document.getElementById("emptySearchLocation");
  const emptyWhatsAppButton = document.getElementById("emptyWhatsAppButton");
  const emptyWhatsAppMenu = document.getElementById("emptyWhatsAppMenu");
  const advisorWhatsAppLinks = Array.from(document.querySelectorAll("[data-search-whatsapp]"));
  const resetButton = document.getElementById("resetPropertySearch");
  const searchButton = form && form.querySelector(".property-search-submit");
  const propertyCards = Array.from(document.querySelectorAll('[data-property-listing="published"]'));
  const projectsSection = document.getElementById("proyectos");

  if (
    !form || !search || !mobileToggle || !operation || !propertyType ||
    !locationInput || !resultMessage || !emptyState || !emptyMessage ||
    !emptyLocation || !emptyWhatsAppButton || !emptyWhatsAppMenu ||
    advisorWhatsAppLinks.length !== 2 || !resetButton || !searchButton || !projectsSection
  ) {
    return;
  }

  const propertyTypeOptions = {
    comprar: [
      ["todos", "Todos"],
      ["terrenos", "Terrenos y lotes"],
      ["casas", "Casas"],
      ["departamentos", "Departamentos"],
      ["locales", "Locales comerciales"]
    ],
    alquilar: [
      ["todos", "Todos"],
      ["casas", "Casas"],
      ["departamentos", "Departamentos"],
      ["locales", "Locales comerciales"]
    ]
  };

  const normalize = function (value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  };

  const updatePropertyTypeOptions = function (resetIncompatibleType) {
    const availableOptions = propertyTypeOptions[operation.value];
    const currentType = propertyType.value;
    propertyType.replaceChildren();

    availableOptions.forEach(function (optionData) {
      const option = document.createElement("option");
      option.value = optionData[0];
      option.textContent = optionData[1];
      propertyType.appendChild(option);
    });

    const typeIsAvailable = availableOptions.some(function (optionData) {
      return optionData[0] === currentType;
    });
    propertyType.value = resetIncompatibleType && !typeIsAvailable ? "todos" : currentType;
  };

  updatePropertyTypeOptions(false);

  const animate = function (element) {
    element.classList.remove("search-result-in");
    requestAnimationFrame(function () {
      element.classList.add("search-result-in");
    });
  };

  const pulseSelection = function (element) {
    element.classList.remove("selection-pulse");
    requestAnimationFrame(function () {
      element.classList.add("selection-pulse");
      window.setTimeout(function () {
        element.classList.remove("selection-pulse");
      }, 500);
    });
  };

  const closeAdvisorMenu = function (returnFocus) {
    emptyWhatsAppMenu.hidden = true;
    emptyWhatsAppButton.setAttribute("aria-expanded", "false");
    if (returnFocus) emptyWhatsAppButton.focus();
  };

  const createWhatsAppMessage = function (selectedOperation, selectedType, keyword) {
    const propertyDescriptions = {
      todos: "una propiedad",
      terrenos: "un terreno o lote",
      casas: "una casa",
      departamentos: "un departamento",
      locales: "un local comercial"
    };
    const propertyDescription = propertyDescriptions[selectedType] || "una propiedad";
    const operationDescription = selectedOperation === "alquilar" ? "alquilar" : "comprar";
    const locationDescription = keyword ? " en " + keyword : "";

    return "¡Hola! 😊 Estuve viendo su página de Terranova y estoy buscando " +
      propertyDescription + " para " + operationDescription + locationDescription +
      ". No encontré una opción disponible por ahora, pero quería saber si tienen alguna alternativa o si podrían ayudarme a encontrar una. ¡Muchas gracias!";
  };

  const updateAdvisorLinks = function (message) {
    const encodedMessage = encodeURIComponent(message);
    advisorWhatsAppLinks.forEach(function (link) {
      link.href = "https://wa.me/" + link.dataset.searchWhatsapp + "?text=" + encodedMessage;
    });
  };

  const closeMobileSearch = function () {
    if (window.matchMedia("(max-width: 900px)").matches) {
      search.classList.remove("search-open");
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileToggle.focus();
    }
  };

  mobileToggle.addEventListener("click", function () {
    const willOpen = !search.classList.contains("search-open");
    search.classList.toggle("search-open", willOpen);
    mobileToggle.setAttribute("aria-expanded", String(willOpen));

    if (willOpen) {
      window.setTimeout(function () {
        operation.focus();
      }, 0);
    }
  });

  locationInput.addEventListener("input", function () {
    search.classList.toggle("is-typing", locationInput.value.length > 0);
  });

  operation.addEventListener("change", function () {
    updatePropertyTypeOptions(true);
    pulseSelection(operation);
    pulseSelection(propertyType);
  });

  propertyType.addEventListener("change", function () {
    pulseSelection(propertyType);
  });

  form.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && search.classList.contains("search-open")) {
      search.classList.remove("search-open");
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileToggle.focus();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedOperation = operation.value;
    const selectedType = propertyType.value;
    const keyword = locationInput.value.trim();
    const normalizedKeyword = normalize(keyword);
    const whatsappMessage = createWhatsAppMessage(selectedOperation, selectedType, keyword);
    updateAdvisorLinks(whatsappMessage);
    closeAdvisorMenu(false);

    searchButton.classList.remove("is-searching");
    requestAnimationFrame(function () {
      searchButton.classList.add("is-searching");
    });
    window.setTimeout(function () {
      searchButton.classList.remove("is-searching");
    }, 650);

    const matches = propertyCards.filter(function (card) {
      const operations = (card.dataset.operation || "").split(/\s+/);
      const matchesOperation = operations.includes(selectedOperation);
      const matchesType = selectedType === "todos" || card.dataset.propertyType === selectedType;
      const searchableText = normalize(card.textContent + " " + (card.getAttribute("href") || ""));
      const matchesKeyword = !normalizedKeyword || searchableText.includes(normalizedKeyword);

      return matchesOperation && matchesType && matchesKeyword;
    });

    propertyCards.forEach(function (card) {
      card.hidden = !matches.includes(card);
    });

    const resultCount = matches.length;

    resultMessage.hidden = resultCount === 0;
    emptyState.hidden = resultCount !== 0;

    if (resultCount > 0) {
      const propertyWord = resultCount === 1 ? "propiedad" : "propiedades";
      const operationDescription = selectedOperation === "alquilar" ? "alquilar" : "comprar";
      resultMessage.textContent = keyword
        ? "Encontramos " + resultCount + " " + propertyWord + ' que coincide' + (resultCount === 1 ? "" : "n") + " con tu búsqueda."
        : "Encontramos " + resultCount + " " + propertyWord + " disponible" + (resultCount === 1 ? "" : "s") + " para " + operationDescription + ".";
      animate(resultMessage);
    } else {
      if (keyword) {
        emptyMessage.textContent = selectedOperation === "alquilar"
          ? "Todavía no tenemos propiedades en alquiler publicadas que coincidan con tu búsqueda."
          : "Todavía no tenemos una propiedad en venta publicada que coincida con tu búsqueda.";
        emptyLocation.textContent = "Buscamos «" + keyword + "» contigo; por ahora, ninguna propiedad publicada coincide con esa búsqueda.";
      } else if (selectedOperation === "alquilar") {
        emptyMessage.textContent = "Por ahora no tenemos propiedades en alquiler publicadas. Si nos cuentas qué necesitas, podremos orientarte.";
        emptyLocation.textContent = "";
      } else if (selectedType !== "todos") {
        const selectedTypeLabel = {
          terrenos: "terrenos y lotes",
          casas: "casas",
          departamentos: "departamentos",
          locales: "locales comerciales"
        }[selectedType] || "inmuebles publicados";
        emptyMessage.textContent = "Aún no tenemos " + selectedTypeLabel + " en venta que coincidan con estos filtros.";
        emptyLocation.textContent = "Cuéntanos qué propiedad buscas y te orientaremos sobre las opciones disponibles.";
      } else {
        emptyMessage.textContent = "Todavía no tenemos propiedades en venta que coincidan con estos filtros.";
        emptyLocation.textContent = "Cuéntanos qué tienes en mente y te ayudaremos a explorar las opciones disponibles.";
      }

      animate(emptyState);
    }

    closeMobileSearch();
    projectsSection.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  });

  resetButton.addEventListener("click", function () {
    operation.value = "comprar";
    updatePropertyTypeOptions(false);
    propertyType.value = "todos";
    locationInput.value = "";
    search.classList.remove("is-typing");
    pulseSelection(operation);
    form.requestSubmit();
  });

  emptyWhatsAppButton.addEventListener("click", function () {
    const willOpen = emptyWhatsAppMenu.hidden;
    emptyWhatsAppMenu.hidden = !willOpen;
    emptyWhatsAppButton.setAttribute("aria-expanded", String(willOpen));
    if (willOpen) {
      advisorWhatsAppLinks[0].focus({ preventScroll: true });
      emptyWhatsAppMenu.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "nearest"
      });
    }
  });

  emptyWhatsAppMenu.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeAdvisorMenu(true);
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".search-whatsapp-picker") && !emptyWhatsAppMenu.hidden) {
      closeAdvisorMenu(false);
    }
  });
});
