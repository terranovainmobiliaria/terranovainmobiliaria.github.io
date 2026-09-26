document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // ANIMACIONES AL HACER SCROLL
  // ==========================================
  const revealElements = document.querySelectorAll(
    ".reveal, .project-card, .feature-card, .social-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });


  // ==========================================
  // HEADER AL HACER SCROLL
  // ==========================================
  const header = document.querySelector(".nav");

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });


  // ==========================================
  // SCROLL SUAVE PARA ENLACES INTERNOS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // ==========================================
  // EFECTO SUAVE EN TARJETAS DE PROYECTOS
  // ==========================================
  const projectCards = document.querySelectorAll(
    ".project-card, .large-project-card"
  );

  projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

      if (window.innerWidth < 900) return;

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -2;
      const rotateY = ((x - centerX) / centerX) * 2;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });

  });


  // ==========================================
  // EFECTO PARALLAX MUY SUAVE EN EL HERO
  // ==========================================
  const hero = document.querySelector(".hero");

  window.addEventListener(
    "scroll",
    () => {

      if (!hero || window.innerWidth < 900) return;

      const scrollPosition = window.scrollY;

      if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition =
          `center calc(50% + ${scrollPosition * 0.08}px)`;
      }

    },
    { passive: true }
  );


  // ==========================================
  // MENÚ MÓVIL
  // ==========================================
  const menuButton = document.querySelector(
    ".menu-toggle, .mobile-menu-button"
  );

  const menu = document.querySelector(
    ".nav-links, .links"
  );

  if (menuButton && menu) {

    menuButton.addEventListener("click", () => {

      menu.classList.toggle("open");
      menuButton.classList.toggle("active");

    });

    menu.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        menu.classList.remove("open");
        menuButton.classList.remove("active");

      });

    });

  }


  // ==========================================
  // CERRAR SELECTORES / MENÚS AL TOCAR FUERA
  // ==========================================
  document.addEventListener("click", (event) => {

    document.querySelectorAll(".whatsapp-menu.open").forEach((menu) => {

      if (!menu.contains(event.target)) {
        menu.classList.remove("open");
      }

    });

  });


  // ==========================================
  // CARGA VISUAL DE LA PÁGINA
  // ==========================================
  document.body.classList.add("page-loaded");

});
