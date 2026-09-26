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
